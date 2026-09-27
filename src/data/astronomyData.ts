import { CelestialBody, SunLayer, EarthLayer, MoonPhase, EclipseInfo, QuizQuestion } from '../types/astronomy';

// ==================== GÜNEŞ & KATMANLARI ====================
export const sunData = {
  name: 'Güneş',
  title: 'Güneş Sistemi’nin Kalbi ve Yaşam Kaynağımız',
  type: 'Sarı Cüce Yıldız (G2V)',
  age: '4.6 Milyar Yıl',
  diameterKm: 1392700, // Dünyadan yaklaşık 109 kat
  massComparison: 'Dünya’nın yaklaşık 333.000 katı kütle (Tüm Güneş Sistemi kütlesinin %99.86’sı)',
  surfaceTempC: 5500,
  coreTempC: 15000000,
  distanceToEarthMillionKm: 149.6, // 1 Astronomik Birim (AB)
  lightTravelTimeToEarthMinutes: 8.3, // ~8 dakika 20 saniye
  rotationPeriodDays: 'Orta bölgesi 25 gün, kutupları 35 gün (Diferansiyel Dönme)',
  revolutionPeriodAroundMilkyWay: '225-250 Milyon Yıl (Galaktik Yıl)',
  composition: [
    { element: 'Hidrojen (H)', percent: 73.4 },
    { element: 'Helyum (He)', percent: 24.8 },
    { element: 'Oksijen, Karbon, Demir ve Diğerleri', percent: 1.8 }
  ],
  mebCoreFacts: [
    'Güneş orta büyüklükte bir yıldızdır; Dünya’ya en yakın yıldızdır.',
    'Güneş de Dünya gibi kendi ekseni etrafında batıdan doğuya (saat yönünün tersine) döner.',
    'Güneş katmanlardan oluşur; tıpkı bir soğan gibi içten dışa doğru farklı özellikler gösterir.',
    'Güneş enerjisini, çekirdeğindeki hidrojen atomlarının helyuma dönüşmesiyle (nükleer füzyon) açığa çıkarır.'
  ]
};

export const sunLayers: SunLayer[] = [
  {
    id: 'core',
    name: 'Core',
    turkishName: 'Çekirdek',
    zoneType: 'internal',
    depthRange: '0 - 175.000 km (Merkez)',
    thicknessKm: 175000,
    temperatureC: '~15.000.000 °C',
    description: 'Güneş’in en sıcak, en yoğun ve enerji üreten kalbidir. Muazzam basınç ve sıcaklık altında nükleer füzyon gerçekleşir: Saniyede yaklaşık 600 milyon ton hidrojen, 596 milyon ton helyuma dönüşür. Kayıp 4 milyon ton kütle saf enerjiye dönüşür.',
    keyPhenomena: ['Nükleer Füzyon', 'Gama Işını Üretimi', 'Saf Enerji Fabrikası'],
    mebExamTip: 'MEB Sınav Notu: Güneş’in enerjisinin üretildiği tek yer çekirdektir! Diğer katmanlar bu enerjiyi dışarı iletir.',
    color: '#FF4500',
    radiusPercent: 20
  },
  {
    id: 'radiative',
    name: 'Radiative Zone',
    turkishName: 'Işınım (Radyasyon) Bölgesi',
    zoneType: 'internal',
    depthRange: '175.000 - 490.000 km',
    thicknessKm: 315000,
    temperatureC: '~7.000.000 °C - ~2.000.000 °C',
    description: 'Çekirdekte üretilen gama ışını fotonları, bu katmandaki yoğun plazma parçacıklarıyla sürekli çarpışarak zikzaklar çizer. Bir ışık parçacığının bu katmanı geçmesi 100.000 ila 200.000 yıl sürebilir!',
    keyPhenomena: ['Foton Saçılması', 'Yoğun Plazma Maddesi', 'Yavaş Enerji İletimi'],
    mebExamTip: 'Çekirdekten çıkan enerji, ışınım yoluyla konveksiyon bölgesine aktarılır.',
    color: '#FF8C00',
    radiusPercent: 42
  },
  {
    id: 'convective',
    name: 'Convection Zone',
    turkishName: 'Kaynama (Konveksiyon) Bölgesi',
    zoneType: 'internal',
    depthRange: '490.000 - 700.000 km',
    thicknessKm: 210000,
    temperatureC: '~2.000.000 °C - ~5.500 °C',
    description: 'Tıpkı kaynayan bir tenceredeki çorba gibi plazma hareket eder. Alttan ısınan sıcak plazma kabarcıklar halinde yüzeye yükselir, soğuyunca tekrar dibe batar. Bu hareket Güneş’in devasa manyetik alanını besler.',
    keyPhenomena: ['Termal Dolaşım (Konveksiyon)', 'Granül Hücreleri', 'Manyetik Dinamo'],
    mebExamTip: 'Isının maddesel hareketle (kaynama kabarcıklarıyla) yüzeye taşındığı katmandır.',
    color: '#FFA500',
    radiusPercent: 65
  },
  {
    id: 'photosphere',
    name: 'Photosphere',
    turkishName: 'Fotosfer (Işık Küre)',
    zoneType: 'atmospheric',
    depthRange: 'Yüzeyden 0 - 500 km',
    thicknessKm: 500,
    temperatureC: '~5.500 °C',
    description: 'Güneş’in teleskop veya koruyucu filtrelerle baktığımızda gördüğümüz parlak sarı diskidir. "Güneş Lekeleri" burada yer alır. Lekeler etrafına göre daha soğuk (~3.800 °C) olduğu için koyu renkli görünür.',
    keyPhenomena: ['Güneş Lekeleri (Sunspots)', 'Granülasyon', 'Görünür Işık Yayılımı'],
    mebExamTip: 'MEB Sorusu: Galileo Galilei Güneş lekelerini gözlemleyerek Güneş’in kendi ekseni etrafında döndüğünü kanıtlamıştır!',
    color: '#FFD700',
    radiusPercent: 78
  },
  {
    id: 'chromosphere',
    name: 'Chromosphere',
    turkishName: 'Kromosfer (Renk Küre)',
    zoneType: 'atmospheric',
    depthRange: '500 - 2.500 km',
    thicknessKm: 2000,
    temperatureC: '~6.000 °C - ~20.000 °C',
    description: 'Fotosferin üzerindeki pembe-kırmızı renkli ince atmosfer katmanıdır. Rengini hidrojen gazının parlamasından alır. Normalde çok parlak fotosfer yüzünden görülemez, sadece tam Güneş tutulması anında Ay Güneş’i örttüğünde kırmızı bir halka gibi belirir.',
    keyPhenomena: ['Spiküller (Alev Fıskiyeleri)', 'Kırmızı Hidrojen Işıması', 'Güneş Püskürmeleri'],
    mebExamTip: 'Sadece tam Güneş tutulması anında gözlemlenebilen renkli küredir.',
    color: '#FF6347',
    radiusPercent: 88
  },
  {
    id: 'corona',
    name: 'Corona',
    turkishName: 'Korona (Taç Küre)',
    zoneType: 'atmospheric',
    depthRange: '2.500 km - Milyonlarca km derinlik',
    thicknessKm: 5000000,
    temperatureC: '~1.000.000 °C - ~3.000.000 °C',
    description: 'Güneş’in en dış ve en gizemli atmosfer tabakasıdır. Yüzeyden (5.500 °C) çok daha sıcaktır (milyonlarca derece)! Uzaya doğru milyonlarca kilometre uzanır. Buradan kopan elektrik yüklü parçacıklar "Güneş Rüzgarları"nı oluşturarak Dünya kutuplarında Kutup Işıkları’na (Aurora) yol açar.',
    keyPhenomena: ['Güneş Rüzgarları', 'Koronal Kütle Atımları (CME)', 'Kutup Işıkları (Aurora) Tetikleyicisi'],
    mebExamTip: 'Yüzeyden uzaklaştıkça sıcaklığı milyonlarca dereceye yükselen şaşırtıcı dış atmosferdir.',
    color: '#FFF8DC',
    radiusPercent: 100
  }
];

