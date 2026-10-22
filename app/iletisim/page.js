import { mesajGonder } from './actions';

const MESAJLAR = {
  ad: 'Ad soyad 2 ile 100 karakter arasında olmalı.',
  eposta: 'Geçerli bir e-posta adresi girin.',
  mesaj: 'Mesaj 10 ile 2000 karakter arasında olmalı.',
  onay: 'Devam etmek için aydınlatma metnini okuduğunuzu onaylamalısınız.',
  cok: 'Bu e-posta adresinden son 1 saatte en fazla 3 mesaj gönderilebilir. Lütfen daha sonra tekrar deneyin.',
  tamam: 'Mesajınız gönderildi, teşekkürler!',
};

export default async function Iletisim({ searchParams }) {
  const { durum } = await searchParams;
  const bilgi = MESAJLAR[durum];

  return (
    <main style={{ padding: 20, maxWidth: 500, margin: '0 auto' }}>
      <p><a href="/">← Ana sayfa</a></p>
      <h1>İletişim</h1>

      {bilgi && (
        <p style={{ color: durum === 'tamam' ? 'green' : 'red' }}>{bilgi}</p>
      )}

      <form action={mesajGonder} style={{ display: 'grid', gap: 10 }}>
        <input name="ad_soyad" placeholder="Ad soyad" required maxLength={100} />
        <input name="eposta" type="email" placeholder="E-posta" required maxLength={200} />
        <textarea name="mesaj" placeholder="Mesajınız" required maxLength={2000} rows={6} />
        <label>
          <input type="checkbox" name="kvkk_onay" required />{' '}
          <a href="/aydinlatma-metni" target="_blank">Aydınlatma metnini</a> okudum.
        </label>
        <button type="submit">Gönder</button>
      </form>
    </main>
  );
}