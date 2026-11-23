# Aqua Wellness

## Productbeheer en online afspraken

1. Open het bestaande Vercel-project. Maak onder **Storage** een **private** Blob-store aan en koppel deze aan het project. Gebruik de standaardprefix `BLOB`. Vercel gebruikt `BLOB_STORE_ID` voor OIDC of `BLOB_READ_WRITE_TOKEN` voor een bestaande tokenverbinding. Gebruik een aparte store voor Preview zodat wijzigingen uit een preview nooit op de live website verschijnen.
2. Voeg in dezelfde omgevingen `AQUA_ADMIN_PASSWORD` toe. Genereer een willekeurig wachtwoord, bijvoorbeeld met `openssl rand -hex 24`. Een wijziging van het wachtwoord beëindigt de bestaande sessies.
3. Deploy opnieuw nadat de variabelen zijn toegevoegd. Open `/admin` en meld u aan om producten toe te voegen of te bewerken. Elk product heeft een rubriek en minstens één foto nodig om te publiceren.
4. Maak in Google Agenda via **Boekingspagina’s** een afspraakplanning aan. Stel de duur, beschikbaarheid en locatie in. Kies **AQUA-WELLNESS** als agenda als uw Google Workspace-abonnement dit ondersteunt. De huidige openbare boekingslink is standaard ingevuld. U kunt die vervangen onder **Expertadvies boeken** in `/admin`.
5. Open `/afspraak` in een privévenster en controleer of de knop de juiste planning en beschikbare momenten toont. Boekingen en bevestigingen worden afgehandeld door Google Agenda.

De bestaande productinhoud is beschikbaar zonder Blob-configuratie. Zolang de boekingslink leeg is, toont `/afspraak` het telefoonnummer en de contactoptie.
