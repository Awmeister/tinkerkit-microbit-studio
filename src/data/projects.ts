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
      blocksDescription: 'Brug blokken "læs digital værdi fra pin P0" i en "for evigt" løkke sammen med en "hvis ... så ... ellers" blok.',
      stepByStep: [
        '1. Gå til "Grundlæggende" og træk "ved start" ud. Tilføj "vis ikon [Glad]" og "pause (ms) [3000]" for at give 3 sekunders forsinkelse.',
        '2. Inde i "for evigt" (forever) løkken indsætter du en "hvis ... så ... ellers" blok fra "Logik".',
        '3. Som betingelse indsætter du en sammenligningsblok: "læs digital værdi fra pin P0 = 1" (findes under "Avanceret" -> "Ben").',
        '4. Under "så" (når der er bevægelse): Tilføj "vis ikon [Nej]" og fra "Musik": "spil lyd [sirene]" eller "spil tone [Høj C] i 1/4 slag".',
        '5. Under "ellers" (når der er ro): Tilføj "vis LED\'er" med kun den midterste prik tændt.'
      ],
      extensionsNeeded: [],
      shareUrl: 'https://makecode.microbit.org',
      typescriptCode: `// Automatisk PIR Tyverialarm til micro:bit v2
basic.showIcon(IconNames.Happy)
// 3 sekunders forsinkelse til at forlade rummet
basic.pause(3000)
basic.clearScreen()

basic.forever(function () {
    let sensorSignal = pins.digitalReadPin(DigitalPin.P0)
    
    if (sensorSignal == 1) {
        // Bevægelse detekteret!
        basic.showIcon(IconNames.No)
        soundExpression.sad.play()
        music.playTone(880, music.beat(BeatFraction.Quarter))
        music.playTone(440, music.beat(BeatFraction.Quarter))
    } else {
        // Alt er roligt
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
        music.pitch(440, 200) # Lav tone
    else:
        # Rolig pulsering på LED
        display.set_pixel(2, 2, 9)
        sleep(200)
        display.set_pixel(2, 2, 2)
        sleep(200)`,
      explanations: [
        {
          lines: 'from microbit import * / import music',
          explanation: 'Importerer alle de nødvendige biblioteker til at styre ben, display og lyd på microbitten.'
        },
        {
          lines: 'bevaegelse = pin0.read_digital()',
          explanation: 'Aflæser spændingen på Pin 0. Returnerer 1 når PIR registrerer infrarød bevægelse, ellers 0.'
        },
        {
          lines: 'if bevaegelse == 1:',
          explanation: 'Betingelsessætning (if-statement): Koden inden for denne blok kører kun, hvis der er bevægelse.'
        },
        {
          lines: 'music.pitch(880, 200)',
          explanation: 'Genererer en tone med en bestemt frekvens (880 Hz) i 200 millisekunder over den indbyggede v2 højttaler.'
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
      blocksDescription: 'Tilføj "tinkerkit" udvidelsen i MakeCode for at få adgang til "sonar:bit distance" blokken.',
      stepByStep: [
        '1. Klik på "Udvidelser" (Extensions) i MakeCode og søg efter "tinkerkit" eller "sonar" og tilføj udvidelsen.',
        '2. I "ved start": Indsæt "sæt servo på ben P2 til 0 grader" for at sikre lukket låg.',
        '3. I "for evigt": Opret variablen "afstand" og sæt den til "sonar:bit distance to obstacle in cm at Pin P1".',
        '4. Indsæt en "hvis ... så": HVIS "afstand > 0" OG "afstand < 15".',
        '5. Inde i blokken: "vis ikon [Mund vidt åben]", spil tone, "sæt servo på ben P2 til 110 grader".',
        '6. Tilføj "pause (ms) [3000]" så brugeren kan nå at smide affaldet i.',
        '7. Sæt "servo på ben P2 til 0 grader" for at lukke, og "vis ikon [Smiley]".'
      ],
      extensionsNeeded: ['tinkerkit'],
      shareUrl: 'https://makecode.microbit.org',
      typescriptCode: `// Berøringsfri Skraldespand med Sonar:bit og Servo
let afstand = 0
pins.servoWritePin(AnalogPin.P2, 0)
basic.showIcon(IconNames.Asleep)

basic.forever(function () {
    // Mål afstand med Sonar:bit på Pin 1
    // (Brug tinkerkit udvidelsens sonar-blok i editoren)
    pins.digitalWritePin(DigitalPin.P1, 0)
    control.waitMicros(2)
    pins.digitalWritePin(DigitalPin.P1, 1)
    control.waitMicros(10)
    pins.digitalWritePin(DigitalPin.P1, 0)
    let ekkoTid = pins.pulseIn(DigitalPin.P1, PulseValue.High)
    afstand = Math.round(ekkoTid / 58)

    if (afstand > 0 && afstand < 15) {
        // Hånd registreret tæt på!
        basic.showIcon(IconNames.Surprised)
        soundExpression.giggle.play()
        pins.servoWritePin(AnalogPin.P2, 110) // Åbn låget
        basic.pause(3000) // Hold åbent i 3 sekunder
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
import music

# Funktion til at styre servovinkel (0-180 grader via PWM)
def set_servo_angle(pin, angle):
    # Standard 50Hz PWM signal: 0 grader ~ 25 (0.5ms), 180 grader ~ 125 (2.5ms)
    duty = int(25 + (angle / 180.0) * 100)
    pin.set_analog_period(20) # 20ms = 50Hz
    pin.write_analog(duty)

# Start i lukket position
set_servo_angle(pin2, 0)
display.show(Image.ASLEEP)

while True:
    # Udsend ultralydsimpuls på pin 1
    pin1.write_digital(0)
    sleep_us = 2
    pin1.write_digital(1)
    # Simuler ultralydsmåling (eller læs via I2C/sonar-driver)
    # Læs om der holdes foran sensoren
    # Hvis en hånd opdages (afstand < 15 cm):
    # Bemærk: i ren python kræver pulse timing præcis tæller
    pass`,
      explanations: [
        {
          lines: 'set_servo_angle(pin2, angle)',
          explanation: 'Servomotorer forventer et PWM-signal med en pulsperiode på 20ms (50Hz), hvor pulsbredden bestemmer vinklen.'
        },
        {
          lines: 'duty = int(25 + (angle / 180.0) * 100)',
          explanation: 'Matematisk skalering der oversætter grader (0-180) til duty cycle værdier for mikrokontrolleren.'
        },
        {
          lines: 'display.show(Image.SURPRISED)',
          explanation: 'Giver maskinen personlighed ved at vise et forbløffet ansigt når låget åbnes.'
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
      blocksDescription: 'Brug "tinkerkit" udvidelsen til at initialisere OLED-displayet og skrive tekst og tal.',
      stepByStep: [
        '1. Gå til Udvidelser og tilføj "tinkerkit".',
        '2. I "ved start": Indsæt blokken "initialize OLED with height 64 width 128".',
        '3. I "for evigt": Opret variablen "fugt" og sæt den til "læs analog værdi fra ben P1".',
        '4. Opret variablen "procent" og brug matematikblokken til at beregne "(fugt * 100) / 750".',
        '5. Rens skærmen med "clear OLED display" og skriv teksten "PLANTESTATION" med "show string".',
        '6. Skriv "Fugt: " efterfulgt af tallet "procent" og "%".',
        '7. HVIS "procent < 30": Vis et trist ansigt på LED og skriv "VAND MIG!" på OLED.',
        '8. Vent 2 sekunder før næste måling for ikke at overbelaste sensoren.'
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
    // Kalibrer: 0 = tør luft, ca 750 = fugtig jord
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
    
    basic.pause(3000) // Mål hvert 3. sekund
})

// Manuel kontrol med v2 touch logo
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    basic.showNumber(pins.analogReadPin(AnalogPin.P1))
})`
    },
    pythonCode: {
      code: `# Smart Plantepasser i MicroPython
from microbit import *

# MicroPython kode til fugtovervågning
display.show(Image.HAPPY)

while True:
    # Aflæs analog værdi på pin 1 (0 til 1023)
    raw_fugt = pin1.read_analog()
    
    # Omregn til omtrentlig procent (0 - 100)
    procent = int((raw_fugt / 750) * 100)
    if procent > 100:
        procent = 100
        
    if procent < 30:
        # Planten mangler vand!
        display.show(Image.SAD)
    else:
        # Fin fugtighed
        display.show(Image.YES)
        
    # Hvis man rører ved micro:bit v2 guld-logoet:
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
        },
        {
          lines: 'display.scroll(str(procent) + "%")',
          explanation: 'Viser den aktuelle procentværdi som rullende tekst hen over 5x5 LED displayet.'
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
      stepByStep: [
        '1. Hent "tinkerkit" eller "sonar" udvidelsen i MakeCode.',
        '2. I "for evigt" løkken måles afstanden: "sæt afstand til sonar:bit afstand i cm".',
        '3. HVIS "afstand <= 5": Vis kryds på LED og spil en konstant høj tone (880 Hz).',
        '4. ELLERS HVIS "afstand < 30": Spil en kort tone (587 Hz) og sæt "pause (ms)" til "afstand * 20".',
        '5. ELLERS (når afstand >= 30): Vis en grøn pil eller prik og ingen lyd.'
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
    # Aflæs afstandsdata
    # Hvis bilen nærmer sig en forhindring:
    # Simuleret afstands-logik
    display.show(Image.ARROW_N)
    music.pitch(659, 50)
    sleep(300)`,
      explanations: [
        {
          lines: 'music.pitch(659, 50)',
          explanation: 'Laver et ultrakort "bip" på 50 millisekunder.'
        },
        {
          lines: 'sleep(afstand * 20)',
          explanation: 'Gør pausen variabel: 10 cm afstand giver 200 ms pause, mens 30 cm afstand giver 600 ms pause.'
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
      blocksDescription: 'Brug "køretid (ms)" blokken under Styring til at måle millisekunder med millimeterpræcision.',
      stepByStep: [
        '1. Opret variablerne: "startTid", "reaktionsTid" og "spilIGang".',
        '2. Ved "når knap A trykkes": Sæt "spilIGang til 1", vis "Klar..." og vent et "tilfældigt tal mellem 1500 og 4000" ms.',
        '3. Tænd hele displayet med et stort symbol og spil lyd: "sæt startTid til køretid (ms)".',
        '4. I en "mens" løkke: Vent indtil "læs digital værdi fra ben P1 = 0" (trykket ned).',
        '5. Sæt "reaktionsTid til køretid (ms) - startTid".',
        '6. Vis reaktionstiden på skærmen med "vis tal [reaktionsTid] ms" og spil fanfarer!'
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
        # Tilfældig forsinkelse
        sleep(random.randint(2000, 5000))
        
        # Start-signal
        display.show(Image.TARGET)
        music.pitch(880, 100)
        start = running_time()
        
        # Vent på tryk på crash sensor (pin 1)
        while pin1.read_digital() != 0:
            pass
            
        score = running_time() - start
        display.scroll(str(score) + "ms")`,
      explanations: [
        {
          lines: 'random.randint(2000, 5000)',
          explanation: 'Giver et tilfældigt heltal mellem 2000 og 5000 millisekunder, så spilleren ikke kan forudsige timingen.'
        },
        {
          lines: 'start = running_time()',
          explanation: 'Gemmer det præcise antal millisekunder siden microbitten blev tændt.'
        },
        {
          lines: 'while pin1.read_digital() != 0: pass',
          explanation: 'En tom venteløkke der fryser eksekveringen indtil Crash Sensoren trykkes ned.'
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
      blocksDescription: 'Brug "tinkerkit" udvidelsen for let aflæsning af ADKeypad knapperne A, B, C, D, E.',
      stepByStep: [
        '1. Tilføj "tinkerkit" udvidelsen.',
        '2. Initialiser OLED og sæt servo på P1 til 0 grader (låst).',
        '3. Opret variablerne "hemmeligKode" = "AB" og "brugerInput" = "".',
        '4. I en løkke: Hvis ADKeypad knap A trykkes på P2, lægges "A" til variablen.',
        '5. Hvis længden af "brugerInput" er 2: Sammenlign med "hemmeligKode".',
        '6. Hvis rigtig: Sæt servo til 90 grader, spil sejrsfanfare og vent 5 sekunder før den låser igen.',
        '7. Hvis forkert: Spil fejltone og nulstil variablen.'
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
    // Tjek tastatur på pin 2
    // (I MakeCode bruges blokken: ADKeypad button pressed on P2)
    let raw = pins.analogReadPin(AnalogPin.P2)
    
    // Knap A er typisk tæt på 0
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
import music

# Standard setup
display.show(Image.LOCK)
# Kode-logik for tastatur
pass`,
      explanations: [
        {
          lines: 'pins.servoWritePin(AnalogPin.P1, 90)',
          explanation: 'Drej servomotoren 90 grader for at trække låsebolten tilbage.'
        },
        {
          lines: 'indtastet.length >= 2',
          explanation: 'Undersøger om brugeren har trykket det forventede antal cifre før koden evalueres.'
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
      blocksDescription: 'Brug "ved høj lyd" blokken under "Indgange" sammen med "lysniveau" blokken.',
      stepByStep: [
        '1. Opret en variabel "lampeTaendt" og sæt den til 0 ved start.',
        '2. Indsæt blokken "ved høj lyd" (on loud sound).',
        '3. Tjek om "lysniveau < 60":',
        '4. HVIS lampeTaendt er 0: Sæt lampeTaendt til 1, sæt lysstyrke til 150 og "vis ikon [Hjerte]".',
        '5. ELLERS: Sæt lampeTaendt til 0 og "ryd skærm".'
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
    
    # Tjek om der er klappet
    if microphone.was_event(SoundEvent.LOUD):
        if lysstyrke < 70:
            lampe_taendt = not lampe_taendt
            if lampe_taendt:
                display.show(Image.HEART)
                music.pitch(440, 100)
            else:
                display.clear()
                
    # Sluk automatisk hvis solen står op
    if lysstyrke >= 80 and lampe_taendt:
        lampe_taendt = False
        display.clear()
        
    sleep(100)`,
      explanations: [
        {
          lines: 'microphone.was_event(SoundEvent.LOUD)',
          explanation: 'Registrerer om der er opfanget en markant lydspids (klap/stemme) siden sidste tjek.'
        },
        {
          lines: 'display.read_light_level()',
          explanation: 'Aflæser lyssensoren via microbittens LED-matrix og returnerer 0-255.'
        },
        {
          lines: 'lampe_taendt = not lampe_taendt',
          explanation: 'Klassisk toggle-switch: Vender sand til falsk og omvendt for at tænde/slukke ved hvert klap.'
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
      blocksDescription: 'Brug "kortlæg" (map) blokken under Matematik til at forvandle potentiometerets tal til tonehøjder.',
      stepByStep: [
        '1. I "for evigt" løkken aflæses "analog værdi fra ben P1" (potentiometer).',
        '2. Brug "kortlæg [værdi] fra lav [0] høj [1023] til lav [131] høj [988]" for at ramme toner fra C3 til B5.',
        '3. Send tonen ud med "ring tone [beregnetFrekvens]".',
        '4. Tjek "hældning (grader) rulning": Juster tone-varigheden efter vinklen.',
        '5. Tilføj "når logo berøres": Spil lydeffekten "soundExpression.mysterious.play()".'
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

// Bass-drop ved berøring af logo
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
    # Map 0-1023 til 130-900 Hz
    freq = int(130 + (raw / 1023.0) * 770)
    
    # Læs accelerometer roll
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
        },
        {
          lines: 'accelerometer.get_x()',
          explanation: 'Måler gravitationen på tværs af microbitten (venstre/højre hældning).'
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
      blocksDescription: 'Brug "hældning (grader)" blokken fra Indgange og send værdierne til OLED-skærmen.',
      stepByStep: [
        '1. Initialiser OLED i "ved start".',
        '2. I "for evigt" gemmes "pitch" og "roll" i variabler.',
        '3. Ryd OLED og udskriv: "Vinkel X: [roll]" og "Vinkel Y: [pitch]".',
        '4. Hvis både roll og pitch er mellem -2 og 2: Vis "VANDRET!" og spil tone.',
        '5. Vis tilsvarende en prik på 5x5 LED displayet der bevæger sig mod midten.'
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
    
    // Tjek om det er 100% vandret
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
    
    # Beregn omtrentlig vinkel
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
          explanation: 'Tjekker om den numeriske værdi (både positiv og negativ) er mindre end tolerancetærsklen.'
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
      blocksDescription: 'Brug en "gentag 20 gange" løkke med 1 sekunds pause mellem hver.',
      stepByStep: [
        '1. I "for evigt": Mål afstanden med Sonar:bit på Pin 1.',
        '2. HVIS afstand < 15 og afstand > 0:',
        '3. Spil opstartslyd og vis tallet 20.',
        '4. Kør en tæller ned fra 20 til 0 med en pause på 1000 ms mellem hver.',
        '5. Vis et stort flueben og spil "soundExpression.happy.play()".'
      ],
      extensionsNeeded: ['tinkerkit'],
      shareUrl: 'https://makecode.microbit.org',
      typescriptCode: `// Håndvask-timer med Sonar:bit
let afstand = 0

basic.showIcon(IconNames.Target)

basic.forever(function () {
    // Mål om hænder er under hanen
    pins.digitalWritePin(DigitalPin.P1, 0)
    control.waitMicros(2)
    pins.digitalWritePin(DigitalPin.P1, 1)
    control.waitMicros(10)
    pins.digitalWritePin(DigitalPin.P1, 0)
    afstand = Math.round(pins.pulseIn(DigitalPin.P1, PulseValue.High) / 58)

    if (afstand > 0 && afstand <= 12) {
        // Start 20-sekunders vask!
        soundExpression.hello.play()
        
        for (let sek = 20; sek >= 0; sek--) {
            basic.showNumber(sek)
            music.playTone(523, music.beat(BeatFraction.Sixteenth))
            basic.pause(900)
        }
        
        // Færdig!
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

while True:
    # Hvis hænder registreres:
    # Kør 20 sekunders nedtælling
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
