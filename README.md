# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

Incidentplan

Om en säkerhetsincident upptäcks:
Rapportera till ansvarig utvecklare eller projektledare.

Skapa en GitHub Issue med beskrivning, tidpunkt och steg för att reproducera.

Åtgärda felet i separat branch och gör ny SonarCloud-körning.

Uppdatera dokumentation och säkerhetsrutiner.

Kontaktpersoner:
👩‍💻 [namn, e-post]
👨‍💻 [namn, e-post]


✅ Definition of Done (SSDLC-minimum)
För att ett arbete ska vara “klart” måste följande punkter vara uppfyllda:
Kontroll
	
Beskrivning
	
Status


🔒 Hotanalys utförd
	
OWASP Top 10 + STRIDE tillämpade på frontend ✅


🧱 SonarCloud-analys
	
Projekt kopplat till SonarCloud, inga “High” varningar ✅


🧹 Kodgranskning (Code Review)
	
En annan utvecklare har godkänt koden ✅


🧪 Enhetstester (Unit tests)
	
ViTest körs utan fel ✅


🔗 Integrationstester
	
React Testing Library testar komponenter ✅


🌐 E2E-test (End to End)
	
Playwright testar huvudflöden ✅


🚨 npm audit / lint
	
Inga “high” eller “critical” sårbarheter ✅


🧰 ZAP baseline scan
	
Inga “high severity”-fynd ✅


💬 Manuell testning
	
Projektledare har testat UI & API-flöden ✅
 