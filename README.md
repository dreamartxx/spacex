# Gök Atlası - Güneş Sistemi ve Gezegenler Eğitim Portalı

Ortaokul (5, 6, 7 ve 8. sınıf) öğrencileri için MEB Fen Bilimleri müfredatına tam uyumlu, interaktif ve modern astronomi eğitim platformu.

## 🚀 Özellikler ve Modüller

1. **Güneş ve Katmanları**:
   - İnteraktif katman kesiti: Çekirdek (15.000.000 °C), Işınım Bölgesi, Konveksiyon Bölgesi, Fotosfer (Işık Küre & Güneş Lekeleri), Kromosfer (Renk Küre) ve Korona (Taç Küre).
   - Güneş patlamaları ve diferansiyel dönme simülatörü.
2. **Güneş Sistemi Gezegenleri ve Uyduları**:
   - 8 Gezegen (Merkür, Venüs, Dünya, Mars, Jüpiter, Satürn, Uranüs, Neptün) ve Cüce Gezegen Plüton.
   - Gerçek Kepler oranlı HTML5 Canvas interaktif yörünge simülatörü (Hız ayarı, durdurma, yörünge takibi).
   - "Gezegenlerde Kaç Kilosun?" Yerçekimi ve zıplama hesaplayıcısı.
   - İki gezegeni yan yana kıyaslama aracı.
   - Uydular: Ay, Phobos, Deimos, Ganymede, Titan, Io, Europa, Callisto, Enceladus, Triton vb.
3. **Dünya’nın Katmanları**:
   - İç Yapısal Katmanlar (Yer Küre / Jeosfer): Yer Kabuğu (Litosfer - Sial/Sima), Manto (Astenosfer), Dış Çekirdek (Sıvı Demir-Nikel), İç Çekirdek (Katı Demir-Nikel, 6000 °C).
   - Atmosfer Katmanları (Hava Küre): Troposfer, Stratosfer (Ozon Tabakası), Mezosfer (Gök Taşı Kalkanı), Termosfer (Kutup Işıkları - Aurora), Ekzosfer (Yapay Uydular).
4. **Ay’ın Evreleri ve Tutulmalar**:
   - 360° dönebilen interaktif simülatör (Uzaydan görünüm vs Dünya’dan görünüm).
   - 4 Ana Evre (Yeni Ay, İlk Dördün, Dolunay, Son Dördün) ve 4 Ara Evre (Hilaller, Şişkin Aylar).
   - Güneş Tutulması (G-A-D) ve Ay Tutulması (G-D-A) modelleri ve göz güvenliği rehberi.
5. **Uzay Oyunları**:
   - "Yörüngeye Diz": Gezegenleri Güneş'e olan uzaklıklarına göre yörüngelere yerleştirmece.
   - "Ay Evresi Avcısı": İpuçlarından doğru evreyi yakalama.
   - Canlı Liderlik Tablosu (Hall of Fame) ve rozetler.
6. **MEB Kazanımlı Sınavlar ve Başarı Sertifikası**:
   - Seviyelere göre testler, anında bilimsel açıklamalar ve MEB sınav şifreleri.
   - Sınav bitiminde öğrenci adına özel üretilen yüksek çözünürlüklü, yazdırılabilir ve indirilebilir **"Genç Astronom Başarı Sertifikası"**.

---

## 🌐 GitHub & Hostinger Otomatik Yayın Kurulumu (CI/CD)

Projenizde Hostinger ve GitHub otomatik yayınlama altyapısı hazır kurulmuştur:

### 1. Dosyalar:
- `.github/workflows/deploy.yml`: GitHub Actions otomatik derleme ve Hostinger FTP aktarma iş akışı.
- `public/.htaccess`: Hostinger Apache sunucusu için Single Page Application (SPA) yönlendirmesi ve GZIP hızlandırması.
- `database/schema.sql`: Hostinger MySQL veritabanı şeması.
- `database/api.php`: Hostinger PHP REST API scripti.

### 2. Adımlar:
1. **Hostinger FTP Bilgileri**: Hostinger hPanel -> Web Siteleri -> FTP Hesapları kısmından FTP Sunucu adresi, Kullanıcı Adı ve Şifrenizi alın.
2. **GitHub Secrets Ekleyin**: GitHub deponuzda `Settings -> Secrets and variables -> Actions -> New repository secret` sekmesine tıklayın ve 3 gizli anahtar tanımlayın:
   - `HOSTINGER_FTP_SERVER` (Örn: `ftp.siteadiniz.com` veya IP adresi)
   - `HOSTINGER_FTP_USERNAME` (Örn: `u123456789`)
   - `HOSTINGER_FTP_PASSWORD` (Hostinger FTP şifreniz)
3. **Tetikleme**: GitHub'a `main` branch'ine her `git push` yaptığınızda:
   - GitHub otomatik olarak `npm run build` çalıştırır.
   - Oluşan `dist/` klasörünü Hostinger sunucunuzdaki `public_html/` dizinine otomatik yükler.

### 3. Hostinger MySQL Veritabanı Bağlantısı:
1. Hostinger hPanel -> **Veritabanları -> MySQL Veritabanları** sayfasından yeni bir veritabanı ve kullanıcı oluşturun.
2. phpMyAdmin'e girip `database/schema.sql` dosyasını çalıştırın (İçe Aktar).
3. `database/api.php` dosyasındaki veritabanı kullanıcı adı ve şifresini yazıp Hostinger'da `public_html/api.php` olarak kaydedin.

---

## 💻 Yerel Geliştirme (Local Development)

```bash
# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev

# Üretim derlemesi oluşturun
npm run build
```
