# Automaatika kutseeksam – tase 4

Veebirakendus **Automaatik tase 4 kutseeksamiks valmistumiseks**.

Projekt võimaldab harjutada eksamiküsimusi mugavas formaadis – küsimused, vastusevariandid ja skeemid kuvatakse veebilehel ning iga kord saab genereerida uue testi.

---

## 📌 Projekti kirjeldus

Rakendus kasutab JSON-andmeid, mis sisaldavad erinevaid eksamivariante ja küsimusi.  
Küsimused segatakse automaatselt, et luua iga kord uus test.

See aitab:

- harjutada eksamiküsimusi  
- korrata teooriat  
- valmistuda reaalseks kutseeksamiks  

---

## ⚙️ Funktsionaalsus

- kuvab **Automaatik tase 4** eksamiküsimusi  
- toetab mitut eksamivarianti  
- segab küsimusi erinevate variantide vahel  
- genereerib uue testi ühe nupuvajutusega  
- kuvab küsimustele lisatud pildid ja skeemid  
- lihtne ja kiire kasutajaliides  

---

## 🧠 Kuidas see töötab

- Kõik küsimused on salvestatud `data.json` failis  
- Igal küsimusel on oma `id`  
- Rakendus võtab sama `id`-ga küsimused erinevatest variantidest  
- Seejärel segatakse need ja koostatakse uus test  

Tulemuseks on iga kord erinev küsimuste kombinatsioon.

---

## 🛠️ Tehnoloogiad

- React  
- Vite  
- JavaScript  
- CSS Modules  

---

## 📂 Projekti struktuur

```text
automaatika-kutseeksam-tase4/
├── web/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   │   ├── data.json
│   │   │   └── pildid (skeemid)
│   │   ├── App.jsx
│   │   ├── Quiz.jsx
│   │   ├── QuizUtils.jsx
│   │   ├── Quiz.module.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js