// ==================== GEZEGENLER & UYDULARI ====================
export const planetsData: CelestialBody[] = [
  {
    id: 'mercury',
    name: 'Mercury',
    turkishName: 'Merkür',
    category: 'terrestrial',
    categoryLabel: 'Karasal (İç) Gezegen',
    orderFromSun: 1,
    diameterKm: 4879,
    massKg: '3.30 × 10²³ kg',
    gravityMps2: 3.7, // m/s^2 (Earth: 9.8)
    distanceFromSunMillionKm: 57.9,
    orbitalPeriodEarthDays: 88,
    rotationPeriodHours: 1407.6, // ~59 Dünya günü
    surfaceTempC: { min: -180, max: 430, average: 167 },
    moonsCount: 0,
    moons: [],
    rings: false,
    atmosphere: ['Eser miktarda Oksijen', 'Sodyum', 'Hidrojen', 'Helyum (Neredeyse yok)'],
    summary: 'Güneş Sistemi’nin en küçük ve Güneş’e en yakın gezegenidir. Ay’a çok benzeyen kraterli bir yüzeye sahiptir.',
    middleSchoolFacts: [
      'Güneş’e en yakın gezegen olmasına rağmen EN SICAK gezegen DEĞİLDİR (Venüs daha sıcaktır).',
      'Atmosferi olmadığı için gece ile gündüz arasındaki sıcaklık farkı en yüksek olan gezegendir (Gündüz 430 °C, Gece -180 °C).',
      'Güneş’e en yakın olduğu için Güneş etrafında en hızlı dolanan gezegendir (1 yılı sadece 88 gündür).',
      'Uydusu ve halkası kesinlikle yoktur.'
    ],
    colorHex: '#9E9E9E',
    accentColorHex: '#E0E0E0',
    gradient: 'from-stone-400 via-stone-500 to-stone-700',
    orbitRadiusRatio: 52,
    orbitSpeedFactor: 4.15
  },
  {
    id: 'venus',
    name: 'Venus',
    turkishName: 'Venüs',
    category: 'terrestrial',
    categoryLabel: 'Karasal (İç) Gezegen',
    orderFromSun: 2,
    diameterKm: 12104,
    massKg: '4.87 × 10²⁴ kg',
    gravityMps2: 8.87,
    distanceFromSunMillionKm: 108.2,
    orbitalPeriodEarthDays: 224.7,
    rotationPeriodHours: 5832.5, // 243 Dünya günü (ters döner!)
    surfaceTempC: { min: 462, max: 475, average: 465 },
    moonsCount: 0,
    moons: [],
    rings: false,
    atmosphere: ['%96.5 Karbondioksit (CO2)', '%3.5 Azot', 'Sülfürik Asit Bulutları'],
    summary: 'Güneş Sistemi’nin EN SICAK gezegenidir. Gökyüzünde Ay’dan sonra en parlak doğal cisimdir; halk arasında "Çoban Yıldızı" veya "Sabah/Akşam Yıldızı" olarak bilinir (ama bir yıldız değil, gezegendir!).',
    middleSchoolFacts: [
      'Yoğun karbondioksit atmosferi nedeniyle korkunç bir SERA ETKİSİ yaşanır ve sıcaklık ~465 °C’dir (kurşunu bile eritir).',
      'Dünya ile boyutları neredeyse aynı olduğu için "Dünya’nın İkizi" olarak adlandırılır.',
      'Dönüş yönü DİĞER TÜM GEZEGENLERİN TERSİNE, saat yönünde (doğudan batıya) döner.',
      'Venüs’te bir gün (243 Dünya günü), bir yıldan (225 Dünya günü) DAHA UZUNDUR!',
      'Uydusu ve halkası yoktur.'
    ],
    colorHex: '#E6A15C',
    accentColorHex: '#FFD180',
    gradient: 'from-amber-300 via-orange-400 to-amber-700',
    orbitRadiusRatio: 78,
    orbitSpeedFactor: 1.62
  },
  {
    id: 'earth',
    name: 'Earth',
    turkishName: 'Dünya',
    category: 'terrestrial',
    categoryLabel: 'Karasal (İç) Gezegen',
    orderFromSun: 3,
    diameterKm: 12742,
    massKg: '5.97 × 10²⁴ kg',
    gravityMps2: 9.8,
    distanceFromSunMillionKm: 149.6,
    orbitalPeriodEarthDays: 365.25,
    rotationPeriodHours: 24,
    surfaceTempC: { min: -89, max: 58, average: 15 },
    moonsCount: 1,
    moons: [
      {
        id: 'moon',
        name: 'The Moon',
        turkishName: 'Ay',
        diameterKm: 3474,
        orbitalPeriodDays: 27.3,
        discoveryYear: 'Tarih öncesi',
        features: ['Kraterler', 'Regolit tozu', 'Maria (Lav düzlükleri)', 'Atmosfersiz'],
        funFact: 'Dünya’ya olan mesafesi ortalama 384.400 km’dir. Kendi etrafında dönme süresi ile Dünya etrafında dolanma süresi eşit olduğu için (27.3 gün) Dünya’dan hep aynı yüzü görünür!',
        color: '#E0E0E0'
      }
    ],
    rings: false,
    atmosphere: ['%78 Azot (N2)', '%21 Oksijen (O2)', '%0.93 Argon', '%0.04 Karbondioksit ve Su Buharı'],
    summary: 'Üzerinde yaşam olduğu bilinen tek gezegendir. Yüzeyinin yaklaşık %71’i sularla kaplı olduğu için uzaydan "Mavi Gezegen" olarak görünür.',
    middleSchoolFacts: [
      'Güneş’e olan mesafesi (Goldilocks / Yaşanabilir Kuşak) suyun sıvı halde kalmasına olanak sağlar.',
      'Manyetik alanı (manyetosfer) bizi ölümcül Güneş radyasyonundan korur.',
      'Güneş Sistemi’nde yoğunluğu en yüksek olan gezegendir.',
      'Tek doğal uydusu Ay’dır. Halkası yoktur.'
    ],
    colorHex: '#2B82C9',
    accentColorHex: '#4FC3F7',
    gradient: 'from-blue-400 via-emerald-400 to-sky-700',
    orbitRadiusRatio: 105,
    orbitSpeedFactor: 1.0
  },
  {
    id: 'mars',
    name: 'Mars',
    turkishName: 'Mars',
    category: 'terrestrial',
    categoryLabel: 'Karasal (İç) Gezegen',
    orderFromSun: 4,
    diameterKm: 6779,
    massKg: '6.42 × 10²³ kg',
    gravityMps2: 3.72,
    distanceFromSunMillionKm: 227.9,
    orbitalPeriodEarthDays: 687,
    rotationPeriodHours: 24.6, // Dünya gününe çok benzer!
    surfaceTempC: { min: -140, max: 20, average: -63 },
    moonsCount: 2,
    moons: [
      {
        id: 'phobos',
        name: 'Phobos',
        turkishName: 'Fobos (Korku)',
        diameterKm: 22.2,
        orbitalPeriodDays: 0.32,
        discoveryYear: 1877,
        features: ['Patates şekilli', 'Mars’a her yüzyılda 1.8 metre yaklaşır', 'Stickney Krateri'],
        funFact: 'Mars yüzeyine o kadar yakındır ki günde 3 kez doğup batar!',
        color: '#8D6E63'
      },
      {
        id: 'deimos',
        name: 'Deimos',
        turkishName: 'Deymos (Dehşet)',
        diameterKm: 12.4,
        orbitalPeriodDays: 1.26,
        discoveryYear: 1877,
        features: ['Küçük düzensiz kaya', 'Kalın toz tabakası'],
        funFact: 'Güneş Sistemi’nin bilinen en küçük uydularından biridir.',
        color: '#A1887F'
      }
    ],
    rings: false,
    atmosphere: ['%95.3 Karbondioksit', '%2.6 Azot', '%1.9 Argon', 'Eser miktarda su buharı'],
    summary: 'Yüzeyindeki demiroksit (pas) tozları nedeniyle gökyüzünde kırmızımsı parlar ve "Kızıl Gezegen" olarak anılır.',
    middleSchoolFacts: [
      'Güneş Sistemi’nin en yüksek volkanik dağı "Olympus Mons" (22 km yükseklik - Everest’in yaklaşık 3 katı!) buradadır.',
      'Güneş Sistemi’nin en büyük kanyonu "Valles Marineris" (4000 km uzunluk) buradadır.',
      'Kutup noktalarında donmuş su ve donmuş karbondioksit (kuru buz) takkeleri bulunur.',
      'İki küçük uydusu vardır: Phobos ve Deimos. Halkası yoktur.'
    ],
    colorHex: '#D14836',
    accentColorHex: '#FF7043',
    gradient: 'from-orange-500 via-red-600 to-amber-900',
    orbitRadiusRatio: 135,
    orbitSpeedFactor: 0.53
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    turkishName: 'Jüpiter',
    category: 'gas_giant',
    categoryLabel: 'Gaz Devi (Dış Gezegen)',
    orderFromSun: 5,
    diameterKm: 139820, // Dünyadan 11 kat büyük
    massKg: '1.90 × 10²⁷ kg', // Diğer tüm gezegenlerin toplamının 2.5 katı
    gravityMps2: 24.79,
    distanceFromSunMillionKm: 778.6,
    orbitalPeriodEarthDays: 4333, // ~12 Dünya yılı
    rotationPeriodHours: 9.9, // En hızlı dönen gezegen!
    surfaceTempC: { min: -145, max: -110, average: -120 },
    moonsCount: 95,
    moons: [
      {
        id: 'ganymede',
        name: 'Ganymede',
        turkishName: 'Ganimet',
        diameterKm: 5268,
        orbitalPeriodDays: 7.15,
        discoveryYear: 1610,
        features: ['Merkür gezegeninden bile büyüktür!', 'Kendi manyetik alanı olan tek uydu', 'Yeraltı tuzlu okyanusu'],
        funFact: 'Güneş Sistemi’nin EN BÜYÜK uydusudur!',
        color: '#B0BEC5'
      },
      {
        id: 'europa',
        name: 'Europa',
        turkishName: 'Avrupa (Europa)',
        diameterKm: 3122,
        orbitalPeriodDays: 3.55,
        discoveryYear: 1610,
        features: ['Kalın buz kabuk', 'Kabuğun altında dev sıvı su okyanusu', 'Dünya’daki tüm okyanusların 2 katı su'],
        funFact: 'Bilim insanlarına göre uzayda mikroskobik yaşam bulunma ihtimali en yüksek yerlerden biridir!',
        color: '#E0F7FA'
      },
      {
        id: 'io',
        name: 'Io',
        turkishName: 'İo',
        diameterKm: 3643,
        orbitalPeriodDays: 1.77,
        discoveryYear: 1610,
        features: ['400’den fazla aktif yanardağ', 'Kükürt gölleri', 'Güneş Sistemi’nin en volkanik gök cismi'],
        funFact: 'Jüpiter’in muazzam yerçekimi İo’yu sürekli yoğurur, bu yüzden yüzeyi durmadan lav püskürtür!',
        color: '#FFEE58'
      },
      {
        id: 'callisto',
        name: 'Callisto',
        turkishName: 'Kallisto',
        diameterKm: 4821,
        orbitalPeriodDays: 16.69,
        discoveryYear: 1610,
        features: ['Güneş Sistemi’nde en çok kratere sahip yüzey', 'Buz ve kaya karışımı'],
        funFact: 'Güneş Sistemi’nin 3. en büyük uydusudur ve neredeyse Merkür büyüklüğündedir.',
        color: '#78909C'
      }
    ],
    rings: true, // İnce toz halkaları var
    atmosphere: ['%90 Hidrojen', '%10 Helyum', 'Metan, Amonyak izleri'],
    summary: 'Güneş Sistemi’nin EN BÜYÜK gezegenidir ("Gezegenlerin Kralı"). Katı bir yüzeyi yoktur, neredeyse tamamen hidrojen ve helyum gazlarından oluşur.',
    middleSchoolFacts: [
      'Güneş Sistemi’ndeki diğer TÜM gezegenlerin toplam kütlesinden 2.5 kat daha ağırdır.',
      'Kendi ekseni etrafında en hızlı dönen gezegendir (1 günü 10 saatten kısadır).',
      'Üzerindeki "Büyük Kırmızı Leke", en az 350 yıldır esen devasa bir antisiklon fırtınasıdır ve içine Dünya rahatça sığabilir.',
      'Galileo Galilei tarafından 1610’da keşfedilen 4 büyük uydusuna "Galileo Uyduları" (Io, Europa, Ganymede, Callisto) denir.',
      'Çok soluk toz halkaları vardır.'
    ],
    colorHex: '#BC7A42',
    accentColorHex: '#FFB74D',
    gradient: 'from-amber-600 via-amber-200 to-amber-900',
    orbitRadiusRatio: 175,
    orbitSpeedFactor: 0.084
  },
  {
    id: 'saturn',
    name: 'Saturn',
    turkishName: 'Satürn',
    category: 'gas_giant',
    categoryLabel: 'Gaz Devi (Dış Gezegen)',
    orderFromSun: 6,
    diameterKm: 116460,
    massKg: '5.68 × 10²⁶ kg',
    gravityMps2: 10.44,
    distanceFromSunMillionKm: 1433.5,
    orbitalPeriodEarthDays: 10759, // ~29.5 Dünya yılı
    rotationPeriodHours: 10.7,
    surfaceTempC: { min: -178, max: -130, average: -140 },
    moonsCount: 146, // Resmi rekortmen
    moons: [
      {
        id: 'titan',
        name: 'Titan',
        turkishName: 'Titan',
        diameterKm: 5150,
        orbitalPeriodDays: 15.95,
        discoveryYear: 1655,
        features: ['Kalın azot atmosferi', 'Sıvı metan ve etan gölleri', 'Güneş Sistemi’nin 2. en büyük uydusu'],
        funFact: 'Güneş Sistemi’nde yoğun bir atmosfere sahip olan TEK uydudur!',
        color: '#FFB74D'
      },
      {
        id: 'enceladus',
        name: 'Enceladus',
        turkishName: 'Enseladus',
        diameterKm: 504,
        orbitalPeriodDays: 1.37,
        discoveryYear: 1789,
        features: ['Güneş Sistemi’nin en parlak/yansıtıcı cismi', 'Güney kutbundan fışkıran su gayzerleri', 'Buz altı okyanusu'],
        funFact: 'Fışkıran buz parçacıkları Satürn’ün "E Halkası"nı besler!',
        color: '#E0F7FA'
      },
      {
        id: 'mimas',
        name: 'Mimas',
        turkishName: 'Mimas',
        diameterKm: 396,
        orbitalPeriodDays: 0.94,
        discoveryYear: 1789,
        features: ['Dev Herschel Krateri (130 km çap)'],
        funFact: 'Görünüşü Yıldız Savaşları filmindeki "Ölüm Yıldızı"na (Death Star) inanılmaz benzer!',
        color: '#CFD8DC'
      }
    ],
    rings: true, // Muhteşem halkalar!
    atmosphere: ['%96 Hidrojen', '%3 Helyum', 'Metan, Amonyak'],
    summary: 'Buz, kaya ve toz parçacıklarından oluşan nefes kesici halkalarıyla Güneş Sistemi’nin en göz alıcı mücevheridir.',
    middleSchoolFacts: [
      'Güneş Sistemi’nde EN ÇOK UYDUYA sahip gezegendir (146 onaylanmış uydu!).',
      'Yoğunluğu sudan daha düşüktür (0.69 g/cm³)! Eğer Satürn’ü içine alacak devasa bir küvet olsaydı, Satürn SUDA YÜZERDİ!',
      'Göz kamaştıran halkaları binlerce ince halkacıktan oluşur ve çoğunlukla su buzu parçalarıdır.',
      'En büyük uydusu Titan, kalın bir atmosferi ve sıvı gölleri olan olağanüstü bir dünyadır.'
    ],
    colorHex: '#E2BF7D',
    accentColorHex: '#FFE082',
    gradient: 'from-amber-200 via-amber-300 to-yellow-600',
    orbitRadiusRatio: 215,
    orbitSpeedFactor: 0.034
  },
  {
    id: 'uranus',
    name: 'Uranus',
    turkishName: 'Uranüs',
    category: 'ice_giant',
    categoryLabel: 'Buz Devi (Dış Gezegen)',
    orderFromSun: 7,
    diameterKm: 50724,
    massKg: '8.68 × 10²⁵ kg',
    gravityMps2: 8.69,
    distanceFromSunMillionKm: 2872.5,
    orbitalPeriodEarthDays: 30685, // ~84 Dünya yılı
    rotationPeriodHours: 17.2, // Ters döner (-17.2)
    surfaceTempC: { min: -224, max: -197, average: -216 },
    moonsCount: 28,
    moons: [
      {
        id: 'miranda',
        name: 'Miranda',
        turkishName: 'Miranda',
        diameterKm: 471,
        orbitalPeriodDays: 1.41,
        discoveryYear: 1948,
        features: ['20 km derinliğinde dev kanyonlar (Verona Rupes)', 'Yamalı bulmaca benzeri yüzey'],
        funFact: 'Güneş Sistemi’nin en sarp uçurumu (Verona Rupes - 20 km derinlik) Miranda’dadır!',
        color: '#B0BEC5'
      },
      {
        id: 'titania',
        name: 'Titania',
        turkishName: 'Titanya',
        diameterKm: 1577,
        orbitalPeriodDays: 8.7,
        discoveryYear: 1787,
        features: ['Uranüs’ün en büyük uydusu', 'Buz ve kaya karışımı'],
        funFact: 'Uranüs uydularının isimleri mitolojiden değil, William Shakespeare ve Alexander Pope’un edebi eserlerinden alınmıştır!',
        color: '#ECEFF1'
      }
    ],
    rings: true, // 13 soluk dikey halka
    atmosphere: ['%83 Hidrojen', '%15 Helyum', '%2 Metan'],
    summary: 'Metan gazının kırmızı ışığı emmesi nedeniyle güzel bir açık mavi-yeşil renge sahip olan buz devidir.',
    middleSchoolFacts: [
      'Eksen eğikliği yaklaşık 98 derecedir! Yani yörüngesinde YUVARLANAN BİR VARİL GİBİ yatarak döner.',
      'Teleskopla keşfedilen İLK gezegendir (1781 yılında William Herschel tarafından keşfedilmiştir).',
      'Venüs gibi kendi ekseni etrafında saat yönünde ters döner.',
      'Güneş Sistemi’nin atmosferinde ölçülen en soğuk sıcaklık rekoru (-224 °C) Uranüs’e aittir.',
      'Halkaları vardır (13 adet dar ve koyu renkli halka).'
    ],
    colorHex: '#4FC3F7',
    accentColorHex: '#80DEEA',
    gradient: 'from-cyan-300 via-sky-400 to-teal-600',
    orbitRadiusRatio: 250,
    orbitSpeedFactor: 0.012
  },
  {
    id: 'neptune',
    name: 'Neptune',
    turkishName: 'Neptün',
    category: 'ice_giant',
    categoryLabel: 'Buz Devi (Dış Gezegen)',
    orderFromSun: 8,
    diameterKm: 49244,
    massKg: '1.02 × 10²⁶ kg',
    gravityMps2: 11.15,
    distanceFromSunMillionKm: 4495.1,
    orbitalPeriodEarthDays: 60190, // ~165 Dünya yılı
    rotationPeriodHours: 16.1,
    surfaceTempC: { min: -218, max: -200, average: -214 },
    moonsCount: 16,
    moons: [
      {
        id: 'triton',
        name: 'Triton',
        turkishName: 'Triton',
        diameterKm: 2706,
        orbitalPeriodDays: 5.87,
        discoveryYear: 1846,
        features: ['Ters yörüngeli (Retrograd)', 'Sıvı azot gayzerleri', 'Kavun kabuğu desenli arazi', 'Yüzey sıcaklığı -235 °C'],
        funFact: 'Gezegeninin dönüş yönünün TERSİNE dolanan tek büyük uydudur! Büyük ihtimalle Kuiper Kuşağı’ndan yakalanmış cüce bir gezegendir.',
        color: '#E0F2F1'
      }
    ],
    rings: true, // 5 soluk toz halkası
    atmosphere: ['%80 Hidrojen', '%19 Helyum', '%1.5 Metan'],
    summary: 'Güneş’e en uzak gezegendir. Derin koyu masmavi rengi ve sistemin en çılgın fırtınalarıyla bilinir.',
    middleSchoolFacts: [
      'Güneş Sistemi’nin EN ŞİDDETLİ RÜZGARLARI buradadır (hızı saatte 2.100 km’yi aşar - ses hızından hızlı!).',
      'Teleskopla görülmeden önce MATEMATİKSEL HESAPLAMALARLA yeri tahmin edilip bulunan ilk gezegendir!',
      'Güneş etrafındaki 1 turunu yaklaşık 165 Dünya yılında tamamlar.',
      'En büyük uydusu Triton, geveze azot gayzerleri püskürten dondurucu bir dünyadır.',
      'Soluk halkaları vardır.'
    ],
    colorHex: '#1E88E5',
    accentColorHex: '#64B5F6',
    gradient: 'from-blue-600 via-indigo-600 to-blue-950',
    orbitRadiusRatio: 285,
    orbitSpeedFactor: 0.006
  },
  {
    id: 'pluto',
    name: 'Pluto',
    turkishName: 'Plüton (Cüce Gezegen)',
    category: 'dwarf',
    categoryLabel: 'Cüce Gezegen (Kuiper Kuşağı)',
    orderFromSun: 9,
    diameterKm: 2376,
    massKg: '1.31 × 10²² kg',
    gravityMps2: 0.62,
    distanceFromSunMillionKm: 5906.4,
    orbitalPeriodEarthDays: 90560, // ~248 Dünya yılı
    rotationPeriodHours: 153.3, // ~6.4 Dünya günü
    surfaceTempC: { min: -240, max: -218, average: -229 },
    moonsCount: 5,
    moons: [
      {
        id: 'charon',
        name: 'Charon',
        turkishName: 'Karon',
        diameterKm: 1212,
        orbitalPeriodDays: 6.38,
        discoveryYear: 1978,
        features: ['Plüton’un yarı boyutundadır', 'İkili cüce gezegen sistemi gibi davranırlar'],
        funFact: 'Plüton ile Karon birbirlerine hep aynı yüzlerini gösterirler (Kütleçekimsel kilit).',
        color: '#90A4AE'
      }
    ],
    rings: false,
    atmosphere: ['Azot, Metan ve Karbonmonoksit (Güneş’e yaklaştığında gazlaşır, uzaklaşınca donar)'],
    summary: '2006 yılına kadar 9. gezegen olarak kabul edilen, daha sonra Uluslararası Astronomi Birliği (IAU) tarafından "Cüce Gezegen" sınıfına alınan gizemli gök cismidir.',
    middleSchoolFacts: [
      'Neden gezegenlikten çıkarıldı? Çünkü yörüngesindeki diğer gök cisimlerini temizleyememiştir ve Kuiper Kuşağı’nda benzer boyutlarda başka cisimler de bulunmuştur.',
      'Yüzeyinde devasa bir kalp şeklinde donmuş azot ovası (Tombaugh Regio) bulunur!',
      'Ay’ımızdan bile daha küçüktür (Ay çapı 3474 km, Plüton 2376 km).',
      '5 uydusu vardır: Charon, Styx, Nix, Kerberos ve Hydra.'
    ],
    colorHex: '#A1887F',
    accentColorHex: '#D7CCC8',
    gradient: 'from-amber-700 via-stone-500 to-stone-800',
    orbitRadiusRatio: 315,
    orbitSpeedFactor: 0.004
  }
];

