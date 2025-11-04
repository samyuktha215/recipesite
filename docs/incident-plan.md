# Incidentplan – IT (Webbserver & Webbplats)

## 1. Syfte
Att snabbt identifiera, hantera och rapportera IT-incidenter som påverkar webbservern eller webbplatsen, för att minimera driftstopp, dataläckor och skador på projektets anseende.

## 2. Exempel på incidenter
- Webbplatsen är nere eller otillgänglig
- Misstänkt intrång eller malware
- Databasfel eller förlust av data
- DNS-problem eller DDoS
- Obehörig åtkomst till administrationsgränssnitt
- Certifikatfel / HTTPS-problem

## 3. Incidenthantering – steg för steg

| Steg | Åtgärd | Ansvarig |
|------|--------|----------|
| 1 | Upptäck incidenten (övervakning, larm eller rapport) | Alla utvecklare |
| 2 | Bekräfta att felet är verkligt (testa webbtjänst, loggar, ping, traceroute) | Alla utvecklare |
| 3 | Isolera systemet (koppla bort nätverk, stäng åtkomst vid behov) | Alla utvecklare |
| 4 | Informera ansvarig enligt kontaktväg | Den som upptäckte incidenten |
| 5 | Dokumentera händelsen (tid, IP, loggar, åtgärder) | Alla utvecklare |
| 6 | Återställ systemet (från backup / rensa infektioner) | Alla utvecklare |
| 7 | Rapportera incident och lärdomar | Alla utvecklare |

## 4. Kontaktväg vid IT-incident

| Prioritet | Funktion / Person | Kontaktväg | Ansvar |
|-----------|-----------------|------------|--------|
| Första tekniska åtgärd | Drift / system | Robert Rizzo | Epost: Robert.Rizzo@iths.se |
| Analys, logggranskning | Säkerhet | Samyuktha Basam | Epost: samyuktha.basam@iths.se |
| Webbapplikation och kod | Utveckling | Evan Bergqvist | Epost: evan.bergqvist@ithogskolan.onmicrosoft.com |
| Information till användare / press | Kommunikation | Robert / Samyuktha | Epost: Robert.Rizzo@iths.se |
| Beslutsfattande och rapportering | Ledning | Alla tre | Epost: Robert.Rizzo@iths.se |

> 🚨 Vid dataintrång → Meddela Datainspektionen (IMY) inom 72 timmar  
> imy@imy.se (lagkrav enligt GDPR)

## 5. Dokumentation av IT-incident
Minst följande ska dokumenteras:  
- Datum, tid och upptäcktssätt  
- Typ av incident (t.ex. DDoS, intrång, driftstopp)  
- Berörda system / domäner  
- Åtgärder som vidtagits  
- Kontaktade personer / funktioner  
- Resultat / status  
- Rekommendationer för framtiden  

## 6. Efterarbete & förbättring
- Genomgång av loggar och sårbarheter  
- Uppdatering av lösenord, certifikat och brandväggsregler  
- Återställning från backup om nödvändigt  
- Utvärdera och uppdatera rutiner och incidentplan  
- Rapportera lärdomar till teamet
