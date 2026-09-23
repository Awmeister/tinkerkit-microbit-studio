# micro:bit v2 & ElecFreaks Tinker Kit Studio 🚀

En moderne, interaktiv lærings- og kodeplatform udviklet til unge (16-25 år) i faget **Teknologiforståelse**. Platformen kombinerer hardware fra **ElecFreaks Tinker Kit** med de integrerede funktioner i **BBC micro:bit v2**.

🌐 **Live Hjemmeside:** [https://awmeister.github.io/tinkerkit-microbit-studio/](https://awmeister.github.io/tinkerkit-microbit-studio/)

---

## 🌟 Nøglefunktioner

1. **Interaktiv Sensorvælger (Hardware Picker)**:
   - Vælg hvilke moduler du har til rådighed (OLED, PIR, Servo, Sonar, Fugtsensor, Crash sensor, ADKeypad, Potentiometer, Buzzer).
   - Inkluderer micro:bit v2's interne sensorer (mikrofon, højttaler, touch logo, accelerometer, lyssensor, knapper, 5x5 LED matrix).

2. **Intelligent Projekt-anbefaler**:
   - Viser øjeblikkeligt hvilke projekter der er **"Klar til at bygge"** ud fra dine valg.
   - Fremhæver projekter der **"Mangler 1 sensor"** med ét-klik tilføjelse.
   - Forslår spændende **"Byg videre"-udvidelser** til hvert projekt.

3. **Pædagogisk Lektionsvisning**:
   - **Mission & Koncept**: Virkelighedsnær problemstilling, teknologisk løsning og læringsmål.
   - **Kredsløb & Ledninger**: Tydelig farvekodet ledningsguide til Octopus:bit (GND = Sort/Brun, VCC = Rød, Signal = Gul).
   - **Algoritme & Flow**: Trin-for-trin gennemgang af logikken før kode.
   - **Dobbelt Kodevisning**: Skift mellem **Microsoft MakeCode visuelle blokke** (standard) og **MicroPython** med linje-for-linje forklaringer.

4. **3 Måder at Overføre Kode på**:
   - ⚡ **1-Klik WebUSB**: Direkte browseroverførsel til micro:bit v2 i Chrome eller Edge.
   - 📥 **Download .hex**: Hent .hex-filen direkte og træk den over på `MICROBIT`-drevet.
   - 🌐 **Åbn i MakeCode**: Kopiér koden automatisk og åbn Microsoft MakeCode editoren med ét klik.

---

## 🛠️ Lokal Udvikling & Test

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
   git commit -m "Initial commit: micro:bit v2 & Tinker Kit Studio"
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

1. **Intelligent Tyverialarm med PIR & Sirene** (Sikkerhed)
2. **Den Berøringsfri Skraldespand / Monsterkasse** (Robotik)
3. **Smart Plantepasser & Drivhus-monitor** (Klima & Natur)
4. **Parkeringsassistent med Bak-alarm & Afstandsmåler** (Robotik)
5. **Reaktions- & Refleksspil med Highscore** (Spil)
6. **Hemmelig Sikkerhedsboks med Pinkode & ADKeypad** (Sikkerhed)
7. **Smart Natlampe med Lyssensor & Klapstyring** (Smart Home)
8. **Digital DJ Synthesizer & Beatbox** (Lyd & Musik)
9. **Digitalt Vaterpas & Vinkelmåler** (Måleteknik & Værktøj)
10. **Berøringsfri Håndvask-assistent (20-sekunders timer)** (Sundhed & Smart Home)

---

## 📄 Licens & Retsgrundlag
Dette projekt er udviklet til fri brug i undervisningssammenhænge i faget Teknologiforståelse.
Micro:bit er et varemærke tilhørende Micro:bit Educational Foundation.
Tinker Kit er udviklet af ElecFreaks.
