import { sql } from '../../../../lib/db';
import { oturumKontrol } from '../../../../lib/oturum';
import { notFound } from 'next/navigation';
import { hobiGuncelle } from './actions';

export const dynamic = 'force-dynamic';

export default async function Duzenle({ params, searchParams }) {
  await oturumKontrol();
  const { id } = await params;
  const { hata } = await searchParams;

  const hobiId = Number(id);
  if (!Number.isInteger(hobiId)) notFound();

  const satirlar = await sql`SELECT * FROM hobiler WHERE id = ${hobiId}`;
  const h = satirlar[0];
  if (!h) notFound();

  const gruplar = await sql`SELECT id, ad FROM hobi_gruplari ORDER BY ad`;

  return (
    <main style={{ padding: 20 }}>
      <p><a href="/admin/hobiler">← Hobilere dön</a></p>
      <h1>Hobiyi düzenle</h1>
      {hata && <p style={{ color: 'red' }}>Ad boş olamaz ve çok uzun olmamalı.</p>}
      <form action={hobiGuncelle} style={{ display: 'grid', gap: 8, maxWidth: 400 }}>
        <input type="hidden" name="id" value={h.id} />
        <input name="ad" defaultValue={h.ad} required maxLength={100} />
        <input name="aciklama" defaultValue={h.aciklama ?? ''} maxLength={500} />
        <input name="baslama_yili" type="number" defaultValue={h.baslama_yili ?? ''} />
        <input name="haftalik_saat" type="number" defaultValue={h.haftalik_saat ?? ''} />
        <select name="kategori_id" defaultValue={h.kategori_id ?? ''}>
          <option value="">Kategori seç</option>
          {gruplar.map((g) => (
            <option key={g.id} value={g.id}>{g.ad}</option>
          ))}
        </select>
        <button type="submit">Kaydet</button>
      </form>
    </main>
  );
}