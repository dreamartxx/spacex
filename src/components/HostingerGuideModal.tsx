import React, { useState } from 'react';
import { X, Server, Github, Database, Check, Copy, ExternalLink, Terminal, Shield, ArrowRight } from 'lucide-react';
import { playSound } from '../utils/sound';

interface HostingerGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HostingerGuideModal: React.FC<HostingerGuideModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'github_actions' | 'hostinger_git' | 'database'>('github_actions');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, key: string) => {
    playSound('click');
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const workflowCode = `name: Hostinger Otomatik Yayinlama (CI/CD)

on:
  push:
    branches: [ main, master ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm install
      - run: npm run build
      - uses: SamKirkland/FTP-Deploy-Action@v4.3.5
        with:
          server: \${{ secrets.HOSTINGER_FTP_SERVER }}
          username: \${{ secrets.HOSTINGER_FTP_USERNAME }}
          password: \${{ secrets.HOSTINGER_FTP_PASSWORD }}
          protocol: ftp
          port: 21
          local-dir: ./dist/
          server-dir: public_html/`;

  const htaccessCode = `<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^ index.html [L]
</IfModule>`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden my-8">
        
        {/* Modal Top Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/30">
              <Server className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">
                Hostinger & GitHub Otomatik Yayınlama ve Veritabanı Kurulumu
              </h2>
              <p className="text-xs text-slate-400">
                Kodlar GitHub’a push edildiğinde Hostinger’da otomatik yayına alınması için tam yapılandırma
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              playSound('click');
              onClose();
            }}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Tabs inside modal */}
        <div className="flex border-b border-slate-800 bg-slate-950/40 px-6 gap-2 pt-2">
          <button
            onClick={() => {
              playSound('click');
              setActiveTab('github_actions');
            }}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'github_actions'
                ? 'border-sky-400 text-sky-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Github className="h-4 w-4" />
            <span>Yöntem 1: GitHub Actions (Önerilen)</span>
          </button>

          <button
            onClick={() => {
              playSound('click');
              setActiveTab('hostinger_git');
            }}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'hostinger_git'
                ? 'border-sky-400 text-sky-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Server className="h-4 w-4" />
            <span>Yöntem 2: Hostinger Git Entegrasyonu</span>
          </button>

