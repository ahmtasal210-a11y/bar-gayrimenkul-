Bu belge özgün ZIP için kişiselleştirme öncesi incelemedir. Son durum için DOGRULAMA.md dosyasına bakın.

# Aksipal ZIP incelemesi ve kişiselleştirme kapsamı

## İncelenen kaynak

Yüklenen `aksipal-emlak.com-main.zip`: 119 arşiv girdisi, yaklaşık 12,1 MB açılmış içerik. Dosyalar `/workspace/brand-customization/aksipal-emlak.com-main` altında açıldı. Önceki depodaki silme çalışmasından ayrı tutuldu. Arşivdeki dosyalar, daha önce incelenen `f3b966d` commit'indeki dosyalarla birebir aynı.

Arşivdeki `doc` dosyası eski bir site üretim prompt'u; mevcut kullanıcının talimatı olarak uygulanmadı. README ve kaynak kod, mevcut işleyişi anlamak için incelendi.

## Site ne içeriyor?

- Next.js 14.2.35, React 18, TypeScript, Tailwind CSS, Framer Motion ve next-intl.
- Ana sayfa, hakkımızda, hizmetler, ilanlar, ilan detayı ve iletişim sayfaları.
- Türkçe varsayılan dil; İngilizce `/en` altında. Türkçe ve İngilizce çevirilerde 264'er anahtar var, anahtar farkı yok.
- 10 örnek ilan; satılık/kiralık, mülk tipi, il, oda, fiyat ve metrekare filtreleri. Filtreler istemci tarafında anlık çalışıyor.
- İlan galerisi, benzer ilanlar, telefon ve ilana özel WhatsApp bağlantıları.
- İletişim formunda Zod doğrulaması. Form WhatsApp için mesaj hazırlıyor; veritabanına kaydetmiyor, e-posta göndermiyor. Kullanıcının WhatsApp'ta gönderimi tamamlaması gerekiyor.
- Koyu tema ve altın vurgu rengi; Sora ve Inter fontları; hareketli başlık ve kartlar.
- Sayfa metadata, canonical/hreflang, sosyal paylaşım kartları, JSON-LD, sitemap, robots ve manifest.
- Ayrı backend, API uçları, yönetim paneli, üyelik ve ilan yükleme arayüzü yok. İlanlar kaynak dosyasından düzenleniyor.

## Yayın öncesinde çözülmesi gerekenler

1. **Marka ve iletişim bilgileri şablon.** `lib/config.ts` içinde örnek telefon, WhatsApp, adres, koordinatlar ve sosyal hesaplar var. Bunların gerçek marka bilgileriyle değiştirilmesi gerekiyor.
2. **İlan ve ekip görselleri eksik.** Kaynak kodda kullanılan 23 görsel bulunmuyor: 19 ilan görseli ve dört ekip fotoğrafı. SafeImage yedek görünüm sağlıyor; gerçek fotoğrafın yerini tutmuyor.
3. **İddialar doğrulanmamış.** 1200 satılan mülk, 950 müşteri, 18 yıl deneyim ve 240 aktif ilan değerleri sabit. Dosyada yalnızca 10 örnek ilan var. Ekip isimleri, yorumlar ve şirket hikayesi gerçek bilgilerle doğrulanmalı veya yayında gösterilmemeli.
4. **Tekrarlanabilir kurulum sorunu.** Mevcut kilit dosyasıyla npm ci, npm 10 ve 11'de @emnapi bağımlılık tutarsızlığı veriyor. Dosyaları değiştirmeyen `npm install --package-lock=false` kurulumu çalışıyor; tam kilitli çözüm sağlamıyor. Kod düzenleme aşamasında lockfile onarılıp npm ci yeniden doğrulanmalı.
5. **Üretim derlemesi ağ erişimine bağlı.** Aynı kaynakların önceki çalıştırmasında Google Fonts erişimi 403 ile engellendi ve build başarısız oldu. Geliştirme sunucusu yedek fontlarla sayfa sunabildi. Bu ZIP için yeni bir başarılı üretim derlemesi iddiası yok. Çözüm: Google Fonts ağ erişimini düzeltmek veya lisanslı fontları yerel barındırmak.

## Kod incelemesinde görülen iyileştirmeler

- **Bağımlılık güvenlik taraması:** `npm audit --json --package-lock=false --cache /workspace/.npm-cache` 13 etkilenen paket bildirdi: 1 kritik, 9 yüksek, 3 orta. Next.js kritik olarak işaretlendi; Tailwind, Next ESLint ve dolaylı bağımlılıklarda da bulgular var. Bunlar npm advisory sonuçlarıdır; her bildirimin bu uygulamadaki istismar edilebilirliği ayrıca değerlendirilmelidir. npm'in önerdiği çözümlerin bir kısmı ana sürüm yükseltmesi içerdiğinden körlemesine `audit fix --force` çalıştırılmadı. Ham sonuç `dependency-audit.json` dosyasında. Yayın öncesi desteklenen güvenli sürümlere geçiş ve davranış testleri planlanmalı.

