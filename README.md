# smart_contract

## Aprašymas

Ši išmanioji sutartis yra skirta draudimo įmonės verslo modelio vaizdavimui. Joje dalyvauja _draudėjas_ ir _klientas_, o pati išmanioji sutartis savyje dar saugo mėnesinį mokestį, kliento patirtų įvykių skaičių ir klientui išmokėtą draudimo sumą.

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

## Išmaniosios sutarties testavimas lokaliame tinkle

Parašius reikiamą kodą per Remix IDE ir sukūrus reikiamus failus naudojant truffle, buvo galima ištestuoti šią išmaniąją sutartį lokaliame tinkle. Atskirame lange buvo paleistas tinklas su 10 adresų, kurie būtų naudojami sutarčiai:

Tada sukompiliavus ir migravus išmaniąją sutartį į lokalų tinklą, ji buvo sukurta:

## Išmaniosios sutarties testavimas testiniame tinkle

Sukūrus lokalų tinklą ir jame ištestavus išmaniąją sutartį, buvo galima pereiti prie sekančio žingsnio: sutarties testavimo testiniame tinkle.

Tam buvo pasinaudota Sepolia testiniu tinklu. Prieš pradedant jį naudoti reikėjo savo naršyklėje atsisiųsti Metamask add-on'ą, susikurti paskyrą ir, kad išvis būtų galima paleisti ir naudoti išmaniąją sutartį, į savo adresą gauti Sepolia ETH. Tai atlikus, per Metamask nustatymus buvo galima pridėti Sepolia testinį tinklą prie galimų esančių tinklų.

Po šių veiksmų buvo galima grįžti į Remix IDE ir per jį, prijungus savo Metamask paskyrą, kurioje yra Sepolia ETH, paleisti ir naudoti savo išmaniąją sutartį.

Šios išmaniosios sutarties log'ai buvo peržiūrėti Etherscan pabalga:

## Front-end'o kūrimas

Atlikus šiuos veiksmus, buvo galima pereiti prie Front-end'o kūrimo. Tam reikėjo pakeisti dabartinio aplanko, kuriame buvo visa lokalios išmaniosios sutarties logika, struktūrą, reikėjo pridėti tinklapio logiką ir ją sujunti su išmaniąja sutartimi. Tai padarius buvo gautas puslapis, kurio pagalba buvo galima valdyti išmaniąją sutartį paprastesniu būdu.
