#include <WiFi.h>
#include <WebServer.h>
#include <ESPmDNS.h>
#include <WiFiManager.h>

// Sensör Kütüphaneleri
#include <Adafruit_Sensor.h>
#include <DHT.h>
#include <LiquidCrystal_I2C.h>

// WiFiManager nesnesi oluştur
WiFiManager wifiManager;

// mDNS Host adı
const char* mdns_hostname = "plantelligence";

WebServer server(80);

// === Sensör Pin Tanımlamaları (Doğrudan Numaralar) ===
const int DHT_PIN = D12;        // DHT11 Deneyap Kart D12 pinine bağlı
const int SOIL_MOISTURE_PIN = A0; // Toprak Nem Sensörü Deneyap Kart A0 pinine bağlı (Analog)
const int LDR_PIN = A1;        // LDR (Işık) Sensörü Deneyap Kart A1 pinine bağlı (Analog)
const int EC_PIN = A2;         // Toprak Elektriksel İletkenlik (EC) Sensörü Deneyap Kart A2 pinine bağlı (Analog)

// === Sensör Nesneleri ===
#define DHTTYPE DHT11
DHT dht(DHT_PIN, DHTTYPE);

// LCD16x2 I2C tanımlaması
LiquidCrystal_I2C lcd(0x27, 16, 2); // LCD adresi 0x27, 16 sütun, 2 satır

// === Global Değişkenler (Sensör Verileri) ===
float sicaklik = 0.0; // t (°C)
int nem = 0;         // h (%) (Hava Nemi)
int toprakNemi = 0;  // s (%) (Toprak Nemi - 0-100 arası bir değere dönüştürülecek)
float isik = 0.0;     // l (lux veya ham ADC değeri) (LDR)
float iletkenlik = 0.0; // e (mS/cm) - GERÇEK sensörden okunacak
String durum = "statusInitializing"; // Sistem Durumu (Dil anahtarı olarak sakla)
int sinyalGucu = 0; // WiFi sinyal gücü (RSSI) (dBm)

// Simüle Değerler (Şimdilik renk sensörü simüle ediliyor)
int renkKirmizi = 100; // r (RGB 0-255) - Örnek değer
int renkYesil = 150; // g (RGB 0-255) - Örnek değer
int renkMavi = 80;   // b (RGB 0-255) - Örnek değer

// Sensör okuma ve LCD güncelleme aralığı (milisaniye)
const unsigned long UPDATE_INTERVAL = 5000; // Her 5 saniyede bir güncelle
unsigned long lastUpdateTime = 0;

// LCD ekran yönetimi
// 0: Ana Sensörler (Sıcaklık, Hava Nem)
// 1: Ana Sensörler (Toprak Nem, Işık)
// 2: Sistem Durumu ve WiFi Sinyali
// 3: Formüller (Growstorm ve AquaSync)
// 4: İletkenlik ve Renk (Simüle)
int lcdScreen = 0;
const int TOTAL_LCD_SCREENS = 5; // Toplam ekran sayısı 5 oldu


// JSON formatında veri döndürecek fonksiyon
void handleData() {
  // Gerçek sensör verilerini burada okuyun ve yukarıdaki global değişkenlere atayın

  // DHT11 Okuma
  float newSicaklik = dht.readTemperature();
  int newNem = dht.readHumidity();
  if (!isnan(newSicaklik)) { // Okuma başarılıysa
      sicaklik = newSicaklik;
  }
  if (!isnan(newNem)) { // Okuma başarılıysa
      nem = newNem;
  }

  // Toprak Nem Okuma (Analog)
  int rawToprakNemi = analogRead(SOIL_MOISTURE_PIN);
  int kuruDeger = 4095;
  int islakDeger = 1500;
  toprakNemi = map(rawToprakNemi, kuruDeger, islakDeger, 0, 100);
  toprakNemi = constrain(toprakNemi, 0, 100);

  // LDR Okuma (Analog)
  int rawIsik = analogRead(LDR_PIN);
  isik = map(rawIsik, 0, 4095, 0, 1000);

  // EC Sensörü Okuma (Analog A2)
  int rawIletkenlik = analogRead(EC_PIN);
  // !!! BURASI ÇOK ÖNEMLİ !!!
  // Analog değeri mS/cm gibi bir birime dönüştürmek için kalibrasyon gereklidir.
  // Bu, kullandığınız EC sensörüne ve devresine bağlıdır.
  // Aşağıdaki formül sadece bir örnektir ve doğru sonuç vermeyebilir.
  // Kendi sensörünüzün veri sayfasını veya örneklerini inceleyin.
  // Örnek: Basit bir doğrusal dönüşüm (kalibre edilmesi GEREKİR)
  float voltaj = rawIletkenlik * (3.3 / 4095.0); // Deneyap Kart 3.3V referans voltajı varsayılır
  // Bu voltaj değerini mS/cm'ye çevirmek için sensörünüzün kalibrasyonuna bakın.
  // Örnek olarak basit bir doğrusal model (GERÇEK DEĞİLDİR):
  iletkenlik = voltaj * 1.5; // Sadece bir örnek, kalibrasyon yapın!
  // İletkenlik genellikle 0.5 - 3.0 mS/cm aralığında olabilir (bitki türüne göre değişir)
  iletkenlik = constrain(iletkenlik, 0.0, 5.0); // Makul bir aralıkta tutalım


  // WiFi Sinyal Gücü
  sinyalGucu = WiFi.RSSI();

  // Durum mantığınıza göre 'durum' değişkenini güncelleyin (readSensors içinde yapılıyor)
  // Durum güncellemeleri artık readSensors fonksiyonunda yapılıyor.

  // Seçilen formüller için değerleri hesapla (GERÇEK sensör verileriyle)
  float growstormValue = sicaklik * isik * nem; // t * l * h
  float aquasyncValue = (float)toprakNemi * nem; // s * h

  // Bölme sıfır riskini yönet
  float saltburnValue = 0.0;
  bool saltburnValid = false;
  if (toprakNemi != 0 && nem != 0) {
     saltburnValue = (iletkenlik * iletkenlik) / ((float)toprakNemi * nem); // e² / (s * h)
     saltburnValid = true;
  } else {
      saltburnValid = false; // Geçersiz olduğunu işaretle
  }

  float emeraldValue = 0.0;
  bool emeraldValid = false;
   if (renkKirmizi != 0 && renkMavi != 0) {
       emeraldValue = (float)renkYesil / renkKirmizi / renkMavi; // g / r / b
       emeraldValid = true;
   } else {
       emeraldValid = false; // Geçersiz olduğunu işaretle
   }


  // JSON stringini oluştur
  String json = "{";
  json += "\"sicaklik\":" + String(sicaklik, 1) + ","; // 1 ondalık basamak
  json += "\"nem\":" + String(nem) + ",";
  json += "\"toprakNemi\":" + String(toprakNemi) + ",";
  json += "\"isik\":" + String(isik, 0) + ",";
  json += "\"iletkenlik\":" + String(iletkenlik, 2) + ","; // İletkenlik eklendi (2 ondalık)
  json += "\"sinyal\":" + String(sinyalGucu) + ",";
  json += "\"durum\":\"" + durum + "\""; // Durum artık dil anahtarı olarak gönderiliyor

  // Simüle formül değerlerini JSON'a ekle
  json += ",\"growstorm\":" + String(growstormValue, 2);
  json += ",\"aquasync\":" + String(aquasyncValue, 2);

  // Bölme sıfır riskini yöneterek JSON'a ekle
  if (saltburnValid) {
      json += ",\"saltburn\":" + String(saltburnValue, 2);
  } else {
      json += ",\"saltburn\":\"N/A\""; // Hata durumunda string gönder
  }

  if (emeraldValid) {
      json += ",\"emerald\":" + String(emeraldValue, 2); // Son eleman virgül almaz
  } else {
      json += ",\"emerald\":\"N/A\""; // Hata durumunda string gönder (Son eleman)
  }

  // Diğer simüle sensör verilerini de JSON'a ekleyebilirsiniz (renk vb.)
  // json += ",\"renkKirmizi\":" + String(renkKirmizi);
  // json += ",\"renkYesil\":" + String(renkYesil);
  // json += ",\"renkMavi\":" + String(renkMavi);

  json += "}"; // JSON stringini kapat

  // JSON yanıtını gönder
  server.send(200, "application/json", json);

  // Değerleri seri portta da gösterelim (opsiyonel, hata ayıklama için faydalı)
  Serial.print("Sicaklik: "); Serial.print(sicaklik);
  Serial.print(" C, Nem: "); Serial.print(nem);
  Serial.print(" %, Toprak Nem: "); Serial.print(toprakNemi);
  Serial.print(" %, Isik: "); Serial.print(isik);
  Serial.print(", EC: "); Serial.print(iletkenlik, 2); // EC değerini yazdır
  Serial.print(" mS/cm, Sinyal: "); Serial.print(sinyalGucu);
  Serial.print(" dBm, Durum: "); Serial.println(durum); // Durum anahtarını yazdır
  Serial.print("Simule Formuller: Growstorm="); Serial.print(growstormValue, 2);
  Serial.print(", AquaSync="); Serial.print(aquasyncValue, 2);
  Serial.print(", SaltBurn=");
  if (saltburnValid) Serial.print(saltburnValue, 2); else Serial.print("N/A");
  Serial.print(", Emerald=");
   if (emeraldValid) Serial.println(emeraldValue, 2); else Serial.println("N/A");
}


