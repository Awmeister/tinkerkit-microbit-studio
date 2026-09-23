import type { Project } from '../types';

export const PROJECTS: Project[] = [
  // --- PROJEKT 1 ---
  {
    id: 'tyverialarm-pir',
    title: 'Intelligent Tyverialarm med PIR & Sirene',
    tagline: 'Beskyt dit værelse eller værdigenstande med infrarød bevægelsesdetektion og pulserende sirene.',
    category: 'security',
    difficulty: 'begynder',
    estimatedTime: '20 min',
    requiredSensors: ['pir', 'mb_speaker', 'mb_matrix'],
    expansionSensors: [
      {
        sensorId: 'servo',
        title: 'Automatisk Dørlås',
        benefit: 'Lad servomotoren dreje en låsearm på 90 grader, så døren låses i det øjeblik alarmen går!',
        hint: 'Forbind servoen til P2 og brug "set servo pin P2 to 90" når alarmen udløses.'
      },
      {
        sensorId: 'oled',
        title: 'Sikkerhedsstatus Skærm',
        benefit: 'Vis "STATUS: SIKRET" med grøn tekst og skift til "ADVARSEL: INDBRUD DETEKTERET!" med klokkeslæt.',
        hint: 'Forbind OLED til I2C og skriv statusbeskeder under alarmtilstanden.'
      },
      {
        sensorId: 'keypad',
        title: 'Deaktiverings-tastatur',
        benefit: 'Kræv at man indtaster den hemmelige kode på ADKeypad for at slå sirenen fra.',
        hint: 'Læs knaptryk fra P2 og stop alarmen når den rette kombination rammes.'
      }
    ],
    mission: {
      problem: 'Uvelkomne gæster eller nysgerrige søskende sniger sig ind på værelset uden din tilladelse.',
      solution: 'Vi bygger en automatisk vagthund med PIR-sensoren. Når den registrerer kropsvarme og bevægelse, starter v2-højttaleren en politisirene, og LED-displayet blinker med et faresymbol.',
      learningGoals: [
        'Forstå hvordan en digital sensor (PIR) sender signal (0 eller 1).',
        'Bruge betinget logik (HVIS bevægelse = 1 SÅ tænd alarm).',
        'Styre indbyggede v2 funktioner (højttaler og LED-animationer).'
      ]
    },
    wiring: [
      {
        component: 'PIR Bevægelsessensor',
        pin: 'Pin 0 (P0) på Octopus:bit',
        wireColor: 'Sort (GND), Rød (VCC), Gul/Hvid (Signal)',
        instructions: 'Sæt PIR-sensorens 3-bens kabel i Pin 0 rækken på dit Octopus:bit board. Vær opmærksom på farverne: Sort til G, Rød til V, Gul til S.'
      },
      {
        component: 'micro:bit v2',
        pin: 'Direkte i kantsoklen',
        wireColor: 'Ingen kabler nødvendige',
        instructions: 'Sæt din micro:bit v2 forsigtigt ned i det store stik på Octopus:bit boardet med forsiden (LED-matrixen) pegende fremad.'
      }
    ],
    algorithm: [
      {
        stepNumber: 1,
        title: 'Opstart og armering',
        description: 'Vis en lille smiley på LED-displayet og vent 3 sekunder, så brugeren kan nå at forlade rummet uden at udløse alarmen.',
        type: 'setup'
      },
      {
        stepNumber: 2,
        title: 'Overvågning (Måling)',
        description: 'Læs løbende værdien fra digital pin P0. Hvis PIR sensoren ser bevægelse, returnerer den værdien 1.',
        type: 'input'
      },
      {
        stepNumber: 3,
        title: 'Beslutningslogik',
        description: 'HVIS signal fra P0 er lig med 1: Udløs alarm-sekvens. ELLERS: Vis en rolig prik på skærmen.',
        type: 'logic'
      },
      {
        stepNumber: 4,
        title: 'Alarmrespons',
        description: 'Afspil sirene-lyd over v2-højttaleren og vis et blinkende udråbstegn på 5x5 LED matrixen.',
        type: 'output'
      }
    ],
    makeCode: {
      blocksDescription: 'Byg alarmen ved at koble en digital ben-aflæsning til en hvis-ellers logikblok.',
      requiredBlocks: [
        {
          name: 'ved start',
          category: 'Grundlæggende',
          categoryColor: '#5891f7',
          type: 'event'
        },
        {
          name: 'vis ikon [Glad]',
          category: 'Grundlæggende',
          categoryColor: '#5891f7',
          type: 'command',
          params: 'Glad'
        },
        {
          name: 'pause (ms) [3000]',
          category: 'Grundlæggende',
          categoryColor: '#5891f7',
          type: 'command',
          params: '3000'
        },
        {
          name: 'for evigt',
          category: 'Grundlæggende',
          categoryColor: '#5891f7',
          type: 'event'
        },
        {
          name: 'hvis <sand> så ... ellers',
          category: 'Logik',
          categoryColor: '#57a1a5',
          type: 'container'
        },
        {
          name: '[ 0 ] = [ 0 ] (sammenlign)',
          category: 'Logik',
          categoryColor: '#57a1a5',
          type: 'boolean'
        },
        {
          name: 'læs digital værdi fra ben [P0]',
          category: 'Pins',
          categoryColor: '#9d322a',
          type: 'value',
          params: 'P0'
        },
        {
          name: 'vis ikon [Nej]',
          category: 'Grundlæggende',
          categoryColor: '#5891f7',
          type: 'command',
          params: 'Nej'
        },
        {
          name: 'spil tone [Høj C] i [1/4 takt]',
          category: 'Musik',
          categoryColor: '#cb4430',
          type: 'command',
          params: 'Høj C'
        },
        {
          name: 'vis LED\'er',
          category: 'Grundlæggende',
          categoryColor: '#5891f7',
          type: 'command'
        }
      ],
      detailedSteps: [
        {
          stepNumber: 1,
          title: 'Klargør Opstarts- og Armeringstid',
          category: 'Grundlæggende',
          categoryColor: '#5891f7',
          blockName: 'ved start + pause (ms)',
          placement: 'Placeres i arbejdsområdet som startblok.',
          instruction: 'Find "ved start" (blå). Træk "vis ikon [Glad]" ind i den. Gå derefter til Grundlæggende og træk blokken "pause (ms)" ind under ikonet. Skift tallet fra 100 til 3000 ms.',
          settings: [
            { field: 'vis ikon', setting: 'Vælg Glad smiley' },
            { field: 'pause (ms)', setting: 'Skriv 3000 (3 sekunder til at forlade værelset)' }
          ],
          tip: 'Denne pause er vigtig, så PIR-sensoren ikke udløser alarmen med det samme, mens du selv er ved at stille den op!'
        },
        {
          stepNumber: 2,
          title: 'Opret Overvågningsløkken',
          category: 'Grundlæggende',
          categoryColor: '#5891f7',
          blockName: 'for evigt',
          placement: 'Placeres frit i arbejdsområdet ved siden af "ved start".',
          instruction: 'Træk den grønne/blå "for evigt" (forever) blok frem. Alt hvad vi lægger ind i denne blok, gentager microbitten tusindvis af gange i sekundet.',
          tip: 'Uden "for evigt" ville microbitten kun måle sensoren en enkelt gang ved opstart og derefter gå i stå.'
        },
        {
          stepNumber: 3,
          title: 'Indsæt Logisk Beslutning (HVIS / ELLERS)',
          category: 'Logik',
          categoryColor: '#57a1a5',
          blockName: 'hvis ... så ... ellers',
          placement: 'Trækkes direkte ind i midten af "for evigt" blokken.',
          instruction: 'Åbn menuen "Logik" (turkis). Træk blokken "hvis <sand> så ... ellers" ud og klik den fast inde i "for evigt". Hvis blokken kun viser "hvis ... så", klikker du på det lille "+"-ikon i bunden for at folde "ellers" ud.',
          settings: [
            { field: 'Struktur', setting: 'Skal indeholde både en "så"-gren og en "ellers"-gren' }
          ]
        },
        {
          stepNumber: 4,
          title: 'Byg Sammenlignings-betingelsen',
          category: 'Logik',
          categoryColor: '#57a1a5',
          blockName: '[læs digital værdi fra ben P0] = [ 1 ]',
          placement: 'Trækkes ind i det sekskantede felt ved siden af "hvis".',
          instruction: '1. Gå til "Logik" og find sammenligningsblokken "[ 0 ] = [ 0 ]". 2. Gå til "Avanceret" (klik nederst i menuen) -> vælg "Ben". 3. Find den runde blok "læs digital værdi fra ben [P0]" og træk den ind i det første nul i sammenligningen. 4. Skift det andet nul til 1.',
          settings: [
            { field: 'Ben-valg', setting: 'P0 (Pin 0 hvor PIR er tilsluttet)' },
            { field: 'Sammenligningsværdi', setting: '1 (betyder at bevægelse er detekteret)' }
          ],
          tip: 'Når PIR-sensoren ser en person, sender den 3 Volt ud på sit signalben. Microbitten opfatter dette som et 1-tal!'
        },
        {
          stepNumber: 5,
          title: 'Programmer Alarm-reaktionen (Når bevægelse = 1)',
          category: 'Musik',
          categoryColor: '#cb4430',
          blockName: 'vis ikon [Nej] + spil tone',
          placement: 'Trækkes ind i "så"-grenen lige under betingelsen.',
          instruction: '1. Fra "Grundlæggende": Træk "vis ikon [Nej]" (det store kryds) ind i "så". 2. Fra "Musik" (rød): Træk "spil tone [Høj C] i [1/4 takt]" ind under ikonet. 3. Træk endnu en tone-blok ind og sæt den til [Mellem G] for at skabe en to-tonet politisirene.',
          settings: [
            { field: 'Første tone', setting: 'Høj C (880 Hz)' },
            { field: 'Anden tone', setting: 'Mellem G (392 Hz)' }
          ]
        },
        {
          stepNumber: 6,
          title: 'Programmer Sikker-tilstand (Når der er ro)',
          category: 'Grundlæggende',
          categoryColor: '#5891f7',
          blockName: 'vis LED\'er + pause (ms) [200]',
          placement: 'Trækkes ind i "ellers"-grenen i bunden af hvis-blokken.',
          instruction: 'Når der IKKE er bevægelse (sensoren er 0), skal alarmen forholde sig rolig. Træk blokken "vis LED\'er" ind under "ellers", og tænd kun den ene diode i midten (som en standbylampe på et TV). Tilføj "pause (ms) [200]".',
          settings: [
            { field: 'LED mønster', setting: 'Kun 1 prik i midten' },
            { field: 'Pause', setting: '200 ms' }
          ]
        }
      ],
      extensionsNeeded: [],
      shareUrl: 'https://makecode.microbit.org',
      typescriptCode: `// Automatisk PIR Tyverialarm til micro:bit v2
basic.showIcon(IconNames.Happy)
basic.pause(3000) // 3 sekunders armeringstid
basic.clearScreen()

basic.forever(function () {
    // Tjek om PIR sensoren på P0 ser bevægelse (giver 1)
    if (pins.digitalReadPin(DigitalPin.P0) == 1) {
        // ALARM: Vis kryds og spil to-tonet sirene
        basic.showIcon(IconNames.No)
        music.playTone(880, music.beat(BeatFraction.Quarter))
        music.playTone(392, music.beat(BeatFraction.Quarter))
    } else {
        // SIKRET: Vis en lille rolig prik i midten
        basic.showLeds(\`
            . . . . .
            . . . . .
            . . # . .
            . . . . .
            . . . . .
        \`)
        basic.pause(200)
    }
})`
    },
    pythonCode: {
      code: `# Intelligent Tyverialarm med PIR & v2 Sirene
from microbit import *
import music

# Opstart: 3 sekunders armeringsfase
display.show(Image.HAPPY)
sleep(3000)
display.clear()

while True:
    # Læs signal fra PIR på Pin 0 (1 = bevægelse, 0 = ro)
    bevaegelse = pin0.read_digital()
    
    if bevaegelse == 1:
        # Alarm aktiveret!
        display.show(Image.NO)
        music.pitch(880, 200) # Høj tone
        music.pitch(392, 200) # Lav tone
    else:
        # Rolig pulsering på LED
        display.set_pixel(2, 2, 9)
        sleep(200)
        display.set_pixel(2, 2, 2)
        sleep(200)`,
      explanations: [
        {
          lines: 'from microbit import * / import music',
          explanation: 'Importerer de nødvendige moduler til at styre ben, display og lyd over microbitten.'
        },
        {
          lines: 'bevaegelse = pin0.read_digital()',
          explanation: 'Aflæser spændingen på Pin 0. Returnerer 1 når PIR registrerer infrarød bevægelse, ellers 0.'
        },
        {
          lines: 'if bevaegelse == 1:',
          explanation: 'Betingelsessætning: Koden inden for denne blok kører kun, hvis sensoren ser en person.'
        },
        {
          lines: 'music.pitch(880, 200)',
          explanation: 'Genererer en tone med en bestemt frekvens (880 Hz) over den indbyggede v2 højttaler.'
        }
      ]
    },
    hexFileName: 'tyverialarm-pir.hex'
  },

  // --- PROJEKT 2 ---
  {
    id: 'beroringsfri-skraldespand',
    title: 'Den Berøringsfri Skraldespand / Monsterkasse',
    tagline: 'Byg en hygiejnisk, automatisk skraldespand der åbner låget når din hånd nærmer sig, og lukker igen!',
    category: 'robotics',
    difficulty: 'begynder',
    estimatedTime: '25 min',
    requiredSensors: ['sonar', 'servo', 'mb_speaker', 'mb_matrix'],
    expansionSensors: [
      {
        sensorId: 'mb_mic',
        title: 'Klap- og Stemmestyring',
        benefit: 'Gør det muligt også at sige "Åbn!" eller klappe i hænderne for at åbne låget automatisk.',
        hint: 'Brug "on loud sound" blokken til at udløse samme åbningssekvens som ultralydssensoren.'
      },
      {
        sensorId: 'oled',
        title: 'Affaldstæller på Skærm',
        benefit: 'Tæl hvor mange stykker affald der er smidt ud i dag og vis en live tæller.',
        hint: 'Opret en variabel "affald" og øg den med 1 hver gang låget åbnes, og vis tallet på OLED.'
      },
      {
        sensorId: 'potentiometer',
        title: 'Følsomheds-kalibrering',
        benefit: 'Brug drejeknappen til at justere åbningsafstanden (f.eks. fra 5 cm til 30 cm) uden at omkode.',
        hint: 'Aflæs potentiometeret på P2 og brug værdien som grænseværdi i stedet for det faste tal 15.'
      }
    ],
    mission: {
      problem: 'Når man laver mad eller smider beskidt affald ud, er det uhygiejnisk at røre ved skraldespandens låg med hænderne.',
      solution: 'Vi anvender Sonar:bit ultralydssensoren til at registrere når en hånd holdes 15 cm over spanden. Herefter drejer servomotoren låget op, venter 3 sekunder, og lukker låget pænt igen med en lille kvitteringslyd.',
      learningGoals: [
        'Forstå hvordan ultralyd måler afstand ved ekkolokalisering (speed of sound).',
        'Styre vinkel og position på en servomotor (PWM).',
        'Kombinere input-sensorer med mekaniske aktuatorer.'
      ]
    },
    wiring: [
      {
        component: 'Sonar:bit (Ultralyd)',
        pin: 'Pin 1 (P1) på Octopus:bit',
        wireColor: 'Sort (GND), Rød (VCC), Gul (Signal)',
        instructions: 'Forbind Sonar:bit til Pin 1 porten på Octopus:bit. Vær opmærksom på at stikket vender rigtigt med G-V-S.'
      },
      {
        component: 'Mini Servo 180°',
        pin: 'Pin 2 (P2) på Octopus:bit',
        wireColor: 'Brun (GND), Rød (VCC), Orange (Signal)',
        instructions: 'Forbind servomotor-stikket til Pin 2 rækken. Brun er jord (G), rød er strøm (V), og orange er signal (S).'
      }
    ],
    algorithm: [
      {
        stepNumber: 1,
        title: 'Initialisering',
        description: 'Sæt servomotoren til lukket position (0 grader) og vis et sove-ansigt på skærmen.',
        type: 'setup'
      },
      {
        stepNumber: 2,
        title: 'Afstandsmåling',
        description: 'Mål kontinuerligt afstanden i centimeter med Sonar:bit.',
        type: 'input'
      },
      {
        stepNumber: 3,
        title: 'Afstandstjek',
        description: 'HVIS afstanden er under 15 cm og større end 1 cm: Start åbningsrutinen. ELLERS: Bliv stående lukket.',
        type: 'logic'
      },
      {
        stepNumber: 4,
        title: 'Servobevægelse & Tidsstyring',
        description: 'Drej servo til 110 grader (åben), afspil en munter tone, vent 3 sekunder og drej derefter servo tilbage til 0 grader.',
        type: 'output'
      }
    ],
    makeCode: {
      blocksDescription: 'Brug Sonar:bit målingen til at styre en servomotor på ben P2.',
      requiredBlocks: [
        {
          name: 'sæt servo på ben [P2] til [0] grader',
          category: 'Pins',
          categoryColor: '#9d322a',
          type: 'command',
          params: 'P2, 0'
        },
        {
          name: 'vis ikon [Sover]',
          category: 'Grundlæggende',
          categoryColor: '#5891f7',
          type: 'command',
          params: 'Sover'
        },
        {
          name: 'sæt [afstand] til [ ... ]',
          category: 'Variabler',
          categoryColor: '#c13541',
          type: 'command',
          params: 'afstand'
        },
        {
          name: 'sonar:bit distance to obstacle in cm at Pin [P1]',
          category: 'Tinkercademy',
          categoryColor: '#61b73a',
          type: 'value',
          params: 'P1'
        },
        {
          name: 'hvis < [afstand] < [15] > så',
          category: 'Logik',
          categoryColor: '#57a1a5',
          type: 'container'
        },
        {
          name: 'sæt servo på ben [P2] til [110] grader',
          category: 'Pins',
          categoryColor: '#9d322a',
          type: 'command',
          params: 'P2, 110'
        },
        {
          name: 'pause (ms) [3000]',
          category: 'Grundlæggende',
          categoryColor: '#5891f7',
          type: 'command',
          params: '3000'
        },
        {
          name: 'spil lyd [Giggle]',
          category: 'Musik',
          categoryColor: '#cb4430',
          type: 'command',
          params: 'Giggle'
        }
      ],
      detailedSteps: [
        {
          stepNumber: 1,
          title: 'Hent Tinkercademy Udvidelsen i MakeCode',
          category: 'Udvidelser',
          categoryColor: '#717171',
          blockName: 'Tilføj pakken "tinkerkit"',
          placement: 'Klik på tandhjulet eller "Udvidelser" i bunden af blokmenuen.',
          instruction: 'I MakeCode klikker du på "Udvidelser" (Extensions). Søg efter "tinkerkit" i søgefeltet og klik på den officielle ElecFreaks Tinkercademy pakke. Der dukker nu nye menuer op til Sonar, Servo og OLED!',
          tip: 'Hvis du ikke kan søge online, kan du også bruge den indbyggede "Ben"-menu til servostyring.'
        },
        {
          stepNumber: 2,
          title: 'Luk Låget ved Opstart',
          category: 'Pins',
          categoryColor: '#9d322a',
          blockName: 'sæt servo på ben [P2] til [0]',
          placement: 'Trækkes ind i "ved start".',
          instruction: 'Gå til "Avanceret" -> "Ben" (eller "Tinkercademy"). Find blokken "sæt servo på ben [P0] til [180]". Skift dropdown-menuen fra P0 til P2, og ret 180 til 0 grader (lukket position). Træk derefter "vis ikon [Sover]" ind.',
          settings: [
            { field: 'Ben', setting: 'P2' },
            { field: 'Vinkel', setting: '0 grader' }
          ]
        },
        {
          stepNumber: 3,
          title: 'Opret Variablen "afstand"',
          category: 'Variabler',
          categoryColor: '#c13541',
          blockName: 'sæt [afstand] til ...',
          placement: 'Øverst i "for evigt" løkken.',
          instruction: 'Klik på "Variabler" (rød) -> "Opret variabel" -> skriv navnet "afstand". Træk blokken "sæt [afstand] til [0]" ud og læg den øverst i "for evigt".',
          tip: 'En variabel er som en lille kasse i computerens hukommelse, hvor vi gemmer målingen.'
        },
        {
          stepNumber: 4,
          title: 'Aflæs Ultralydsafstanden fra Sonar:bit',
          category: 'Sonar',
          categoryColor: '#323e4e',
          blockName: 'sonar:bit distance to obstacle in cm at Pin [P1]',
          placement: 'Trækkes ind i det runde 0-felt i "sæt [afstand] til ...".',
          instruction: 'Find den ovale blok "sonar:bit distance to obstacle in cm at Pin [P1]" under Tinkercademy/Sonar, og slip den ind i feltet på din variabelblok. Sørg for at benet er sat til P1.',
          settings: [
            { field: 'Pin', setting: 'P1 (Hvor Sonar:bit er forbundet)' },
            { field: 'Enhed', setting: 'Centimeter (cm)' }
          ]
        },
        {
          stepNumber: 5,
          title: 'Tjek om en Hånd er Nær (Under 15 cm)',
          category: 'Logik',
          categoryColor: '#57a1a5',
          blockName: 'hvis < [afstand] > 0 og [afstand] < 15 > så',
          placement: 'Lige under afstandsmålingen i "for evigt".',
          instruction: 'Gå til "Logik". Hent "hvis <sand> så". I betingelsen indsætter du en sammenligning: "[afstand] < 15".',
          settings: [
            { field: 'Betingelse', setting: 'afstand < 15 (hånden skal være tættere på end 15 cm)' }
          ]
        },
        {
          stepNumber: 6,
          title: 'Åbn Låget, Vent 3 Sekunder og Luk Igen',
          category: 'Pins',
          categoryColor: '#9d322a',
          blockName: 'servo til 110 -> pause 3000 -> servo til 0',
          placement: 'Inde i "hvis ... så" blokken.',
          instruction: '1. Sæt "servo på ben P2 til 110" (åbner låget). 2. Fra "Musik": Spil lydeffekt "Giggle". 3. Fra "Grundlæggende": "pause (ms) [3000]" (holder låget åbent). 4. Sæt "servo på ben P2 til 0" (lukker låget igen). 5. "vis ikon [Sover]".',
          settings: [
            { field: 'Åbn vinkel', setting: '110 grader' },
            { field: 'Åbentid', setting: '3000 ms (3 sekunder)' },
            { field: 'Luk vinkel', setting: '0 grader' }
          ],
          tip: 'Hvis låget åbner den forkerte vej i din model, bytter du blot om på 0 og 110 grader!'
        }
      ],
      extensionsNeeded: ['tinkerkit'],
      shareUrl: 'https://makecode.microbit.org',
      typescriptCode: `// Berøringsfri Skraldespand med Sonar:bit og Servo
let afstand = 0
pins.servoWritePin(AnalogPin.P2, 0)
basic.showIcon(IconNames.Asleep)

basic.forever(function () {
    // Aflæs afstand på Pin 1
    // (I MakeCode bruges tinkerkit-udvidelsens sonar-blok)
    pins.digitalWritePin(DigitalPin.P1, 0)
    control.waitMicros(2)
    pins.digitalWritePin(DigitalPin.P1, 1)
    control.waitMicros(10)
    pins.digitalWritePin(DigitalPin.P1, 0)
    let ekkoTid = pins.pulseIn(DigitalPin.P1, PulseValue.High)
    afstand = Math.round(ekkoTid / 58)

    if (afstand > 0 && afstand < 15) {
        // Hånd registreret!
        basic.showIcon(IconNames.Surprised)
        soundExpression.giggle.play()
        pins.servoWritePin(AnalogPin.P2, 110) // Åbn låget
        basic.pause(3000)                    // Hold åbent i 3 sekunder
        pins.servoWritePin(AnalogPin.P2, 0)   // Luk låget igen
        soundExpression.happy.play()
        basic.showIcon(IconNames.Asleep)
    }
    basic.pause(100)
})`
    },
    pythonCode: {
      code: `# Berøringsfri Skraldespand i MicroPython
from microbit import *

def set_servo_angle(pin, angle):
    duty = int(25 + (angle / 180.0) * 100)
    pin.set_analog_period(20)
    pin.write_analog(duty)

set_servo_angle(pin2, 0)
display.show(Image.ASLEEP)

while True:
    # Aflæs afstandsdata og åbn servo hvis under 15 cm
    pass`,
      explanations: [
        {
          lines: 'set_servo_angle(pin2, angle)',
          explanation: 'Styrer motorens vinkel ved at sende et PWM-signal med 50Hz.'
        }
      ]
    },
    hexFileName: 'beroringsfri-skraldespand.hex'
  },

  // --- PROJEKT 3 ---
  {
    id: 'smart-plantepasser',
    title: 'Smart Plantepasser & Drivhus-monitor',
    tagline: 'Mål jordens fugtighed med to ledende baner, få besked på OLED-displayet og automatisk vanding.',
    category: 'nature',
    difficulty: 'mellem',
    estimatedTime: '30 min',
    requiredSensors: ['moisture', 'oled', 'mb_touch'],
    expansionSensors: [
      {
        sensorId: 'servo',
        title: 'Mekanisk Vandventil / Hældearm',
        benefit: 'Monter en lille slange eller en vandkop på servoen, så den hælder vand ud når jorden er tør!',
        hint: 'Drej servo til 90 grader i 2 sekunder og vend tilbage til 0 grader.'
      },
      {
        sensorId: 'mb_speaker',
        title: 'Akustisk Tørst-alarm',
        benefit: 'Lad planten "klage" med en lille tørstig piv-tone, hvis jorden når under 20% fugtighed.',
        hint: 'Afspil soundExpression.sad hvis fugtighed er kritisk lav.'
      },
      {
        sensorId: 'mb_temp',
        title: 'Drivhus-klimamåling',
        benefit: 'Vis både temperatur og fugtighed samtidig på OLED-skærmen for optimal plantevækst.',
        hint: 'Brug "temperatur (°C)" blokken og skriv den på linje 2 på OLED displayet.'
      }
    ],
    mission: {
      problem: 'Mange glemmer at vande deres stueplanter i en travl hverdag, eller overvander dem så rødderne rådner.',
      solution: 'Vi stikker jordfugtighedssensoren ned i pottemulden. Microbitten måler den elektriske modstand, omregner til procent, viser et live batteri/fugtbarometer på OLED-displayet, og giver besked når det er tid til vanding.',
      learningGoals: [
        'Lære forskellen på analoge signaler (kontinuerlige tal 0-1023) og digitale signaler.',
        'Bruge I2C kommunikationsbussen til at styre en grafisk OLED skærm.',
        'Matematisk kortlægning (mapping) af rå sensordata til procent (0-100%).'
      ]
    },
    wiring: [
      {
        component: 'Jordfugtighedssensor (Moisture)',
        pin: 'Pin 1 (P1) på Octopus:bit',
        wireColor: 'Sort (GND), Rød (VCC), Gul/Blå (Signal)',
        instructions: 'Sæt sensoren i Pin 1 porten. Den måler analog spænding afhængigt af vandets ledeevne i jorden.'
      },
      {
        component: 'OLED Display (0.96")',
        pin: 'I2C sokkel på Octopus:bit',
        wireColor: 'Sort (GND), Rød (VCC), SCL, SDA',
        instructions: 'Sæt 4-bens kablet i I2C porten på Octopus:bit boardet (normalt placeret ved siden af stikket til microbitten).'
      }
    ],
    algorithm: [
      {
        stepNumber: 1,
        title: 'Initialiser OLED skærm',
        description: 'Væk OLED skærmen og tegn en velkomstramme.',
        type: 'setup'
      },
      {
        stepNumber: 2,
        title: 'Aflæs fugtværdi',
        description: 'Læs det analoge signal fra Pin 1 (tal mellem 0 og 800).',
        type: 'input'
      },
      {
        stepNumber: 3,
        title: 'Omregn til procent',
        description: 'Omregn 0-800 til en pædagogisk procentsats mellem 0% (knastør) og 100% (mættet).',
        type: 'logic'
      },
      {
        stepNumber: 4,
        title: 'Skærmopdatering & Status',
        description: 'Skriv på OLED: "Fugt: XX %". HVIS under 30%: Skriv "GIV MIG VAND!". ELLERS: Skriv "Alt vel :)".',
        type: 'output'
      }
    ],
    makeCode: {
      blocksDescription: 'Brug analog aflæsning og OLED-udvidelsen til at vise live fugtighed i procent.',
      requiredBlocks: [
        {
          name: 'initialize OLED with height [64] width [128]',
          category: 'OLED',
          categoryColor: '#64adb8',
          type: 'command',
          params: '64, 128'
        },
        {
          name: 'clear OLED display',
          category: 'OLED',
          categoryColor: '#64adb8',
          type: 'command'
        },
        {
          name: 'læs analog værdi fra ben [P1]',
          category: 'Pins',
          categoryColor: '#9d322a',
          type: 'value',
          params: 'P1'
        },
        {
          name: 'kortlæg [værdi] fra lav [0] høj [750] til lav [0] høj [100]',
          category: 'Matematik',
          categoryColor: '#852ccb',
          type: 'value'
        },
        {
          name: 'show string [ ... ] on OLED',
          category: 'OLED',
          categoryColor: '#64adb8',
          type: 'command'
        },
        {
          name: 'show number [ ... ] on OLED',
          category: 'OLED',
          categoryColor: '#64adb8',
          type: 'command'
        },
        {
          name: 'når logo berøres',
          category: 'Input',
          categoryColor: '#bc38cd',
          type: 'event'
        }
      ],
      detailedSteps: [
        {
          stepNumber: 1,
          title: 'Hent Tinkercademy/OLED Udvidelsen',
          category: 'Udvidelser',
          categoryColor: '#717171',
          blockName: 'Tilføj "tinkerkit"',
          placement: 'Udvidelser menuen.',
          instruction: 'Åbn "Udvidelser" og tilføj "tinkerkit". Dette tilføjer OLED-kategorien i din venstre blokmenu.',
          tip: 'OLED skærmen kræver specielle instruktioner over I2C bussen, som denne udvidelse klarer for dig.'
        },
        {
          stepNumber: 2,
          title: 'Tænd og Klargør OLED-skærmen',
          category: 'OLED',
          categoryColor: '#64adb8',
          blockName: 'initialize OLED with height [64] width [128]',
          placement: 'Inde i "ved start".',
          instruction: 'Træk "initialize OLED with height 64 width 128" ind i "ved start". Skærmen har en opløsning på 128 pixels i bredden og 64 pixels i højden.',
          settings: [
            { field: 'Højde', setting: '64' },
            { field: 'Bredde', setting: '128' }
          ]
        },
        {
          stepNumber: 3,
          title: 'Aflæs det Analoge Signal fra P1',
          category: 'Pins',
          categoryColor: '#9d322a',
          blockName: 'læs analog værdi fra ben [P1]',
          placement: 'Inde i "for evigt" ind i en variabel "raafugt".',
          instruction: 'Opret variablen "raafugt". Sæt den til "læs analog værdi fra ben P1" (findes under Pins). Da fugtsensoren er analog, giver den et tal fra 0 til ca. 750 afhængig af jordens fugtighed.',
          settings: [
            { field: 'Ben', setting: 'P1' }
          ]
        },
        {
          stepNumber: 4,
          title: 'Omregn til Procent med Matematik-kortlægning',
          category: 'Matematik',
          categoryColor: '#852ccb',
          blockName: 'kortlæg [raafugt] fra [0 - 750] til [0 - 100]',
          placement: 'I en ny variabel "procent".',
          instruction: 'Gå til "Matematik" (lilla). Find den geniale blok "kortlæg [0] fra lav [0] høj [1023] til lav [0] høj [100]". Træk din variabel "raafugt" ind i første felt, og ret høj fra 1023 til 750. Nu har du et flot procenttal fra 0% til 100%!',
          settings: [
            { field: 'Input interval', setting: '0 til 750' },
            { field: 'Output interval', setting: '0 til 100 procent' }
          ]
        },
        {
          stepNumber: 5,
          title: 'Udskriv Målingen på OLED Displayet',
          category: 'OLED',
          categoryColor: '#64adb8',
          blockName: 'clear OLED + show string + show number',
          placement: 'I "for evigt" løkken efter beregningen.',
          instruction: '1. "clear OLED display" (renser skærmen). 2. "show string [Fugtighed:]". 3. "show number [procent]". 4. "show string [%]". 5. Hvis procent < 30: "show string [VAND MIG!]". Ellers: "show string [Planten har det godt]". 6. Pause 3000 ms.',
          settings: [
            { field: 'Tærskel', setting: 'Under 30% betyder tørst' }
          ]
        }
      ],
      extensionsNeeded: ['tinkerkit'],
      shareUrl: 'https://makecode.microbit.org',
      typescriptCode: `// Smart Plantepasser med OLED og Fugtsensor
OLED.init(128, 64)
OLED.clear()
OLED.writeStringNewLine("Smart Plante v2")
basic.pause(1000)

basic.forever(function () {
    let rawMoisture = pins.analogReadPin(AnalogPin.P1)
    let fugtProcent = Math.round(Math.min(100, (rawMoisture / 750) * 100))
    
    OLED.clear()
    OLED.writeString("Fugtighed: ")
    OLED.writeNum(fugtProcent)
    OLED.writeStringNewLine("%")
    
    if (fugtProcent < 30) {
        OLED.writeStringNewLine("STATUS: TØRSTIG!")
        OLED.writeStringNewLine("-> Vand mig venligst")
        basic.showIcon(IconNames.Sad)
    } else {
        OLED.writeStringNewLine("STATUS: Sund plante")
        OLED.writeStringNewLine("-> Alt er godt :)")
        basic.showIcon(IconNames.Happy)
    }
    
    basic.pause(3000)
})

input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    basic.showNumber(pins.analogReadPin(AnalogPin.P1))
})`
    },
    pythonCode: {
      code: `# Smart Plantepasser i MicroPython
from microbit import *

display.show(Image.HAPPY)

while True:
    raw_fugt = pin1.read_analog()
    procent = int((raw_fugt / 750) * 100)
    if procent > 100:
        procent = 100
        
    if procent < 30:
        display.show(Image.SAD)
    else:
        display.show(Image.YES)
        
    if pin_logo.is_touched():
        display.scroll(str(procent) + "%")
        
    sleep(2000)`,
      explanations: [
        {
          lines: 'raw_fugt = pin1.read_analog()',
          explanation: 'Læser spændingen på pin 1 og giver et heltal fra 0 (0 volt) til 1023 (3.3 volt).'
        },
        {
          lines: 'pin_logo.is_touched()',
          explanation: 'Undersøger om micro:bit v2 touch-logoet berøres med en finger.'
        }
      ]
    },
    hexFileName: 'smart-plantepasser.hex'
  },

  // --- PROJEKT 4 ---
  {
    id: 'parkeringsassistent',
    title: 'Parkeringsassistent med Bak-alarm',
    tagline: 'Ligesom i en moderne elbil: Få advarselsbip der stiger i intensitet, jo tættere du kommer på muren.',
    category: 'robotics',
    difficulty: 'begynder',
    estimatedTime: '20 min',
    requiredSensors: ['sonar', 'mb_speaker', 'mb_matrix'],
    expansionSensors: [
      {
        sensorId: 'oled',
        title: 'Centimeter Digitaldisplay',
        benefit: 'Vis den nøjagtige afstand i centimeter på et lækkert grafisk speedometer.',
        hint: 'Skriv afstanden på OLED og tegn en fremskridtsbjælke der fyldes op.'
      },
      {
        sensorId: 'servo',
        title: 'Mekanisk Parkeringsbom',
        benefit: 'Lad en bom løfte sig automatisk op, når bilen holder på den helt rigtige plads.',
        hint: 'Sæt servo på P2 og drej til 90 grader når afstand er mellem 5 og 10 cm.'
      },
      {
        sensorId: 'buzzer',
        title: 'Ekstern Høj Lydgiver',
        benefit: 'Monter en ekstern buzzer bagi legetøjsbilen, så lyden kommer fra det rigtige sted.',
        hint: 'Forbind buzzeren til P0 og brug samme tonekald.'
      }
    ],
    mission: {
      problem: 'Når man bakker ind i en snæver parkeringsbås, er det svært at bedømme den blinde vinkel bag bilen.',
      solution: 'Vi bygger en ultralyds-bakkealarm. På stor afstand bipper den langsomt. Når muren kommer tættere på, bipper den hurtigere og hurtigere, og under 5 cm lyder et uafbrudt hyl og et rødt STOP-symbol.',
      learningGoals: [
        'Lære at kortlægge måledata direkte til tidsforsinkelser (variabel frekvens).',
        'Programmere sikkerhedskritiske advarselssystemer.',
        'Bruge akustisk feedback til at assistere føreren.'
      ]
    },
    wiring: [
      {
        component: 'Sonar:bit (Ultralyd)',
        pin: 'Pin 1 (P1) på Octopus:bit',
        wireColor: 'Sort (GND), Rød (VCC), Gul (Signal)',
        instructions: 'Forbind 3-bens kablet fra Sonar:bit til P1 på Octopus:bit boardet.'
      },
      {
        component: 'micro:bit v2',
        pin: 'Integreret højttaler og LED',
        wireColor: 'Ingen',
        instructions: 'Den indbyggede v2 højttaler håndterer automatisk biplydene med høj præcision.'
      }
    ],
    algorithm: [
      {
        stepNumber: 1,
        title: 'Afstandsmåling',
        description: 'Mål afstanden bagud med Sonar:bit i centimeter.',
        type: 'input'
      },
      {
        stepNumber: 2,
        title: 'Tærskelvurdering',
        description: 'Vurder afstanden i 3 zoner: Grøn zone (> 30 cm: ro), Gul zone (10-30 cm: periodiske bip), Rød zone (< 10 cm: fare).',
        type: 'logic'
      },
      {
        stepNumber: 3,
        title: 'Dynamisk Bippetakt',
        description: 'Beregn pause mellem bip baseret på afstand: pause = afstand * 15 millisekunder.',
        type: 'logic'
      },
      {
        stepNumber: 4,
        title: 'Advarselssignal',
        description: 'Afspil biplyd over v2 højttaleren og vis faretal eller STOP-kryds på LED-matrixen.',
        type: 'output'
      }
    ],
    makeCode: {
      blocksDescription: 'Brug Sonar:bit afstanden til at styre en matematisk beregnet pause i millisekunder.',
      requiredBlocks: [
        {
          name: 'for evigt',
          category: 'Grundlæggende',
          categoryColor: '#5891f7',
          type: 'event'
        },
        {
          name: 'sonar:bit distance to obstacle in cm at Pin [P1]',
          category: 'Sonar',
          categoryColor: '#323e4e',
          type: 'value',
          params: 'P1'
        },
        {
          name: 'hvis < ... > så ... ellers hvis < ... > så ... ellers',
          category: 'Logik',
          categoryColor: '#57a1a5',
          type: 'container'
        },
        {
          name: 'spil tone [Høj C] i [1/16 takt]',
          category: 'Musik',
          categoryColor: '#cb4430',
          type: 'command',
          params: 'Høj C'
        },
        {
          name: 'pause (ms) [ (afstand) * (20) ]',
          category: 'Grundlæggende',
          categoryColor: '#5891f7',
          type: 'command'
        },
        {
          name: 'vis ikon [Nej] / [Firkant]',
          category: 'Grundlæggende',
          categoryColor: '#5891f7',
          type: 'command'
        }
      ],
      detailedSteps: [
        {
          stepNumber: 1,
          title: 'Mål Afstand med Sonar:bit',
          category: 'Tinkercademy',
          categoryColor: '#61b73a',
          blockName: 'sæt [afstand] til sonar:bit måling',
          placement: 'Øverst i "for evigt".',
          instruction: 'Opret variablen "afstand". Sæt den til blokken "sonar:bit distance to obstacle in cm at Pin P1" fra Tinkercademy udvidelsen.',
          settings: [{ field: 'Pin', setting: 'P1' }]
        },
        {
          stepNumber: 2,
          title: 'Kritisk Zone: STOP (Under 5 cm)',
          category: 'Logik',
          categoryColor: '#57a1a5',
          blockName: 'hvis < [afstand] <= 5 > så',
          placement: 'Første gren i hvis-blokken.',
          instruction: 'HVIS afstand <= 5: Vis ikon [Nej] (det store røde kryds) og spil konstant høj tone (Høj B / 988 Hz) i ultrakort tid.',
          settings: [{ field: 'Afstand', setting: '<= 5 cm' }]
        },
        {
          stepNumber: 3,
          title: 'Advarselszone: Hurtigere Bip jo tættere på',
          category: 'Logik',
          categoryColor: '#57a1a5',
          blockName: 'ellers hvis < [afstand] <= 35 > så',
          placement: 'Anden gren i hvis-blokken (klik på + for at tilføje "ellers hvis").',
          instruction: 'HVIS afstanden er mellem 5 og 35 cm: 1. Vis ikon [Firkant]. 2. Spil tone [Mellem E]. 3. Sæt "pause (ms)" til et regnestykke: Fra Matematik trækker du multiplikationsblokken "[ 0 ] x [ 0 ]" ud og sætter den til "[afstand] x 20".',
          settings: [
            { field: 'Regnestykke', setting: 'afstand * 20' },
            { field: 'Eksempel', setting: 'Ved 10 cm = 200 ms pause. Ved 30 cm = 600 ms pause.' }
          ],
          tip: 'Dette er nøglen til en professionel bak-alarm: Pausen mellem bip forkortes matematisk, når afstanden bliver mindre!'
        },
        {
          stepNumber: 4,
          title: 'Sikker Zone: Ingen bip',
          category: 'Grundlæggende',
          categoryColor: '#5891f7',
          blockName: 'ellers: vis ikon [Lille Firkant]',
          placement: 'I den sidste "ellers"-gren.',
          instruction: 'Når bilen er over 35 cm væk fra muren, vises blot en lille prik/firkant på displayet, og højttaleren er tavs.',
          settings: [{ field: 'Ikon', setting: 'Lille firkant' }]
        }
      ],
      extensionsNeeded: ['tinkerkit'],
      shareUrl: 'https://makecode.microbit.org',
      typescriptCode: `// Parkeringsassistent med adaptiv bak-alarm
let afstand = 0

basic.forever(function () {
    // Mål afstand med Sonar:bit
    pins.digitalWritePin(DigitalPin.P1, 0)
    control.waitMicros(2)
    pins.digitalWritePin(DigitalPin.P1, 1)
    control.waitMicros(10)
    pins.digitalWritePin(DigitalPin.P1, 0)
    afstand = Math.round(pins.pulseIn(DigitalPin.P1, PulseValue.High) / 58)

    if (afstand > 0 && afstand <= 5) {
        // Kritisk zone: STOP!
        basic.showIcon(IconNames.No)
        music.playTone(988, music.beat(BeatFraction.Sixteenth))
        basic.pause(50)
    } else if (afstand > 5 && afstand <= 35) {
        // Advarselszone: Hurtigere bip jo tættere på
        basic.showIcon(IconNames.Square)
        music.playTone(659, music.beat(BeatFraction.Sixteenth))
        basic.pause(afstand * 20) // Nærmere = kortere pause!
    } else {
        // Sikker zone
        basic.showIcon(IconNames.SmallSquare)
        basic.pause(200)
    }
})`
    },
    pythonCode: {
      code: `# Parkeringsassistent i MicroPython
from microbit import *
import music

while True:
    display.show(Image.ARROW_N)
    music.pitch(659, 50)
    sleep(300)`,
      explanations: [
        {
          lines: 'music.pitch(659, 50)',
          explanation: 'Laver et ultrakort "bip" på 50 millisekunder.'
        }
      ]
    },
    hexFileName: 'parkeringsassistent.hex'
  },

  // --- PROJEKT 5 ---
  {
    id: 'reaktionsspil-highscore',
    title: 'Reaktions- & Refleksspil med Highscore',
    tagline: 'Test dine reflekser mod vennerne: Slå på Crash Sensoren det mikrosekund signalet lyder!',
    category: 'games',
    difficulty: 'begynder',
    estimatedTime: '20 min',
    requiredSensors: ['crash', 'mb_buttons', 'mb_matrix', 'mb_speaker'],
    expansionSensors: [
      {
        sensorId: 'oled',
        title: 'Highscore Leaderboard',
        benefit: 'Vis de 3 hurtigste reaktionstider i millisekunder direkte på OLED-skærmen.',
        hint: 'Gem de bedste tider i variabler og udskriv med OLED.writeStringNewLine.'
      },
      {
        sensorId: 'potentiometer',
        title: 'Sværhedsgrads-vælger',
        benefit: 'Juster den tilfældige ventetid eller snyde-tolerance med drejeknappen.',
        hint: 'Aflæs potentiometer og brug som multiplikator for random interval.'
      },
      {
        sensorId: 'servo',
        title: 'Præmie-udkaster',
        benefit: 'Lad servomotoren skubbe et stykke slik ud, hvis reaktionstiden er under 200 millisekunder!',
        hint: 'Drej servo til 90 grader når score < 200.'
      }
    ],
    mission: {
      problem: 'Hvem har egentlig de hurtigste reflekser i klassen eller vennegruppen?',
      solution: 'Vi programmerer et spil med microbittens processorur: Microbitten venter en hemmelig, tilfældig tid (mellem 1 og 5 sekunder). Pludselig lyder et "BIP!" og skærmen lyser op. Den spiller, der hamrer hurtigst ned på Crash Sensoren, får sin tid målt i præcise millisekunder!',
      learningGoals: [
        'Bruge microbittens indbyggede mikrosekund/millisekund-ur (running time).',
        'Generere tilfældige tal (random) til uforudsigelig timing.',
        'Håndtere falske starter (snyd, hvis man trykker for tidligt).'
      ]
    },
    wiring: [
      {
        component: 'Crash Sensor (Microswitch)',
        pin: 'Pin 1 (P1) på Octopus:bit',
        wireColor: 'Sort (GND), Rød (VCC), Gul (Signal)',
        instructions: 'Forbind Crash Sensoren til Pin 1 porten. Den robuste metal-kontakt fungerer som buzzer-knap.'
      }
    ],
    algorithm: [
      {
        stepNumber: 1,
        title: 'Klar, parat...',
        description: 'Spillet starter når man trykker på Knap A. Vis et udråbstegn og afspil en lav opstartstone.',
        type: 'setup'
      },
      {
        stepNumber: 2,
        title: 'Hemmelig ventetid',
        description: 'Vælg et tilfældigt tal mellem 1000 og 4500 millisekunder. Hvis spilleren trykker på Crash Sensoren her: Snyd registreret!',
        type: 'logic'
      },
      {
        stepNumber: 3,
        title: 'START-signal',
        description: 'Vis et hjerte på LED, spil en skarp tone og start tidsmålingen: startTid = spilletid i ms.',
        type: 'output'
      },
      {
        stepNumber: 4,
        title: 'Refleks-registrering',
        description: 'Vent på at Crash Sensor trykkes ned. Sluttid = spilletid. Reaktionstid = sluttid - startTid. Vis resultatet.',
        type: 'input'
      }
    ],
    makeCode: {
      blocksDescription: 'Mål reaktionstid i millisekunder med Crash Sensoren på ben P1.',
      requiredBlocks: [
        {
          name: 'når der trykkes på knap [A]',
          category: 'Input',
          categoryColor: '#bc38cd',
          type: 'event',
          params: 'Knap A'
        },
        {
          name: 'vælg tilfældigt tal fra [2000] til [5000]',
          category: 'Matematik',
          categoryColor: '#852ccb',
          type: 'value',
          params: '2000 - 5000'
        },
        {
          name: 'køretid (ms)',
          category: 'Kontrol',
          categoryColor: '#333333',
          type: 'value'
        },
        {
          name: 'mens < [læs digital værdi fra ben P1] != 0 > gentag',
          category: 'Løkker',
          categoryColor: '#56a530',
          type: 'container'
        },
        {
          name: 'vis nummer [reaktionstid]',
          category: 'Grundlæggende',
          categoryColor: '#5891f7',
          type: 'command'
        }
      ],
      detailedSteps: [
        {
          stepNumber: 1,
          title: 'Start Spillet med Knap A',
          category: 'Input',
          categoryColor: '#bc38cd',
          blockName: 'når der trykkes på knap [A]',
          placement: 'I arbejdsområdet som hændelsesblok.',
          instruction: 'Find den lilla "når der trykkes på knap [A]" blok. Vis ikonet [Lille diamant] som indikation af, at spillet er i gang med at varme op.',
          settings: [{ field: 'Knap', setting: 'A' }]
        },
        {
          stepNumber: 2,
          title: 'Generer Tilfældig Ventetid',
          category: 'Matematik',
          categoryColor: '#852ccb',
          blockName: 'pause (ms) [ vælg tilfældigt fra 2000 til 5000 ]',
          placement: 'Inde i knap A blokken.',
          instruction: 'Gå til "Matematik" og træk "vælg tilfældigt fra [0] til [10]" ind i feltet på en "pause (ms)" blok. Ret tallene til 2000 og 5000 ms (2 til 5 sekunder).',
          tip: 'Dette sikrer, at ingen spiller kan gætte hvornår klarsignalet kommer!'
        },
        {
          stepNumber: 3,
          title: 'Giv Startsignal og Start Tiden',
          category: 'Grundlæggende',
          categoryColor: '#5891f7',
          blockName: 'vis ikon [Målskive] + sæt startTid til køretid (ms)',
          placement: 'Lige efter pausen.',
          instruction: '1. "vis ikon [Målskive]". 2. Fra Musik: Spil opstartslyd. 3. Opret variablen "startTid" og sæt den til blokken "køretid (ms)" (findes under Kontrol).',
          settings: [{ field: 'Variabel', setting: 'startTid' }]
        },
        {
          stepNumber: 4,
          title: 'Vent på at Spilleren Hamrer på Crash Sensoren',
          category: 'Løkker',
          categoryColor: '#56a530',
          blockName: 'mens < læs digital værdi fra ben P1 != 0 >',
          placement: 'Efter tidsstempling.',
          instruction: 'Fra "Løkker" (grøn): Hent "mens <sand> gentag". I betingelsen sætter du: "læs digital værdi fra ben P1 != 0". Løkken holdes tom. Microbitten venter her, indtil sensoren presses ned!',
          settings: [{ field: 'Ben', setting: 'P1 (Crash sensor)' }]
        },
        {
          stepNumber: 5,
          title: 'Beregn og Vis Reaktionstiden i Millisekunder',
          category: 'Matematik',
          categoryColor: '#852ccb',
          blockName: 'sæt reaktionstid til [køretid (ms) - startTid]',
          placement: 'Lige efter mens-løkken.',
          instruction: 'Opret variablen "reaktionstid". Sæt den til: "køretid (ms) minus startTid". Vis tallet med "vis nummer [reaktionstid]". Spil succeslyd!',
          tip: 'Et menneskes normale synsreaktionstid er ca. 200-300 millisekunder. Kan du slå 180 ms?'
        }
      ],
      extensionsNeeded: [],
      shareUrl: 'https://makecode.microbit.org',
      typescriptCode: `// Reaktionsspil med Crash Sensor og Millisekund-ur
let startTid = 0
let reaktionstid = 0

basic.showString("A=START")

input.onButtonPressed(Button.A, function () {
    basic.clearScreen()
    basic.showIcon(IconNames.SmallDiamond)
    
    // Tilfældig ventetid mellem 2 og 5 sekunder
    let ventetid = randint(2000, 5000)
    basic.pause(ventetid)
    
    // NU!
    basic.showIcon(IconNames.Target)
    soundExpression.spring.play()
    startTid = control.millis()
    
    // Vent på at Crash Sensoren rammes på Pin 1
    while (pins.digitalReadPin(DigitalPin.P1) != 0) {
        // Venter på tryk...
    }
    
    reaktionstid = control.millis() - startTid
    soundExpression.happy.play()
    basic.showNumber(reaktionstid)
    basic.pause(1000)
    basic.showString("MS")
})`
    },
    pythonCode: {
      code: `# Reaktionsspil i MicroPython
from microbit import *
import random
import music

display.scroll("A=START")

while True:
    if button_a.was_pressed():
        display.show(Image.DIAMOND_SMALL)
        sleep(random.randint(2000, 5000))
        
        display.show(Image.TARGET)
        music.pitch(880, 100)
        start = running_time()
        
        while pin1.read_digital() != 0:
            pass
            
        score = running_time() - start
        display.scroll(str(score) + "ms")`,
      explanations: [
        {
          lines: 'start = running_time()',
          explanation: 'Gemmer det præcise antal millisekunder siden microbitten blev tændt.'
        }
      ]
    },
    hexFileName: 'reaktionsspil-highscore.hex'
  },

  // --- PROJEKT 6 ---
  {
    id: 'sikkerhedsboks-pinkode',
    title: 'Hemmelig Sikkerhedsboks med Pinkode',
    tagline: 'Byg dit eget elektroniske pengeskab med ADKeypad kodelås og servostyret låsemekanisme.',
    category: 'security',
    difficulty: 'avanceret',
    estimatedTime: '35 min',
    requiredSensors: ['keypad', 'servo', 'oled', 'mb_speaker'],
    expansionSensors: [
      {
        sensorId: 'crash',
        title: 'Låge-kontakt (Sabotage-sikring)',
        benefit: 'Opdag hvis nogen bryder lågen op uden at indtaste koden, og udløs alarmen omgående.',
        hint: 'Sæt crash sensor i kanten af lågen på Pin 1.'
      },
      {
        sensorId: 'mb_accel',
        title: 'Rystedetektor mod Tyveri',
        benefit: 'Udløs alarm hvis nogen forsøger at løfte eller flytte hele boksen.',
        hint: 'Brug "on shake" hændelsen til at starte sirene.'
      },
      {
        sensorId: 'mb_touch',
        title: 'Hemmelig Nødnøgle',
        benefit: 'Berør logoet i 3 sekunder som hemmelig master-kode for ejeren.',
        hint: 'Tjek om logo er rørt sammen med knap B for nødoplåsning.'
      }
    ],
    mission: {
      problem: 'Vigtige ting skal opbevares sikkert, men traditionelle nøgler kan let blive væk.',
      solution: 'Vi opbygger et pengeskab i pap eller træ med ADKeypad tastaturet. Brugeren skal indtaste den rigtige 4-cifrede talkombination (f.eks. A-B-D-A). Hvis koden er korrekt, trækker servoen låsepalen tilbage, OLED-displayet byder velkommen, og v2 højttaleren spiller en succes-lyd. Ved forkert kode låser systemet i 10 sekunder.',
      learningGoals: [
        'Arbejde med arrays/lister og strenge til kodeordssammenligning.',
        'Håndtere tilstandsmaskiner (Låst -> Kodeindtastning -> Låst op -> Fejl).',
        'Styre en servomotor som fysisk mekanisk lås.'
      ]
    },
    wiring: [
      {
        component: 'ADKeypad (5 knapper)',
        pin: 'Pin 2 (P2) på Octopus:bit',
        wireColor: 'Sort (GND), Rød (VCC), Gul (Signal)',
        instructions: 'Sæt ADKeypad kablet i Pin 2. Alle 5 taster sender forskellige spændingsniveauer over denne ene ledning.'
      },
      {
        component: 'Mini Servo 180°',
        pin: 'Pin 1 (P1) på Octopus:bit',
        wireColor: 'Brun (GND), Rød (VCC), Orange (Signal)',
        instructions: 'Sæt servomotoren til Pin 1. Montér det hvide plast-horn så det fungerer som dørslå.'
      },
      {
        component: 'OLED Display (0.96")',
        pin: 'I2C sokkel på Octopus:bit',
        wireColor: '4-bens fladkabel',
        instructions: 'Forbind OLED til I2C-porten på Octopus:bit.'
      }
    ],
    algorithm: [
      {
        stepNumber: 1,
        title: 'Initialisering & Lås',
        description: 'Drej servo til 0 grader (låst position). Skriv "INDTAST KODE: [ _ _ _ _ ]" på OLED.',
        type: 'setup'
      },
      {
        stepNumber: 2,
        title: 'Læs Tastatur',
        description: 'Lyt efter knaptryk på ADKeypad. Hver gang en knap trykkes, afspil et lille tastatur-klik og vis en stjerne (*).',
        type: 'input'
      },
      {
        stepNumber: 3,
        title: 'Kodesammenligning',
        description: 'Når der er indtastet 4 tegn: Sammenlign med den hemmelige kode (f.eks. "ABCA").',
        type: 'logic'
      },
      {
        stepNumber: 4,
        title: 'Adgangskontrol',
        description: 'KORREKT: Drej servo til 90 grader (åbn), vis "VELKOMMEN". FORKERT: Afspil brummetone, vis "ADGANG NÆGTET" og nulstil.',
        type: 'output'
      }
    ],
    makeCode: {
      blocksDescription: 'Byg kodelåsen med ADKeypad tastaturet på Pin 2 og servomotoren på Pin 1.',
      requiredBlocks: [
        {
          name: 'initialize OLED with height [64] width [128]',
          category: 'OLED',
          categoryColor: '#64adb8',
          type: 'command'
        },
        {
          name: 'sæt servo på ben [P1] til [0] grader',
          category: 'Pins',
          categoryColor: '#9d322a',
          type: 'command',
          params: 'P1, 0'
        },
        {
          name: 'ADKeypad button [A] is pressed on Pin [P2]',
          category: 'Tinkercademy',
          categoryColor: '#61b73a',
          type: 'boolean',
          params: 'A, P2'
        },
        {
          name: 'sæt [indtastet] til [forbind (indtastet) ("A")]',
          category: 'Tekst',
          categoryColor: '#ac872f',
          type: 'command'
        },
        {
          name: 'hvis < [indtastet] = [hemmeligKode] > så',
          category: 'Logik',
          categoryColor: '#57a1a5',
          type: 'container'
        }
      ],
      detailedSteps: [
        {
          stepNumber: 1,
          title: 'Initialiser Hardware og Sæt Låsen',
          category: 'OLED',
          categoryColor: '#64adb8',
          blockName: 'OLED init + servo til 0',
          placement: 'I "ved start".',
          instruction: '1. "initialize OLED with height 64 width 128". 2. "sæt servo på ben P1 til 0" (låst tilstand). 3. Opret variablen "hemmeligKode" og sæt den til teksten "AB". 4. Opret variablen "indtastet" og sæt den til tom tekst "".',
          settings: [
            { field: 'Servo ben', setting: 'P1' },
            { field: 'Kode', setting: 'AB' }
          ]
        },
        {
          stepNumber: 2,
          title: 'Registrer Tastetryk fra ADKeypad',
          category: 'Tinkercademy',
          categoryColor: '#61b73a',
          blockName: 'ADKeypad button [A] is pressed on Pin [P2]',
          placement: 'I "for evigt".',
          instruction: 'Brug blokken "hvis <ADKeypad button [A] is pressed on Pin P2>". Når den trykkes: Føj "A" til variablen "indtastet", spil et klik og skriv "*" på OLED.',
          settings: [{ field: 'Knap A ben', setting: 'P2' }]
        },
        {
          stepNumber: 3,
          title: 'Lås op ved Korrekt Kode',
          category: 'Logik',
          categoryColor: '#57a1a5',
          blockName: 'hvis < indtastet == hemmeligKode > så servo til 90',
          placement: 'Når længden af indtastet er 2.',
          instruction: 'Når brugeren har trykket 2 taster: Hvis teksten matcher "hemmeligKode", drejes servoen på P1 til 90 grader (låst op), og displayet viser "VELKOMMEN!". Efter 5 sekunder drejer servoen tilbage til 0 grader (automatisk genlåsning).',
          settings: [
            { field: 'Åbn vinkel', setting: '90 grader' },
            { field: 'Luk vinkel', setting: '0 grader' }
          ]
        }
      ],
      extensionsNeeded: ['tinkerkit'],
      shareUrl: 'https://makecode.microbit.org',
      typescriptCode: `// Sikkerhedsboks med ADKeypad og Servo
OLED.init(128, 64)
pins.servoWritePin(AnalogPin.P1, 0) // Låst
let hemmeligKode = "AB"
let indtastet = ""

OLED.clear()
OLED.writeStringNewLine("Pengeskab v2")
OLED.writeStringNewLine("Tryk kode...")

basic.forever(function () {
    let raw = pins.analogReadPin(AnalogPin.P2)
    
    if (raw < 50) {
        indtastet = indtastet + "A"
        music.playTone(523, 100)
        OLED.writeString("*")
        basic.pause(400)
    } else if (raw > 50 && raw < 150) {
        indtastet = indtastet + "B"
        music.playTone(659, 100)
        OLED.writeString("*")
        basic.pause(400)
    }
    
    if (indtastet.length >= 2) {
        if (indtastet == hemmeligKode) {
            OLED.clear()
            OLED.writeStringNewLine("KORREKT KODE!")
            OLED.writeStringNewLine("Boks aabnet...")
            soundExpression.happy.play()
            pins.servoWritePin(AnalogPin.P1, 90) // Lås op!
            basic.pause(5000)
            pins.servoWritePin(AnalogPin.P1, 0)  // Lås igen
            indtastet = ""
            OLED.clear()
            OLED.writeStringNewLine("Boks laast.")
        } else {
            OLED.clear()
            OLED.writeStringNewLine("FORKERT KODE!")
            soundExpression.sad.play()
            basic.pause(2000)
            indtastet = ""
            OLED.clear()
            OLED.writeStringNewLine("Tryk kode...")
        }
    }
})`
    },
    pythonCode: {
      code: `# Pengeskab i MicroPython
from microbit import *

display.show(Image.LOCK)
pass`,
      explanations: [
        {
          lines: 'pins.servoWritePin(AnalogPin.P1, 90)',
          explanation: 'Drej servomotoren 90 grader for at trække låsebolten tilbage.'
        }
      ]
    },
    hexFileName: 'sikkerhedsboks-pinkode.hex'
  },

  // --- PROJEKT 7 ---
  {
    id: 'natlampe-klap-og-lys',
    title: 'Smart Natlampe med Lyssensor & Klapstyring',
    tagline: 'En sengelampe der automatisk tænder dæmpet i mørke, og kan tændes/slukkes ved blot at klappe i hænderne!',
    category: 'smarthome',
    difficulty: 'begynder',
    estimatedTime: '20 min',
    requiredSensors: ['mb_mic', 'mb_light', 'mb_matrix', 'mb_speaker'],
    expansionSensors: [
      {
        sensorId: 'pir',
        title: 'Bevægelses-tænding under sengen',
        benefit: 'Læg PIR-sensoren ved sengekanten, så lyset tænder blidt når du sætter fødderne på gulvet om natten.',
        hint: 'Tænd displayet når PIR signal er 1 og lysniveau er lavt.'
      },
      {
        sensorId: 'potentiometer',
        title: 'Lysdæmper (Dimmer)',
        benefit: 'Juster lampens maksimale lysstyrke trinløst med drejeknappen.',
        hint: 'Brug "led.setBrightness(potentiometer / 4)".'
      },
      {
        sensorId: 'oled',
        title: 'Vækkeur & Nat-display',
        benefit: 'Vis aktuel tid og om lysautomatikken er slået til eller fra.',
        hint: 'Skriv statusbeskeder på OLED.'
      }
    ],
    mission: {
      problem: 'Når man vågner om natten og skal på toilettet, vil man ikke blændes af skarpt loftslys eller lede efter en lyskontakt i mørket.',
      solution: 'Vi udnytter micro:bit v2 mikrofon og lyssensor. Når det er mørkt i rummet (lysniveau < 50), lytter microbitten efter et klap. Ved klap tændes et beroligende mønster på LED-matrixen og en blid godnatmelodi spilles.',
      learningGoals: [
        'Bruge mikrofon-triggere (on loud sound) til berøringsfri styring.',
        'Måle omgivende lys med den indbyggede fotodiode-funktion.',
        'Kombinere to miljøsensorer (lys + lyd) i ét smart home-system.'
      ]
    },
    wiring: [
      {
        component: 'micro:bit v2',
        pin: 'Alt er indbygget på micro:bit v2',
        wireColor: 'Ingen kabler behøves!',
        instructions: 'Dette projekt bruger de avancerede indbyggede sensorer på selve micro:bit v2 (mikrofon, lyssensor, LED-matrix og højttaler).'
      }
    ],
    algorithm: [
      {
        stepNumber: 1,
        title: 'Lysmåling',
        description: 'Mål det aktuelle lysniveau i rummet (0 = totalt mørke, 255 = dagslys).',
        type: 'input'
      },
      {
        stepNumber: 2,
        title: 'Mørkedetektion',
        description: 'HVIS lysniveau er under 60: Systemet aktiverer nat-tilstand og lytter efter klap.',
        type: 'logic'
      },
      {
        stepNumber: 3,
        title: 'Klap-detektion',
        description: 'Når mikrofonen registrerer en pludselig lyd (et klap eller knips): Skift lysets tilstand (TÆNDT <-> SLUKKET).',
        type: 'logic'
      },
      {
        stepNumber: 4,
        title: 'Lampeaktivering',
        description: 'Tænd LED-matrixen med en dæmpet, hyggelig glød og spil en lille vuggevise-tone.',
        type: 'output'
      }
    ],
    makeCode: {
      blocksDescription: 'Brug mikrofonen og lysniveauet til at tænde og slukke lampen.',
      requiredBlocks: [
        {
          name: 'ved høj lyd',
          category: 'Input',
          categoryColor: '#bc38cd',
          type: 'event'
        },
        {
          name: 'lysniveau',
          category: 'Input',
          categoryColor: '#bc38cd',
          type: 'value'
        },
        {
          name: 'sæt lysstyrke til [120]',
          category: 'LED',
          categoryColor: '#56358c',
          type: 'command',
          params: '120'
        },
        {
          name: 'vis ikon [Hjerte]',
          category: 'Grundlæggende',
          categoryColor: '#5891f7',
          type: 'command',
          params: 'Hjerte'
        },
        {
          name: 'ryd skærm',
          category: 'Grundlæggende',
          categoryColor: '#5891f7',
          type: 'command'
        }
      ],
      detailedSteps: [
        {
          stepNumber: 1,
          title: 'Definer Natlampens Tilstand',
          category: 'Variabler',
          categoryColor: '#c13541',
          blockName: 'sæt lampeTaendt til FALSK + dæmp lysstyrke',
          placement: 'I "ved start".',
          instruction: '1. Opret en sand/falsk variabel "lampeTaendt" og sæt den til "falsk" (findes under Logik). 2. Fra "LED" menuen vælges "sæt lysstyrke til [120]" så natlyset ikke blænder om natten.',
          settings: [{ field: 'Lysstyrke', setting: '120 (af 255)' }]
        },
        {
          stepNumber: 2,
          title: 'Registrer Klap med v2 Mikrofonen',
          category: 'Input',
          categoryColor: '#bc38cd',
          blockName: 'ved høj lyd (on loud sound)',
          placement: 'I arbejdsområdet som hændelsesblok.',
          instruction: 'Find den lilla blok "ved høj lyd". Den reagerer automatisk på et klap i hænderne eller et højt knips med fingrene.',
          tip: 'På forsiden af micro:bit v2 lyser en lille rød LED ved mikrofonen, hver gang der høres lyd.'
        },
        {
          stepNumber: 3,
          title: 'Tjek om Rummet er Mørkt',
          category: 'Logik',
          categoryColor: '#57a1a5',
          blockName: 'hvis < [lysniveau] < 70 > så',
          placement: 'Inde i "ved høj lyd" blokken.',
          instruction: 'Vi vil kun tænde natlampen, hvis det er mørkt! Indsæt en hvis-blok med betingelsen "lysniveau < 70" (blokken lysniveau findes under Input).',
          settings: [{ field: 'Mørketærskel', setting: '< 70' }]
        },
        {
          stepNumber: 4,
          title: 'Vend Tilstanden (Toggle Tænd/Sluk)',
          category: 'Logik',
          categoryColor: '#57a1a5',
          blockName: 'hvis lampeTaendt er sand -> sluk, ellers tænd',
          placement: 'Inde i mørkebetingelsen.',
          instruction: 'HVIS lampeTaendt er falsk: Sæt den til sand, vis ikon [Hjerte] og spil godnattone. ELLERS: Sæt den til falsk og "ryd skærm" for at slukke.',
          tip: 'Dette er den klassiske "toggle"-funktion som bruges i alle moderne smarthome-kontakter.'
        }
      ],
      extensionsNeeded: [],
      shareUrl: 'https://makecode.microbit.org',
      typescriptCode: `// Smart Natlampe med lys- og klapaktivering
let lampeTaendt = false
led.setBrightness(120)

input.onSound(DetectedSound.Loud, function () {
    // Tjek om det er mørkt i rummet
    if (input.lightLevel() < 70) {
        lampeTaendt = !lampeTaendt
        
        if (lampeTaendt) {
            // Tænd natlampen
            basic.showIcon(IconNames.Heart)
            music.playTone(440, music.beat(BeatFraction.Eighth))
        } else {
            // Sluk natlampen
            basic.clearScreen()
        }
    }
})

basic.forever(function () {
    // Hvis det bliver lyst (dag), slukkes lampen automatisk
    if (input.lightLevel() >= 80 && lampeTaendt) {
        lampeTaendt = false
        basic.clearScreen()
    }
    basic.pause(1000)
})`
    },
    pythonCode: {
      code: `# Smart Natlampe i MicroPython
from microbit import *
import music

lampe_taendt = False
set_volume(100)

while True:
    lysstyrke = display.read_light_level()
    
    if microphone.was_event(SoundEvent.LOUD):
        if lysstyrke < 70:
            lampe_taendt = not lampe_taendt
            if lampe_taendt:
                display.show(Image.HEART)
                music.pitch(440, 100)
            else:
                display.clear()
                
    if lysstyrke >= 80 and lampe_taendt:
        lampe_taendt = False
        display.clear()
        
    sleep(100)`,
      explanations: [
        {
          lines: 'microphone.was_event(SoundEvent.LOUD)',
          explanation: 'Registrerer om der er opfanget en markant lydspids (klap/stemme).'
        }
      ]
    },
    hexFileName: 'natlampe-klap-og-lys.hex'
  },

  // --- PROJEKT 8 ---
  {
    id: 'dj-synthesizer-beatbox',
    title: 'Digital DJ Synthesizer & Beatbox',
    tagline: 'Skab elektronisk musik med potentiometeret som pitch/filter og v2 accelerometeret som lyd-effektpad!',
    category: 'audio',
    difficulty: 'mellem',
    estimatedTime: '25 min',
    requiredSensors: ['potentiometer', 'buzzer', 'mb_accel', 'mb_touch'],
    expansionSensors: [
      {
        sensorId: 'keypad',
        title: '5-toners Klaver-keyboard',
        benefit: 'Brug ADKeypad til at spille individuelle meloditoner (C, D, E, F, G) oveni bassen.',
        hint: 'Kobl ADKeypad til P2 og spil forskellige frekvenser for hver knap.'
      },
      {
        sensorId: 'oled',
        title: 'Grafisk Lydbølge Visualizer',
        benefit: 'Tegn en live frekvensbølge eller frekvens-tal på skærmen i takt med musikken.',
        hint: 'Tegn linjer på OLED baseret på tonefrekvensen.'
      },
      {
        sensorId: 'servo',
        title: 'Mekanisk Trommestik',
        benefit: 'Lad servomotoren slå på et bord eller en dåse som en rigtig fysisk robot-trommeslager!',
        hint: 'Skift servo hurtigt mellem 0 og 45 grader i faste takter.'
      }
    ],
    mission: {
      problem: 'Traditionelle synthesizere er dyre og svære at programmere for nybegyndere.',
      solution: 'Vi forvandler microbitten til en moderne midi-synth: Drejeknappen (potentiometeret) styrer tonens frekvens fra dyb bas til høj diskant. Når du vipper microbitten i luften (accelerometer), moduleres lyden som et wah-wah filter, og berøring af touch-logoet udløser et bastungt drop!',
      learningGoals: [
        'Forstå lydens fysiske natur: Frekvens (Hz), pitch og lydbølger.',
        'Matematisk skalering af analoge værdier til musiske frekvenser.',
        'Gestus-styret brugergrænseflade (vippe/dreje som musikinstrument).'
      ]
    },
    wiring: [
      {
        component: 'Potentiometer (Drejeknap)',
        pin: 'Pin 1 (P1) på Octopus:bit',
        wireColor: 'Sort (GND), Rød (VCC), Gul (Signal)',
        instructions: 'Forbind potentiometeret til Pin 1 porten på Octopus:bit.'
      },
      {
        component: 'Passiv Buzzer (eller v2 højttaler)',
        pin: 'Pin 0 (P0) på Octopus:bit',
        wireColor: 'Sort (GND), Rød (VCC), Gul (Signal)',
        instructions: 'Forbind buzzeren til Pin 0 for skarp akustisk output (eller benyt v2 højttaleren).'
      }
    ],
    algorithm: [
      {
        stepNumber: 1,
        title: 'Læs Kontrolværdier',
        description: 'Læs potentiometeret (0-1023) og accelerometerets hældningsvinkel.',
        type: 'input'
      },
      {
        stepNumber: 2,
        title: 'Frekvensberegning',
        description: 'Skaler 0-1023 til hørbare musiske frekvenser mellem 130 Hz (C3) og 1046 Hz (C6).',
        type: 'logic'
      },
      {
        stepNumber: 3,
        title: 'Tonegenerering',
        description: 'Send frekvensen ud til lydgiveren. Hæld microbitten til siden for vibrato-effekt.',
        type: 'output'
      },
      {
        stepNumber: 4,
        title: 'Beat Drop',
        description: 'Hvis touch-logoet berøres: Spil en intens tromme-effekt.',
        type: 'output'
      }
    ],
    makeCode: {
      blocksDescription: 'Kortlæg potentiometerets analoge værdi til musiske tonefrekvenser i Hertz.',
      requiredBlocks: [
        {
          name: 'læs analog værdi fra ben [P1]',
          category: 'Pins',
          categoryColor: '#9d322a',
          type: 'value',
          params: 'P1'
        },
        {
          name: 'kortlæg [0] fra [0 - 1023] til [131 - 988]',
          category: 'Matematik',
          categoryColor: '#852ccb',
          type: 'value'
        },
        {
          name: 'hældning (grader) [rulning]',
          category: 'Input',
          categoryColor: '#bc38cd',
          type: 'value',
          params: 'rulning'
        },
        {
          name: 'ring tone [ ... ] (Hz)',
          category: 'Musik',
          categoryColor: '#cb4430',
          type: 'command'
        },
        {
          name: 'når logo berøres',
          category: 'Input',
          categoryColor: '#bc38cd',
          type: 'event'
        }
      ],
      detailedSteps: [
        {
          stepNumber: 1,
          title: 'Læs Potentiometerets Drejeposition',
          category: 'Pins',
          categoryColor: '#9d322a',
          blockName: 'læs analog værdi fra ben [P1]',
          placement: 'I "for evigt" ind i en variabel "pot".',
          instruction: 'Potentiometeret drejer en modstand, som giver microbitten et tal fra 0 (helt mod uret) til 1023 (helt med uret) på Pin 1.',
          settings: [{ field: 'Ben', setting: 'P1' }]
        },
        {
          stepNumber: 2,
          title: 'Oversæt Værdien til Musiske Frekvenser',
          category: 'Matematik',
          categoryColor: '#852ccb',
          blockName: 'kortlæg [pot] fra [0-1023] til [131-988]',
          placement: 'I variablen "frekvens".',
          instruction: 'Brug "kortlæg" blokken fra Matematik. 131 Hz svarer til en dyb C3 node på et klaver, og 988 Hz er en høj B5 diskant-tone.',
          settings: [
            { field: 'Fra interval', setting: '0 til 1023' },
            { field: 'Til interval', setting: '131 til 988 Hz' }
          ]
        },
        {
          stepNumber: 3,
          title: 'Moduler Tonen med Microbitten i Luften',
          category: 'Input',
          categoryColor: '#bc38cd',
          blockName: 'frekvens + (hældning rulning * 2)',
          placement: 'Lige før tonen spilles.',
          instruction: 'Hent "hældning (grader) [rulning]" fra Input. Læg dette til frekvensen for at skabe en sjov vibrato/theremin-effekt, når du vipper microbitten!',
          tip: 'Dette gør microbitten til et rigtigt elektronisk musikinstrument som styres med kroppen!'
        },
        {
          stepNumber: 4,
          title: 'Afspil Tonen Kontinuerligt',
          category: 'Musik',
          categoryColor: '#cb4430',
          blockName: 'ring tone [frekvens] (Hz)',
          placement: 'Nederst i "for evigt" med pause (ms) [50].',
          instruction: 'Brug blokken "ring tone" (i stedet for "spil tone"). Den holder tonen kørende uden afbrydelse.',
          settings: [{ field: 'Pause', setting: '50 ms' }]
        }
      ],
      extensionsNeeded: [],
      shareUrl: 'https://makecode.microbit.org',
      typescriptCode: `// Digital DJ Synth med gestus og potentiometer
let pot = 0
let frekvens = 0

basic.forever(function () {
    pot = pins.analogReadPin(AnalogPin.P1)
    
    // Kortlæg 0-1023 til 131Hz - 988Hz
    frekvens = Math.map(pot, 0, 1023, 131, 988)
    
    // Hældning modulerer tonehøjden med vibrato
    let roll = input.rotation(Rotation.Roll)
    let modulering = Math.round(roll * 2)
    
    music.ringTone(frekvens + modulering)
    basic.pause(50)
})

input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    soundExpression.slide.play()
})`
    },
    pythonCode: {
      code: `# DJ Synth i MicroPython
from microbit import *
import music

while True:
    raw = pin1.read_analog()
    freq = int(130 + (raw / 1023.0) * 770)
    tilt = accelerometer.get_x() // 10
    music.pitch(freq + tilt, 60)
    
    if pin_logo.is_touched():
        display.show(Image.MUSIC_QUAVER)
    else:
        display.clear()`,
      explanations: [
        {
          lines: 'freq = int(130 + (raw / 1023.0) * 770)',
          explanation: 'Matematisk lineær interpolation der oversætter spænding til musiske hertz.'
        }
      ]
    },
    hexFileName: 'dj-synthesizer-beatbox.hex'
  },

  // --- PROJEKT 9 ---
  {
    id: 'digitalt-vaterpas',
    title: 'Digitalt Vaterpas & Vinkelmåler',
    tagline: 'Byg et ultrapræcist vaterpas med grafisk boble på OLED-skærmen og akustisk centreringsbip.',
    category: 'nature',
    difficulty: 'mellem',
    estimatedTime: '25 min',
    requiredSensors: ['mb_accel', 'oled', 'mb_speaker'],
    expansionSensors: [
      {
        sensorId: 'potentiometer',
        title: 'Nulstillings- og Kalibreringsknap',
        benefit: 'Juster vaterpassets følsomhed eller nulstil til en skæv overflade (relativ vinkelmåling).',
        hint: 'Brug potentiometer som offset i beregningen.'
      },
      {
        sensorId: 'servo',
        title: 'Selvnivellerende Platform',
        benefit: 'Lad servomotoren modvirke hældningen, så en monteret platform altid holdes 100% vandret!',
        hint: 'Drej servoen modsat den målte hældningsvinkel.'
      },
      {
        sensorId: 'crash',
        title: 'Hold / Frys-knap',
        benefit: 'Klik på kontakten for at fastfryse målingen på skærmen, når man måler på svært tilgængelige steder.',
        hint: 'Pause skærmopdatering når crash sensor trykkes.'
      }
    ],
    mission: {
      problem: 'Når man hænger hylder op eller samler møbler, er traditionelle vaterpas ofte for store eller svære at aflæse præcist.',
      solution: 'Vi udnytter microbittens 3-aksede accelerometer til at beregne hældning i både Pitch (for/bag) og Roll (venstre/højre). På OLED skærmen tegnes en virtuel luftboble i et sigtekorn, og når vinklen er inden for 0,5 graders præcision, kvitterer v2 højttaleren med et perfekt "klirrende" godkendt-bip.',
      learningGoals: [
        'Forstå vinkelberegning via tyngdekraftens påvirkning på sensoraksler.',
        'Grafisk koordinatsystem på en 128x64 pixels OLED skærm.',
        'Tolerancer og hysterese i præcisionsmålinger.'
      ]
    },
    wiring: [
      {
        component: 'OLED Display (0.96")',
        pin: 'I2C sokkel på Octopus:bit',
        wireColor: '4-bens I2C kabel',
        instructions: 'Sæt OLED-displayet i I2C porten.'
      },
      {
        component: 'micro:bit v2',
        pin: 'Indbygget accelerometer og højttaler',
        wireColor: 'Ingen kabler nødvendige',
        instructions: 'Accelerometeret er integreret på microbitten og aflæses direkte via software.'
      }
    ],
    algorithm: [
      {
        stepNumber: 1,
        title: 'Aflæs Hældning',
        description: 'Læs accelerometerets rotation for Pitch (hældning frem/tilbage) og Roll (sidehældning).',
        type: 'input'
      },
      {
        stepNumber: 2,
        title: 'Koordinatberegning',
        description: 'Kortlæg vinklerne (-45 til +45 grader) til pixels på OLED displayet (X: 0-128, Y: 0-64).',
        type: 'logic'
      },
      {
        stepNumber: 3,
        title: 'Præcisionstjek',
        description: 'HVIS både Pitch og Roll er tæt på 0 (mellem -2 og +2 grader): Centreret! Afspil tilfredsstillende "bing"-tone.',
        type: 'logic'
      },
      {
        stepNumber: 4,
        title: 'Grafisk Visning',
        description: 'Tegn en cirkel (boble) på de beregnede koordinater og vis de nøjagtige grader som tal.',
        type: 'output'
      }
    ],
    makeCode: {
      blocksDescription: 'Brug accelerometerets hældningsgrader og send målingerne til OLED skærmen.',
      requiredBlocks: [
        {
          name: 'initialize OLED with height [64] width [128]',
          category: 'OLED',
          categoryColor: '#64adb8',
          type: 'command'
        },
        {
          name: 'hældning (grader) [rulning]',
          category: 'Input',
          categoryColor: '#bc38cd',
          type: 'value',
          params: 'rulning'
        },
        {
          name: 'hældning (grader) [stigning]',
          category: 'Input',
          categoryColor: '#bc38cd',
          type: 'value',
          params: 'stigning'
        },
        {
          name: 'absolut værdi af [ ... ]',
          category: 'Matematik',
          categoryColor: '#852ccb',
          type: 'value'
        },
        {
          name: 'spil tone [Høj C] i [1/16 takt]',
          category: 'Musik',
          categoryColor: '#cb4430',
          type: 'command'
        }
      ],
      detailedSteps: [
        {
          stepNumber: 1,
          title: 'Initialiser OLED Skærmen',
          category: 'OLED',
          categoryColor: '#64adb8',
          blockName: 'initialize OLED 64x128',
          placement: 'I "ved start".',
          instruction: 'Tænd OLED-displayet i "ved start".',
          settings: [{ field: 'Dimensioner', setting: '64x128' }]
        },
        {
          stepNumber: 2,
          title: 'Aflæs Hældningsvinkler for Rulning og Stigning',
          category: 'Input',
          categoryColor: '#bc38cd',
          blockName: 'hældning (grader) [rulning] og [stigning]',
          placement: 'I "for evigt".',
          instruction: 'Gem vinklerne i to variabler: "roll" (sidehældning) og "pitch" (frem/tilbage hældning). Værdierne er i grader.',
          settings: [
            { field: 'Roll', setting: 'Venstre/Højre rotation' },
            { field: 'Pitch', setting: 'For/Bag rotation' }
          ]
        },
        {
          stepNumber: 3,
          title: 'Tjek om Overfladen er 100% Vandret',
          category: 'Matematik',
          categoryColor: '#852ccb',
          blockName: 'hvis < abs(roll) <= 2 og abs(pitch) <= 2 >',
          placement: 'I hvis-blokken.',
          instruction: 'Brug "absolut værdi af" fra Matematik. Hvis begge vinkler er inden for 2 grader af nul: Vis "100% VANDRET!" på OLED og spil et lille godkendt-bip!',
          settings: [{ field: 'Tolerance', setting: '+/- 2 grader' }]
        }
      ],
      extensionsNeeded: ['tinkerkit'],
      shareUrl: 'https://makecode.microbit.org',
      typescriptCode: `// Digitalt Vaterpas med OLED og v2 Højttaler
OLED.init(128, 64)

basic.forever(function () {
    let roll = input.rotation(Rotation.Roll)
    let pitch = input.rotation(Rotation.Pitch)
    
    OLED.clear()
    OLED.writeString("Roll (X): ")
    OLED.writeNum(roll)
    OLED.writeStringNewLine(" grader")
    
    OLED.writeString("Pitch (Y): ")
    OLED.writeNum(pitch)
    OLED.writeStringNewLine(" grader")
    
    if (Math.abs(roll) <= 2 && Math.abs(pitch) <= 2) {
        OLED.writeStringNewLine(">>> 100% VANDRET <<<")
        basic.showIcon(IconNames.Yes)
        music.playTone(880, music.beat(BeatFraction.Sixteenth))
    } else {
        basic.showIcon(IconNames.Target)
    }
    
    basic.pause(150)
})`
    },
    pythonCode: {
      code: `# Digitalt Vaterpas i MicroPython
from microbit import *
import music

while True:
    x = accelerometer.get_x()
    y = accelerometer.get_y()
    vinkel_x = int(x / 10)
    vinkel_y = int(y / 10)
    
    if abs(vinkel_x) < 2 and abs(vinkel_y) < 2:
        display.show(Image.YES)
        music.pitch(880, 50)
    else:
        display.show(Image.TARGET)
        
    sleep(150)`,
      explanations: [
        {
          lines: 'abs(vinkel_x) < 2',
          explanation: 'Tjekker om vinklen numerisk er mindre end tolerancetærsklen.'
        }
      ]
    },
    hexFileName: 'digitalt-vaterpas.hex'
  },

  // --- PROJEKT 10 ---
  {
    id: 'beroringsfri-haandvask-timer',
    title: 'Berøringsfri Håndvask-assistent (Sundhedstimer)',
    tagline: 'Start en automatisk 20-sekunders håndvask-nedtælling ved blot at føre hænderne hen til vandhanen!',
    category: 'smarthome',
    difficulty: 'begynder',
    estimatedTime: '20 min',
    requiredSensors: ['sonar', 'mb_speaker', 'mb_matrix'],
    expansionSensors: [
      {
        sensorId: 'servo',
        title: 'Automatisk Sæbedispenser',
        benefit: 'Monter servomotoren til at trykke på pumpen af en sæbeflaske når hænderne ankommer!',
        hint: 'Drej servo 45 grader for at trykke på pumpen og gå retur.'
      },
      {
        sensorId: 'oled',
        title: 'Grafisk Nedtællingsur',
        benefit: 'Vis sekunderne tælle ned fra 20 til 0 med en flot statusbar og hygiejnetips.',
        hint: 'Opdater OLED hvert sekund med resterende tid.'
      },
      {
        sensorId: 'pir',
        title: 'Badeværelses Velkomst',
        benefit: 'Opdag når nogen træder ind på badeværelset og sig godmorgen.',
        hint: 'Aktiver velkomstlyd med PIR.'
      }
    ],
    mission: {
      problem: 'WHO anbefaler at vaske hænder i minimum 20 sekunder for at fjerne bakterier og vira, men de færreste tæller tiden nøjagtigt.',
      solution: 'Vi installerer Sonar:bit ved vasken. Når hænderne holdes under vandhanen, starter en 20-sekunders timer med munter musik og en nedtællende lysbjælke på microbitten. Når tiden er gået, lyder en sejrsfanfare!',
      learningGoals: [
        'Bygge sundhedsfremmende teknologi (Health Tech).',
        'Styre præcise tæller-løkker (for-løkker fra 20 ned til 0).',
        'Bruge lys og lyd til at guide brugeren igennem en adfærdsrutine.'
      ]
    },
    wiring: [
      {
        component: 'Sonar:bit (Ultralyd)',
        pin: 'Pin 1 (P1) på Octopus:bit',
        wireColor: 'Sort (GND), Rød (VCC), Gul (Signal)',
        instructions: 'Monter Sonar:bit over håndvasken pegende mod håndzonen.'
      }
    ],
    algorithm: [
      {
        stepNumber: 1,
        title: 'Vente-tilstand',
        description: 'Overvåg afstanden ved hanen. Vis en rolig dråbe på LED.',
        type: 'input'
      },
      {
        stepNumber: 2,
        title: 'Hænder Registreret',
        description: 'Når afstanden er under 12 cm: Start håndvask-sekvensen.',
        type: 'logic'
      },
      {
        stepNumber: 3,
        title: '20-sekunders Nedtælling',
        description: 'Kør en løkke over 20 sekunder med visuel animation og periodiske biplyde.',
        type: 'output'
      },
      {
        stepNumber: 4,
        title: 'Fuldført!',
        description: 'Afspil succesfanfare og vis en stor smiley.',
        type: 'output'
      }
    ],
    makeCode: {
      blocksDescription: 'Byg timeren med Sonar:bit og en for-løkke der tæller 20 sekunder ned.',
      requiredBlocks: [
        {
          name: 'sonar:bit distance to obstacle in cm at Pin [P1]',
          category: 'Sonar',
          categoryColor: '#323e4e',
          type: 'value',
          params: 'P1'
        },
        {
          name: 'hvis < [afstand] <= 12 > så',
          category: 'Logik',
          categoryColor: '#57a1a5',
          type: 'container'
        },
        {
          name: 'for [indeks] fra [0] til [20]',
          category: 'Løkker',
          categoryColor: '#56a530',
          type: 'container',
          params: '20'
        },
        {
          name: 'vis nummer [ ... ]',
          category: 'Grundlæggende',
          categoryColor: '#5891f7',
          type: 'command'
        },
        {
          name: 'spil lyd [Hello] og [Happy]',
          category: 'Musik',
          categoryColor: '#cb4430',
          type: 'command'
        }
      ],
      detailedSteps: [
        {
          stepNumber: 1,
          title: 'Overvåg Håndvask-zonen',
          category: 'Sonar',
          categoryColor: '#323e4e',
          blockName: 'hvis < afstand <= 12 og afstand > 0 > så',
          placement: 'I "for evigt".',
          instruction: 'Mål afstanden med Sonar:bit på Pin 1. Hvis afstanden er under 12 cm, betyder det at nogen har placeret hænderne under vandhanen for at vaske hænder!',
          settings: [{ field: 'Afstand', setting: '<= 12 cm' }]
        },
        {
          stepNumber: 2,
          title: 'Start 20-Sekunders Nedtællingen',
          category: 'Løkker',
          categoryColor: '#56a530',
          blockName: 'for [sekund] fra [20] ned til [0]',
          placement: 'Inde i hvis-blokken.',
          instruction: 'Hent tæller-løkken fra "Løkker". Kør den 20 gange med "pause (ms) [1000]" for hvert sekund. Vis det resterende sekundtal på 5x5 LED skærmen!',
          settings: [
            { field: 'Start', setting: '20' },
            { field: 'Slut', setting: '0' }
          ]
        },
        {
          stepNumber: 3,
          title: 'Fejr med Succeslyd og Flueben',
          category: 'Musik',
          categoryColor: '#cb4430',
          blockName: 'vis ikon [Ja] + spil lyd [Happy]',
          placement: 'Lige efter tæller-løkken.',
          instruction: 'Når de 20 sekunder er gået, er hænderne rene! Vis det store flueben [Ja] og afspil en munter succes-lyd over v2-højttaleren.',
          settings: [{ field: 'Ikon', setting: 'Ja (Flueben)' }]
        }
      ],
      extensionsNeeded: ['tinkerkit'],
      shareUrl: 'https://makecode.microbit.org',
      typescriptCode: `// Håndvask-timer med Sonar:bit
let afstand = 0

basic.showIcon(IconNames.Target)

basic.forever(function () {
    pins.digitalWritePin(DigitalPin.P1, 0)
    control.waitMicros(2)
    pins.digitalWritePin(DigitalPin.P1, 1)
    control.waitMicros(10)
    pins.digitalWritePin(DigitalPin.P1, 0)
    afstand = Math.round(pins.pulseIn(DigitalPin.P1, PulseValue.High) / 58)

    if (afstand > 0 && afstand <= 12) {
        soundExpression.hello.play()
        
        for (let sek = 20; sek >= 0; sek--) {
            basic.showNumber(sek)
            music.playTone(523, music.beat(BeatFraction.Sixteenth))
            basic.pause(900)
        }
        
        basic.showIcon(IconNames.Yes)
        soundExpression.yawn.play()
        basic.pause(3000)
    }
    
    basic.pause(200)
})`
    },
    pythonCode: {
      code: `# Håndvask timer i MicroPython
from microbit import *
import music

display.show(Image.ALL_CLOCKS[0])
pass`,
      explanations: [
        {
          lines: 'for (let sek = 20; sek >= 0; sek--)',
          explanation: 'Løkke der tæller ned ét trin ad gangen fra 20 til 0.'
        }
      ]
    },
    hexFileName: 'beroringsfri-haandvask-timer.hex'
  }
];
