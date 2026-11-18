# Produktskizze Alpine Snowboard Racer

Stand 2026-11-18, Ergebnis des Brainstormings mit Beo. Eine Seite; Entscheidungen sind als solche markiert,
alles Ungeprüfte steht unter „Offen“.

**Versprechen:** Der echte Hang mit dem echten Kurs – fahr ihn gegen deine Trainingsgruppe.

## 1. Für wen
- **Entschieden:** Zuerst die Szene selbst: aktive Fahrer, Nachwuchskader, Trainer, Vereinsumfeld. Es spielen
  Sportler, und die wollen sich messen.
- **Entschieden:** Das Projekt ist ein Showcase im Umfeld von Snowboard Germany, kein eigenständiges
  kommerzielles Produkt. Fans kommen danach; Sponsoren und Verband sind Partner, keine Spieler.
- Leitbild für die Nutzung: eine Trainingsgruppe spielt auf dem Lehrgang, jeder am eigenen Handy.

## 2. Kernschleife
- Ein Lauf dauert unter einer Minute: fahren, Zeit sehen, sofort noch einmal.
- **Entschieden:** Vier Spielarten auf demselben Fahrkern:
  1. **Zeitjagd** – allein gegen den eigenen Geist (gibt es schon).
  2. **Gruppenrunde** – gegen echte Gegner, zeitversetzt: einer eröffnet eine Runde, die anderen treten per
     Code/QR bei und tippen einen Namen ein; alle sehen die Rangliste und fahren gegen die Geister der anderen.
  3. **Parallel-Duell (KO)** – roter und blauer Kurs, Qualifikation, KO-Baum, Gegner sind Geister der Gruppe.
  4. **Cup** – die Stationen eines Cups nacheinander mit Punkten.
- **Entschieden:** Grund zurückzukommen ist das „Rennen der Woche“: zum echten Renntermin ist die Strecke im
  Spiel, wer ist bis Sonntag am schnellsten?
- Idee, noch nicht eingeplant: Teams (Trainingsgruppe gegen Trainingsgruppe) als Wertung in der Gruppenrunde.

## 3. Was es besonders macht
- Echte Wettkampfpisten aus amtlichen Vermessungsdaten, Kurs wie geplant gesetzt (Originalkurs) plus ein
  leichter gesetzter Spielkurs.
- Man misst sich mit Leuten, die man kennt, nicht mit einer anonymen Weltrangliste.
- **Entschieden:** Fahrgefühl „glaubwürdig, aber verzeihend“: Linie, Kantenwinkel, Timing und Gewicht zählen;
  Spielkurs ist Standard, Originalkurs die schwere Stufe. Zeiten sind Spielzeiten und **nicht** mit echten
  Laufzeiten vergleichbar. Geister echter Fahrer oder echte Siegerzeiten daher vorerst nicht.
- Technischer Hebel: Ein Lauf ist nur die Folge der zwei Eingaben (deterministische Physik). Geister sind
  dadurch winzig, leicht zu teilen und nachprüfbar.

## 4. Umfang der ersten Version
**Entschieden:** Version 1 enthält alle vier Spielarten und beide Strecken (Ruhpolding, Götschen; laut Beo
beide Europacup-Stationen). Gebaut wird in Abschnitten, veröffentlicht als „Version 1“ erst nach D:

| Abschnitt | Inhalt | Danach |
|---|---|---|
| A | Steuerung auf dem iPhone, Zeitjagd auf Ruhpolding | **Praxistest mit einigen Fahrern** – trägt das Fahrgefühl? |
| B | Gruppenrunde (Code/QR, Name, Rangliste, Geister); kleiner Speicher-Server, keine Konten | Test auf einem Lehrgang |
| C | Götschen; Parallel-Duell mit zweitem Kurs und KO-Baum | |
| D | Cup über beide Strecken | Version 1 |

**Gehört ausdrücklich nicht dazu:** Live-Mehrspieler in Echtzeit, Konten und Anmeldung, Weltcup und weitere
Strecken, Werbung über einen Ad-Server, kalibrierte Simulation gegen echte Zeiten, Geister echter Kaderfahrer,
App-Store-Apps. Cup- und Verbandsnamen sowie Logos erst nach Freigabe (siehe 5).

## 5. Risiken, zuerst zu klären
1. **Steuerung und Fahrgefühl auf dem echten Handy.** Bisher nur am Mac geprüft, Sensorachsen im Querformat
   hergeleitet, Physik nicht kalibriert, Fahrgefühl bisher „mäßig bis ganz ok“. Davon hängt alles ab; deshalb
   Abschnitt A mit Test vor allem anderen.
   **Entschieden:** Der iPhone-Test läuft über GitHub Pages (Repo öffentlich). Umgesetzt wird das erst mit
   Beos ausdrücklichem Ja zu diesem Zeitpunkt.
2. **Namen und Zeichen.** **Entschieden:** neutral bis zum Ja. Ortsnamen (Ruhpolding, Götschen) als
   geografische Angabe; im Spiel „Cup“ statt „Europacup“, keine Verbands- oder Sponsorenlogos, bis der
   jeweilige Rechteinhaber schriftlich zugesagt hat. Beo klärt Snowboard Germany intern.
3. **Pistendaten.** Bayern: CC BY 4.0, Quellenangabe bleibt im Spiel sichtbar. Für Strecken außerhalb Bayerns
   ist nichts geprüft.
4. **Aufwand je neuer Strecke.** Unbekannt. Wird an Götschen gemessen (Aufbereitung in `psl-unreal`).
5. **Erster Server.** Die Gruppenrunde ist der erste Baustein mit Betrieb, gespeicherten Namen (Datenschutz,
   teils Minderjährige im Nachwuchs) und Missbrauchsmöglichkeit. Vor Abschnitt B klein entwerfen.

**Offen (nicht geprüft, nicht aus dem Gedächtnis beantwortet):**
- Darf man „Europacup“, „Weltcup“, FIS- und Verbandsbezeichnungen in einem Spiel nennen, und zu welchen Bedingungen?
- Dürfen die Pistenbetreiber bzw. Veranstalter bei der Darstellung ihrer Piste mitreden?
- Lizenzen amtlicher Geländedaten in anderen Ländern (für Weltcup-Strecken später).
- Wem gehört die Kurssetzung eines Rennens, und wie kommt der Kurs vom Renntag ins Spiel („Rennen der Woche“)?
- Werbemodell: Sponsorenfläche der Veranstaltung oder Ad-Server; verträgt sich das mit bestehenden
  Sponsorenverträgen von Verband und Veranstaltern?
- Datenschutz bei Namen in Ranglisten, besonders bei Minderjährigen.

## Nächste Arbeitsschritte
1. **Abschnitt A auf dem iPhone:** Seite per GitHub Pages bereitstellen (nach Beos Ja), Sensorachsen und
   Nullstellung auf dem Gerät prüfen, Fahrgefühl nachstellen, dann drei bis fünf Fahrer fahren lassen und
   aufschreiben, was sie sagen.
2. **Götschen in `psl-unreal` aufbereiten** und dabei den Aufwand je Strecke notieren. Läuft unabhängig von 1.
3. **Rechtefragen anstoßen:** Beo fragt bei Snowboard Germany nach Namen, Logo und Zuständigkeit für
   Cup-Bezeichnungen; auf Wunsch Recherche zu den offenen Punkten oben.

Das technische Framework und der Entwurf des Speicher-Servers werden erst nach dem Praxistest aus Abschnitt A festgelegt.