// ==================== DÜNYA'NIN KATMANLARI ====================
export const earthLayersData: EarthLayer[] = [
  // İç Yapısal Katmanlar (Yer Küre / Jeosfer)
  {
    id: 'crust',
    name: 'Crust (Lithosphere)',
    turkishName: 'Yer Kabuğu (Taş Küre / Litosfer)',
    category: 'geosphere',
    depthRange: '0 - 70 km (Karalarda 35-70 km, Okyanus tabanlarında 5-10 km)',
    temperatureC: '0 °C - 500 °C',
    stateOfMatter: 'Katı (Sert Kayaçlar)',
    composition: 'Silisyum, Alüminyum (Sial), Silisyum, Magnezyum (Sima), Oksijen',
    description: 'Üzerinde dağların, denizlerin, şehirlerin ve tüm canlıların yaşadığı en dış katmandır. Dünya’nın toplam hacminin sadece %1’inden azını oluşturur. Tıpkı bir elmanın kabuğu kadar incedir.',
    mebExamTip: 'MEB Sınav Notu: Yer kabuğu karalarda kalın (Sial baskın), okyanus tabanlarında incedir (Sima baskın). Derine inildikçe her 33 metrede sıcaklık yaklaşık 1 °C artar!',
    iconName: 'Mountain',
    color: '#8D6E63'
  },
  {
    id: 'mantle',
    name: 'Mantle (Asthenosphere)',
    turkishName: 'Manto (Astenosfer & Mezosfer)',
    category: 'geosphere',
    depthRange: '70 - 2.900 km',
    temperatureC: '1.000 °C - 3.700 °C',
    stateOfMatter: 'Yarı Akışkan / Erimiş Plastik Halde (Magma)',
    composition: 'Demir, Magnezyum, Silikon ve Oksijen bakımından zengin kayaçlar',
    description: 'Dünya’nın hacminin yaklaşık %84’ünü kaplayan en kalın katmandır. Üst manto (Astenosfer) içerisindeki magma ısındıkça yükselir, soğudukça dibe çöker. Bu "Konveksiyonel Akıntılar", üzerindeki yer kabuğu levhalarını hareket ettirerek DEPREMLERİ, VOLKANLARI ve DAĞ OLUŞUMUNU tetikler.',
    mebExamTip: 'MEB Sorusu: Volkanlardan püsküren lavların kaynağı Manto katmanındaki magmadır! Levha hareketlerinin motorudur.',
    iconName: 'Flame',
    color: '#E65100'
  },
  {
    id: 'outer-core',
    name: 'Outer Core',
    turkishName: 'Dış Çekirdek',
    category: 'geosphere',
    depthRange: '2.900 - 5.150 km',
    temperatureC: '4.000 °C - 5.000 °C',
    stateOfMatter: 'Sıvı (Akor Halde Akışkan Metal)',
    composition: '%80 Demir, %15 Nikel, eser miktarda Kükürt ve Oksijen',
    description: 'Aşırı sıcaklık nedeniyle tamamen erimiş sıvı demir ve nikelden oluşur. Dünya kendi ekseninde dönerken bu sıvı metal tabaka da döner ve bir dinamo gibi çalışır. Bu hareket DÜNYA’NIN MANYETİK ALANINI (Manyetosfer) üretir!',
    mebExamTip: 'Püf Noktası: Dış çekirdeğin SIVI olması ve dönmesi sayesinde oluşan manyetik alan, bizi Güneş’in zararlı parçacıklarından korur ve pusulaların çalışmasını sağlar.',
    iconName: 'Compass',
    color: '#FF9800'
  },
  {
    id: 'inner-core',
    name: 'Inner Core',
    turkishName: 'İç Çekirdek',
    category: 'geosphere',
    depthRange: '5.150 - 6.378 km (Dünya’nın Merkezi)',
    temperatureC: '~5.500 °C - 6.000 °C (Güneş Yüzeyi Kadar Sıcak!)',
    stateOfMatter: 'Katı (Muazzam Basınç Nedeniyle Eriyemez!)',
    composition: 'Saf Katı Kristal Demir ve Nikel alaşımı',
    description: 'Dünya’nın tam merkezidir. Sıcaklık Güneş yüzeyiyle yarışacak kadar yüksek (~6.000 °C) olmasına rağmen, üzerindeki milyonlarca tonluk katmanın yarattığı akıl almaz basınç (3.5 milyon atmosfer) yüzünden atomlar birbirinden ayrılamaz ve katı halde kalır!',
    mebExamTip: 'Klasik Sınav Sorusu: "İç çekirdek Güneş kadar sıcak olmasına rağmen neden sıvı değildir?" Cevap: Aşırı basınç nedeniyle eriyemez, KATI haldedir!',
    iconName: 'Shield',
    color: '#FFEB3B'
  },
  // Atmosfer Katmanları (Hava Küre)
  {
    id: 'troposphere',
    name: 'Troposphere',
    turkishName: 'Troposfer',
    category: 'atmosphere',
    depthRange: 'Yeryüzünden 0 - 16 km (Kutuplarda 8 km, Ekvatorda 16 km)',
    temperatureC: '+15 °C’den -55 °C’ye düşer',
    stateOfMatter: 'Gaz Karışımı (Azot, Oksijen, Su Buharı)',
    composition: 'Atmosferdeki gazların %75’i, su buharının ise %100’ü buradadır',
    description: 'İçinde nefes aldığımız, uçakların uçtuğu ve YAĞMUR, KAR, RÜZGAR, BULUT gibi tüm hava olaylarının gerçekleştiği katmandır. Yukarı doğru çıkıldıkça her 200 metrede sıcaklık 1 °C azalır.',
    mebExamTip: 'Hava olaylarının yalnızca Troposferde görülmesinin sebebi: Su buharının (nemin) tamamının bu katmanda toplanmış olmasıdır!',
    iconName: 'CloudRain',
    color: '#4FC3F7'
  },
  {
    id: 'stratosphere',
    name: 'Stratosphere (Ozone Layer)',
    turkishName: 'Stratosfer ve Ozon Tabakası',
    category: 'atmosphere',
    depthRange: '16 - 50 km',
    temperatureC: '-55 °C’den 0 °C’ye çıkar',
    stateOfMatter: 'Gaz (Kuru, nemsiz)',
    composition: 'Ozon gazı (O3 molekülleri) yoğunlaşır',
    description: 'Su buharı olmadığı için hava olayları yaşanmaz. Jet yolcu uçakları türbülanssız olduğu için alt sınırında uçar. İçinde bulunan OZON TABAKASI, Güneş’ten gelen zararlı Ultraviyole (UV) morötesi ışınları süzerek yeryüzündeki yaşamı korur.',
    mebExamTip: 'Ozon tabakası Stratosferdedir. UV ışınlarını soğurduğu için bu katmanda yukarı çıkıldıkça sıcaklık artar.',
    iconName: 'Sun',
    color: '#0288D1'
  },
  {
    id: 'mesosphere',
    name: 'Mesosphere',
    turkishName: 'Mezosfer (Gök Taşı Kalkanı)',
    category: 'atmosphere',
    depthRange: '50 - 85 km',
    temperatureC: '-90 °C’ye kadar iner (En Soğuk Katman)',
    stateOfMatter: 'İnce Gaz',
    composition: 'Azalan yoğunlukta gazlar',
    description: 'Dünya’nın koruma kalkanıdır. Uzaydan saniyede onlarca kilometre hızla gelen gök taşları (meteorlar) bu katmandaki gaz moleküllerine sürtünerek alev alır ve yanarak yok olur. Halk arasında "Yıldız Kayması" dediğimiz olay tam da Mezosferde yaşanır!',
    mebExamTip: 'MEB Sınav Notu: Meteorların (gök taşlarının) sürtünmeyle alev alıp parçalandığı katman Mezosferdir! Yıldız kayması bir yıldızın düşmesi değil, meteorun yanmasıdır.',
    iconName: 'Sparkles',
    color: '#5C6BC0'
  },
  {
    id: 'thermosphere',
    name: 'Thermosphere (Ionosphere)',
    turkishName: 'Termosfer (İyonosfer & Auroralar)',
    category: 'atmosphere',
    depthRange: '85 - 600 km',
    temperatureC: 'Güneş ışığıyla 1.500 °C - 2.000 °C’ye kadar fırlar',
    stateOfMatter: 'İyonize Plazma ve Gaz',
    composition: 'Elektrik yüklü gaz atomları (İyonlar)',
    description: 'Güneş’in X-ışınları gazları iyonlaştırır. Güneş rüzgarlarının buradaki oksijen ve azot atomlarıyla çarpışmasıyla büyüleyici KUTUP IŞIKLARI (Aurora Borealis / Australis) oluşur. Uluslararası Uzay İstasyonu (ISS) yaklaşık 400 km yükseklikte bu katmanda dolanır.',
    mebExamTip: 'Radyo dalgalarını yansıtarak haberleşmeyi sağlar; Kutup Işıkları bu katmanda görülür.',
    iconName: 'Zap',
    color: '#7E57C2'
  },
  {
    id: 'exosphere',
    name: 'Exosphere',
    turkishName: 'Ekzosfer (Uzay Sınırı)',
    category: 'atmosphere',
    depthRange: '600 - 10.000 km (Uzay Boşluğu)',
    temperatureC: 'Güneşte çok sıcak, gölgede mutlak sıfıra yakın',
    stateOfMatter: 'Aşırı Seyrek Gaz (Moleküller birbirine yüzlerce km mesafede)',
    composition: 'Ağırlıklı olarak en hafif gazlar: Hidrojen ve Helyum',
    description: 'Atmosferin en dış katmanıdır ve uzay boşluğuna açılan kapıdır. Yerçekimi son derece zayıftır. Haberleşme uyduları, meteoroloji uyduları ve GPS uyduları bu katmanın yörüngesinde döner.',
    mebExamTip: 'Atmosferin en dış sınırıdır; yapay uyduların çoğu bu katmanda yer alır.',
    iconName: 'Satellite',
    color: '#263238'
  }
];

