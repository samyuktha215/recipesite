1️⃣ Hotanalys (OWASP + STRIDE – enkel variant)
Skapa en fil i projektet:
📄 SECURITY_ANALYSIS.md
Skriv något liknande (enkelt språk räcker):
## Hotanalys (OWASP + STRIDE)
 
### OWASP Top 10 – Relevanta för frontend:
1. **A03 – XSS / Injection:**  
   Data från API eller URL kan innehålla skadlig kod.  
   ➤ Lösning: använd React (auto-escapar HTML), samt sanitizeText() för API-data.
 
2. **A05 – Security Misconfiguration:**  
   Felaktiga headers kan tillåta attacker.  
   ➤ Lösning: Säkra headers (CSP, CORS). Frontend använder fetch med https.
 
3. **A08 – Software & Data Integrity Failures:**  
   Tredjepartsbibliotek kan vara osäkra.  
   ➤ Lösning: kör `npm audit` regelbundet, uppdatera beroenden.
 
### STRIDE (inputs i frontend):
| Inputtyp | Risk | Motåtgärd |
|-----------|------|-----------|
| Querystring (`?q=`) | Spoofing, XSS | Sanitize & ignorera script-taggar |
| API-data | Tampering | Lita bara på backenddata, ingen eval eller innerHTML |
| localStorage | Info leak | Spara inte känslig data (t.ex. tokens) |
 
### Trust boundaries:
**Browser (user)** ↔ **Frontend (React)** ↔ **Backend (API)**  
Kontroller: CSP, inputvalidering, escaping.