// Ana HTML sayfasını oluşturacak fonksiyon
void handleRoot() {
  String html = R"rawliteral(
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Plantelligence - Bitkiniz Artık Cebinizde</title>
    <style>
        /* === CSS Variables for Themes === */
        :root { /* Light Mode (Default) */
            --bg-color: #f4f7f6;
            --text-color: #333;
            --header-bg: #00796b; /* Deneyap Yeşili gibi */
            --header-text: white;
            --card-bg: white;
            --card-border: #e0e0e0;
            --card-title-color: #00796b;
            --value-color: #263238; /* Koyu Gri */
            --footer-color: #777;
            --status-ok: #4CAF50; /* Yeşil */
            --status-warning: #FFC107; /* Sarı */
            --status-error: #F44336; /* Kırmızı */
            --button-bg: #eee;
            --button-text: #333;
            --info-bg: white;
            --info-border: #e0e0e0;
            --info-title-color: #00796b;
            --table-header-bg: #e0e0e0;
            --table-border-color: #ccc;
            --tooltip-bg: #333;
            --tooltip-text: white;
            --plant-color-healthy: #4CAF50; /* Yeşil */
            --plant-color-warning: #FFC107; /* Sarı */
            --plant-color-error: #F44336; /* Kırmızı */
            /* Light Mode Background */
            --background: linear-gradient(to bottom right, #e0f2f7, #c8e6c9); /* Açık mavi ve açık yeşil gradyan */
        }

        body.dark-mode { /* Dark Mode */
            --bg-color: #2c3e50; /* Koyu Mavi/Gri */
            --text-color: #ecf0f1; /* Açık Gri */
            --header-bg: #1abc9c; /* Turkuaz Yeşili */
            --header-text: #34495e; /* Daha Koyu Mavi/Gri */
            --card-bg: #34495e;
            --card-border: #5e7d8a; /* Orta Gri/Mavi */
            --card-title-color: #1abc9c;
            --value-color: #ecf0f1;
            --footer-color: #bdc3c7; /* Orta Gri */
            --status-ok: #2ecc71; /* Zümrüt Yeşili */
            --status-warning: #f39c12; /* Turuncu */
            --status-error: #e74c3c; /* Kızıl Kırmızı */
            --button-bg: #5e7d8a;
            --button-text: #ecf0f1;
            --info-bg: #34495e;
            --info-border: #5e7d8a;
            --info-title-color: #1abc9c;
            --table-header-bg: #5e7d8a;
            --table-border-color: #777;
            --tooltip-bg: #eee;
            --tooltip-text: #333;
            --plant-color-healthy: #2ecc71; /* Koyu Mod Yeşil */
            --plant-color-warning: #f39c12; /* Koyu Mod Turuncu */
            --plant-color-error: #e74c3c; /* Koyu Mod Kızıl */
            /* Dark Mode Background */
            --background: linear-gradient(to bottom right, #1a2a3a, #3a4a5a); /* Koyu mavi/gri tonları */
        }

        /* === General Styles === */
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 0; /* Ana konteyner için padding kullanacağız */
            background: var(--background); /* Arka plan gradyanı */
            color: var(--text-color);
            display: flex;
            flex-direction: column;
            align-items: center;
            transition: background-color 0.5s ease, color 0.5s ease, background 0.5s ease; /* Tema geçişini yumuşat */
            min-height: 100vh; /* Sayfanın tam yüksekliğini kaplamasını sağla */
            background-attachment: fixed; /* Arka planın sabit kalmasını sağla */
        }

        /* === Splash Screen Styles === */
        #splash {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--header-bg); /* Tema başlık rengini kullan */
            color: var(--header-text);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 1000; /* En üstte olmasını sağla */
            opacity: 1;
            visibility: visible;
            transition: opacity 0.5s ease-out, visibility 0.5s ease-out;
            font-size: 2.5em; /* Büyük yazı */
            text-align: center;
            user-select: none; /* Metnin seçilmesini engelle */
        }
        #splash.fade-out {
            opacity: 0;
            visibility: hidden;
        }
        #splash h1 {
            margin: 0;
            font-size: 1em; /* Splash içindeki başlık boyutu */
            letter-spacing: 1px;
        }
         #splash p {
            margin-top: 10px;
            font-size: 0.5em; /* Slogan boyutu */
            opacity: 0.8;
        }


        /* === Header Styles === */
        .header {
            width: 100%;
            max-width: 800px;
            background-color: var(--header-bg);
            color: var(--header-text);
            padding: 20px;
            text-align: center;
            border-radius: 8px;
            margin-bottom: 30px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            position: relative; /* Tema ve Dil butonları için konumlandırma */
        }
        .header h1 {
            margin: 0 0 5px 0; /* Başlık altına biraz boşluk */
            font-size: 2.5em; /* Ana başlığı büyük yap */
            letter-spacing: 1px;
        }
         .header p {
            margin: 0;
            font-size: 1em; /* Slogan boyutu */
            opacity: 0.9;
        }

        /* === Header Buttons Container === */
        .header-buttons {
            position: absolute;
            top: 10px;
            right: 10px;
            display: flex;
            gap: 5px; /* Butonlar arası boşluk */
        }

        /* === Theme Toggle Button Styles === */
        #theme-toggle, #lang-toggle {
            padding: 8px 12px;
            background-color: var(--button-bg);
            color: var(--button-text);
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 0.9em;
            transition: background-color 0.3s ease, color 0.3s ease;
            outline: none; /* Tıklama anındaki çerçeveyi kaldır */
        }
         #theme-toggle:hover, #lang-toggle:hover {
            opacity: 0.9;
         }
          #theme-toggle:active, #lang-toggle:active {
             transform: scale(0.98);
          }

        /* === Main Status Section === */
        .main-status {
            width: 100%;
            max-width: 800px;
            background-color: var(--card-bg);
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            padding: 25px;
            margin-bottom: 30px;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
             transition: background-color 0.3s ease, color 0.3s ease;
        }
        .main-status h2 {
            margin-top: 0;
            color: var(--card-title-color);
            font-size: 1.8em;
            border-bottom: 2px solid var(--card-border);
            padding-bottom: 10px;
            margin-bottom: 15px;
            width: 100%; /* Başlığın tam genişliği kaplamasını sağla */
        }
         .main-status .status-display {
             font-size: 2em; /* Durum metnini büyük yap */
             font-weight: bold;
             margin-bottom: 20px;
         }
         /* Durum renklendirmesi */
        .main-status .status-ok { color: var(--status-ok); }
        .main-status .status-warning { color: var(--status-warning); }
        .main-status .status-error { color: var(--status-error); }


        /* === Plant Model Styles (Simple SVG) === */
        .plant-model {
            width: 100px; /* Bitki modelinin genişliği */
            height: 120px; /* Bitki modelinin yüksekliği */
            margin-bottom: 20px;
        }
         .plant-model svg {
             width: 100%;
             height: 100%;
         }
         .plant-stem {
             fill: #8B4513; /* Kök rengi (kahverengi) */
         }
         .plant-leaf {
             fill: var(--plant-color-healthy); /* Yaprak rengi (varsayılan sağlıklı yeşil) */
             transition: fill 0.5s ease; /* Renk değişimi animasyonu */
         }
          /* Duruma göre yaprak rengini değiştir */
         .plant-model.status-ok .plant-leaf { fill: var(--plant-color-healthy); }
         .plant-model.status-warning .plant-leaf { fill: var(--plant-color-warning); }
         .plant-model.status-error .plant-leaf { fill: var(--plant-color-error); }


        /* === Container and Card Styles === */
        .container {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 20px; /* Kartlar arası boşluk */
            width: 100%;
            max-width: 800px;
            padding: 0 20px; /* Konteynere yatay padding */
            box-sizing: border-box; /* Padding dahil genişlik hesapla */
            /* flex-grow kaldırıldı, info section'ın altına itmesi için */
        }
        .card {
            background-color: var(--card-bg);
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            padding: 25px;
            width: calc(50% - 30px); /* İki kart yan yana, gap'i düş */
            min-width: 280px; /* Küçük ekranlarda kartın minimum genişliği */
            box-sizing: border-box;
            transition: transform 0.2s ease-in-out, background-color 0.3s ease, color 0.3s ease;
            display: flex; /* Kart içeriği için flexbox */
            flex-direction: column;
        }
        .card:hover {
            transform: translateY(-5px); /* Hafif yukarı kaydır */
            box-shadow: 0 6px 15px rgba(0,0,0,0.15);
        }
        .card h2 {
            margin-top: 0;
            color: var(--card-title-color);
            font-size: 1.4em; /* Başlık boyutu */
            border-bottom: 2px solid var(--card-border);
            padding-bottom: 10px;
            margin-bottom: 15px;
            display: flex;
            align-items: center; /* İkon ve yazıyı dikeyde hizala */
            justify-content: space-between; /* Başlık ve buton arasına boşluk */
        }
         .card h2 .title-text { /* Başlık metni ve ikon için yeni konteyner */
             display: flex;
             align-items: center;
         }
         .card h2 .title-text span {
            margin-right: 10px; /* İkon ve yazı arasına boşluk */
            font-size: 1.3em; /* İkon boyutunu ayarla */
            line-height: 1; /* İkonun satır yüksekliğini ayarla */
         }

        .card p {
            font-size: 1.3em; /* Değer metni boyutu */
            margin: 10px 0;
            line-height: 1.6;
            flex-grow: 1;
            text-align: center; /* Değer ve birimi ortala */
            display: flex; /* İçeriği ortalamak için flexbox */
            justify-content: center; /* Yatayda ortala */
            align-items: center; /* Dikeyde ortala */
            flex-direction: column; /* Değer ve birimi alt alta al */
        }
         .card p .value-container { /* Değer ve birimi yan yana tutan container */
             display: flex;
             align-items: center;
             justify-content: center; /* Ortala */
             width: 100%; /* Tam genişlik */
         }
        .card .value {
            font-weight: bold;
            color: var(--value-color);
            font-size: 1.2em;
            margin-right: 5px; /* Değer ile birim arasına boşluk */
        }
         .card .unit { /* Birimler için ayrı stil */
             font-size: 0.9em;
             color: var(--text-color);
         }
        /* Durum renklendirmesi - !important, tema değişkenlerini ezmek için */
        .status-ok { color: var(--status-ok) !important; }
        .status-warning { color: var(--status-warning) !important; }
        .status-error { color: var(--status-error) !important; }

        /* === Info Button and Tooltip Styles === */
        .info-button {
            background: none;
            border: 1px solid var(--card-title-color); /* Yuvarlak çerçeve */
            border-radius: 50%; /* Tam yuvarlak */
            color: var(--card-title-color); /* İkon rengi */
            cursor: pointer;
            font-size: 0.8em; /* Buton içindeki 'i' boyutu */
            width: 20px; /* Buton genişliği */
            height: 20px; /* Buton yüksekliği */
            display: flex; /* İçeriği ortalamak için */
            justify-content: center; /* Yatayda ortala */
            align-items: center; /* Dikeyde ortala */
            padding: 0; /* İç boşluğu kaldır */
            margin-left: 10px; /* Başlık metni ile buton arasına boşluk */
            flex-shrink: 0; /* Küçük ekranlarda küçülmesini engelle */
            transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
            outline: none; /* Tıklama anındaki çerçeveyi kaldır */
        }
         .info-button:hover {
             background-color: var(--card-title-color); /* Hover'da arka plan rengi */
             color: var(--card-bg); /* Hover'da metin rengi */
         }
         .info-button:active {
             transform: scale(0.9); /* Tıklama efekti */
         }


        .tooltip {
            position: absolute;
            background-color: var(--tooltip-bg);
            color: var(--tooltip-text);
            padding: 10px;
            border-radius: 5px;
            font-size: 0.9em;
            z-index: 10; /* Diğer elementlerin üzerinde göster */
            max-width: 250px; /* Tooltip genişliği */
            text-align: left;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
            display: none; /* Başlangıçta gizli */
            pointer-events: none; /* Tooltip üzerine gelindiğinde butona tıklamayı engelleme */
            transform: translateX(-50%); /* Yatayda kendi genişliğinin yarısı kadar sola kaydır */
            left: 50%; /* Tıklanan elementin merkezine hizalamak için */
        }
         .tooltip::before { /* Tooltip oku */
             content: '';
             position: absolute;
             bottom: 100%; /* Okun yukarıda olmasını sağla */
             left: 50%;
             margin-left: -5px;
             border-width: 5px;
             border-style: solid;
             border-color: transparent transparent var(--tooltip-bg) transparent; /* Ok rengi ve yönü */
         }
          /* Tooltip oku aşağıda olduğunda */
         .tooltip.top-arrow::before {
             top: 100%;
             bottom: auto;
             border-color: var(--tooltip-bg) transparent transparent transparent;
         }


        /* === Info Section Styles === */
        .info-section {
            width: 100%;
            max-width: 800px;
            /* background-color kaldırıldı, iç div'e uygulanacak */
            border-radius: 8px; /* Genel section için border-radius */
            box-shadow: 0 2px 10px rgba(0,0,0,0.1); /* Genel section için shadow */
            margin-top: 30px; /* Kartlarla arasında boşluk */
            margin-bottom: 30px; /* Footer ile arasında boşluk */
            box-sizing: border-box;
            overflow: hidden; /* İçerik gizlendiğinde taşmayı engelle */
        }

         .info-header {
             background-color: var(--info-bg); /* Başlık arka planı */
             color: var(--info-title-color); /* Başlık metin rengi */
             padding: 15px 25px;
             font-size: 1.8em;
             font-weight: bold;
             cursor: pointer; /* Tıklanabilir olduğunu belirt */
             border-bottom: 2px solid var(--info-border);
             display: flex;
             justify-content: space-between; /* Başlık ve ikon arasına boşluk */
             align-items: center;
             transition: background-color 0.3s ease;
         }
          .info-header:hover {
               background-color: rgba(0,0,0,0.05); /* Hover efekti */
          }
           body.dark-mode .info-header:hover {
               background-color: rgba(255,255,255,0.05); /* Koyu mod hover efekti */
           }

         .info-header .toggle-icon {
             font-size: 0.8em; /* İkon boyutu */
             transition: transform 0.3s ease;
         }
          .info-header.collapsed .toggle-icon {
              transform: rotate(0deg); /* Kapalıyken aşağı ok */
          }
           .info-header:not(.collapsed) .toggle-icon {
              transform: rotate(180deg); /* Açıkken yukarı ok */
           }


        #info-details { /* Genel detay bölümü için ID */
            background-color: var(--info-bg); /* İçerik arka planı */
            padding: 20px 25px; /* İçerik paddingi */
            border-bottom-left-radius: 8px; /* Alt köşeleri yuvarla */
            border-bottom-right-radius: 8px;
            display: none; /* Başlangıçta gizli */
            opacity: 0; /* Geçiş için başlangıç opaklığı */
            max-height: 0; /* Geçiş için başlangıç yüksekliği */
            overflow: hidden; /* İçeriğin taşmasını engelle */
            transition: max-height 0.5s ease-out, opacity 0.5s ease-out, padding 0.5s ease-out; /* Yumuşak geçiş */
        }
         #info-details.expanded {
             display: block; /* Açıldığında görünür yap */
             opacity: 1; /* Opaklığı tam yap */
             max-height: 3000px; /* Yeterince büyük bir değer verin */
             padding: 20px 25px; /* Açıldığında paddingi ayarla */
         }

        /* === Table Styles === */
        .info-section table {
            width: 100%;
            border-collapse: collapse; /* Kenarlıkları birleştir */
            margin-top: 15px;
            font-size: 0.9em;
        }
        .info-section th, .info-section td {
            border: 1px solid var(--table-border-color);
            padding: 12px;
            text-align: left;
        }
        .info-section th {
            background-color: var(--table-header-bg);
            font-weight: bold;
            color: var(--text-color); /* Başlık metin rengi */
        }
         .info-section tr:nth-child(even) { /* Çift satırları farklı renklendir */
             background-color: rgba(0,0,0,0.03); /* Hafif bir arka plan */
         }
         body.dark-mode .info-section tr:nth-child(even) {
              background-color: rgba(255,255,255,0.03); /* Koyu modda hafif arka plan */
         }
        .info-section table code { /* Formül kodları için stil */
            font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
            background-color: rgba(0,0,0,0.05);
            padding: 2px 4px;
            border-radius: 4px;
        }
         body.dark-mode .info-section table code {
             background-color: rgba(255,255,255,0.05);
         }

        /* === Additional Info Sections Styles === */
        .additional-info-section {
            margin-top: 20px;
            padding-top: 20px;
            border-top: 2px solid var(--info-border);
        }
        .additional-info-section h3 {
            color: var(--card-title-color); /* Başlık rengi */
            font-size: 1.3em;
            margin-top: 0;
            margin-bottom: 15px;
        }
         .additional-info-section p, .additional-info-section ul {
             font-size: 1em;
             line-height: 1.6;
             margin-bottom: 15px;
         }
         .additional-info-section ul {
             padding-left: 20px;
         }
          .additional-info-section li {
              margin-bottom: 8px;
          }

         /* === Toggle Raw Button Styles === */
         .toggle-raw-button {
             padding: 5px 10px;
             background-color: var(--button-bg);
             color: var(--button-text);
             border: none;
             border-radius: 4px;
             cursor: pointer;
             font-size: 0.8em;
             margin-top: 10px; /* Değerin altına boşluk */
             transition: background-color 0.3s ease, color 0.3s ease;
             outline: none;
         }
          .toggle-raw-button:hover {
              opacity: 0.9;
          }
           .toggle-raw-button:active {
              transform: scale(0.98);
           }


        /* === Footer Styles === */
        footer {
            margin-top: auto; /* Footer'ı en alta it */
            padding: 20px;
            text-align: center;
            color: var(--footer-color);
            font-size: 0.9em;
            width: 100%;
            max-width: 800px;
            box-sizing: border-box;
        }

        /* === Responsive Adjustments === */
        @media (max-width: 600px) {
            .card {
                width: 100%; /* Küçük ekranlarda kartlar tam genişlik */
                min-width: auto; /* Minimum genişliği kaldır */
            }
             .header-buttons {
                position: static; /* Küçük ekranlarda butonları normal akışa al */
                justify-content: center; /* Ortala */
                margin-top: 10px;
                gap: 10px;
             }
             #theme-toggle, #lang-toggle {
                width: auto; /* Tam genişliği kaldır */
                flex-grow: 1; /* Eşit genişlik paylaşımı */
                margin: 0 5px; /* Yatay boşluk */
             }
             .header {
                padding-bottom: 20px; /* Butonlar normal akışa geçtiği için extra padding'e gerek yok */
             }
              .container, .info-section, .main-status { /* Main status'u da ekledik */
                 padding: 0 10px; /* Küçük ekranlarda daha az yatay padding */
                 gap: 15px; /* Küçük ekranlarda kartlar arası boşluğu azalt */
              }
              .info-section table, .info-section thead, .info-section tbody, .info-section th, .info-section td, .info-section tr {
                  display: block; /* Tabloyi blok elementlere dönüştür */
              }
               .info-section thead tr {
                   position: absolute;
                   top: -9999px;
                   left: -9999px; /* Başlıkları gizle */
               }
               .info-section tr { border: 1px solid var(--table-border-color); margin-bottom: 10px; }
               .info-section td {
                   border: none;
                   border-bottom: 1px solid var(--table-border-color);
                   position: relative;
                   padding-left: 50%; /* Başlık için yer aç */
                   text-align: right; /* İçeriği sağa yasla */
               }
               .info-section td:before {
                   position: absolute;
                   top: 6px;
                   left: 6px;
                   width: 45%;
                   padding-right: 10px;
                   white-space: nowrap;
                   content: attr(data-label); /* data-label özniteliğini kullan */
                   font-weight: bold;
                   text-align: left; /* Başlığı sola yasla */
                   color: var(--card-title-color); /* Başlık rengi */
               }
        }
    </style>