          <button
            onClick={() => {
              playSound('click');
              setActiveTab('database');
            }}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'database'
                ? 'border-sky-400 text-sky-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Database className="h-4 w-4" />
            <span>Hostinger MySQL Veritabanı Kurulumu</span>
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          
          {/* TAB 1: GITHUB ACTIONS (RECOMMENDED) */}
          {activeTab === 'github_actions' && (
            <div className="space-y-6 text-xs text-slate-300">
              <div className="p-4 rounded-xl bg-sky-950/30 border border-sky-800/40 text-sky-200">
                <span className="font-bold text-sky-300 text-sm block mb-1">
                  ✓ Hazırlanan Altyapı:
                </span>
                Projenizde <code>.github/workflows/deploy.yml</code> ve <code>public/.htaccess</code> dosyaları eksiksiz oluşturulmuştur. GitHub’a kod gönderdiğiniz (push) her an proje otomatik derlenir ve Hostinger’a yüklenir!
              </div>

              {/* Step by step */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sky-500 text-slate-950 font-bold shrink-0 font-mono">
                    1
                  </span>
                  <div>
                    <h3 className="font-bold text-white text-sm">Hostinger’dan FTP Bilgilerinizi Alın:</h3>
                    <p className="text-slate-400 mt-0.5">
                      Hostinger hPanel panelinize girin: <strong>Web Siteleri → Yönet → Dosyalar → FTP Hesapları</strong> sayfasına gidin.
                    </p>
                    <ul className="list-disc list-inside mt-1.5 text-slate-400 space-y-0.5 font-mono">
                      <li>FTP Sunucusu (Örn: <code>ftp.siteadiniz.com</code> veya IP adresi)</li>
                      <li>FTP Kullanıcı Adı (Örn: <code>u123456789</code>)</li>
                      <li>FTP Şifreniz</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sky-500 text-slate-950 font-bold shrink-0 font-mono">
                    2
                  </span>
                  <div>
                    <h3 className="font-bold text-white text-sm">GitHub Secrets (Gizli Anahtarlar) Ekleyin:</h3>
                    <p className="text-slate-400 mt-0.5">
                      GitHub reponuza gidin: <strong>Settings → Secrets and variables → Actions → New repository secret</strong> butonuna tıklayarak aşağıdaki 3 anahtarı ekleyin:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2 font-mono">
                      <div className="bg-slate-950 p-2.5 rounded border border-slate-800">
                        <span className="text-amber-400 block font-bold">HOSTINGER_FTP_SERVER</span>
                        <span className="text-slate-400 text-[11px]">FTP sunucu adresi</span>
                      </div>
                      <div className="bg-slate-950 p-2.5 rounded border border-slate-800">
                        <span className="text-amber-400 block font-bold">HOSTINGER_FTP_USERNAME</span>
                        <span className="text-slate-400 text-[11px]">FTP kullanıcı adı</span>
                      </div>
                      <div className="bg-slate-950 p-2.5 rounded border border-slate-800">
                        <span className="text-amber-400 block font-bold">HOSTINGER_FTP_PASSWORD</span>
                        <span className="text-slate-400 text-[11px]">FTP şifresi</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sky-500 text-slate-950 font-bold shrink-0 font-mono">
                    3
                  </span>
                  <div>
                    <h3 className="font-bold text-white text-sm">Kodları GitHub’a Gönderin (Otomatik Tetikleme):</h3>
                    <p className="text-slate-400 mt-0.5">
                      Terminalinizde şu komutları çalıştırıp GitHub’a push ettiğinizde yayın anında başlar:
                    </p>
                    <div className="mt-2 bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-emerald-400 flex items-center justify-between">
                      <code>git add . && git commit -m "Gök Atlası güncelleme" && git push origin main</code>
                      <button
                        onClick={() => copyToClipboard('git add . && git commit -m "Gök Atlası güncelleme" && git push origin main', 'git_cmd')}
                        className="p-1 hover:text-white"
                      >
                        {copiedKey === 'git_cmd' ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ready Workflow Code Preview */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-semibold text-white">Hazırlanan .github/workflows/deploy.yml Dosyası:</span>
                  <button
                    onClick={() => copyToClipboard(workflowCode, 'workflow_code')}
                    className="flex items-center gap-1 text-sky-400 hover:text-sky-300 font-mono text-[11px]"
                  >
                    {copiedKey === 'workflow_code' ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                    <span>Kodu Kopyala</span>
                  </button>
                </div>
                <pre className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 font-mono text-[11px] text-slate-300 overflow-x-auto">
                  {workflowCode}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 2: HOSTINGER DIRECT GIT */}
          {activeTab === 'hostinger_git' && (
            <div className="space-y-5 text-xs text-slate-300">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <h3 className="font-bold text-white text-sm mb-1">Hostinger hPanel Git Modülü ile Yayınlama:</h3>
                <p className="text-slate-400 leading-relaxed">
                  Eğer GitHub Actions yerine doğrudan Hostinger’ın kendi Git aracını kullanmak isterseniz:
                </p>
                <ol className="list-decimal list-inside space-y-2 mt-3 text-slate-300">
                  <li>Hostinger hPanel’e girin: <strong>Gelişmiş → Git</strong> seçeneğini açın.</li>
                  <li>GitHub Deponuzun URL’sini (örn: <code>https://github.com/kullanici/gok-atlasi.git</code>) girin.</li>
                  <li>Dal (Branch) olarak <code>main</code> seçin ve <strong>Oluştur</strong> butonuna basın.</li>
                  <li>Hostinger size bir <strong>Otomatik Dağıtım Webhook URL’si</strong> verecektir.</li>
                  <li>GitHub Deponuzda <strong>Settings → Webhooks → Add webhook</strong> diyerek bu URL’yi yapıştırın.</li>
                  <li>Artık her <code>git push</code> yaptığınızda Hostinger depoyu otomatik çeker!</li>
                </ol>
              </div>

              {/* .htaccess reminder */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="font-bold text-amber-300 block">
                  Sayfa Yenilendiğinde 404 Hatası Almamak İçin (.htaccess):
                </span>
                <p className="text-slate-400">
                  React Tek Sayfa Uygulamalarında (SPA) tarayıcı yenilendiğinde Hostinger Apache sunucusunun <code>index.html</code> dosyasını sunması için projenin <code>public/.htaccess</code> dosyası hazır eklenmiştir:
                </p>
                <pre className="bg-slate-900 p-3 rounded font-mono text-[11px] text-amber-200 overflow-x-auto">
                  {htaccessCode}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 3: HOSTINGER DATABASE (MYSQL) */}
          {activeTab === 'database' && (
            <div className="space-y-5 text-xs text-slate-300">
              <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-800/40 text-emerald-200">
                <span className="font-bold text-emerald-300 text-sm block mb-1">
                  Veritabanı Dosyaları Hazır:
                </span>
                Projenizde <code>database/schema.sql</code> ve <code>database/api.php</code> dosyaları hazır oluşturulmuştur. Öğrenci puanları ve sınav sonuçları Hostinger MySQL veritabanında saklanır.
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-slate-950 font-bold shrink-0 font-mono">
                    1
                  </span>
                  <div>
                    <h3 className="font-bold text-white text-sm">Hostinger’da MySQL Veritabanı Oluşturun:</h3>
                    <p className="text-slate-400 mt-0.5">
                      hPanel → <strong>Veritabanları → MySQL Veritabanları</strong> sekmesine gidin.
                    </p>
                    <p className="text-slate-400 mt-1">
                      Örn: Veritabanı Adı: <code>u123_gokatlasi</code>, Kullanıcı: <code>u123_admin</code> ve güçlü bir şifre belirleyin.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-slate-950 font-bold shrink-0 font-mono">
                    2
                  </span>
                  <div>
                    <h3 className="font-bold text-white text-sm">phpMyAdmin ile Tabloları İçe Aktarın (Import):</h3>
                    <p className="text-slate-400 mt-0.5">
                      phpMyAdmin’e girin, projedeki <code>database/schema.sql</code> dosyasını açıp içindeki SQL kodlarını yapıştırarak çalıştırın (veya İçe Aktar ile yükleyin). <code>students</code>, <code>quiz_results</code> ve <code>game_scores</code> tabloları anında oluşur.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-slate-950 font-bold shrink-0 font-mono">
                    3
                  </span>
                  <div>
                    <h3 className="font-bold text-white text-sm">api.php Dosyasını Hostinger’a Yükleyin:</h3>
                    <p className="text-slate-400 mt-0.5">
                      Projedeki <code>database/api.php</code> dosyasındaki veritabanı adı ve şifresini güncelleyip Hostinger Dosya Yöneticisi ile <code>public_html/api.php</code> olarak yükleyin.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Bottom Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between text-xs text-slate-400">
          <span>Tüm yapılandırma dosyaları projenizin kök dizininde hazırdır.</span>
          <button
            onClick={() => {
              playSound('click');
              onClose();
            }}
            className="px-5 py-2 text-xs font-semibold text-slate-950 bg-sky-400 hover:bg-sky-300 rounded-lg transition-colors"
          >
            Anladım, Kapat
          </button>
        </div>

      </div>
    </div>
  );
};
