# Barış Gayrimenkul — Karaman Merkez

Türkçe ve İngilizce destekli gayrimenkul tanıtım sitesi. Koyu zemin ve beyaz tipografi, kullanıcının sağladığı logodan hazırlanan şeffaf sürüm, mahalle araması ve WhatsApp iletişimi.

## İletişim

- Telefon: 0534 647 42 70
- WhatsApp: +90 534 647 42 70
- E-posta: ahmetasal206@gmail.com
- Hizmet bölgesi: Karaman Merkez

Ofis: Fenari Mahallesi, Şht. Zafer Ak Cd. 7/C, 70100 Karaman Merkez / Karaman. Kullanıcının ofis harita bağlantısı kullanılır. Hafta içi 09:00–19:00, cumartesi 09:00–18:35, pazar kapalı; sosyal hesaplar ve alan adı sağlanmadı. Hero görselleri temsilidir.

## Kurulum

Node 22 veya üzeri önerilir; çalışma Node 24/npm 11 ile doğrulandı.

```bash
npm ci
npm run dev -- --hostname 0.0.0.0
```

```bash
npm run lint
npm run typecheck
npm run build
npm start -- --hostname 0.0.0.0
```

Fontlar lisans metniyle public/fonts altında yerel sunulur; Google Fonts erişimi gerekmez. Üretim derlemesi sırasında geliştirme sunucusunu durdurun. Test sonuçları DOGRULAMA.md içindedir.

## Alan adı ve arama motorları

Gerçek alan adınız belli olduğunda .env.local dosyasına NEXT_PUBLIC_SITE_URL değişkenini, başında https:// olacak şekilde ekleyip yeniden derleyin. Bu değişken yoksa site yerel geliştirme adresini kullanır; metadata noindex ve robots disallow ile indeksleme kapalıdır. Alan adı uydurulmamıştır.

## Mahalleler

data/neighborhoods.ts paylaşılan 63 kaydı kaynak kimlikleriyle saklar. Listede 58 farklı mahalle adı vardır. Atatürk, Bahçelievler, Cumhuriyet, Fatih ve Hürriyet adları iki farklı kaynak kimliğiyle verilmiştir. Kimlikler korunur; aynı adın aynı idari bölgeyi gösterdiği varsayılmamıştır. Arayüz isim bazında bir kez gösterir. Liste resmi idari kayıtla bağımsız doğrulanmış değildir; başlıktaki 64 sayısı gerçek sayı kabul edilmemiştir.

Ana sayfada üst görselin hemen altında ilan arama filtreleri ve sonuç alanı bulunur. “İlanları Gör” düğmesi bu bölüme kaydırır. Aynı arama ilanlar sayfasında da kullanılabilir.

Mahalle listesi ana sayfada ayrı bir bölüm olarak gösterilmez; ilan arama filtresinde kullanılmaya devam eder. İlan filtresi location.neighborhood alanını kullanır. Ana sayfada “Öne Çıkanlar” ve “Fırsat Yerler” bölümleri bulunur. Gerçek ilanlarda featured: true öne çıkanlar, opportunity: true fırsatlar bölümüne seçilmesini sağlar.

## Gayrimenkul danışmanı

Ahmet Asal, ana sayfa ve Hakkımızda sayfasında “Gayrimenkul Danışmanı” unvanıyla yer alır. Profil görseli gönderilen fotoğraftan profil kullanımına uygun hazırlanmıştır. Bilgileri lib/config.ts içindeki advisor alanından, metinleri iki dilin advisor anahtarından düzenleyebilirsiniz.

## İlan ve içerik yönetimi

Hamidiye Mahallesi’ndeki 105 m² net, 2+1 ve 2.490.000 TL fiyatlı daire aktif ilan listesinde ve ana sayfanın Öne Çıkanlar bölümündedir. Verilmeyen banyo sayısı ve bina yaşı gösterilmez. Özgün fotoğraf dosyaları beklenirken görsel alanında “Bu ilanın fotoğrafları henüz eklenmedi” yazısı görünür. Önceki markanın örnek ilanları, müşteri yorumları ve başarı sayaçları kullanılmaz.

Doğrulanmış ilanları Listing tipine uygun ekleyin; gerçek fiyat, konum ve kullanım hakkınız bulunan fotoğrafları kullanın. Konum biçimi: { city: 'Karaman', district: 'Merkez', neighborhood: 'Abbas Mahallesi' }. Mahalle adını listedeki biçimiyle yazın. Galeri için en az bir görsel ekleyin. İlanlar eklenince kartlar, detay sayfaları ve sitemap yeniden derleme sırasında oluşur.

İletişim bilgileri lib/config.ts, metinler messages/tr.json ve messages/en.json, renkler tailwind.config.ts içindedir. Form mesajı WhatsApp'ta açar; kullanıcı göndermeden teslimat gerçekleşmez. E-posta gönderimi, veritabanı ve yönetim paneli yoktur.

## Teknik sınırlamalar

Kaynak bağımlılık taraması 13 etkilenen paket bildirdi; Next.js kritik olarak işaretlenmişti. Kişiselleştirmede framework ana sürümleri değiştirilmedi. İnternete açık yayından önce güvenli sürümlere geçiş ayrı bir uyumluluk çalışmasıyla tamamlanmalı. İşlevsel kontroller bütün güvenlik açıklarının giderildiği anlamına gelmez.

Kaynak ZIP'teki tutarsız lockfile bu kopyada güncellendi; kilitli kurulum tekrar doğrulanır. Tarayıcı kontrolleri gerçek Chromium üzerinden yürütülür; sonuçlar teslim raporunda belirtilir.

## Netlify

netlify.toml üretim derlemesini npm run build, çıktı dizinini .next ve Node sürümünü 24 olarak ayarlar. Netlify otomatik Next.js adaptörünü kullanmalıdır; bu uygulama basit bir statik klasör yüklemesi değildir. Üretim alan adı amazing-marshmallow-997f18.netlify.app olarak ayarlanmıştır.

GitHub reposunun main dalını Netlify projesine bağlayın ve son commit için yeni dağıtım çalıştırın. GitHub'a kod göndermek tek başına Netlify'da yeni sürümün yayımlandığını kanıtlamaz. Kontrolde Netlify adresi 401 ve oturum açma yönlendirmesi döndürdü; dışarıdan yayın sürümü doğrulanamadı. Koruma ayarları değiştirilmedi.
