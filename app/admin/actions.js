'use server';

import { sql } from '../../lib/db';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function cikisYap() {
  const c = await cookies();
  const token = c.get('oturum')?.value;
  if (token) {
    await sql`DELETE FROM oturumlar WHERE token = ${token}`;
  }
  c.delete('oturum');
  redirect('/giris');
}