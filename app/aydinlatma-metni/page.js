export const metadata = { title: 'Aydınlatma Metni' };

export default function AydinlatmaMetni() {
  return (
    <main style={{ padding: 20, maxWidth: 700, margin: '0 auto', lineHeight: 1.6 }}>
      <p><a href="/iletisim">← İletişim formuna dön</a></p>
      <h1>Kişisel Verilerin İşlenmesine İlişkin Aydınlatma Metni</h1>
      <p>
        Bu metin, 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) md. 10 ile
        Aydınlatma Yükümlülüğünün Yerine Getirilmesinde Uyulacak Usul ve Esaslar
        Hakkında Tebliğ kapsamında hazırlanmıştır.
      </p>

      <h2>1. Veri sorumlusunun kimliği</h2>
      <p>
        Veri sorumlusu Melisa Karakoç’tur (Manisa Celal Bayar Üniversitesi, BVA 2205
        dersi kapsamında hazırlanan kişisel portfolyo sitesi). İletişim: melomelisa07@gmail.com
      </p>

      <h2>2. İşlenen kişisel veriler ve işleme amaçları</h2>
      <p>
        İletişim formunda paylaştığınız ad soyad, e-posta adresi ve mesaj içeriği
        işlenmektedir. Bu veriler yalnızca mesajınızı almak, okumak ve gerekirse size
        yanıt vermek amacıyla işlenir. Ayrıca spam ve kötüye kullanımı önlemek için
        aynı e-posta adresinden gönderilen mesaj sayısı ve gönderim zamanı kaydedilir.
      </p>

      <h2>3. Verilerin kimlere ve hangi amaçla aktarılabileceği</h2>
      <p>
        Verileriniz üçüncü kişilerle pazarlama amacıyla paylaşılmaz. Sitenin
        çalışması için kullanılan altyapı sağlayıcılarına teknik zorunluluk
        nedeniyle aktarılır: veritabanı hizmeti sağlayıcısı Neon (verilerin
        saklanması amacıyla) ve barındırma hizmeti sağlayıcısı Vercel (sitenin
        yayınlanması ve çalıştırılması amacıyla). Bu sağlayıcıların sunucuları
        yurt dışında bulunabileceğinden, verileriniz yurt dışına aktarılabilir.
        Yasal bir zorunluluk doğarsa yetkili kamu kurumlarıyla paylaşım yapılabilir.
      </p>

      <h2>4. Toplama yöntemi ve hukuki sebebi</h2>
      <p>
        Verileriniz, sitedeki iletişim formunun doldurulup gönderilmesiyle
        otomatik yolla toplanır. İşlemenin hukuki sebebi KVKK md. 5/2-f uyarınca
        ilgili kişinin temel hak ve özgürlüklerine zarar vermemek kaydıyla veri
        sorumlusunun meşru menfaatleri için veri işlenmesinin zorunlu olmasıdır.
      </p>

      <h2>5. İlgili kişinin hakları (KVKK md. 11)</h2>
      <p>Veri sahibi olarak şu haklara sahipsiniz:</p>
      <ul>
        <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme,</li>
        <li>İşlenmişse buna ilişkin bilgi talep etme,</li>
        <li>İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme,</li>
        <li>Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme,</li>
        <li>Eksik veya yanlış işlenmişse düzeltilmesini isteme,</li>
        <li>KVKK md. 7 kapsamında silinmesini veya yok edilmesini isteme,</li>
        <li>Düzeltme ve silme işlemlerinin aktarılan üçüncü kişilere bildirilmesini isteme,</li>
        <li>İşlenen verilerin otomatik sistemlerle analiz edilmesi sonucu aleyhinize bir sonuç çıkmasına itiraz etme,</li>
        <li>Kanuna aykırı işlenmesi nedeniyle zarara uğrarsanız zararın giderilmesini talep etme.</li>
      </ul>
      <p>
        Bu haklarınızı kullanmak için yukarıdaki e-posta adresine başvurabilirsiniz.
      </p>
    </main>
  );
}