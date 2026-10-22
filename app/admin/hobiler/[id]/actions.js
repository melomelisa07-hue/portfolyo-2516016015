'use server';

import { sql } from '../../../../lib/db';
import { oturumKontrol } from '../../../../lib/oturum';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function hobiGuncelle(formData) {
  await oturumKontrol();

  const id = Number(formData.get('id'));
  const ad = String(formData.get('ad') || '').trim();
  const aciklama = String(formData.get('aciklama') || '').trim() || null;
  const yil = parseInt(formData.get('baslama_yili'), 10);
  const saat = parseInt(formData.get('haftalik_saat'), 10);
  const kategori = parseInt(formData.get('kategori_id'), 10);

  if (!ad || ad.length > 100 || (aciklama && aciklama.length > 500)) {
    redirect(`/admin/hobiler/${id}?hata=1`);
  }

  const yilD = Number.isNaN(yil) ? null : yil;
  const saatD = Number.isNaN(saat) ? null : saat;
  const kategoriD = Number.isNaN(kategori) ? null : kategori;

  await sql`UPDATE hobiler
            SET ad = ${ad}, aciklama = ${aciklama}, baslama_yili = ${yilD},
                haftalik_saat = ${saatD}, kategori_id = ${kategoriD}
            WHERE id = ${id}`;

  revalidatePath('/admin/hobiler');
  revalidatePath('/');
  redirect('/admin/hobiler');
}