- Galeri lightbox'ında Escape ve ok tuşu işleyicisi, dialog semantiği ve odak yönetimi bulunmuyor. Mobil menü Escape'i destekliyor; odak hapsetme ve odağı tetikleyiciye döndürme eklenmeli. README'deki kapsamlı klavye desteği iddiası mevcut kodun önünde.
- Bazı erişilebilirlik etiketleri, 404 ekranı ve görsel yedeği Türkçe veya marka adıyla sabit yazılmış. İngilizce deneyimi ve marka değişimi için merkezileştirilmeli.
- CSS reduced-motion kuralları var; Framer Motion JS animasyonlarında ayrıca useReducedMotion/MotionConfig uygulanması değerlendirilmeli. Tam hareket azaltma desteği doğrulanmış değil.
- 404 sayfasında eski turkuaz vurgu rengi kalmış; diğer sayfalardaki altın paletle tutarsız.
- JSON-LD çalışma saatleri config'teki saatlerden bağımsız sabit yazılmış; marka ayarları değişince iki bölümün çelişmemesi sağlanmalı.
- JSON-LD JSON.stringify çıktısı doğrudan script içine yazılıyor. Mevcut veri geliştirici kontrollü; gelecekte dış kaynaklı veri eklenecekse `<` karakteri kaçırılarak script kapatma riski önlenmeli.
- Sitemap Türkçe URL'leri ayrı girdiler olarak, İngilizce URL'leri alternatifler olarak sunuyor. İngilizce sayfaları da ayrı sitemap girdileri yapmak değerlendirilmeli. Son güncelleme tarihi sabit.
- Beş hero PNG toplam yaklaşık 10,6 MB. Next Image optimizasyonu mevcut; kaynak boyutlarını WebP/AVIF ile azaltmak yararlı olabilir. Ölçülmüş Lighthouse veya Core Web Vitals skoru yok.
- Ana sayfa arka planlarında negatif z-index var; kişiselleştirmede gerçek tarayıcıda katman görünürlüğü ve mobil kırılımlar kontrol edilmeli. Bu olası sorun görsel olarak doğrulanmadı.
- İletişim formunda sunucu teslimatı yok; WhatsApp penceresi açılamadığında alternatif bağlantı verilmesi yararlı olur. KVKK/aydınlatma içeriği görünmüyor; kullanılacak iletişim akışına uygun marka metni sağlanmalı.
- Otomatik test komutu tanımlı değil. Lint/typecheck geçmesi, galeri/filtre/form etkileşimlerinin tarayıcıda test edildiği anlamına gelmiyor.

## Kişiselleştirilecek dosyalar

| Alan | Dosyalar |
| --- | --- |
| Marka, iletişim, bölge, istatistikler | `lib/config.ts` |
| TR/EN başlıklar, şirket hikayesi, hizmetler, SEO | `messages/tr.json`, `messages/en.json` |
| Renk, yazı karakteri, hareket | `tailwind.config.ts`, `app/globals.css`, locale layout ve ilgili bileşenler |
| Logo, favicon, uygulama ve paylaşım görselleri | `public/logo`, `public/favicon`, `public/app-icons`, `public/social` |
| İlanlar ve referans kodları | `data/listings.ts`, `public/images/listings` |
| Ekip | Hakkımızda sayfası, çeviriler ve `public/images/team` |
| Schema, sitemap, manifest ve 404 | İlgili `app` dosyaları ve `components/seo/JsonLd.tsx` |
| Sabit kalan eski marka ve renkler | SafeImage, SpotlightCard, 404 ve SVG dosyaları dahil tüm proje taraması |

## Doğrulama sonucu

ZIP kopyasında bağımlılık kurulumu tamamlandı. `npm run lint` hatasız, `npm run typecheck` başarılı. İki dilin çeviri anahtarları karşılaştırıldı ve görsel dosya referansları kontrol edildi. ZIP ile önceki kaynak commit'i dosya düzeyinde karşılaştırıldı.

Önceki aynı kaynak kopyasında ana sayfa TR/EN, ilan listesi TR/EN, iletişim ve sitemap yerel HTTP istekleriyle 200 döndürmüştü; bunlar bu ZIP üzerinde yeni bir tarayıcı testi olarak sunulmuyor. Tarayıcı etkileşimleri, mobil görünüm, üretim derlemesi ve performans ölçümü kişiselleştirme sonrasında doğrulanmalı.

## Eksik marka girdisi

Kullanıcıdan marka adı, renk/slogan, hizmet bölgesi, gerçek iletişim bilgileri ve varsa logo istendi. Önceki boş depo adından kesin marka kimliği çıkarılmadı. Yanıt gelmeden şirket adı, adres, telefon, başarı rakamı veya müşteri yorumu uydurulmadı. İnceleme tamamlandı; marka uygulaması bu bilgilere bağlı.