</head>
<body>

    <div id="splash">
        <h1 data-lang-key="splashTitle">Plantelligence</h1>
        <p data-lang-key="splashSlogan">Bitkiniz Artık Cebinizde</p>
    </div>

    <div class="header">
        <h1 data-lang-key="headerTitle">Plantelligence</h1>
        <p data-lang-key="headerSlogan">Bitkiniz Artık Cebinizde</p>
        <div class="header-buttons">
            <button id="theme-toggle" data-lang-key="themeToggleText">Koyu Moda Geç</button>
            <button id="lang-toggle" data-lang-key="langToggleText">English</button>
        </div>
    </div>

     <div class="main-status">
        <h2><span data-lang-key="mainStatusTitle">Genel Bitki Durumu</span></h2>
         <div id="plant-model" class="plant-model status-ok">
             <svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
                 <rect class="plant-stem" x="45" y="60" width="10" height="60"/>
                 <circle class="plant-leaf" cx="30" cy="70" r="15"/>
                 <circle class="plant-leaf" cx="70" cy="70" r="15"/>
                 <circle class="plant-leaf" cx="50" cy="40" r="20"/>
             </svg>
         </div>

        <p class="status-display"><span id="genel-durum">--</span></p>
    </div>


    <div class="container">
        <div class="card">
            <h2>
                <span class="title-text"> <span style='font-size: 1.2em; vertical-align: middle;'>🌡️</span>
                    <span data-lang-key="cardTitleTemp">Sıcaklık</span>
                </span>
                <button class="info-button" data-info-key="infoTemp">i</button>
            </h2>
            <p>
                <span class="value-container">
                    <span id="sicaklik-display" class="value">--</span> <span id="sicaklik-unit" class="unit">°C</span>
                </span>
            </p>
            <button class="toggle-raw-button" data-target-id="sicaklik" data-state="simplified" data-lang-key="showRawText">Gerçek Değeri Göster</button>
        </div>
        <div class="card">
            <h2>
                 <span class="title-text">
                    <span style='font-size: 1.2em; vertical-align: middle;'>💧</span>
                    <span data-lang-key="cardTitleHumidity">Hava Nem Oranı</span>
                 </span>
                 <button class="info-button" data-info-key="infoHumidity">i</button>
            </h2>
            <p>
                 <span class="value-container">
                    <span id="nem-display" class="value">--</span> <span id="nem-unit" class="unit">%</span>
                 </span>
            </p>
             <button class="toggle-raw-button" data-target-id="nem" data-state="simplified" data-lang-key="showRawText">Gerçek Değeri Göster</button>
        </div>
         <div class="card">
            <h2>
                 <span class="title-text">
                    <span style='font-size: 1.2em; vertical-align: middle;'>🌱</span>
                    <span data-lang-key="cardTitleSoilMoisture">Toprak Nem Oranı</span>
                 </span>
                 <button class="info-button" data-info-key="infoSoilMoisture">i</button>
            </h2>
            <p>
                <span class="value-container">
                    <span id="toprakNemi-display" class="value">--</span> <span id="toprakNemi-unit" class="unit">%</span>
                </span>
            </p>
             <button class="toggle-raw-button" data-target-id="toprakNemi" data-state="simplified" data-lang-key="showRawText">Gerçek Değeri Göster</button>
        </div>
         <div class="card">
            <h2>
                 <span class="title-text">
                    <span style='font-size: 1.2em; vertical-align: middle;'>☀️</span>
                    <span data-lang-key="cardTitleLight">Işık Seviyesi</span>
                 </span>
                 <button class="info-button" data-info-key="infoLight">i</button>
            </h2>
            <p>
                <span class="value-container">
                    <span id="isik-display" class="value">--</span> <span id="isik-unit" class="unit">%</span>
                </span>
            </p>
             <button class="toggle-raw-button" data-target-id="isik" data-state="simplified" data-lang-key="showRawText">Gerçek Değeri Göster</button>
        </div>
         <div class="card">
            <h2>
                 <span class="title-text">
                    <span style='font-size: 1.2em; vertical-align: middle;'>⚡</span>
                    <span data-lang-key="cardTitleEC">Toprak İletkenliği (EC)</span>
                 </span>
                 <button class="info-button" data-info-key="infoEC">i</button>
            </h2>
            <p>
                 <span class="value-container">
                    <span id="iletkenlik-display" class="value">--</span> <span id="iletkenlik-unit" class="unit"></span>
                 </span>
            </p>
             <button class="toggle-raw-button" data-target-id="iletkenlik" data-state="simplified" data-lang-key="showRawText">Gerçek Değeri Göster</button>
        </div>
        <div class="card">
            <h2>
                 <span class="title-text">
                    <span style='font-size: 1.2em; vertical-align: middle;'>📡</span>
                    <span data-lang-key="cardTitleWifi">WiFi Sinyali</span>
                 </span>
                 <button class="info-button" data-info-key="infoWifi">i</button>
            </h2>
            <p>
                <span class="value-container">
                    <span id="sinyal-display" class="value">--</span> <span id="sinyal-unit" class="unit"></span>
                </span>
            </p>
             <button class="toggle-raw-button" data-target-id="sinyal" data-state="simplified" data-lang-key="showRawText">Gerçek Değeri Göster</button>
        </div>
        <div class="card">
            <h2>
                 <span class="title-text">
                    <span style='font-size: 1.2em; vertical-align: middle;'>ℹ️</span>
                    <span data-lang-key="cardTitleStatus">Sistem Durumu</span>
                 </span>
                 <button class="info-button" data-info-key="infoStatus">i</button>
            </h2>
            <p><span id="durum" class="value">--</span></p>
             </div>
        <div class="card">
            <h2>
                 <span class="title-text">
                    <span style='font-size: 1.2em; vertical-align: middle;'>⚡</span>
                    <span data-lang-key="cardTitleGrowstorm">Growstorm Endeksi</span>
                 </span>
                 <button class="info-button" data-info-key="infoGrowstorm">i</button>
            </h2>
            <p><span id="growstorm-value" class="value">--</span> <span class="unit">°C·lux·%</span></p>
             </div>
        <div class="card">
            <h2>
                 <span class="title-text">
                    <span style='font-size: 1.2em; vertical-align: middle;'>🌊</span>
                    <span data-lang-key="cardTitleAquaSync">Aqua Senkronizasyon</span>
                 </span>
                 <button class="info-button" data-info-key="infoAquaSync">i</button>
            </h2>
            <p><span id="aquasync-value" class="value">--</span> <span class="unit">%·%</span></p>
             </div>
         <div class="card">
            <h2>
                 <span class="title-text">
                    <span style='font-size: 1.2em; vertical-align: middle;'>🔥</span>
                    <span data-lang-key="cardTitleSaltBurn">Tuz Yanığı Potansiyeli</span>
                 </span>
                 <button class="info-button" data-info-key="infoSaltBurn">i</button>
            </h2>
            <p><span id="saltburn-value" class="value">--</span> <span class="unit">(mS/cm)²/%²</span></p>
             </div>
         <div class="card">
            <h2>
                 <span class="title-text">
                    <span style='font-size: 1.2em; vertical-align: middle;'>🟢</span>
                    <span data-lang-key="cardTitleEmerald">Zümrüt Oranı</span>
                 </span>
                 <button class="info-button" data-info-key="infoEmerald">i</button>
            </h2>
            <p><span id="emerald-value" class="value">--</span> <span class="unit">birimsiz</span></p>
             </div>
        </div>

    <div class="info-section">
        <div class="info-header collapsed" data-lang-key="infoSectionHeader">
            Meraklısı İçin Bilgiler
            <span class="toggle-icon">▼</span>
        </div>
        <div id="info-details"> <div id="formula-details-content"> <h3><span data-lang-key="formulaListTitle">Hesaplanan Formüller</span></h3>
                <table>
                    <thead>
                        <tr>
                            <th data-lang-key="tableHeaderHash">#</th>
                            <th data-lang-key="tableHeaderScientific">Bilimsel Adı</th>
                            <th data-lang-key="tableHeaderPopular">Popüler Adı</th>
                            <th data-lang-key="tableHeaderFormula">Formül</th>
                            <th data-lang-key="tableHeaderUnit">Birim</th>
                            <th data-label="Interpretation" data-lang-key="tableHeaderInterpretation">Yorumlama</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td data-label="#" data-lang-key="formulaId1">1</td>
                            <td data-label="Scientific Name" data-lang-key="formulaScientific1">Inverse Temperature Factor</td>
                            <td data-label="Popular Name" data-lang-key="formulaPopular1">Chill Factor</td>
                            <td data-label="Formula"><code>100 / t</code></td>
                            <td data-label="Unit" data-lang-key="formulaUnit1">1/°C</td>
                            <td data-label="Interpretation" data-lang-key="formulaInterpretation1">Soğukluk şiddetini ölçer.</td>
                        </tr>
                        <tr>
                            <td data-label="#" data-lang-key="formulaId2">2</td>
                            <td data-label="Scientific Name" data-lang-key="formulaScientific2">Thermal-Light-Humidity Index</td>
                            <td data-label="Popular Name" data-lang-key="formulaPopular2">Growstorm Index</td>
                            <td data-label="Formula"><code>t * l * h</code></td>
                            <td data-label="Unit" data-lang-key="formulaUnit2">°C·lux·%</td>
                            <td data-label="Interpretation" data-lang-key="formulaInterpretation2">Üretkenlik artırıcı.</td>
                        </tr>
                         <tr>
                            <td data-label="#" data-lang-key="formulaId3">3</td>
                            <td data-label="Scientific Name" data-lang-key="formulaScientific3">Air-to-Soil Moisture Ratio</td>
                            <td data-label="Popular Name" data-lang-key="formulaPopular3">Dry Drift</td>
                            <td data-label="Formula"><code>h / s</code></td>
                            <td data-label="Unit" data-lang-key="formulaUnit3">birimsiz</td>
                            <td data-label="Interpretation" data-lang-key="formulaInterpretation3">Hava ve toprak nemi arasındaki fark.</td>
                        </tr>
                         <tr>
                            <td data-label="#" data-lang-key="formulaId4">4</td>
                            <td data-label="Scientific Name" data-lang-key="formulaScientific4">Soil-to-Air Moisture Ratio</td>
                            <td data-label="Popular Name" data-lang-key="formulaPopular4">Mud Surge</td>
                            <td data-label="Formula"><code>s / h</code></td>
                            <td data-label="Unit" data-lang-key="formulaUnit4">birimsiz</td>
                            <td data-label="Interpretation" data-lang-key="formulaInterpretation4">Yukarıdakinin tersi.</td>
                        </tr>
                         <tr>
                            <td data-label="#" data-lang-key="formulaId5">5</td>
                            <td data-label="Scientific Name" data-lang-key="formulaScientific5">Moisture Interaction Index</td>
                            <td data-label="Popular Name" data-lang-key="formulaPopular5">Aqua Sync</td>
                            <td data-label="Formula"><code>s * h</code></td>
                            <td data-label="Unit" data-lang-key="formulaUnit5">%·%</td>
                            <td data-label="Interpretation" data-lang-key="formulaInterpretation5">Genel su mevcudiyeti.</td>
                        </tr>
                         <tr>
                            <td data-label="#" data-lang-key="formulaId6">6</td>
                            <td data-label="Scientific Name" data-lang-key="formulaScientific6">Thermal Light Load</td>
                            <td data-label="Popular Name" data-lang-key="formulaPopular6">Radiant Heat Index</td>
                            <td data-label="Formula"><code>t * l</code></td>
                            <td data-label="Unit" data-lang-key="formulaUnit6">°C·lux</td>
                            <td data-label="Interpretation" data-lang-key="formulaInterpretation6">Isı ve ışık maruziyeti kombinasyonu.</td>
                        </tr>
                         <tr>
                            <td data-label="#" data-lang-key="formulaId7">7</td>
                            <td data-label="Scientific Name" data-lang-key="formulaScientific7">Enhanced Thermal-Light Index</td>
                            <td data-label="Popular Name" data-lang-key="formulaPopular7">Blaze Factor</td>
                            <td data-label="Formula"><code>t² * l²</code></td>
                            <td data-label="Unit" data-lang-key="formulaUnit7">(°C·lux)²</td>
                            <td data-label="Interpretation" data-lang-key="formulaInterpretation7">Güçlendirilmiş enerji etkisi.</td>
                        </tr>
                         <tr>
                            <td data-label="#" data-lang-key="formulaId8">8</td>
                            <td data-label="Scientific Name" data-lang-key="formulaScientific8">Conductivity-to-Soil Moisture Ratio</td>
                            <td data-label="Popular Name" data-lang-key="formulaPopular8">Saline Stress Ratio</td>
                            <td data-label="Formula"><code>e / s</code></td>
                            <td data-label="Unit" data-lang-key="formulaUnit8">(mS/cm)/%</td>
                            <td data-label="Interpretation" data-lang-key="formulaInterpretation8">Tuzluluk-su riski ölçüsü.</td>
                        </tr>
                         <tr>
                            <td data-label="#" data-lang-key="formulaId9">9</td>
                            <td data-label="Scientific Name" data-lang-key="formulaScientific9">Soil Electro-Hydration Index</td>
                            <td data-label="Popular Name" data-lang-key="formulaPopular9">Wet Spark</td>
                            <td data-label="Birim" data-lang-key="formulaUnit9">(mS/cm)·%</td>
                            <td data-label="Interpretation" data-lang-key="formulaInterpretation9">Nemli iletkenlik.</td>
                        </tr>
                         <tr>
                            <td data-label="#" data-lang-key="formulaId10">10</td>
                            <td data-label="Scientific Name" data-lang-key="formulaScientific10">Full Environmental Interaction Index</td>
                            <td data-label="Popular Name" data-lang-key="formulaPopular10">Biocharge Index</td>
                            <td data-label="Formula"><code>t * l * h * s</code></td>
                            <td data-label="Unit" data-lang-key="formulaUnit10">°C·lux·%·%</td>
                            <td data-label="Interpretation" data-lang-key="formulaInterpretation10">Kombine çevresel yük.</td>
                        </tr>
                         <tr>
                            <td data-label="#" data-lang-key="formulaId11">11</td>
                            <td data-label="Scientific Name" data-lang-key="formulaScientific11">Conductivity Stress Index</td>
                            <td data-label="Popular Name" data-lang-key="formulaPopular11">Salt Burn Potential</td>
                            <td data-label="Formula"><code>e² / (s * h)</code></td>
                            <td data-label="Unit" data-lang-key="formulaUnit11">(mS/cm)²/%²</td>
                            <td data-label="Interpretation" data-lang-key="formulaInterpretation11">Tuzluluğun büyümeye nasıl zarar verebileceği.</td>
                        </tr>
                         <tr>
                            <td data-label="#" data-lang-key="formulaId12">12</td>
                            <td data-label="Scientific Name" data-lang-key="formulaScientific12">Thermal Stress Load</td>
                            <td data-label="Popular Name" data-lang-key="formulaPopular12">Sunburn Torque</td>
                            <td data-label="Formula"><code>t⁴ / e</code></td>
                            <td data-label="Unit" data-lang-key="formulaUnit12">°C⁴/(mS/cm)</td>
                            <td data-label="Interpretation" data-lang-key="formulaInterpretation12">Yoğun ısı yükü.</td>
                        </tr>
                         <tr>
                            <td data-label="#" data-lang-key="formulaId13">13</td>
                            <td data-label="Scientific Name" data-lang-key="formulaScientific13">Chlorophyll-Red Modulation</td>
                            <td data-label="Popular Name" data-lang-key="formulaPopular13">Leaffire Ratio</td>
                            <td data-label="Formula"><code>g * r / b</code></td>
                            <td data-label="Unit" data-lang-key="formulaUnit13">RGB birimleri</td>
                            <td data-label="Interpretation" data-lang-key="formulaInterpretation13">Renk stresi analizi.</td>
                        </tr>
                         <tr>
                            <td data-label="#" data-lang-key="formulaId14">14</td>
                            <td data-label="Scientific Name" data-lang-key="formulaScientific14">Green Dominance Ratio</td>
                            <td data-label="Popular Name" data-lang-key="formulaPopular14">Emerald Ratio</td>
                            <td data-label="Birim" data-lang-key="formulaUnit14">birimsiz</td>
                            <td data-label="Interpretation" data-lang-key="formulaInterpretation14">Sağlıklı yeşilliği gösterir.</td>
                        </tr>
                         <tr>
                            <td data-label="#" data-lang-key="formulaId15">15</td>
                            <td data-label="Scientific Name" data-lang-key="formulaScientific15">Leaf Color Brightness to Light Ratio</td>
                            <td data-label="Popular Name" data-lang-key="formulaPopular15">Leafshine Quotient</td>
                            <td data-label="Formula"><code>(g + r + b) / l</code></td>
                            <td data-label="Unit" data-lang-key="formulaUnit15">RGB/lux</td>
                            <td data-label="Interpretation" data-lang-key="formulaInterpretation15">Yansıtma kalitesi.</td>
                        </tr>
                         <tr>
                            <td data-label="#" data-lang-key="formulaId16">16</td>
                            <td data-label="Scientific Name" data-lang-key="formulaScientific16">Soil Color Red-Green Mix</td>
                            <td data-label="Popular Name" data-lang-key="formulaPopular16">Mudblood Ratio</td>
                            <td data-label="Formula"><code>g' * r' / b'</code></td>
                            <td data data-label="Unit" data-lang-key="formulaUnit16">birimsiz</td>
                            <td data-label="Interpretation" data-lang-key="formulaInterpretation16">Toprak tonu dengesi.</td>
                        </tr>
                         <tr>
                            <td data-label="#" data-lang-key="formulaId17">17</td>
                            <td data-label="Scientific Name" data-lang-key="formulaScientific17">Soil Red Saturation Ratio</td>
                            <td data-label="Popular Name" data-lang-key="formulaPopular17">Ember Soil Index</td>
                            <td data-label="Formula"><code>r' / g' / b'</code></td>
                            <td data-label="Unit" data-lang-key="formulaUnit17">birimsiz</td>
                            <td data-label="Interpretation" data-lang-key="formulaInterpretation17">Toprak renginde kırmızı eğilimi.</td>
                        </tr>
                         <tr>
                            <td data-label="#" data-lang-key="formulaId18">18</td>
                            <td data-label="Scientific Name" data-lang-key="formulaScientific18">Soil Color Brightness to Light Ratio</td>
                            <td data-label="Popular Name" data-lang-key="formulaPopular18">Dirtshine Quotient</td>
                            <td data-label="Formula"><code>(g' + r' + b') / l</code></td>
                            <td data-label="Unit" data-lang-key="formulaUnit18">RGB/lux</td>
                            <td data-label="Interpretation" data-lang-key="formulaInterpretation18">Toprak yansıtıcılığı.</td>
                        </tr>
                    </tbody>
                </table>
                 <p style="font-size: 0.8em; margin-top: 20px; color: var(--footer-color);" data-lang-key="formulaNote">
                    *Not: Yukarıdaki formüllerin çoğu varsayımsaldır ve gerçek bitki bilimi hesaplamalarından farklı olabilir.
                    Burada sadece projenizin potansiyelini göstermek amacıyla eklenmiştir.
                    't': sıcaklık, 'l': ışık, 'h': hava nemi, 's': toprak nemi, 'e': iletkenlik,
                    'r, g, b': yaprak rengi RGB değerleri, 'r', g', b' : toprak rengi RGB değerleri.
                 </p>
            </div>

            <div id="disease-info-content" class="additional-info-section"> <h3><span data-lang-key="diseaseTitle">Olası Hastalık Durumları ve Tehlikeler</span></h3>
                 <p data-lang-key="diseaseIntro">Bitki sağlığını etkileyebilecek bazı yaygın durumlar ve sensör verilerine göre olası göstergeleri:</p>
                 <ul>
                     <li data-lang-key="diseaseDrought">
                         <strong>Kuraklık Stresi (Drought Stress):</strong> Düşük toprak nemi, yüksek sıcaklık ve düşük hava nemi kombinasyonu. Yapraklarda solma, kuruma görülebilir.
                     </li>
                     <li data-lang-key="diseaseHeat">
                         <strong>Isı Stresi (Heat Stress):</strong> Aşırı yüksek sıcaklık, özellikle yüksek ışık seviyesi ile birlikte. Yapraklarda yanıklar, renk solması olabilir.
                     </li>
                     <li data-lang-key="diseaseOverwatering">
                         <strong>Aşırı Sulama/Kök Çürüklüğü (Overwatering/Root Rot):</strong> Sürekli yüksek toprak nemi. Yapraklarda sararma, solma, köklerde yumuşama görülebilir.
                     </li>
                     <li data-lang-key="diseaseMoldFungus">
                         <strong>Küf ve Mantar (Mold and Fungus):</strong> Yüksek hava nemi ve düşük ışık seviyesi kombinasyonu. Yapraklarda beyaz/gri lekeler, küf oluşumu görülebilir.
                     </li>
                      <li data-lang-key="diseaseSalt">
                         <strong>Tuz Stresi (Salt Stress):</strong> Yüksek toprak iletkenliği. Yaprak uçlarında kuruma, yanma, büyümede yavaşlama görülebilir. (Bu durum için iletkenlik sensörü gereklidir.)
                     </li>
                     </ul>
            </div>

             <div id="explanation-info-content" class="additional-info-section"> <h3><span data-lang-key="explanationTitle">Bu Durumların Açıklamaları</span></h3>
                 <p data-lang-key="explanationIntro">Yukarıdaki durumların sensör verileriyle nasıl ilişkilendirilebileceğine dair basit açıklamalar:</p>
                 <ul>
                     <li data-lang-key="explanationDrought">
                         <strong>Kuraklık:</strong> Toprak nemi belirli bir eşiğin altına düştüğünde ve hava nemi de düşükse, bitki yeterince su alamıyor demektir. Yüksek sıcaklık bu durumu daha da kötüleştirir.
                     </li>
                      <li data-lang-key="explanationHeat">
                         <strong>Isı Stresi:</strong> Bitkiler belirli bir sıcaklık aralığında en iyi şekilde büyür. Bu aralığın çok üzerine çıkıldığında, özellikle güçlü güneş ışığı altında, bitkinin hücreleri zarar görebilir.
                     </li>
                      <li data-lang-key="explanationOverwatering">
                         <strong>Aşırı Sulama:</strong> Toprak sürekli olarak çok ıslak kalırsa, kökler oksijen alamaz ve çürümeye başlar. Bu, bitkinin su ve besin alımını engeller.
                     </li>
                      <li data-lang-key="explanationMoldFungus">
                         <strong>Küf ve Mantar:</strong> Çoğu mantar ve küf türü nemli ve az ışıklı ortamlarda hızla yayılır. Yüksek hava nemi ve yetersiz ışık bu tür hastalıklar için ideal zemin hazırlar.
                     </li>
                       <li data-lang-key="explanationSalt">
                         <strong>Tuz Stresi:</strong> Sulama suyundaki veya gübredeki aşırı tuz birikimi toprağın iletkenliğini artırır. Yüksek tuz konsantrasyonu, bitkinin köklerinin suyu emmesini zorlaştırır ve hatta yapraklara zarar verebilir.
                     </li>
                      </ul>
             </div>

        </div>
    </div>


    <footer>
        <p data-lang-key="footerText">&copy; 2025 Plantelligence | Deneyap Kart Web Arayüzü</p>
    </footer>

    <div id="tooltip" class="tooltip"></div>


    <script>
        // Language Strings
        const languageStrings = {
            tr: {
                splashTitle: 'Plantelligence',
                splashSlogan: 'Bitkiniz Artık Cebinizde',
                headerTitle: 'Plantelligence',
                headerSlogan: 'Bitkiniz Artık Cebinizde',
                themeToggleText: 'Koyu Moda Geç',
                langToggleText: 'English',
                mainStatusTitle: 'Genel Bitki Durumu', // Yeni başlık
                cardTitleTemp: 'Sıcaklık',
                cardTitleHumidity: 'Hava Nem Oranı',
                cardTitleSoilMoisture: 'Toprak Nem Oranı',
                cardTitleLight: 'Işık Seviyesi',
                cardTitleEC: 'Toprak İletkenliği (EC)', // Yeni EC kart başlığı
                cardTitleWifi: 'WiFi Sinyali',
                cardTitleStatus: 'Sistem Durumu',
                cardTitleGrowstorm: 'Growstorm Endeksi',
                cardTitleAquaSync: 'Aqua Senkronizasyon',
                cardTitleSaltBurn: 'Tuz Yanığı Potansiyeli',
                cardTitleEmerald: 'Zümrüt Oranı',
                infoSectionHeader: 'Meraklısı İçin Bilgiler',
                formulaListTitle: 'Hesaplanan Formüller',
                tableHeaderHash: '#',
                tableHeaderScientific: 'Bilimsel Adı',
                tableHeaderPopular: 'Popüler Adı',
                tableHeaderFormula: 'Formül',
                tableHeaderUnit: 'Birim',
                tableHeaderInterpretation: 'Yorumlama',
                formulaId1: '1', formulaScientific1: 'Inverse Temperature Factor', formulaPopular1: 'Chill Factor', formulaUnit1: '1/°C', formulaInterpretation1: 'Soğukluk şiddetini ölçer.',
                formulaId2: '2', formulaScientific2: 'Thermal-Light-Humidity Index', formulaPopular2: 'Growstorm Index', formulaUnit2: '°C·lux·%', formulaInterpretation2: 'Üretkenlik artırıcı.',
                formulaId3: '3', formulaScientific3: 'Air-to-Soil Moisture Ratio', formulaPopular3: 'Dry Drift', formulaUnit3: 'birimsiz', formulaInterpretation3: 'Hava ve toprak nemi arasındaki fark.',
                formulaId4: '4', formulaScientific4: 'Soil-to-Air Moisture Ratio', formulaPopular4: 'Mud Surge', formulaUnit4: 'birimsiz', formulaInterpretation4: 'Yukarıdakinin tersi.',
                formulaId5: '5', formulaScientific5: 'Moisture Interaction Index', formulaPopular5: 'Aqua Sync', formulaUnit5: '%·%', formulaInterpretation5: 'Genel su mevcudiyeti.',
                formulaId6: '6', formulaScientific6: 'Thermal Light Load', formulaPopular6: 'Radiant Heat Index', formulaUnit6: '°C·lux', formulaInterpretation6: 'Isı ve ışık maruziyeti kombinasyonu.',
                formulaId7: '7', formulaScientific7: 'Enhanced Thermal-Light Index', formulaPopular7: 'Blaze Factor', formulaUnit7: '(°C·lux)²', formulaInterpretation7: 'Güçlendirilmiş enerji etkisi.',
                formulaId8: '8', formulaScientific8: 'Conductivity-to-Soil Moisture Ratio', formulaPopular8: 'Saline Stress Ratio', formulaUnit8: '(mS/cm)/%', formulaInterpretation8: 'Tuzluluk-su riski ölçüsü.',
                formulaId9: '9', formulaScientific9: 'Soil Electro-Hydration Index', formulaPopular9: 'Wet Spark', formulaUnit9: '(mS/cm)·%', formulaInterpretation9: 'Nemli iletkenlik.',
                formulaId10: '10', formulaScientific10: 'Full Environmental Interaction Index', formulaPopular10: 'Biocharge Index', formulaUnit10: '°C·lux·%·%', formulaInterpretation10: 'Kombine çevresel yük.',
                formulaId11: '11', formulaScientific11: 'Conductivity Stress Index', formulaPopular11: 'Salt Burn Potential', formulaUnit11: '(mS/cm)²/%²', formulaInterpretation11: 'Tuzluluğun büyümeye nasıl zarar verebileceği.',
                formulaId12: '12', formulaScientific12: 'Thermal Stress Load', formulaPopular12: 'Sunburn Torque', formulaUnit12: '°C⁴/(mS/cm)', formulaInterpretation12: 'Yoğun ısı yükü.',
                formulaId13: '13', formulaScientific13: 'Chlorophyll-Red Modulation', formulaPopular13: 'Leaffire Ratio', formulaUnit13: 'RGB birimleri', formulaInterpretation13: 'Renk stresi analizi.',
                formulaId14: '14', formulaScientific14: 'Green Dominance Ratio', formulaPopular14: 'Emerald Ratio', formulaUnit14: 'birimsiz', formulaInterpretation14: 'Sağlıklı yeşilliği gösterir.',
                formulaId15: '15', formulaScientific15: 'Leaf Color Brightness to Light Ratio', formulaPopular15: 'Leafshine Quotient', formulaUnit15: 'RGB/lux', formulaInterpretation15: 'Yansıtma kalitesi.',
                formulaId16: '16', formulaScientific16: 'Soil Color Red-Green Mix', formulaPopular16: 'Mudblood Ratio', formulaUnit16: 'birimsiz', formulaInterpretation16: 'Toprak tonu dengesi.',
                formulaId17: '17', formulaScientific17: 'Soil Red Saturation Ratio', formulaPopular17: 'Ember Soil Index', formulaUnit17: 'birimsiz', formulaInterpretation17: 'Toprak renginde kırmızı eğilimi.',
                formulaId18: '18', formulaScientific18: 'Soil Color Brightness to Light Ratio', formulaPopular18: 'Dirtshine Quotient', formulaUnit18: 'RGB/lux', formulaInterpretation18: 'Toprak yansıtıcılığı.',
                formulaNote: '*Not: Yukarıdaki formüllerin çoğu varsayımsaldır ve gerçek bitki bilimi hesaplamalarından farklı olabilir. Burada sadece projenizin potansiyelini göstermek amacıyla eklenmiştir. \'t\': sıcaklık, \'l\': ışık, \'h\': hava nemi, \'s\': toprak nemi, \'e\': iletkenlik, \'r, g, b\': yaprak rengi RGB değerleri, \'r\', g\', b\' : toprak rengi RGB değerleri.' ,
                diseaseTitle: 'Olası Hastalık Durumları ve Tehlikeler',
                diseaseIntro: 'Bitki sağlığını etkileyebilecek bazı yaygın durumlar ve sensör verilerine göre olası göstergeleri:',
                diseaseDrought: '<strong>Kuraklık Stresi (Drought Stress):</strong> Düşük toprak nemi, yüksek sıcaklık ve düşük hava nemi kombinasyonu. Yapraklarda solma, kuruma görülebilir.',
                diseaseHeat: '<strong>Isı Stresi (Heat Stress):</strong> Aşırı yüksek sıcaklık, özellikle yüksek ışık seviyesi ile birlikte. Yapraklarda yanıklar, renk solması olabilir.',
                diseaseOverwatering: '<strong>Aşırı Sulama/Kök Çürüklüğü (Overwatering/Root Rot):</strong> Sürekli yüksek toprak nemi. Yapraklarda sararma, solma, köklerde yumuşama görülebilir.',
                diseaseMoldFungus: '<strong>Küf ve Mantar (Mold and Fungus):</strong> Yüksek hava nemi ve düşük ışık seviyesi kombinasyonu. Yapraklarda beyaz/gri lekeler, küf oluşumu görülebilir.',
                diseaseSalt: '<strong>Tuz Stresi (Salt Stress):</strong> Yüksek toprak iletkenliği. Yaprak uçlarında kuruma, yanma, büyümede yavaşlama görülebilir. (Bu durum için iletkenlik sensörü gereklidir.)',
                explanationTitle: 'Bu Durumların Açıklamaları',
                explanationIntro: 'Yukarıdaki durumların sensör verileriyle nasıl ilişkilendirilebileceğine dair basit açıklamalar:',
                explanationDrought: '<strong>Kuraklık:</strong> Toprak nemi belirli bir eşiğin altına düştüğünde ve hava nemi de düşükse, bitki yeterince su alamıyor demektir. Yüksek sıcaklık bu durumu daha da kötüleştirir.',
                explanationHeat: '<strong>Isı Stresi:</strong> Bitkiler belirli bir sıcaklık aralığında en iyi şekilde büyür. Bu aralığın çok üzerine çıkıldığında, özellikle güçlü güneş ışığı altında, bitkinin hücreleri zarar görebilir.',
                explanationOverwatering: '<strong>Aşırı Sulama:</strong> Toprak sürekli olarak çok ıslak kalırsa, kökler oksijen alamaz ve çürümeye başlar. Bu, bitkinin su ve besin alımını engeller.',
                explanationMoldFungus: '<strong>Küf ve Mantar:</strong> Çoğu mantar ve küf türü nemli ve az ışıklı ortamlarda hızla yayılır. Yüksek hava nemi ve yetersiz ışık bu tür hastalıklar için ideal zemin hazırlar.',
                explanationSalt: '<strong>Tuz Stresi:</strong> Sulama suyundaki veya gübredeki aşırı tuz birikimi toprağın iletkenliğini artırır. Yüksek tuz konsantrasyonu, bitkinin köklerinin suyu emmesini zorlaştırır ve hatta yapraklara zarar verebilir.',
                footerText: '&copy; 2025 Plantelligence | Deneyap Kart Web Arayüzü',
                // Bilgi Butonu Açıklamaları
                infoTemp: 'Ortam sıcaklığı. Bitki sağlığı için ideal sıcaklık aralığı önemlidir.',
                infoHumidity: 'Ortamdaki hava nem oranı. Bitkinin terlemesi (transpirasyon) ve genel sağlığı için önemlidir.',
                infoSoilMoisture: 'Toprağın nem oranı. Bitkinin köklerinden su alabilmesi için yeterli nem seviyesi kritik öneme sahiptir.',
                infoLight: 'Ortamdaki ışık seviyesi. Bitkinin fotosentez yapması ve büyümesi için gereklidir.',
                infoEC: 'Toprağın elektriksel iletkenliği (EC). Topraktaki çözünmüş tuz miktarını gösterir. Yüksek EC, tuz stresi riskini artırır.', // Yeni EC bilgi metni
                infoWifi: 'Deneyap Kart\'ın bağlı olduğu WiFi ağının sinyal gücü. Bağlantı kalitesini gösterir.',
                infoStatus: 'Sensör verilerine göre belirlenen genel bitki sağlığı durumu.',
                infoGrowstorm: 'Sıcaklık, ışık ve hava neminin birleşimiyle hesaplanan varsayımsal bir endeks. Yüksek değerler genellikle hızlı büyüme potansiyelini gösterebilir.',
                infoAquaSync: 'Toprak ve hava neminin birleşimiyle hesaplanan varsayımsal bir endeks. Genel su mevcudiyetini ve dengesini gösterebilir.',
                infoSaltBurn: 'Toprak iletkenliği (tuzluluk) ve nem oranlarına göre hesaplanan varsayımsal bir endeks. Yüksek değerler tuz yanığı riskini gösterebilir.',
                infoEmerald: 'Yaprak renklerinin oranına göre hesaplanan varsayımsal bir endeks. Yüksek değerler sağlıklı ve canlı yeşil yaprakları gösterebilir.',
                // Durum Mesajları (Anahtarlar)
                statusInitializing: "Başlatılıyor...",
                statusVeryDryWarning: "Uyarı: Çok Kuru!",
                statusOverwateringWarning: "Uyarı: Aşırı Sulama!",
                statusHeatStressWarning: "Uyarı: Isı Stresi!",
                statusSaltBurnWarning: "Uyarı: Tuz Yanığı Riski!",
                statusMoldFungusWarning: "Uyarı: Küf/Mantar Riski!",
                statusSoilDry: "Toprak Kuru.",
                statusSoilMoistEnough: "Toprak Yeterince Nemli.",
                statusStable: "Sistem Stabil",

                // Yeni Metinler
                showRawText: "Gerçek Değeri Göster",
                hideRawText: "Basit Değeri Göster",
                ecVeryLow: "Çok Düşük",
                ecLow: "Düşük",
                ecNormal: "Normal",
                ecHigh: "Yüksek",
                ecVeryHigh: "Çok Yüksek",
                wifiExcellent: "Mükemmel",
                wifiGood: "İyi",
                wifiFair: "Orta",
                wifiPoor: "Zayıf"

            }
            ,
            en: {
                splashTitle: 'Plantelligence',
                splashSlogan: 'Your Plant is Now in Your Pocket',
                headerTitle: 'Plantelligence',
                headerSlogan: 'Your Plant is Now in Your Pocket',
                themeToggleText: 'Switch to Dark Mode',
                langToggleText: 'Türkçe',
                mainStatusTitle: 'Overall Plant Status', // New title
                cardTitleTemp: 'Temperature',
                cardTitleHumidity: 'Air Humidity',
                cardTitleSoilMoisture: 'Soil Moisture',
                cardTitleLight: 'Light Level',
                cardTitleEC: 'Soil Conductivity (EC)', // New EC card title
                cardTitleWifi: 'WiFi Signal',
                cardTitleStatus: 'System Status',
                cardTitleGrowstorm: 'Growstorm Index',
                cardTitleAquaSync: 'Aqua Sync',
                cardTitleSaltBurn: 'Salt Burn Potential',
                cardTitleEmerald: 'Emerald Ratio',
                infoSectionHeader: 'Information for the Curious',
                formulaListTitle: 'Calculated Formulas',
                tableHeaderHash: '#',
                tableHeaderScientific: 'Scientific Name',
                tableHeaderPopular: 'Popular Name',
                tableHeaderFormula: 'Formula',
                tableHeaderUnit: 'Unit',
                tableHeaderInterpretation: 'Interpretation',
                formulaId1: '1', formulaScientific1: 'Inverse Temperature Factor', formulaPopular1: 'Chill Factor', formulaUnit1: '1/°C', formulaInterpretation1: 'Measures coldness severity.',
                formulaId2: '2', formulaScientific2: 'Thermal-Light-Humidity Index', formulaPopular2: 'Growstorm Index', formulaUnit2: '°C·lux·%', formulaInterpretation2: 'Productivity booster.',
                formulaId3: '3', formulaScientific3: 'Air-to-Soil Moisture Ratio', formulaPopular3: 'Dry Drift', formulaUnit3: 'unitless', formulaInterpretation3: 'Disparity between air and soil wetness.',
                formulaId4: '4', formulaScientific4: 'Soil-to-Air Moisture Ratio', formulaPopular4: 'Mud Surge', formulaUnit4: 'unitless', formulaInterpretation4: 'Opposite of above.',
                formulaId5: '5', formulaScientific5: 'Moisture Interaction Index', formulaPopular5: 'Aqua Sync', formulaUnit5: '%·%', formulaInterpretation5: 'Overall water availability.',
                formulaId6: '6', formulaScientific6: 'Thermal Light Load', formulaPopular6: 'Radiant Heat Index', formulaUnit6: '°C·lux', formulaInterpretation6: 'Heat and light exposure combo.',
                formulaId7: '7', formulaScientific7: 'Enhanced Thermal-Light Index', formulaPopular7: 'Blaze Factor', formulaUnit7: '(°C·lux)²', formulaInterpretation7: 'Amplified energy impact.',
                formulaId8: '8', formulaScientific8: 'Conductivity-to-Soil Moisture Ratio', formulaPopular8: 'Saline Stress Ratio', formulaUnit8: '(mS/cm)/%', formulaInterpretation8: 'Salt-to-water risk measure.',
                formulaId9: '9', formulaScientific9: 'Soil Electro-Hydration Index', formulaPopular9: 'Wet Spark', formulaUnit9: '(mS/cm)·%', formulaInterpretation9: 'Moist conductivity.',
                formulaId10: '10', formulaScientific10: 'Full Environmental Interaction Index', formulaPopular10: 'Biocharge Index', formulaUnit10: '°C·lux·%·%', formulaInterpretation10: 'Combined environmental load.',
                formulaId11: '11', formulaScientific11: 'Conductivity Stress Index', formulaPopular11: 'Salt Burn Potential', formulaUnit11: '(mS/cm)²/%²', formulaInterpretation11: 'How salinity can hurt growth.',
                formulaId12: '12', formulaScientific12: 'Thermal Stress Load', formulaPopular12: 'Sunburn Torque', formulaUnit12: '°C⁴/(mS/cm)', formulaInterpretation12: 'Intense heat burden.',
                formulaId13: '13', formulaScientific13: 'Chlorophyll-Red Modulation', formulaPopular13: 'Leaffire Ratio', formulaUnit13: 'RGB units', formulaInterpretation13: 'Color stress analysis.',
                formulaId14: '14', formulaScientific14: 'Green Dominance Ratio', formulaPopular14: 'Emerald Ratio', formulaUnit14: 'unitless', formulaInterpretation14: 'Indicates healthy green.',
                formulaId15: '15', formulaScientific15: 'Leaf Color Brightness to Light Ratio', formulaPopular15: 'Leafshine Quotient', formulaUnit15: 'RGB/lux', formulaInterpretation15: 'Reflectance quality.',
                formulaId16: '16', formulaScientific16: 'Soil Color Red-Green Mix', formulaPopular16: 'Mudblood Ratio', formulaUnit16: 'unitless', formulaInterpretation16: 'Soil tone balance.',
                formulaId17: '17', formulaScientific17: 'Soil Red Saturation Ratio', formulaPopular17: 'Ember Soil Index', formulaUnit17: 'unitless', formulaInterpretation17: 'Red bias in dirt color.',
                formulaId18: '18', formulaScientific18: 'Soil Color Brightness to Light Ratio', formulaPopular18: 'Dirtshine Quotient', formulaUnit18: 'RGB/lux', formulaInterpretation18: 'Soil reflectivity.',
                formulaNote: '*Note: Most of the formulas above are hypothetical and may differ from actual plant science calculations. They are included here only to demonstrate the potential of your project. \'t\': temperature, \'l\': light, \'h\': air humidity, \'s\': soil moisture, \'e\': conductivity, \'r, g, b\': leaf color RGB values, \'r\', g\', b\' : soil color RGB values.',
                diseaseTitle: 'Possible Disease Conditions and Hazards',
                diseaseIntro: 'Some common conditions that can affect plant health and their potential indicators based on sensor data:',
                diseaseDrought: '<strong>Drought Stress:</strong> Combination of low soil moisture, high temperature, and low air humidity. Wilting and drying of leaves may be observed.',
                diseaseHeat: '<strong>Heat Stress:</strong> Extremely high temperature, especially combined with high light levels. Leaf burn and discoloration may occur.',
                diseaseOverwatering: '<strong>Overwatering/Root Rot:</strong> Consistently high soil moisture. Yellowing, wilting leaves, and softening of roots may be observed.',
                diseaseMoldFungus: '<strong>Mold and Fungus:</strong> Combination of high air humidity and low light levels. White/gray spots and mold growth may be observed on leaves.',
                diseaseSalt: '<strong>Salt Stress:</strong> High soil conductivity. Drying, burning of leaf tips, and stunted growth may be observed. (An conductivity sensor is required for this condition.)',
                explanationTitle: 'Explanations of These Conditions',
                explanationIntro: 'Simple explanations of how the above conditions can be related to sensor data:',
                explanationDrought: '<strong>Drought:</strong> When soil moisture drops below a certain threshold and air humidity is also low, the plant is not getting enough water. High temperature worsens this condition.',
                explanationHeat: '<strong>Heat Stress:</strong> Plants grow best within a certain temperature range. When temperatures go significantly above this range, especially under strong sunlight, the plant\'s cells can be damaged.',
                explanationOverwatering: '<strong>Overwatering:</strong> If the soil remains too wet constantly, the roots cannot get oxygen and start to rot. This prevents the plant from absorbing water and nutrients.',
                explanationMoldFungus: '<strong>Mold and Fungus:</strong> Most types of mold and fungus spread rapidly in humid and low-light environments. High air humidity and insufficient light create an ideal ground for such diseases.',
                explanationSalt: '<strong>Salt Stress:</strong> Excessive salt accumulation from irrigation water or fertilizers increases soil conductivity. High salt concentration makes it difficult for plant roots to absorb water and can even damage leaves.',
                footerText: '&copy; 2025 Plantelligence | Deneyap Kart Web Interface',
                 // Info Button Explanations
                infoTemp: 'Ambient temperature. An ideal temperature range is important for plant health.',
                infoHumidity: 'The percentage of humidity in the air. Important for plant transpiration and overall health.',
                infoSoilMoisture: 'The moisture level of the soil. Sufficient moisture is critical for the plant\'s ability to absorb water from the roots.',
                infoLight: 'The level of light in the environment. Necessary for plant photosynthesis and growth.',
                infoEC: 'The electrical conductivity (EC) of the soil. Indicates the amount of dissolved salts in the soil. High EC increases the risk of salt stress.', // New EC info text
                infoWifi: 'The signal strength of the WiFi network the Deneyap Kart is connected to. Indicates connection quality.',
                infoStatus: 'The overall plant health status determined based on sensor data.',
                infoGrowstorm: 'A hypothetical index calculated from the combination of temperature, light, and air humidity. High values may indicate potential for rapid growth.',
                infoAquaSync: 'A hypothetical index calculated from the combination of soil and air humidity. May indicate overall water availability and balance.',
                infoSaltBurn: 'A hypothetical index calculated based on soil conductivity (salinity) and moisture levels. High values may indicate a risk of salt burn.',
                infoEmerald: 'A hypothetical index calculated based on the ratio of leaf colors. High values may indicate healthy and vibrant green leaves.',
                 // Status Messages (Keys)
                statusInitializing: "Initializing...",
                statusVeryDryWarning: "Warning: Very Dry!",
                statusOverwateringWarning: "Warning: Overwatering!",
                statusHeatStressWarning: "Warning: Heat Stress!",
                statusSaltBurnWarning: "Warning: Salt Burn Risk!",
                statusMoldFungusWarning: "Warning: Mold/Fungus Risk!",
                statusSoilDry: "Soil is Dry.",
                statusSoilMoistEnough: "Soil is Moist Enough.",
                statusStable: "System Stable",

                 // New Texts
                showRawText: "Show Raw Value",
                hideRawText: "Show Simple Value",
                ecVeryLow: "Very Low",
                ecLow: "Low",
                ecNormal: "Normal",
                ecHigh: "High",
                ecVeryHigh: "Very High",
                wifiExcellent: "Excellent",
                wifiGood: "Good",
                wifiFair: "Fair",
                wifiPoor: "Poor"
            }
        };

        // Theme Toggle Button and Local Storage
        const themeToggle = document.getElementById('theme-toggle');
        const langToggle = document.getElementById('lang-toggle'); // Language toggle button
        const body = document.body;
        // Theme text handled by setLanguage function


        // Function to update text content based on language
        function setLanguage(lang) {
            const strings = languageStrings[lang];
            document.documentElement.lang = lang; // Set HTML lang attribute

            // Update text content using data-lang-key attributes
            document.querySelectorAll('[data-lang-key]').forEach(element => {
                const key = element.getAttribute('data-lang-key');
                // Check if the key exists in the current language strings
                if (strings && strings[key]) {
                    // Special handling for theme toggle button text
                    if (element.id === 'theme-toggle') {
                         const isDarkMode = body.classList.contains('dark-mode');
                         element.innerText = lang === 'tr' ? (isDarkMode ? languageStrings.tr.darkModeText : languageStrings.tr.lightModeText) : (isDarkMode ? languageStrings.en.darkModeText : languageStrings.en.lightModeTextEn);
                    } else if (element.classList.contains('toggle-raw-button')) {
                         // Special handling for toggle raw button text
                         const currentState = element.getAttribute('data-state');
                         element.innerText = currentState === 'simplified' ? strings.showRawText : strings.hideRawText;
                    }
                    else {
                        element.innerHTML = strings[key]; // Use innerHTML for potential HTML entities like &copy;
                    }
                } else {
                     // Fallback: If translation is missing, try English or the key itself
                     if (languageStrings['en'] && languageStrings['en'][key]) {
                          element.innerHTML = languageStrings['en'][key];
                     } else {
                         element.innerHTML = key; // Show the key if no translation found
                     }
                }
            });

            // Update language toggle button text
            langToggle.innerText = lang === 'tr' ? languageStrings.en.langToggleText : languageStrings.tr.langToggleText;

            // Save language preference
            localStorage.setItem('language', lang);

            // After changing language, update the status display and sensor values
             verileriGuncelle(); // Re-fetch and update to apply new language status and simplified values
        }

        // Add theme toggle texts to language strings
        languageStrings.tr.lightModeText = 'Koyu Moda Geç';
        languageStrings.tr.darkModeText = 'Açık Moda Geç';
        languageStrings.en.lightModeTextEn = 'Switch to Dark Mode';
        languageStrings.en.darkModeTextEn = 'Switch to Light Mode';


        // Apply saved theme on load
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            body.classList.add('dark-mode');
            // Theme toggle text will be set by setLanguage based on the current language
        }

        // Apply saved language on load, default to Turkish
        const savedLanguage = localStorage.getItem('language') || 'tr';
        setLanguage(savedLanguage);


        // Theme toggle button click listener
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode'); // Add/remove dark-mode class
            let currentTheme = body.classList.contains('dark-mode') ? 'dark' : 'light';
            localStorage.setItem('theme', currentTheme); // Save preference
            // Update theme toggle text based on current language and theme
            const currentLang = document.documentElement.lang;
             themeToggle.innerText = currentLang === 'tr' ? (currentTheme === 'dark' ? languageStrings.tr.darkModeText : languageStrings.tr.lightModeText) : (currentLang === 'en' ? (currentTheme === 'dark' ? languageStrings.en.darkModeTextEn : languageStrings.en.lightModeTextEn) : languageStrings.tr.lightModeText); // Fallback for unknown language
        });

        // Language toggle button click listener
        langToggle.addEventListener('click', () => {
            const currentLang = document.documentElement.lang;
            const newLang = currentLang === 'tr' ? 'en' : 'tr';
            setLanguage(newLang); // Switch language
        });


        // Meraklısı İçin Bilgiler bölümünü gizle/göster
        const infoHeader = document.querySelector('.info-header');
        const infoDetails = document.getElementById('info-details'); // Genel detay bölümü ID'si

        infoHeader.addEventListener('click', () => {
            const isCollapsed = infoHeader.classList.contains('collapsed');
            if (isCollapsed) {
                // Açılıyor
                infoDetails.style.display = 'block'; // Hemen block yap
                requestAnimationFrame(() => { // Sonraki frame'de geçişi başlat
                    infoDetails.classList.remove('collapsed'); // CSS geçişini tetikle
                    infoDetails.classList.add('expanded');
                });

            } else {
                // Gizleniyor
                 infoDetails.classList.remove('expanded'); // Geçişi tersine çevir
                 // Geçiş tamamlandıktan sonra display: none ayarlamasını yap
                 infoDetails.addEventListener('transitionend', function handler() {
                     infoDetails.style.display = 'none'; // Geçiş bitince display none yap
                     infoDetails.removeEventListener('transitionend', handler);
                 });
            }
            infoHeader.classList.toggle('collapsed'); // Başlık collapsed sınıfını değiştir
        });

        // Tooltip gösterme/gizleme fonksiyonları
        const tooltip = document.getElementById('tooltip');
        let activeTooltipButton = null; // Hangi butonun tooltip'inin açık olduğunu takip et

        function showTooltip(event) {
            const button = event.target;
             const infoKey = button.getAttribute('data-info-key');
             const currentLang = document.documentElement.lang;
             const explanation = languageStrings[currentLang][infoKey] || languageStrings['en'][infoKey] || infoKey; // Fallback to English or key

             if (explanation) {
                 tooltip.innerHTML = explanation; // HTML içeriği kullanabiliriz
                 tooltip.style.display = 'block';

                 // Tooltip'i butonun altına ortala
                 const buttonRect = button.getBoundingClientRect();
                 const tooltipRect = tooltip.getBoundingClientRect();

                 let top = buttonRect.bottom + 10; // Butonun 10px altına
                 let left = buttonRect.left + (buttonRect.width / 2) - (tooltipRect.width / 2);

                 // Ekran dışına taşmasını engelle (basit kontrol)
                 if (left < 0) left = 5;
                 if (left + tooltipRect.width > window.innerWidth) {
                     left = window.innerWidth - tooltipRect.width - 5;
                 }
                  // Eğer aşağıda yer yoksa ve yukarıda yer varsa, yukarıda göster
                  if (top + tooltipRect.height > window.innerHeight && buttonRect.top > tooltipRect.height) {
                      top = buttonRect.top - tooltipRect.height - 10;
                      tooltip.classList.add('top-arrow'); // Okun yukarıda olmasını sağlayan sınıf
                  } else {
                       tooltip.classList.remove('top-arrow'); // Okun aşağıda olmasını sağlayan sınıfı kaldır
                  }


                 tooltip.style.top = `${top + window.scrollY}px`; // Sayfa kaydırmayı dahil et
                 tooltip.style.left = `${left + window.scrollX}px`; // Sayfa kaydırmayı dahil et

                 activeTooltipButton = button; // Aktif butonu kaydet
             }
        }

        function hideTooltip() {
            tooltip.style.display = 'none';
             activeTooltipButton = null; // Aktif butonu sıfırla
             tooltip.classList.remove('top-arrow'); // Gizlerken ok sınıfını temizle
        }

        // Bilgi butonlarına event listener ekle
        document.addEventListener('click', (event) => {
            // Tıklanan elementin veya üst elementlerinin 'info-button' sınıfına sahip olup olmadığını kontrol et
            const button = event.target.closest('.info-button');

            if (button) {
                 if (activeTooltipButton === button) {
                     // Aynı butona tekrar tıklandıysa tooltip'i gizle
                     hideTooltip();
                 } else {
                    // Yeni bir butona tıklandıysa, önce varsa eskiyi gizle, sonra yeniyi göster
                    hideTooltip();
                    showTooltip(event);
                 }
            } else {
                 // Butona tıklanmadıysa tooltip'i gizle
                 hideTooltip();
            }
        });


        // Verileri sunucudan çekip güncelleyecek fonksiyon
        function verileriGuncelle() {
            fetch('/data') // /data endpoint'inden veri çek
                .then(response => {
                     if (!response.ok) {
                        // Başarılı olmayan HTTP yanıtlarını yakala
                         throw new Error(`HTTP hata! Durum: ${response.status}`);
                     }
                     return response.json(); // Yanıtı JSON olarak ayrıştır
                })
                .then(data => {
                    const currentLang = document.documentElement.lang;
                    const strings = languageStrings[currentLang] || languageStrings['en']; // Fallback to English

                    // Helper function to update sensor display and store raw value
                    function updateSensorDisplay(id, rawValue, unit, simplifiedValue, simplifiedUnit) {
                        const displayElement = document.getElementById(`${id}-display`);
                        const unitElement = document.getElementById(`${id}-unit`);
                        const toggleButton = document.querySelector(`.toggle-raw-button[data-target-id="${id}"]`);

                        // Store raw value and simplified value
                        displayElement.dataset.rawValue = rawValue;
                        displayElement.dataset.simplifiedValue = simplifiedValue;
                         unitElement.dataset.rawUnit = unit;
                         unitElement.dataset.simplifiedUnit = simplifiedUnit;


                        // Get current state from button (or default to simplified)
                        const currentState = toggleButton ? toggleButton.getAttribute('data-state') : 'simplified';

                        if (currentState === 'simplified') {
                            displayElement.innerText = simplifiedValue;
                            unitElement.innerText = simplifiedUnit;
                             if (toggleButton) toggleButton.innerText = strings.showRawText;
                        } else { // currentState === 'raw'
                            displayElement.innerText = rawValue;
                            unitElement.innerText = unit;
                            if (toggleButton) toggleButton.innerText = strings.hideRawText;
                        }
                    }

                    // Update Temperature
                    updateSensorDisplay('sicaklik', data.sicaklik.toFixed(1), '°C', data.sicaklik.toFixed(1), '°C');

                    // Update Humidity
                     updateSensorDisplay('nem', data.nem, '%', data.nem, '%');

                    // Update Soil Moisture
                     updateSensorDisplay('toprakNemi', data.toprakNemi, '%', data.toprakNemi, '%');

                    // Update Light (as percentage)
                    let isikYuzde = Math.round((data.isik / 1000.0) * 100); // 0-1000 -> 0-100%
                    updateSensorDisplay('isik', isikYuzde, '%', isikYuzde, '%');


                    // Update EC (Qualitative vs mS/cm)
                    let simplifiedEC = '';
                    if (data.iletkenlik < 0.5) simplifiedEC = strings.ecVeryLow;
                    else if (data.iletkenlik >= 0.5 && data.iletkenlik < 1.5) simplifiedEC = strings.ecLow;
                    else if (data.iletkenlik >= 1.5 && data.iletkenlik < 2.5) simplifiedEC = strings.ecNormal;
                    else if (data.iletkenlik >= 2.5 && data.iletkenlik < 3.5) simplifiedEC = strings.ecHigh;
                    else simplifiedEC = strings.ecVeryHigh; // >= 3.5
                    updateSensorDisplay('iletkenlik', typeof data.iletkenlik === 'number' ? data.iletkenlik.toFixed(2) : data.iletkenlik, 'mS/cm', simplifiedEC, ''); // Simplified EC has no unit text

                    // Update WiFi Signal (Qualitative vs dBm)
                     let simplifiedWifi = '';
                     if (data.sinyal > -50) simplifiedWifi = strings.wifiExcellent;
                     else if (data.sinyal >= -60 && data.sinyal <= -50) simplifiedWifi = strings.wifiGood;
                     else if (data.sinyal >= -70 && data.sinyal < -60) simplifiedWifi = strings.wifiFair;
                     else simplifiedWifi = strings.wifiPoor; // < -70
                     updateSensorDisplay('sinyal', data.sinyal, 'dBm', simplifiedWifi, ''); // Simplified Wifi has no unit text


                    // Update System Status
                    let durumElement = document.getElementById('durum');
                    let genelDurumElement = document.getElementById('genel-durum'); // Genel durum elementi
                    let plantModelElement = document.getElementById('plant-model'); // Bitki modeli elementi

                    const translatedDurum = strings[data.durum] || languageStrings['en'][data.durum] || data.durum; // Çeviri yoksa İngilizceye, o da yoksa anahtara fallback
                    durumElement.innerText = translatedDurum; // Sistem Durumu kartı
                    genelDurumElement.innerText = translatedDurum; // Genel Durum bölümü

                    // Mevcut durum renklendirme sınıflarını temizle
                    durumElement.className = 'value'; // Sadece 'value' sınıfını bırak
                    genelDurumElement.className = ''; // Genel durum elementinin sınıflarını temizle
                    plantModelElement.className = 'plant-model'; // Bitki modelinin sınıflarını temizle (sadece temel sınıf kalsın)

                    // Durum anahtarına göre renklendirme sınıfı ekle
                    if (data.durum.includes('statusStable') || data.durum.includes('statusMoistEnough')) {
                        durumElement.classList.add('status-ok');
                        genelDurumElement.classList.add('status-ok');
                        plantModelElement.classList.add('status-ok'); // Bitki modelini yeşil yap
                    } else if (data.durum.includes('statusDry') || data.durum.includes('statusWarning')) {
                         durumElement.classList.add('status-warning');
                         genelDurumElement.classList.add('status-warning');
                         plantModelElement.classList.add('status-warning'); // Bitki modelini sarı yap
                    } else if (data.durum.includes('statusError') || data.durum.includes('statusVeryDry') || data.durum.includes('statusOverwatering') || data.durum.includes('statusHeatStress') || data.durum.includes('statusSaltBurn') || data.durum.includes('statusMoldFungus')) {
                        durumElement.classList.add('status-error');
                        genelDurumElement.classList.add('status-error');
                        plantModelElement.classList.add('status-error'); // Bitki modelini kırmızı yap
                    } else {
                         // Bilinmeyen durumlar için varsayılan (örn: başlatılıyor)
                         durumElement.classList.add('status-ok'); // Başlangıçta yeşil olabilir
                         genelDurumElement.classList.add('status-ok');
                         plantModelElement.classList.add('status-ok');
                    }

                    // Update Formula Values (These don't have simplified/raw toggle)
                    document.getElementById('growstorm-value').innerText = typeof data.growstorm === 'number' ? data.growstorm.toFixed(2) : data.growstorm;
                    document.getElementById('aquasync-value').innerText = typeof data.aquasync === 'number' ? data.aquasync.toFixed(2) : data.aquasync;
                    document.getElementById('saltburn-value').innerText = typeof data.saltburn === 'number' ? data.saltburn.toFixed(2) : data.saltburn;
                    document.getElementById('emerald-value').innerText = typeof data.emerald === 'number' ? data.emerald.toFixed(2) : data.emerald;


                })
                .catch(error => console.error('Veri alınırken hata:', error)); // Hataları konsola yaz
        }

        // Add event listeners to toggle raw buttons
        document.querySelectorAll('.toggle-raw-button').forEach(button => {
            button.addEventListener('click', () => {
                const targetId = button.getAttribute('data-target-id');
                const displayElement = document.getElementById(`${targetId}-display`);
                const unitElement = document.getElementById(`${targetId}-unit`);
                 const currentLang = document.documentElement.lang;
                 const strings = languageStrings[currentLang] || languageStrings['en']; // Fallback

                let currentState = button.getAttribute('data-state');

                if (currentState === 'simplified') {
                    // Switch to raw
                    displayElement.innerText = displayElement.dataset.rawValue;
                    unitElement.innerText = unitElement.dataset.rawUnit;
                    button.innerText = strings.hideRawText;
                    button.setAttribute('data-state', 'raw');
                } else { // currentState === 'raw'
                    // Switch to simplified
                    displayElement.innerText = displayElement.dataset.simplifiedValue;
                    unitElement.innerText = unitElement.dataset.simplifiedUnit;
                    button.innerText = strings.showRawText;
                    button.setAttribute('data-state', 'simplified');
                }
                 // After toggling, re-apply language strings to ensure button text is correct
                 // This is needed if the language is switched while a button is in 'raw' state
                 setLanguage(currentLang);
            });
        });


        // Splash Screen Logic
        window.addEventListener('load', () => {
             const splashScreen = document.getElementById('splash');
             if (splashScreen) {
                 // Belirli bir süre sonra splash screen'i gizle
                 setTimeout(() => {
                    splashScreen.classList.add('fade-out');
                     // İsteğe bağlı: Geçiş bittikten sonra elementi tamamen kaldır
                     // splashScreen.addEventListener('transitionend', () => {
                     //     splashScreen.remove();
                     // });
                 }, 2500); // 2.5 saniye göster (süreyi ayarlayabilirsiniz)
             }
        });


        // Sayfa DOM içeriği yüklendiğinde (resimler beklemez) ilk veriyi çek
        document.addEventListener('DOMContentLoaded', () => {
             verileriGuncelle();
             // Ensure info section is collapsed on load
             const infoHeader = document.querySelector('.info-header');
             const infoDetails = document.getElementById('info-details');
             infoHeader.classList.add('collapsed');
             infoDetails.style.display = 'none';
             infoDetails.classList.remove('expanded');

        });


        // Her 5 saniyede bir verileri güncelle
        setInterval(verileriGuncelle, 5000); // 5000 milisaniye = 5 saniye

    </script>