// ==================== AY'IN EVRELERİ ====================
export const moonPhasesData: MoonPhase[] = [
  {
    id: 'new_moon',
    name: 'New Moon',
    turkishName: 'Yeni Ay (1. Ana Evre)',
    isMainPhase: true,
    orderIndex: 0,
    angleDegrees: 0,
    illuminationPercent: 0,
    shapeDescription: 'Ay, Dünya ile Güneş arasındadır. Güneş’e bakan arka yüzü aydınlık, Dünya’ya bakan yüzü ise tamamen karanlıktır. Gökyüzünde görünmez.',
    daysAfterNewMoon: 0,
    significance: 'Ay döngüsünün başlangıcıdır. Güneş tutulması yalnızca bu evrede gerçekleşebilir.',
    mebExamTip: 'Yeni Ay evresinde Ay, Dünya’dan bakıldığında GÖRÜLMEZ. Sıralama: GÜNEŞ - AY - DÜNYA şeklindedir.',
    visualPath: 'M 50 10 A 40 40 0 1 0 50 90 A 40 40 0 1 0 50 10 Z'
  },
  {
    id: 'waxing_crescent',
    name: 'Waxing Crescent',
    turkishName: 'Hilal (Ara Evre)',
    isMainPhase: false,
    orderIndex: 1,
    angleDegrees: 45,
    illuminationPercent: 25,
    shapeDescription: 'Yeni Ay’dan yaklaşık 3.5 gün sonra Ay’ın batı tarafında ince bir ışık yayı belirir. Ters "C" harfi gibi görünür.',
    daysAfterNewMoon: 3.7,
    significance: 'Güneş battıktan hemen sonra batı ufkunda kısa süre gözlemlenir.',
    mebExamTip: 'Hilal bir ara evredir. Yeni Ay ile İlk Dördün arasında ve Son Dördün ile Yeni Ay arasında olmak üzere 2 kez görülür.',
    visualPath: ''
  },
  {
    id: 'first_quarter',
    name: 'First Quarter',
    turkishName: 'İlk Dördün (2. Ana Evre)',
    isMainPhase: true,
    orderIndex: 2,
    angleDegrees: 90,
    illuminationPercent: 50,
    shapeDescription: 'Yeni Ay’dan 1 hafta (7-8 gün) sonradır. Ay’ın Dünya’dan görünen yüzünün sağ yarısı aydınlıktır. Düz "D" harfi şeklindedir.',
    daysAfterNewMoon: 7.4,
    significance: 'Ay yüzeyinin kraterleri gölgeler sayesinde teleskopla en net bu evrede incelenir.',
    mebExamTip: 'Kodlama Kuralı: İlk Dördün DÜZ "D" harfine benzer! (Sağ taraf aydınlık).',
    visualPath: ''
  },
  {
    id: 'waxing_gibbous',
    name: 'Waxing Gibbous',
    turkishName: 'Şişkin Ay (Ara Evre)',
    isMainPhase: false,
    orderIndex: 3,
    angleDegrees: 135,
    illuminationPercent: 75,
    shapeDescription: 'İlk Dördün ile Dolunay arasındaki ara evredir. Ay’ın aydınlık kısmı yarıdan fazladır ancak henüz tam daire değildir.',
    daysAfterNewMoon: 11.1,
    significance: 'Aydınlık alan her geçen gece büyüyerek Dolunay’a doğru ilerler.',
    mebExamTip: 'İlk Dördün ile Dolunay arasında görülen ara evredir.',
    visualPath: ''
  },
  {
    id: 'full_moon',
    name: 'Full Moon',
    turkishName: 'Dolunay (3. Ana Evre)',
    isMainPhase: true,
    orderIndex: 4,
    angleDegrees: 180,
    illuminationPercent: 100,
    shapeDescription: 'Yeni Ay’dan yaklaşık 2 hafta (14-15 gün) sonradır. Dünya, Güneş ile Ay arasındadır. Ay’ın Dünya’ya bakan yüzü tamamen aydınlıktır, pırıl pırıl tam bir daire şeklinde görünür.',
    daysAfterNewMoon: 14.8,
    significance: 'Tüm gece boyunca gökyüzünü aydınlatır. Ay tutulması yalnızca bu evrede gerçekleşebilir.',
    mebExamTip: 'Dolunay evresinde Dünya ortadadır: GÜNEŞ - DÜNYA - AY. Ay tutulması yalnızca bu evrede meydana gelebilir!',
    visualPath: ''
  },
  {
    id: 'waning_gibbous',
    name: 'Waning Gibbous',
    turkishName: 'Şişkin Ay (Ara Evre)',
    isMainPhase: false,
    orderIndex: 5,
    angleDegrees: 225,
    illuminationPercent: 75,
    shapeDescription: 'Dolunay’dan sonra Ay’ın sağ tarafından itibaren karanlık alan genişlemeye başlar. Yarıdan fazlası hala aydınlıktır.',
    daysAfterNewMoon: 18.5,
    significance: 'Gece yarısından sonra doğar ve sabah saatlerinde gökyüzünde görülebilir.',
    mebExamTip: 'Dolunay ile Son Dördün arasındaki ara evredir.',
    visualPath: ''
  },
  {
    id: 'last_quarter',
    name: 'Last Quarter',
    turkishName: 'Son Dördün (4. Ana Evre)',
    isMainPhase: true,
    orderIndex: 6,
    angleDegrees: 270,
    illuminationPercent: 50,
    shapeDescription: 'Yeni Ay’dan 3 hafta (21-22 gün) sonradır. Ay’ın Dünya’dan görünen yüzünün sol yarısı aydınlıktır. TERS "D" harfi şeklindedir.',
    daysAfterNewMoon: 22.1,
    significance: 'Gece yarısı doğar, öğle saatlerinde batar.',
    mebExamTip: 'Kodlama Kuralı: Son Dördün TERS "D" harfine benzer! (Sol taraf aydınlık).',
    visualPath: ''
  },
  {
    id: 'waning_crescent',
    name: 'Waning Crescent',
    turkishName: 'Hilal (Ara Evre - Bayrak Hilali)',
    isMainPhase: false,
    orderIndex: 7,
    angleDegrees: 315,
    illuminationPercent: 25,
    shapeDescription: 'Son Dördün ile Yeni Ay arasındaki evredir. Ay düzgün bir "C" harfi (Türk bayrağındaki hilal) şeklini alır. Sabah gün doğmadan önce doğu ufkunda görülür.',
    daysAfterNewMoon: 25.8,
    significance: 'Ay döngüsünün son evresidir; birkaç gün sonra tekrar Yeni Ay başlar.',
    mebExamTip: 'Türk bayrağındaki hilal şekli (C harfi), Son Dördün ile Yeni Ay arasındaki bu ara evredir.',
    visualPath: ''
  }
];

