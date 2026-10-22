import { sql } from '../lib/db';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const hobiler = await sql`
    SELECT h.id, h.ad, h.aciklama, h.baslama_yili, h.haftalik_saat, g.ad AS kategori
    FROM hobiler h
    LEFT JOIN hobi_gruplari g ON g.id = h.kategori_id
    WHERE h.yayinda = true
    ORDER BY h.id`;

  const onecikanlar = await sql`
    SELECT id, ad, haftalik_saat
    FROM hobiler
    WHERE yayinda = true
    ORDER BY haftalik_saat DESC NULLS LAST
    LIMIT 3`;

  return (
    <main style={{ padding: 20, maxWidth: 700, margin: '0 auto' }}>
      <h1>Melisa Karakoç</h1>
      <p><a href="/iletisim">İletişim</a> | <a href="/aydinlatma-metni">Aydınlatma metni</a></p>

      <h2>Öne çıkanlar</h2>
      <ol>
        {onecikanlar.map((h) => (
          <li key={h.id}>
            {h.ad} (haftada {h.haftalik_saat} saat)
          </li>
        ))}
      </ol>

      <h2>Hobilerim</h2>
      {hobiler.map((h) => (
        <div key={h.id} style={{ border: '1px solid #888', padding: 10, marginBottom: 10 }}>
          <h3>{h.ad}</h3>
          {h.kategori && <p>Kategori: {h.kategori}</p>}
          {h.aciklama && <p>{h.aciklama}</p>}
          <p>
            {h.baslama_yili && <>Başlangıç: {h.baslama_yili} </>}
            {h.haftalik_saat != null && <>· Haftada {h.haftalik_saat} saat</>}
          </p>
        </div>
      ))}
    </main>
  );
}