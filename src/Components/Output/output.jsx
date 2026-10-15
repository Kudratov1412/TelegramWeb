import { useEffect, useState } from "react";
import "./output.css";

const Output = ({ global }) => {
  const [local, setLocal] = useState({
    bosh_sana: global.bosh_sana ? new Date(global.bosh_sana) : new Date(),
    muddat: Number(global.muddat),
    yillik_foiz: Number(global.foiz),
    oylik_foiz: Number(global.foiz) / 12,
    summa: Number(global.summa),
    bosh_tulov: Number(global.bosh_tulov),
    free_bool: global.free_bool,
    free_tulov: Number(global.free_tulov),
    free_davr: Number(global.free_davr),
    istisno: global.istisno,
    asosiy_qarz: Number(global.summa) - Number(global.bosh_tulov),
    asosiy_qarzga_birinchi_tulov:
      Math.round(
        (((Number(global.summa) - Number(global.bosh_tulov)) *
          Number(global.foiz)) /
          12 /
          (Math.pow(1 + Number(global.foiz) / 12, Number(global.muddat)) - 1)) *
          100,
      ) / 100,
  });

  useEffect(() => {
    calculateOutput();
  }, []);

  const [tables, setTables] = useState([]);

  const t = [];

  const pul = (value) => {
    const parts = new Intl.NumberFormat("uz-UZ", {
      style: "decimal", // Shunchaki o'nlik son formati
      useGrouping: true,
      minimumFractionDigits: 2, // Verguldan keyin kamida 2 ta raqam
      maximumFractionDigits: 2, // Verguldan keyin ko'pi bilan 2 ta raqam
    }).formatToParts(value);

    const result = parts
      .map((part) => (part.type === "group" ? " " : part.value))
      .join("");

    return result;
  };

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

      const row = {
        id: String(i),
        sana: String(getDate(local.bosh_sana)),
        asosiy_qarz: String(pul(q)),
        asosiy_tulov: String(pul(a)),
        foiz_tulov: String(pul(f)),
        jami_tulov: String(pul(a + f)),
        free_tulov:
          i % local.free_davr === 0 &&
          q > a + local.free_tulov &&
          local.free_bool
            ? String(pul(local.free_tulov))
            : "            ",
      };

      if (row.sana.slice(2, row.length)) {
      }

      t.push(row);

      console.log(row);

      // belgilangan sanaga qaytish
      local.bosh_sana.setDate(today);

      // keyingi oyga o'tish
      local.bosh_sana.setMonth(local.bosh_sana.getMonth() + 1);

      // asosiy qarzdan to'lsh
      q -= a;
      jami_asosiy += a;

      // qo'shimcha to'lovni hisoblash
      if (
        i % local.free_davr === 0 &&
        q > local.free_tulov &&
        local.free_bool
      ) {
        q -= local.free_tulov;
        jami_free += local.free_tulov;
      }

      // keyingi oy uchun asosiy qarzni hisoblash
      a = Math.round(a * (1 + local.oylik_foiz) * 100) / 100;

      // agar asosiy qarz 0 bo'lsa, siklni to'xtatish
      if (q === 0) break;
    }

    setTables(t);

    console.log(
      "                                          ",
      pul(jami_asosiy),
      "   ",
      pul(jami_foiz),
      "  ",
      pul(jami_foiz + local.asosiy_qarz),
      "  ",
      pul(jami_free),
    );

    console.log(t[46].asosiy_tulov);
  };

  return (
    <div className="output">
      <div className="info-box">
        <p>Umumiy narx: {pul(local.summa)}</p>
        <p>Boshlang'ich to'lov: {pul(local.bosh_tulov)}</p>
        <p>Yillik foiz stavkasi: {String(local.yillik_foiz * 100)}%</p>
        <p>Kredit muddati: {String(local.muddat)} oy</p>
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
            <tr>
              <td>Jami</td>
              <td></td>
              <td></td>
              <td>{pul(local.asosiy_qarz)}</td>
              <td>
                {pul(
                  tables.reduce(
                    (sum, row) =>
                      sum + Number(row.foiz_tulov.replace(/ /g, "")),
                    0,
                  ),
                )}
              </td>
              <td>
                {pul(
                  tables.reduce(
                    (sum, row) =>
                      sum +
                      Number(row.foiz_tulov.replace(/ /g, "")) +
                      Number(row.asosiy_tulov.replace(/ /g, "")),
                    0,
                  ),
                )}
              </td>
              {local.free_bool && (
                <td>
                  {pul(
                    tables.reduce(
                      (sum, row) =>
                        sum + Number(row.free_tulov.replace(/ /g, "")),
                      0,
                    ),
                  )}
                </td>
              )}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Output;