// ==================== TUTULMALAR ====================
export const eclipsesData: EclipseInfo[] = [
  {
    id: 'solar',
    name: 'Güneş Tutulması',
    orderAlignment: 'GÜNEŞ  —>  AY  —>  DÜNYA   (Kodlama: G-A-D)',
    moonPhaseRequired: 'YENİ AY Evresi',
    durationMinutes: 'Yaklaşık 2 - 7.5 dakika (Tam tutulma anı)',
    visibilityArea: 'Dünya üzerinde yalnızca dar bir gölge şeridinde (Gündüz vakti)',
    eyeSafetyWarning: 'UYARI: Asla çıplak gözle, normal güneş gözlüğüyle veya dürbünle bakılmamalıdır! Özel filtreli güneş tutulma gözlüğü zorunludur.',
    mebExamTip: 'Güneş tutulması gündüz gözlenir. Ay Güneş’in ışığını keser ve gölgesi Dünya üzerine düşer. Ay’ın YENİ AY evresinde olur ama her yeni ayda tutulma olmaz çünkü Ay’ın yörüngesi 5 derece eğiktir!',
    frequency: 'Yılda en az 2, en fazla 5 kez gerçekleşir.'
  },
  {
    id: 'lunar',
    name: 'Ay Tutulması',
    orderAlignment: 'GÜNEŞ  —>  DÜNYA  —>  AY   (Kodlama: G-D-A)',
    moonPhaseRequired: 'DOLUNAY Evresi',
    durationMinutes: 'Yaklaşık 1 - 1.5 saat (Toplam süre 3-4 saat sürebilir)',
    visibilityArea: 'O sırada geceyi yaşayan Dünya’nın karanlık tüm yarım küresinden izlenebilir',
    eyeSafetyWarning: 'Gözler için tamamen GÜVENLİDİR! Çıplak gözle, dürbünle veya teleskopla rahatlıkla izlenebilir.',
    mebExamTip: 'Dünya Güneş ile Ay arasına girer ve Dünya’nın gölgesi Ay’ın üzerine düşer. Dünya atmosferinden kırılan kırmızı ışınlar Ay’a vurduğu için Ay kızıl-bakır rengi alır ("Kanlı Ay"). Yalnızca DOLUNAY evresinde olur!',
    frequency: 'Yılda genellikle 2-3 kez gerçekleşir.'
  }
];

