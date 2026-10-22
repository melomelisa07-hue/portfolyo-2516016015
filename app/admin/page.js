import { sql } from '../../lib/db';
import { oturumKontrol } from '../../lib/oturum';
import { cikisYap } from './actions';

export const dynamic = 'force-dynamic';

export default async function Admin() {
  await oturumKontrol();

  const [{ okunmamis }] = await sql`SELECT COUNT(*)::int AS okunmamis FROM iletisim_mesajlari WHERE okundu = false`;
  const [{ hobi }] = await sql`SELECT COUNT(*)::int AS hobi FROM hobiler`;

  return (
    <main style={{ padding: 20 }}>
      <h1>Yönetim Paneli</h1>
      <p>Okunmamış mesaj sayısı: {okunmamis}</p>
      <p>Toplam hobi sayısı: {hobi}</p>
      <p>
        <a href="/admin/hobiler">Hobiler</a> | <a href="/admin/mesajlar">Mesajlar</a>
      </p>
      <form action={cikisYap}>
        <button type="submit">Çıkış yap</button>
      </form>
    </main>
  );
}