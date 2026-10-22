import { girisYap } from './actions';

export default async function Giris({ searchParams }) {
  const { hata } = await searchParams;

  return (
    <main style={{ padding: 20, maxWidth: 400 }}>
      <h1>Yönetici Girişi</h1>
      {hata && <p style={{ color: 'red' }}>E-posta veya şifre hatalı</p>}
      <form action={girisYap} style={{ display: 'grid', gap: 10 }}>
        <input name="eposta" type="email" placeholder="E-posta" required maxLength={200} />
        <input name="sifre" type="password" placeholder="Şifre" required maxLength={200} />
        <button type="submit">Giriş yap</button>
      </form>
    </main>
  );
}