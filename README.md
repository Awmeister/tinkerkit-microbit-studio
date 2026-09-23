# micro:bit v2 og ElecFreaks Tinker Kit Studio 🚀

En moderne, interaktiv lærings- og kodeplatform udviklet til faget **Teknologiforståelse**. Platformen kombinerer hardware fra **ElecFreaks Tinker Kit** med de integrerede funktioner i **BBC micro:bit v2**.

🌐 **Live hjemmeside:** [https://awmeister.github.io/tinkerkit-microbit-studio/](https://awmeister.github.io/tinkerkit-microbit-studio/)

---

## 🌟 Nøglefunktioner

1. **Interaktiv sensorvælger**:
   - Vælg hvilke moduler du har til rådighed (OLED, PIR, servo, sonar, fugtsensor, crash-sensor, ADKeypad, potentiometer, buzzer).
   - Inkluderer micro:bit v2's interne sensorer (mikrofon, højttaler, touch-logo, accelerometer, lyssensor, knapper, 5x5 LED-matrix display).

2. **Intelligent projekt-anbefaler**:
   - Viser øjeblikkeligt hvilke projekter der er **"Klar til at bygge"** ud fra dine valg.
   - Fremhæver projekter der **"Mangler 1 sensor"** med ét-klik tilføjelse.
   - Forslår spændende **"Byg videre"-udvidelser** til hvert projekt.

3. **Pædagogisk lektionsvisning**:
   - **Mission og koncept**: Virkelighedsnær problemstilling, teknologisk løsning og læringsmål.
   - **Kredsløb og ledninger**: Tydelig farvekodet ledningsguide til Octopus:bit (GND = sort/brun, VCC = rød, Signal = gul).
   - **Algoritme og flow**: Trin-for-trin gennemgang af logikken før kode.
   - **Dobbelt kodevisning**: Skift mellem **Microsoft MakeCode visuelle blokke** (standard med autentiske MakeCode-kategorifarver) og **MicroPython** med linje-for-linje forklaringer.

4. **3 måder at overføre kode på**:
   - ⚡ **1-klik WebUSB**: Direkte browseroverførsel til micro:bit v2 i Chrome eller Edge.
   - 📥 **Download .hex**: Hent .hex-filen direkte og træk den over på `MICROBIT`-drevet.
   - 🌐 **Åbn i MakeCode**: Kopiér koden automatisk og åbn Microsoft MakeCode editoren med ét klik.

---

## 🛠️ Lokal udvikling og test

Projektet er bygget med **React 19**, **Vite**, **TypeScript** og **Tailwind CSS**.

### Forudsætninger
* [Node.js](https://nodejs.org/) (version 18 eller nyere)

### Start den lokale server:
```bash
# 1. Installer afhængigheder (hvis ikke allerede gjort)
npm install

# 2. Start den lokale udviklingsserver
npm run dev
```
Åbn derefter den viste URL (typisk `http://localhost:5173`) i din browser.

---

## 🚀 Udgivelse på GitHub Pages

Projektet er forberedt med en automatisk GitHub Actions workflow (`.github/workflows/deploy.yml`):

1. Opret et nyt repository på din GitHub-profil.
2. Upload/push alle filerne fra denne mappe til GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: micro:bit v2 og Tinker Kit Studio"
   git branch -M main
   git remote add origin https://github.com/<DIT-BRUGERNAVN>/<DIT-REPO-NAVN>.git
   git push -u origin main
   ```
3. Gå ind på dit repository på GitHub -> **Settings** -> **Pages**.
4. Under **Build and deployment** -> **Source**: Vælg **GitHub Actions**.
5. GitHub Actions bygger og publicerer automatisk din hjemmeside på:  
   `https://<DIT-BRUGERNAVN>.github.io/<DIT-REPO-NAVN>/`

*(Vite-konfigurationen benytter relativ sti `base: './'`, så hjemmesiden fungerer fejlfrit uanset undermappe på GitHub Pages).*

---

## 📚 Projekter inkluderet i platformen

1. **Intelligent tyverialarm med PIR og sirene** (Sikkerhed)
2. **Den berøringsfri skraldespand / monsterkasse** (Robotik)
3. **Smart plantepasser og drivhus-monitor** (Klima og natur)
4. **Parkeringsassistent med bak-alarm og afstandsmåler** (Robotik)
5. **Reaktions- og refleksspil med highscore** (Spil)
6. **Hemmelig sikkerhedsboks med pinkode og ADKeypad** (Sikkerhed)
7. **Smart natlampe med lyssensor og klapstyring** (Smart home)
8. **Digital DJ-synthesizer og beatbox** (Lyd og musik)
9. **Digitalt vaterpas og vinkelmåler** (Måleteknik og værktøj)
10. **Berøringsfri håndvask-assistent (20-sekunders timer)** (Sundhed og smart home)

---

## 📄 Licens og retsgrundlag
Dette projekt er udviklet til fri brug i undervisningssammenhænge i faget Teknologiforståelse.
Micro:bit er et varemærke tilhørende Micro:bit Educational Foundation.
Tinker Kit er udviklet af ElecFreaks.
