-- BVA 2205 - Melisa Karakoç - 2516016015
-- Bu dosya çalıştırılan sorguların kaydıdır. 3.6 ve 3.7 veriyi değiştirir/siler.

-- Görev 3.1
SELECT * FROM hobiler
WHERE haftalik_saat > 3 AND baslama_yili < 2020;

-- Görev 3.2
SELECT ad, haftalik_saat FROM hobiler
ORDER BY haftalik_saat DESC
LIMIT 3;

-- Görev 3.3
SELECT
  SUM(haftalik_saat) AS toplam_saat,
  AVG(EXTRACT(YEAR FROM CURRENT_DATE) - baslama_yili) AS ortalama_yil
FROM hobiler;

-- Görev 3.4
SELECT g.ad AS kategori, COUNT(h.id) AS hobi_sayisi
FROM hobi_gruplari g
LEFT JOIN hobiler h ON h.kategori_id = g.id
GROUP BY g.id, g.ad
ORDER BY g.ad;

-- Görev 3.5
SELECT * FROM hobiler
WHERE ad ILIKE '%2516016015%';

-- Görev 3.6
UPDATE hobiler
SET yayinda = false
WHERE haftalik_saat = 0;

-- Görev 3.7
DELETE FROM hobiler
WHERE aciklama IS NULL;

-- Görev 6: Son 24 saatte en çok mesaj gönderen 3 e-posta
SELECT eposta, COUNT(*) AS mesaj_sayisi
FROM iletisim_mesajlari
WHERE gonderim_zamani > now() - interval '24 hours'
GROUP BY eposta
ORDER BY mesaj_sayisi DESC
LIMIT 3;