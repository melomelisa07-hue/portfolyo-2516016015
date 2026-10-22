import { sql } from './db';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function oturumKontrol() {
  const c = await cookies();
  const token = c.get('oturum')?.value;
  if (!token) redirect('/giris');

  const satirlar = await sql`SELECT yonetici_id FROM oturumlar WHERE token = ${token} AND bitis > now()`;
  if (satirlar.length === 0) redirect('/giris');

  return satirlar[0].yonetici_id;
}