</body>
</html>
)rawliteral"; // raw string literal sonu
  server.send(200, "text/html", html);
}

// Sensörleri okuyup global değişkenleri güncelleyen fonksiyon
void readSensors() {
    unsigned long currentTime = millis();
    // Belirlenen aralık geçtiyse sensörleri oku
    if (currentTime - lastUpdateTime >= UPDATE_INTERVAL) {
        lastUpdateTime = currentTime;

        // DHT11 Okuma
        float newSicaklik = dht.readTemperature();
        int newNem = dht.readHumidity();
        if (!isnan(newSicaklik)) { // Okuma başarılıysa
            sicaklik = newSicaklik;
        } else {
            Serial.println("DHT11 Sicaklik okuma hatasi!");
        }
        if (!isnan(newNem)) { // Okuma başarılıysa
            nem = newNem;
        } else {
             Serial.println("DHT11 Nem okuma hatasi!");
        }

        // Toprak Nem Okuma (Analog)
        int rawToprakNemi = analogRead(SOIL_MOISTURE_PIN);
        int kuruDeger = 4095;
        int islakDeger = 1500;
        toprakNemi = map(rawToprakNemi, kuruDeger, islakDeger, 0, 100);
        toprakNemi = constrain(toprakNemi, 0, 100);


        // LDR Okuma (Analog)
        int rawIsik = analogRead(LDR_PIN);
        isik = map(rawIsik, 0, 4095, 0, 1000);

        // EC Sensörü Okuma (Analog A2)
        int rawIletkenlik = analogRead(EC_PIN);
        // !!! BURASI ÇOK ÖNEMLİ !!!
        // Analog değeri mS/cm gibi bir birime dönüştürmek için kalibrasyon gereklidir.
        // Bu, kullandığınız EC sensörüne ve devresine bağlıdır.
        // Aşağıdaki formül sadece bir örnektir ve doğru sonuç vermeyebilir.
        // Kendi sensörünüzün veri sayfasını veya örneklerini inceleyin.
        // Örnek: Basit bir doğrusal dönüşüm (kalibre edilmesi GEREKİR)
        float voltaj = rawIletkenlik * (3.3 / 4095.0); // Deneyap Kart 3.3V referans voltajı varsayılır
        // Bu voltaj değerini mS/cm'ye çevirmek için sensörünüzün kalibrasyonuna bakın.
        // Örnek olarak basit bir doğrusal model (GERÇEK DEĞİLDİR):
        iletkenlik = voltaj * 1.5; // Sadece bir örnek, kalibrasyon yapın!
        // İletkenlik genellikle 0.5 - 3.0 mS/cm aralığında olabilir (bitki türüne göre değişir)
        iletkenlik = constrain(iletkenlik, 0.0, 5.0); // Makul bir aralıkta tutalım


        // WiFi Sinyal Gücü
        sinyalGucu = WiFi.RSSI();

        // Durum mantığınıza göre 'durum' değişkenini güncelleyin
        // Durum artık doğrudan dil anahtarı olarak atanıyor
        if (toprakNemi < 20 && nem < 30 && sicaklik > 28) {
            durum = "statusVeryDryWarning";
        } else if (toprakNemi > 80 && nem > 70) {
            durum = "statusOverwateringWarning";
        } else if (sicaklik > 35 && isik > 700) {
             durum = "statusHeatStressWarning";
        } else if (iletkenlik > 2.0 && toprakNemi < 50) { // Yüksek iletkenlik ve düşük nem tuz stresi riski
             durum = "statusSaltBurnWarning";
        } else if (nem > 80 && isik < 300) {
             durum = "statusMoldFungusWarning";
        } else if (toprakNemi < 40) {
            durum = "statusSoilDry";
        } else if (toprakNemi > 60) {
             durum = "statusSoilMoistEnough";
        }
        else {
            durum = "statusStable";
        }


        // LCD Ekran Yönetimi
        lcdScreen = (lcdScreen + 1) % TOTAL_LCD_SCREENS; // Bir sonraki ekrana geç

        // === LCD Güncelleme ===
        lcd.clear(); // Ekranı temizle

        switch (lcdScreen) {
            case 0: { // Ana Sensörler (Sıcaklık, Hava Nem)
                lcd.setCursor(0, 0);
                lcd.print("Sicaklik: ");
                lcd.print(sicaklik, 1); // 1 ondalık basamak
                lcd.print((char)223); // Derece işareti
                lcd.print("C");

                lcd.setCursor(0, 1);
                lcd.print("Hava Nem: ");
                lcd.print(nem);
                lcd.print("%");
                break;
            }

            case 1: { // Ana Sensörler (Toprak Nem, Işık)
                 lcd.setCursor(0, 0);
                 lcd.print("Toprak Nem: ");
                 lcd.print(toprakNemi);
                 lcd.print("%");

                 lcd.setCursor(0, 1);
                 lcd.print("Isik: ");
                 int isikYuzde = map(rawIsik, 0, 4095, 0, 100); // Ham 0-4095 -> 0-100%
                 lcd.print(isikYuzde);
                 lcd.print("%");
                 break;
            }

             case 2: { // Sistem Durumu ve WiFi Sinyali
                 lcd.setCursor(0, 0);
                 lcd.print("Durum:");
                 // LCD'de dil desteği yok, bu yüzden anahtarın kendisini veya kısa bir temsili kullanabiliriz.
                 lcd.print(durum.substring(0, min((int)durum.length(), 10)));


                 lcd.setCursor(0, 1);
                 lcd.print("WiFi Sinyal:");
                 lcd.print(sinyalGucu);
                 lcd.print("dBm");
                 break;
            }

             case 3: { // Formüller (Growstorm ve AquaSync)
                 lcd.setCursor(0, 0);
                 lcd.print("Growstorm:");
                 float growstormValue = sicaklik * isik * nem;
                 lcd.print(growstormValue, 0);

                 lcd.setCursor(0, 1);
                 lcd.print("AquaSync:");
                 float aquasyncValue = (float)toprakNemi * nem;
                 lcd.print(aquasyncValue, 0);
                 break;
            }
             case 4: { // İletkenlik (EC) ve Renk (Simüle)
                  lcd.setCursor(0, 0);
                  lcd.print("EC: ");
                  lcd.print(iletkenlik, 2); // 2 ondalık basamak
                  lcd.print("mS/cm");

                  lcd.setCursor(0, 1);
                  lcd.print("Renk (Simule):");
                  // Renk bilgisini LCD'de göstermek karmaşık olabilir.
                  // Basitçe bir mesaj veya RGB değerlerinden birini gösterebiliriz.
                  // Şimdilik simüle olduğunu belirten bir mesaj yazalım.
                  lcd.print("RGB Simule");
                  break;
             }
        }
    }
}


