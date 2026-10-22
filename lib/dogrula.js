export function epostaGecerliMi(e) {
  return (
    typeof e === 'string' &&
    e.length <= 200 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)
  );
}

export function uzunlukAraliginda(metin, min, max) {
  return typeof metin === 'string' && metin.length >= min && metin.length <= max;
}

export function httpsIleBasliyorMu(url) {
  return typeof url === 'string' && url.startsWith('https://');
}