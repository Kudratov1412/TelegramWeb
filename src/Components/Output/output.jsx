import { useEffect } from "react";
import "./output.css";

const Output = ({ global, output, setOutput }) => {
  const [local, setLocal] = useState({
    bosh_sana: global.bosh_sana,
    muddat: global.muddat,
    yillik_foiz: global.foiz,
    oylik_foiz: global.foiz / 12,
    summa: global.summa,
    bosh_tulov: global.bosh_tulov,
    free_bool: global.free_bool,
    free_tulov: global.free_tulov,
    free_davr: global.free_davr,
    istisno: global.istisno,
    asosiy_qarz: global.summa - global.bosh_tulov,
    asosiy_qarzga_birinchi_tulov:
      Math.round(
        ((local.asosiy_qarz * local.oylik_foiz) /
          (Math.pow(1 + local.oylik_foiz, local.muddat) - 1)) *
          100,
      ) / 100,
  });

  useEffect(() => {
    calculateOutput();
  }, []);

  const [tables, setTables] = useState([]);

  const pul = new Intl.NumberFormat("uz-UZ", {
    style: "decimal", // Shunchaki o'nlik son formati
    minimumFractionDigits: 2, // Verguldan keyin kamida 2 ta raqam
    maximumFractionDigits: 2, // Verguldan keyin ko'pi bilan 2 ta raqam
  });

  // functions
  const getDate = (date) => {
    let kun = String(date.getDate()).padStart(2, "0");
    let oy = String(date.getMonth() + 1).padStart(2, "0");
    let yil = date.getFullYear();
    // let hKun = new Intl.DateTimeFormat('uz-UZ', {weekday: "short"}).format(date);
    let chiroyliSana = `${kun}.${oy}.${yil}`;

    return chiroyliSana;
  };

  const calculateOutput = () => {
    // Initialize variables
    let today = local.bosh_sana.getDate();
    let q = local.asosiy_qarz;
    let a = local.asosiy_qarzga_birinchi_tulov;
    let f = 0;
    let jami_asosiy = 0;
    let jami_foiz = 0;
    let jami_free = 0;

    for (let i = 1; i <= local.muddat; i++) {
      // foizni hisoblash
      f = Math.round(q * local.oylik_foiz * 100) / 100;
      jami_foiz += f;

      if (q < a) {
        a = q;
      }

      // shanba, yakshanba kunlarini hisobga olish
      while (local.bosh_sana.getDay() == 6 || local.bosh_sana.getDay() == 0) {
        local.bosh_sana.setDate(local.bosh_sana.getDate() + 1);
      }

      setTables((prevTables) => [
        ...prevTables,
        {
          id: i,
          sana: getDate(local.bosh_sana),
          asosiy_qarz: pul.format(q),
          asosiy_tulov: pul.format(a),
          foiz_tulov: pul.format(f),
          jami_tulov: pul.format(a + f),
          free_tulov:
            i % local.free_davr === 0 &&
            q > a + local.free_tulov &&
            local.free_bool
              ? pul.format(local.free_tulov)
              : null,
        },
      ]);

      // chiqarish
      console.log(
        String(i).padStart(2, " "),
        "    ",
        getDate(local.bosh_sana),
        "    ",
        String(pul.format(q)).padStart(14, " "),
        "    ",
        String(pul.format(a)).padStart(12, " "),
        "    ",
        String(pul.format(f)).padStart(12, " "),
        "    ",
        String(pul.format(a + f)).padStart(12, " "),
        "    ",
        i % local.free_davr === 0 && q > a + local.free_tulov && local.free_bool
          ? String(pul.format(local.free_tulov)).padStart(12, " ")
          : "            ",
      );

      // belgilangan sanaga qaytish
      local.bosh_sana.setDate(today);

      // keyingi oyga o'tish
      local.bosh_sana.setMonth(local.bosh_sana.getMonth() + 1);

      // asosiy qarzdan to'lsh
      q -= a;
      jami_asosiy += a;

      // qo'shimcha to'lovni hisoblash
      if (i % local.free_davr === 0 && q > local.free_tulov) {
        q -= local.free_tulov;
        jami_free += local.free_tulov;
      }

      // keyingi oy uchun asosiy qarzni hisoblash
      a = Math.round(a * (1 + local.oylik_foiz) * 100) / 100;

      // agar asosiy qarz 0 bo'lsa, siklni to'xtatish
      if (q === 0) break;
    }

    console.log(
      "                                          ",
      pul.format(jami_asosiy),
      "   ",
      pul.format(jami_foiz),
      "  ",
      pul.format(jami_foiz + local.asosiy_qarz),
      "  ",
      pul.format(jami_free),
    );
  };

  return (
    <div className="output">
      <div className="info-box">
        <p>Umumiy narx: {local.summa}</p>
        <p>Boshlang'ich to'lov: {local.bosh_tulov}</p>
        <p>Yillik foiz stavkasi: {local.foiz * 100}%</p>
        <p>Kredit muddati: {local.muddat} oy</p>
      </div>

      <div className="table-box">{/* Table content goes here */}</div>
    </div>
  );
};

export default Output;