// ==================== SINAV SORULARI (MEB KAZANIMLARI) ====================
export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    gradeLevel: '5. Sınıf',
    topic: 'Güneş ve Katmanları',
    question: 'Güneş’in kendi ekseni etrafındaki dönme yönü ile ilgili aşağıdakilerden hangisi doğrudur?',
    options: [
      'Doğudan batıya (saat yönünde) döner.',
      'Batıdan doğuya (saat yönünün tersine) döner.',
      'Güneş kendi ekseni etrafında hiç dönmez, sabittir.',
      'Kuzeyden güneye doğru döner.'
    ],
    correctAnswerIndex: 1,
    explanation: 'Güneş tıpkı Dünya gibi kendi ekseni etrafında batıdan doğuya doğru (saat yönünün tersine) döner.',
    mebTip: 'MEB 5. Sınıf Fen Bilimleri: Güneş, Dünya ve Ay kendi etrafında saat yönünün TERSİNE (batıdan doğuya) döner.'
  },
  {
    id: 'q2',
    gradeLevel: '5. Sınıf',
    topic: 'Güneş ve Katmanları',
    question: 'Teleskobuyla Güneş üzerindeki koyu renkli lekeleri inceleyerek Güneş’in kendi ekseni etrafında döndüğünü kanıtlayan ünlü bilim insanı kimdir?',
    options: [
      'Isaac Newton',
      'Galileo Galilei',
      'Albert Einstein',
      'Ali Kuşçu'
    ],
    correctAnswerIndex: 1,
    explanation: 'Galileo Galilei, 1610 yılında geliştirdiği teleskopla Güneş lekelerini izlemiş ve lekelerin hep aynı yöne kaydığını görerek Güneş’in döndüğünü ispatlamıştır.',
    mebTip: 'Ders kitaplarında Galileo’nun Güneş lekeleri deneyi sıkça sorulur.'
  },
  {
    id: 'q3',
    gradeLevel: '5. Sınıf',
    topic: 'Ay ve Evreleri',
    question: 'Dünya’dan bakıldığında Ay’ın aydınlık yüzünün düz "D" harfi şeklinde göründüğü ana evre aşağıdakilerden hangisidir?',
    options: [
      'Yeni Ay',
      'İlk Dördün',
      'Dolunay',
      'Son Dördün'
    ],
    correctAnswerIndex: 1,
    explanation: 'İlk Dördün evresinde Ay’ın sağ yarısı aydınlanır ve gökyüzünde düzgün bir "D" harfi gibi görünür.',
    mebTip: 'Unutma: İlk Dördün = Düz "D", Son Dördün = Ters "D"!'
  },
  {
    id: 'q4',
    gradeLevel: '5. Sınıf',
    topic: 'Ay ve Evreleri',
    question: 'Dünya’dan bakıldığında Ay’ın hep AYNI yüzünün görülmesinin temel sebebi nedir?',
    options: [
      'Ay’ın atmosferinin olmaması',
      'Ay’ın kendi etrafında dönme süresi ile Dünya etrafında dolanma süresinin birbirine eşit olması (~27.3 gün)',
      'Ay’ın Dünya’dan çok küçük olması',
      'Güneş ışınlarının Ay’a sadece tek taraftan gelmesi'
    ],
    correctAnswerIndex: 1,
    explanation: 'Ay’ın kendi ekseni etrafındaki dönme süresi (27.3 gün) ile Dünya etrafındaki dolanma süresi (27.3 gün) eşit olduğu için Dünya’dan bakınca hep aynı yarım küresi görünür.',
    mebTip: 'Bu olaya fizikte "kütleçekim kilidi" denir; 5. sınıf yazılılarının vazgeçilmez sorusudur.'
  },
  {
    id: 'q5',
    gradeLevel: '6. Sınıf',
    topic: 'Gezegenler ve Uydular',
    question: 'Aşağıdaki gezegen ikililerinden hangilerinin kesinlikle hiç DOĞAL UYDUSU YOKTUR?',
    options: [
      'Dünya ve Mars',
      'Merkür ve Venüs',
      'Jüpiter ve Satürn',
      'Uranüs ve Neptün'
    ],
    correctAnswerIndex: 1,
    explanation: 'Güneş Sistemi’nde yalnızca Güneş’e en yakın ilk iki karasal gezegen olan Merkür ve Venüs’ün doğal uydusu yoktur.',
    mebTip: 'Merkür ve Venüs uydusuz gezegenlerdir; bunu hafızana kazı!'
  },
  {
    id: 'q6',
    gradeLevel: '6. Sınıf',
    topic: 'Gezegenler ve Uydular',
    question: 'Güneş Sistemi’nin "EN SICAK" gezegeni hangisidir ve bunun sebebi nedir?',
    options: [
      'Merkür - Çünkü Güneş’e en yakın gezegendir.',
      'Mars - Çünkü yüzeyinde kızıl pas tozları vardır.',
      'Venüs - Çünkü yoğun karbondioksit atmosferi aşırı sera etkisine yol açar.',
      'Jüpiter - Çünkü en büyük gezegendir.'
    ],
    correctAnswerIndex: 2,
    explanation: 'Merkür Güneş’e daha yakın olmasına rağmen atmosferi yoktur. Venüs’ün ise %96.5 karbondioksitten oluşan kalın atmosferi ısıyı hapseder (sera etkisi) ve sıcaklığı 465 °C’ye çıkarır.',
    mebTip: 'Tuzak soru! Güneş’e en yakın Merkür’dür ama en sıcak gezegen kesinlikle Venüs’tür.'
  },
  {
    id: 'q7',
    gradeLevel: '6. Sınıf',
    topic: 'Gezegenler ve Uydular',
    question: 'Eksen eğikliği yaklaşık 98 derece olan ve yörüngesinde "yuvarlanan bir varil gibi yatarak" dönen buz devi gezegen hangisidir?',
    options: [
      'Satürn',
      'Neptün',
      'Uranüs',
      'Mars'
    ],
    correctAnswerIndex: 2,
    explanation: 'Uranüs yaklaşık 98 derecelik eksen eğikliği sebebiyle sanki yana yatmış bir fıçı gibi döner.',
    mebTip: 'MEB 6. sınıf kitaplarında Uranüs’ün bu özelliği "yuvarlanan bir varil" benzetmesiyle anlatılır.'
  },
  {
    id: 'q8',
    gradeLevel: '6. Sınıf',
    topic: 'Tutulmalar',
    question: 'Güneş tutulması sırasında gök cisimlerinin sıralaması ve Ay’ın içinde bulunduğu evre hangi seçenekte doğru verilmiştir?',
    options: [
      'Güneş - Dünya - Ay  /  Dolunay',
      'Güneş - Ay - Dünya  /  Yeni Ay',
      'Dünya - Güneş - Ay  /  İlk Dördün',
      'Ay - Güneş - Dünya  /  Son Dördün'
    ],
    correctAnswerIndex: 1,
    explanation: 'Güneş tutulmasında Ay, Güneş ile Dünya arasına girer (G-A-D sıralaması). Bu durum yalnızca YENİ AY evresinde gerçekleşebilir.',
    mebTip: 'Kodlama: Güneş Tutulması = G-A-D (Güneş - Ay - Dünya), Yeni Ay evresi.'
  },
  {
    id: 'q9',
    gradeLevel: '7-8. Sınıf',
    topic: 'Dünya Katmanları',
    question: 'Uzaydan gelen meteorların (gök taşlarının) sürtünmeyle alev alıp parçalandığı ve halk arasında "yıldız kayması" denen olayın gerçekleştiği atmosfer katmanı hangisidir?',
    options: [
      'Troposfer',
      'Stratosfer',
      'Mezosfer',
      'Ekzosfer'
    ],
    correctAnswerIndex: 2,
    explanation: 'Mezosfer, gök taşlarının sürtünmeyle akkor hale gelip yandığı koruyucu atmosfer katmanıdır.',
    mebTip: 'Mezosfer = Meteor Kalkanı (Her ikisi de M harfiyle başlar).'
  },
  {
    id: 'q10',
    gradeLevel: '7-8. Sınıf',
    topic: 'Dünya Katmanları',
    question: 'Dünya’nın iç çekirdeğinde sıcaklık yaklaşık 6.000 °C olmasına rağmen, maddenin SIVI değil de KATI halde bulunmasının temel sebebi nedir?',
    options: [
      'Çekirdekte hiç demir bulunmaması',
      'Merkezdeki akıl almaz yüksek basıncın atomların serbest kalmasını engellemesi',
      'Yer kabuğunun çekirdeği soğutması',
      'İç çekirdeğin atmosferle doğrudan temas etmesi'
    ],
    correctAnswerIndex: 1,
    explanation: 'İç çekirdek üzerindeki milyonlarca tonluk katmanın yarattığı yaklaşık 3.5 milyon atmosferlik basınç, metallerin eriyip sıvılaşmasına izin vermez; bu yüzden katıdır.',
    mebTip: 'İç çekirdek = Katı (Aşırı Basınç); Dış çekirdek = Sıvı (Manyetik alanı oluşturan akışkan).'
  },
  {
    id: 'q11',
    gradeLevel: 'Genel Uzay',
    topic: 'Gezegenler ve Uydular',
    question: 'Güneş Sistemi’nde Merkür gezegeninden bile daha büyük olan ve kendi manyetik alanına sahip TEK uydu olan Güneş Sistemi’nin EN BÜYÜK uydusu hangisidir?',
    options: [
      'Ay (Dünya)',
      'Titan (Satürn)',
      'Ganymede / Ganimet (Jüpiter)',
      'Triton (Neptün)'
    ],
    correctAnswerIndex: 2,
    explanation: 'Ganymede (5.268 km çap), Jüpiter’in uydusu olup Güneş Sistemi’nin en büyük uydusudur ve Merkür’den bile büyüktür.',
    mebTip: 'Sıralama: 1. Ganymede (Jüpiter), 2. Titan (Satürn), 3. Callisto (Jüpiter), 4. Io (Jüpiter), 5. Ay (Dünya).'
  },
  {
    id: 'q12',
    gradeLevel: 'Genel Uzay',
    topic: 'Güneş ve Katmanları',
    question: 'Güneş’in hangi katmanında hidrojen atomları birleşerek helyuma dönüşür (nükleer füzyon) ve tüm Güneş Sistemi’ni aydınlatan enerji üretilir?',
    options: [
      'Korona (Taç Küre)',
      'Fotosfer (Işık Küre)',
      'Çekirdek',
      'Kromosfer (Renk Küre)'
    ],
    correctAnswerIndex: 2,
    explanation: 'Güneş’in enerjisi 15 milyon derece sıcaklıktaki çekirdeğinde nükleer füzyon reaksiyonlarıyla üretilir.',
    mebTip: 'Enerji sadece Çekirdekte üretilir, diğer katmanlar bu enerjiyi dışarı iletir.'
  }
];

