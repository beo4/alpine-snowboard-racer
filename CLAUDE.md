# Alpine Snowboard Racer – Kontext für Claude Code

## Worum es geht
Rennspiel für Alpin-Snowboard (Parallelslalom) auf **echten Wettkampfpisten**, gesteuert durch Kippen des Handys.
Entstanden als Prototyp im Repo `beo4/psl-unreal` (Ordner `game/`), seit 2026-11-18 eigenes Repo.
Der Nutzer (Beo) ist ITler und TD-Koordinator bei Snowboard Germany. Antworten auf Deutsch, kurz und direkt.

## Stand
- Spielbarer Browser-Prototyp, Piste Ruhpolding (Unternberg), Variante A2. Statische Seite, three.js vom CDN, kein Build-Schritt, kein Server.
- `tracks/ruhpolding_A2_spiel.json` (Standard): leichter gesetzter Spielkurs, 18 Tore, 17,2 m Abstand, ±2,8 m Versatz.
  `tracks/ruhpolding_A2.json`: Kurs wie geplant (30 Tore). Umschalten per Knopf oder `?track=<id>`.
- Fahrphysik (`physics.js`): eigenes, deterministisches Carving-Modell in festen Schritten (120 Hz), nur aus zwei Eingaben
  (Kante, Gewicht). Deshalb sind Aufzeichnung und Geist möglich. **Nicht kalibriert.** Stellwerte in `P`.
- Regeln: Torfehler, Verlassen der Piste (Korridor) oder verfehltes Ziel = sofort ausgeschieden.
- Geprüft nur am Mac (Selbsttest, Browser mit simulierten Tasten). **Auf dem iPhone noch nichts geprüft**; die Sensorachsen
  im Querformat sind hergeleitet, Umkehr-Schalter unter ⚙.

## Prüfen
    node selftest.mjs                      # Standard: tracks/ruhpolding_A2.json
    node selftest.mjs "$PWD/tracks/ruhpolding_A2_spiel.json"
    python3 -m http.server 8765            # dann http://localhost:8765 (file:// lädt nicht)

## Pistendaten
- Quelle: Bayerische Vermessungsverwaltung, geodaten.bayern.de, **CC BY 4.0**. Die Quellenangabe muss im Spiel sichtbar bleiben.
- Die Pistendateien entstehen im Repo `psl-unreal` (`tools/export_game.py <site> <variante> [n versatz]`) aus Gelände und
  Kursdaten und werden hierher nach `tracks/` kopiert. Hier keine Positionen erfinden.
- Götschen ist als zweite Piste gewünscht; die Daten dafür sind in `psl-unreal` noch nicht aufbereitet.
- Kurse aus `psl-unreal` sind Planungsstand, keine Homologation.

## Ideen des Nutzers (noch nichts entschieden, „eins nach dem anderen“)
- Start mit Ruhpolding und Götschen.
- Cups auswählbar: zuerst Europacup, später Weltcup usw., immer mit den richtigen Strecken.
- Werbung im Spiel wie in Sportspielen: verkaufte Flächen oder Banden über einen Ad-Server.
- Früher genannt, bewusst zurückgestellt: Konten, Mehrspieler, Turniermodus.

## Nächster Schritt
Brainstorming in fünf Schritten, Ergebnis eine Seite `docs/produktskizze.md`: (1) für wen, (2) Kernschleife,
(3) was es besonders macht, (4) Umfang der ersten Version und was nicht, (5) Risiken, die zuerst zu klären sind
(Steuerung, Fahrgefühl, Rechte an Pisten-, Cup- und Verbandsnamen). Ein technisches Framework erst danach festlegen.

## Arbeitsweise
- Logos und Markenzeichen nicht nachbauen; Platzhalter, bis der Rechteinhaber eine Datei liefert.
- Veröffentlichen (Repo öffentlich schalten, GitHub Pages) nur nach ausdrücklichem Ja des Nutzers.
