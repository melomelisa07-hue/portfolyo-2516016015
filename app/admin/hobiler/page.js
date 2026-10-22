import { sql } from '../../../lib/db';
import { oturumKontrol } from '../../../lib/oturum';
import { hobiEkle, yayinDegistir, hobiSil } from './actions';

export const dynamic = 'force-dynamic';

export default async function Hobiler({ searchParams }) {
  await oturumKontrol();
  const { hata } = await searchParams;

  const hobiler = await sql`
    SELECT h.id, h.ad, h.aciklama, h.baglanti, h.baslama_yili, h.haftalik_saat, h.yayinda, g.ad AS kategori
    FROM hobiler h
    LEFT JOIN hobi_gruplari g ON g.id = h.kategori_id
    ORDER BY h.id`;
  const gruplar = await sql`SELECT id, ad FROM hobi_gruplari ORDER BY ad`;

  return (
    <main style={{ padding: 20 }}>
      <p><a href="/admin">← Panele dön</a></p>
      <h1>Hobiler</h1>

      <h2>Yeni hobi ekle</h2>
      {hata && <p style={{ color: 'red' }}>{hata}</p>}
      <form action={hobiEkle} style={{ display: 'grid', gap: 8, maxWidth: 400 }}>
        <input name="ad" placeholder="Hobi adı" required maxLength={100} />
        <input name="aciklama" placeholder="Açıklama (boş olabilir)" maxLength={500} />
        <input name="baglanti" type="text" placeholder="Bağlantı (https:// ile başlamalı, boş olabilir)" />
        <input name="baslama_yili" type="number" placeholder="Başlama yılı" />
        <input name="haftalik_saat" type="number" placeholder="Haftalık saat" />
        <select name="kategori_id">
          <option value="">Kategori seç</option>
          {gruplar.map((g) => (
            <option key={g.id} value={g.id}>{g.ad}</option>
          ))}
        </select>
        <button type="submit">Ekle</button>
      </form>

      <h2>Kayıtlar</h2>
      <table border="1" cellPadding="6" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Ad</th><th>Açıklama</th><th>Bağlantı</th><th>Yıl</th><th>Saat</th><th>Kategori</th><th>Durum</th><th>İşlem</th>
          </tr>
        </thead>
        <tbody>
          {hobiler.map((h) => (
            <tr key={h.id}>
              <td>{h.ad} <a href={`/admin/hobiler/${h.id}`}>(düzenle)</a></td>
              <td>{h.aciklama}</td>
              <td>
                {h.baglanti && h.baglanti.startsWith('https://') && (
                  <a href={h.baglanti} target="_blank" rel="noopener noreferrer">Aç</a>
                )}
              </td>
              <td>{h.baslama_yili}</td>
              <td>{h.haftalik_saat}</td>
              <td>{h.kategori}</td>
              <td>{h.yayinda ? 'Yayında' : 'Yayında değil'}</td>
              <td>
                <form action={yayinDegistir} style={{ display: 'inline' }}>
                  <input type="hidden" name="id" value={h.id} />
                  <button type="submit">{h.yayinda ? 'Yayından kaldır' : 'Yayınla'}</button>
                </form>
                {' '}
                <form action={hobiSil} style={{ display: 'inline' }}>
                  <input type="hidden" name="id" value={h.id} />
                  <button type="submit">Sil</button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}