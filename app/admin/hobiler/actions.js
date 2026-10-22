'use server';

import { sql } from '../../../lib/db';
import { oturumKontrol } from '../../../lib/oturum';
import { uzunlukAraliginda, httpsIleBasliyorMu } from '../../../lib/dogrula';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

function hataIleDon(mesaj) {
  redirect('/admin/hobiler?hata=' + encodeURIComponent(mesaj));
}

export async function hobiEkle(formData) {
  await oturumKontrol();

  const ad = String(formData.get('ad') || '').trim();
  const aciklama = String(formData.get('aciklama') || '').trim() || null;
  const baglanti = String(formData.get('baglanti') || '').trim() || null;
  const yil = parseInt(formData.get('baslama_yili'), 10);
  const saat = parseInt(formData.get('haftalik_saat'), 10);
  const kategori = parseInt(formData.get('kategori_id'), 10);

  const yilD = Number.isNaN(yil) ? null : yil;
  const saatD = Number.isNaN(saat) ? null : saat;
  const kategoriD = Number.isNaN(kategori) ? null : kategori;

  if (!uzunlukAraliginda(ad, 1, 100)) {
    hataIleDon('Hobi adı 1 ile 100 karakter arasında olmalı.');
  }
  if (aciklama && !uzunlukAraliginda(aciklama, 1, 500)) {
    hataIleDon('Açıklama en fazla 500 karakter olabilir.');
  }
  if (baglanti && (!httpsIleBasliyorMu(baglanti) || baglanti.length > 300)) {
    hataIleDon('Bağlantı https:// ile başlamalı ve en fazla 300 karakter olmalı.');
  }
  if (yilD !== null && (yilD < 1950 || yilD > new Date().getFullYear())) {
    hataIleDon('Başlama yılı 1950 ile bu yıl arasında olmalı.');
  }
  if (saatD !== null && (saatD < 0 || saatD > 168)) {
    hataIleDon('Haftalık saat 0 ile 168 arasında olmalı.');
  }

  await sql`INSERT INTO hobiler (ad, aciklama, baglanti, baslama_yili, haftalik_saat, kategori_id)
            VALUES (${ad}, ${aciklama}, ${baglanti}, ${yilD}, ${saatD}, ${kategoriD})`;

  revalidatePath('/admin/hobiler');
  revalidatePath('/');
  redirect('/admin/hobiler');
}

export async function yayinDegistir(formData) {
  await oturumKontrol();
  const id = Number(formData.get('id'));
  await sql`UPDATE hobiler SET yayinda = NOT yayinda WHERE id = ${id}`;
  revalidatePath('/admin/hobiler');
  revalidatePath('/');
}

export async function hobiSil(formData) {
  await oturumKontrol();
  const id = Number(formData.get('id'));
  await sql`DELETE FROM hobiler WHERE id = ${id}`;
  revalidatePath('/admin/hobiler');
  revalidatePath('/');
}