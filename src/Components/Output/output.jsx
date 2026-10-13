import { useEffect, useState } from "react";
import "./output.css";

const Output = ({ global }) => {
  const [local, setLocal] = useState({
    bosh_sana: global.bosh_sana ? new Date(global.bosh_sana) : new Date(),
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
        (((global.summa - global.bosh_tulov) * global.foiz) /
          12 /
          (Math.pow(1 + global.foiz / 12, global.muddat) - 1)) *
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
        jami_free += Number(local.free_tulov);
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
        <p>Yillik foiz stavkasi: {local.yillik_foiz * 100}%</p>
        <p>Kredit muddati: {local.muddat} oy</p>
      </div>

      <div className="table-box">
        <table>
          <thead>
            <tr>
              <th>№</th>
              <th>Sana</th>
              <th>Asosiy qarz qoldig'i</th>
              <th>Asosiy to'lov</th>
              <th>Foiz to'lov</th>
              <th>Jami to'lov</th>
              {local.free_bool && <th>Qo'shimcha to'lov</th>}
            </tr>
          </thead>
          <tbody>
            {tables.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.sana}</td>
                <td>{row.asosiy_qarz}</td>
                <td>{row.asosiy_tulov}</td>
                <td>{row.foiz_tulov}</td>
                <td>{row.jami_tulov}</td>
                {local.free_bool && <td>{row.free_tulov}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Output;
