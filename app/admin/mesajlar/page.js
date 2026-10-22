import { sql } from '../../../lib/db';
import { oturumKontrol } from '../../../lib/oturum';
import { okunduIsaretle, mesajSil } from './actions';

export const dynamic = 'force-dynamic';

export default async function Mesajlar() {
  await oturumKontrol();

  const mesajlar = await sql`
    SELECT id, ad_soyad, eposta, mesaj, okundu, gonderim_zamani
    FROM iletisim_mesajlari
    ORDER BY gonderim_zamani DESC`;

  return (
    <main style={{ padding: 20 }}>
      <p><a href="/admin">← Panele dön</a></p>
      <h1>Mesajlar</h1>
      {mesajlar.length === 0 && <p>Henüz mesaj yok.</p>}
      {mesajlar.map((m) => (
        <div
          key={m.id}
          style={{ border: '1px solid #888', padding: 10, marginBottom: 10, maxWidth: 600 }}
        >
          <p>
            <strong>{m.ad_soyad}</strong> ({m.eposta}) {' '}
            {m.okundu ? '✔ Okundu' : '● Okunmadı'}
          </p>
          <p>{m.mesaj}</p>
          <p style={{ fontSize: 12 }}>
            {new Date(m.gonderim_zamani).toLocaleString('tr-TR')}
          </p>
          {!m.okundu && (
            <form action={okunduIsaretle} style={{ display: 'inline' }}>
              <input type="hidden" name="id" value={m.id} />
              <button type="submit">Okundu işaretle</button>
            </form>
          )}{' '}
          <form action={mesajSil} style={{ display: 'inline' }}>
            <input type="hidden" name="id" value={m.id} />
            <button type="submit">Sil</button>
          </form>
        </div>
      ))}
    </main>
  );
}