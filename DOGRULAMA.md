# Teslim ve doğrulama

## Uygulanan marka bilgileri

Barış Gayrimenkul; Karaman Merkez. Koyu zemin, beyaz tipografi ve gönderilen logonun beyaz görünümü. Altın vurgular kaldırıldı. WhatsApp'ın işlevsel yeşil rengi korundu.

Telefon/WhatsApp: 0534 647 42 70. E-posta: ahmetasal206@gmail.com. Ofis: Fenari Mahallesi, Şht. Zafer Ak Cd. 7/C, 70100 Karaman Merkez / Karaman. Kullanıcının ofis harita bağlantısı eklendi.

Çalışma saatleri: hafta içi 09:00–19:00; cumartesi 09:00–18:35; pazar kapalı. Kullanıcının ilk ve takip yanıtları birlikte yorumlandı. Sloganlar: Emlakta güvenilir nokta; Hayallerinizi gerçekleştiriyoruz.

Hizmetler: gayrimenkul alımı, satışı, kiralama ve danışmanlık. Doğrulanmayan ücretsiz değerleme, hukuk hizmeti ve portföy yönetimi iddiaları kaldırıldı.

## İçerik

Paylaşılan mahalle listesinde 63 kaynak kaydı ve 58 farklı isim bulundu. Kaynak kimlikleri korunur; aynı adlı kayıtlar arayüzde tek isimle gösterilir. Resmi idari doğrulama iddiası yoktur. Türkçe karakterlere toleranslı arama, mahalle bazlı WhatsApp mesajı ve ilan filtresi eklendi.

Gerçek ilan sağlanmadığından örnek ilanlar ve olmayan ekip fotoğrafları kaldırıldı. Uydurma çalışanlar, yorumlar ve başarı rakamları yayımlanmıyor. Yeni ilanlar için tipler ve filtreler hazır; teslimde gerçek ilan/galeri bulunmadığından dolu portföy ve ilan detay etkileşimi test edilmiş sayılmaz.

## Geçen kontroller

- Düzeltilmiş kilit dosyasıyla npm ci başarılı.
- ESLint ve TypeScript kontrolleri başarılı; son production build derleme sırasında ikisini de yeniden çalıştırdı.
- Üretim derlemesi başarılı; Google Fonts erişimine ihtiyaç kalmadı, fontlar yerel.
- Üretim sunucusu üzerinde gerçek Chromium ile yedi kontrol grubu başarılı: marka ve yerel iletişim, 58 mahalle ve Türkçe arama, iki dilin sayfaları, mahalle seçimi/boş portföy/filtre sıfırlama, form doğrulaması ve WhatsApp mesaj hazırlama, mobil menü/dil değişimi/320–1440 genişlik taşma kontrolü, statik varlıklar/robots/sitemap/manifest/404.
- Form kontrolünde window.open yakalandı; WhatsApp'a gerçek mesaj gönderilmedi.
- Tarayıcı pageerror kaydı boş.
- Ofis adresi, çalışma saatleri ve JSON-LD adres/saatleri ayrıca kontrol edildi.
- TR/EN 242 çeviri anahtarı eşleşiyor; kullanılan görsel yollarında eksik dosya yok.
- Masaüstü ve mobil ekran görüntüleri alınıp görsel olarak incelendi.

## Kalanlar

Gerçek alan adı ve sosyal hesaplar sağlanmadı; alan adı yokken noindex/robots ile indeksleme kapalı. Gerçek ilanları eklemek ve yayından önce NEXT_PUBLIC_SITE_URL ayarlayıp yeniden derlemek gerekiyor. Site GitHub'a gönderilmedi ve internette yayımlanmadı.

Kaynak projedeki npm audit taraması 1 kritik, 9 yüksek, 3 orta olmak üzere 13 etkilenen paket bildirdi. Framework ana sürümleri bu marka çalışmasında yükseltilmedi; bu bulgular giderilmiş sayılmaz. İnternete açık yayından önce bağımlılık güvenlik güncellemesi ve uyumluluk doğrulaması gerekiyor. Başarılı derleme güvenlik onayı değildir.

Bu ZIP node_modules, .next, gizli değerler ve .git içermez. README kurulum ve içerik yönetimini açıklar; font lisansı pakettedir.
