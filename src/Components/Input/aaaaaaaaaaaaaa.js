// Init
let muddati_oy = 48;
let yillik_foiz = 0.22;
let summa = 260000000;
let bosh_tulov = 100000000;
let free_tulov = 0;
let free_davr = 1;

let asosiy_qarz = summa - bosh_tulov;
let oylik_foiz = yillik_foiz / 12;

let asosiy_qarzga_birinchi_tulov =
  Math.round(
    ((asosiy_qarz * oylik_foiz) / (Math.pow(1 + oylik_foiz, muddati_oy) - 1)) *
      100,
  ) / 100;

const date = new Date();

let today = date.getDate();

// functions
const getDate = (date) => {
  let kun = String(date.getDate()).padStart(2, "0");
  let oy = String(date.getMonth() + 1).padStart(2, "0");
  let yil = date.getFullYear();
  // let hKun = new Intl.DateTimeFormat('uz-UZ', {weekday: "short"}).format(date);
  let chiroyliSana = `${kun}.${oy}.${yil}`;

  return chiroyliSana;
};

let pul = new Intl.NumberFormat("uz-UZ", {
  style: "decimal", // Shunchaki o'nlik son formati
  minimumFractionDigits: 2, // Verguldan keyin kamida 2 ta raqam
  maximumFractionDigits: 2, // Verguldan keyin ko'pi bilan 2 ta raqam
});

let q = asosiy_qarz;
let a = asosiy_qarzga_birinchi_tulov;
let f = 0;
let jami_asosiy = 0;
let jami_foiz = 0;
let jami_free = 0;

for (let i = 1; i <= muddati_oy; i++) {
  f = Math.round(q * oylik_foiz * 100) / 100;
  jami_foiz += f;

  if (q < a) {
    a = q;
  }
  while (date.getDay() == 6 || date.getDay() == 0) {
    date.setDate(date.getDate() + 1);
  }

  console.log(
    String(i).padStart(2, " "),
    "    ",
    getDate(date),
    "    ",
    String(pul.format(q)).padStart(14, " "),
    "    ",
    String(pul.format(a)).padStart(12, " "),
    "    ",
    String(pul.format(f)).padStart(12, " "),
    "    ",
    String(pul.format(a + f)).padStart(12, " "),
    "    ",
    i % free_davr == 0 && q > a + free_tulov
      ? String(pul.format(free_tulov)).padStart(12, " ")
      : "            ",
  );

  date.setDate(today);
  date.setMonth(date.getMonth() + 1);

  q -= a;
  jami_asosiy += a;

  if (i % free_davr === 0 && q > free_tulov) {
    q -= free_tulov;
    jami_free += free_tulov;
  }

  a = Math.round(a * (1 + oylik_foiz) * 100) / 100;

  if (q === 0) break;
}

console.log(
  "                                          ",
  pul.format(jami_asosiy),
  "   ",
  pul.format(jami_foiz),
  "  ",
  pul.format(jami_foiz + asosiy_qarz),
  "  ",
  pul.format(jami_free),
);