// Başarı Rozetleri
export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  condition: string;
}

export const badgesList: Badge[] = [
  {
    id: 'solar_scholar',
    name: 'Güneş Bilgini',
    description: 'Güneş’in tüm iç ve dış katmanlarını interaktif olarak keşfettin.',
    icon: 'Sun',
    condition: 'Güneş katmanları bölümünü incele'
  },
  {
    id: 'planet_master',
    name: 'Gezegen Kaptanı',
    description: '8 gezegenin ve uydularının tüm özelliklerini detaylıca öğrendin.',
    icon: 'Orbit',
    condition: 'Tüm gezegen kartlarını aç'
  },
  {
    id: 'lunar_observer',
    name: 'Ay Gözlemcisi',
    description: 'Ay’ın 8 evresini ve tutulma modellerini başarıyla simüle ettin.',
    icon: 'Moon',
    condition: 'Ay evreleri simülatörünü tamamla'
  },
  {
    id: 'earth_geologist',
    name: 'Dünya Jeoloğu',
    description: 'Dünya’nın yer ve atmosfer katmanlarını derinlemesine inceledin.',
    icon: 'Globe',
    condition: 'Dünya katmanları cetvelini kullan'
  },
  {
    id: 'space_champion',
    name: 'Uzay Şampiyonu',
    description: 'Sınavda 10 ve üzeri soruyu ilk denemede doğru yanıtladın.',
    icon: 'Trophy',
    condition: 'Sınavda yüksek başarı göster'
  },
  {
    id: 'orbit_racer',
    name: 'Yörünge Ustası',
    description: 'Gezegen sıralama oyununda tüm gezegenleri doğru sıraya yerleştirdin.',
    icon: 'Rocket',
    condition: 'Gezegen dizme oyununu kazan'
  }
];