void setup() {
  Serial.begin(115200);
  delay(100);

  // LCD Başlatma
  lcd.init();
  lcd.backlight();
  lcd.setCursor(0, 0);
  lcd.print("Plantelligence");
  lcd.setCursor(0, 1);
  lcd.print("Baslatiliyor...");
  delay(2000);

  Serial.println();
  Serial.println("WiFiManager ile baglanti bekleniyor...");

  if (!wifiManager.autoConnect("Plantelligence_Setup_AP", "password")) {
    Serial.println("WiFi baglantisi yapilamadi, yeniden baslatiliyor.");
    lcd.clear();
    lcd.setCursor(0,0);
    lcd.print("WiFi Baglanti");
    lcd.setCursor(0,1);
    lcd.print("Hatasi!");
    delay(3000);
    ESP.restart();
  }

  Serial.println("");
  Serial.print("WiFi baglandi! IP Adresi: ");
  Serial.println(WiFi.localIP());

  // LCD'de IP adresini göster
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("WiFi Baglandi!");
  lcd.setCursor(0, 1);
  lcd.print(WiFi.localIP());
  delay(2000);

  // mDNS başlat
  if (!MDNS.begin(mdns_hostname)) {
    Serial.println("MDNS baslatilamadi!");
  } else {
    Serial.print("MDNS baslatildi. Hostname: ");
    Serial.println(mdns_hostname);
    MDNS.addService("http", "tcp", 80);
  }

  // DHT sensörünü başlat
  dht.begin();
  Serial.println("DHT sensoru baslatildi.");

  // İlk sensör okumasını yap ve LCD'yi güncelle
  readSensors();


  server.on("/", HTTP_GET, handleRoot);
  server.on("/data", HTTP_GET, handleData);

  server.begin();
  Serial.println("HTTP sunucusu baslatildi.");

   // LCD'de sunucu başlatıldı mesajı
  lcd.clear();
  lcd.setCursor(0,0);
  lcd.print("HTTP Sunucusu");
  lcd.setCursor(0,1);
  lcd.print("Baslatildi.");
  delay(2000);
}

void loop() {
  server.handleClient();
  // MDNS.update(); // ESP32'de genellikle gerekmez

  // Sensörleri oku ve global değişkenleri güncelle (periyodik olarak)
  readSensors();

  // Loop içinde başka engelleyici (blocking) fonksiyonlar (delay gibi) kullanmamaya özen gösterin,
  // aksi takdirde web sunucusu ve sensör okumaları aksayabilir.
}
