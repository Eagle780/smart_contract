# smart_contract
## Aprašymas

Ši išmanioji sutartis yra skirta draudimo įmonės verslo modelio vaizdavimui. Joje dalyvauja *draudėjas* ir *klientas*, o pati išmanioji sutartis savyje dar saugo mėnesinį mokestį, kliento patirtų įvykių skaičių ir klientui išmokėtą draudimo sumą.

## Logika

Išmaniąją sutartį sukuria draudėjas, kaip argumentus pateikdamas kliento adresą ir reikiamą informaciją, kuri padės apskaičiuoti klientui reikiamą sumokėti mėnesinę sumą. Pats klientas gali daryti kelis dalykus: sumokėti mėnesinę sumą ar užregistruoti įvykį, dėl kurio draudėjui reiktų sumokėti klientui.

## Priežastys

Išmanosios sutartys populiarėja visur, jos gali būti pritaikytos įvairiems dalykams, nuo balsavimo iki kompiuterinių žaidimų. Draudimas ne išimtis. Išmaniosios sutartys šioje sferoje padėtų taupyti laiką, didinti žmonių pasitikėjimą bei leidžia draudėjui apsisaugoti nuo draudimo sukčiavimo, kas kenkia ne vien jiems, bet ir visiems klientams, kurie turi mokėti didesnes kainas.

## Scenarijai

## Sekų diagrama ir jos aprašymas

<img width="600" height="630" alt="Sequence diagram" src="https://github.com/user-attachments/assets/f0d6c5dc-9112-4813-87dd-fd2e4ba3310b" />

1. Sukurti. Dradėjas sukuria išmaniąją sutartį, kurioje išsaugomas kliento adresas ir visa kita reikalinga informacija
2. Pateikti mėnesinę suma. Draudėjas išmaniojoje sutartyje sukuria naują mėnesio įrašą, kuriame saugoma visa to mėnesio informacija, ir mėnesio objekte išsaugo sumą, kurią turi sumokėti klientas.
3. Saugus sumokėjimas. Klientas sumoka jam priskirtą mėnesinę sumą.
4. Užregistruoti įvykį. Klientas gali užregistruoti jam atsitikusi įvykį, kuris turi būti padengtas draudimo.
5. Draudimo išmoka. Kliento įvykio užregistravimo atveju draudėjas išmoka klientui jam priskaičiuotą draudimo išmoką.
6. Išmokėjimas. Išmaniojoje sutartyje saugomi kliento mokėjimai pervedami draudėjui.
7. Išmokėjimas. Išmaniojoje sutartyje saugomi draudėjo išmokėjimai už įvykius pervedami klientui.
Pasibaigus draudimo terminui ir nepratęsus sutarties, sutartis pabaigiama.
