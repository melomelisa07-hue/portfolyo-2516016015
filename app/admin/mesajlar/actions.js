'use server';

import { sql } from '../../../lib/db';
import { oturumKontrol } from '../../../lib/oturum';
import { revalidatePath } from 'next/cache';

export async function okunduIsaretle(formData) {
  await oturumKontrol();
  const id = Number(formData.get('id'));
  await sql`UPDATE iletisim_mesajlari SET okundu = true WHERE id = ${id}`;
  revalidatePath('/admin/mesajlar');
  revalidatePath('/admin');
}

export async function mesajSil(formData) {
  await oturumKontrol();
  const id = Number(formData.get('id'));
  await sql`DELETE FROM iletisim_mesajlari WHERE id = ${id}`;
  revalidatePath('/admin/mesajlar');
  revalidatePath('/admin');
}