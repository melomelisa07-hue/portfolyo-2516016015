'use server';

import { sql } from '../../lib/db';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function girisYap(formData) {
  const eposta = String(formData.get('eposta') || '').trim();
  const sifre = String(formData.get('sifre') || '');

  if (!eposta || !sifre || eposta.length > 200 || sifre.length > 200) {
    redirect('/giris?hata=1');
  }

  const satirlar = await sql`SELECT id, sifre_hash FROM yoneticiler WHERE eposta = ${eposta}`;
  const yonetici = satirlar[0];
  const dogru = yonetici ? await bcrypt.compare(sifre, yonetici.sifre_hash) : false;

  if (!dogru) {
    redirect('/giris?hata=1');
  }

  const token = crypto.randomBytes(32).toString('hex');
  const bitis = new Date(Date.now() + 2 * 60 * 60 * 1000);

  await sql`INSERT INTO oturumlar (token, yonetici_id, bitis) VALUES (${token}, ${yonetici.id}, ${bitis.toISOString()})`;

  const c = await cookies();
  c.set('oturum', token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    expires: bitis,
  });

  redirect('/admin');
}