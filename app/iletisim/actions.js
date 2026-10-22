'use server';

import { sql } from '../../lib/db';
import { redirect } from 'next/navigation';
import { epostaGecerliMi, uzunlukAraliginda } from '../../lib/dogrula';

export async function mesajGonder(formData) {
  const adSoyad = String(formData.get('ad_soyad') || '').trim();
  const eposta = String(formData.get('eposta') || '').trim().toLowerCase();
  const mesaj = String(formData.get('mesaj') || '').trim();
  const onay = formData.get('kvkk_onay') === 'on';

  if (!uzunlukAraliginda(adSoyad, 2, 100)) redirect('/iletisim?durum=ad');
  if (!epostaGecerliMi(eposta)) redirect('/iletisim?durum=eposta');
  if (!uzunlukAraliginda(mesaj, 10, 2000)) redirect('/iletisim?durum=mesaj');
  if (!onay) redirect('/iletisim?durum=onay');

  const [{ sayi }] = await sql`
    SELECT COUNT(*)::int AS sayi FROM iletisim_mesajlari
    WHERE eposta = ${eposta} AND gonderim_zamani > now() - interval '1 hour'`;
  if (sayi >= 3) redirect('/iletisim?durum=cok');

  await sql`INSERT INTO iletisim_mesajlari (ad_soyad, eposta, mesaj, kvkk_onay)
            VALUES (${adSoyad}, ${eposta}, ${mesaj}, true)`;

  redirect('/iletisim?durum=tamam');
}