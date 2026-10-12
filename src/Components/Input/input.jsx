import { useState } from "react";
import "./input.css";

const Input = ({ global }) => {
  const [local, setLocal] = useState({
    bosh_sana: "",
    muddat: "",
    muddat_turi: "oy",
    foiz: "",
    summa: "",
    bosh_tulov: "",
    free_bool: false,
    free_tulov: "",
    free_davr: "",
    istisno: [],
  });

  const [date, setDate] = useState();

  const [miq, setMiq] = useState();

  const rendar = () => {
    global.bosh_sana = local.bosh_sana;
    if (local.muddat_turi === "yil") {
      global.muddat = local.muddat * 12;
    } else {
      global.muddat = local.muddat;
    }
    global.foiz = local.foiz;
    global.summa = local.summa;
    global.bosh_tulov = local.bosh_tulov;
    global.free_bool = local.free_bool;
    global.free_tulov = local.free_tulov;
    global.free_davr = local.free_davr;
    global.istisno = local.istisno;
  };

  return (
    <div className="input">
      <form>
        <div className="bosh-sana-box">
          <label htmlFor="bosh_sana">Boshlanish sanasi</label>
          <input
            type="date"
            name="bosh_sana"
            id="bosh_sana"
            min={new Date().toISOString().split("T")[0]}
            value={local.bosh_sana}
            onChange={(e) => setLocal({ ...local, bosh_sana: e.target.value })}
          />
        </div>

        <div className="summa-box">
          <label htmlFor="summa">Umumiy narx</label>
          <input
            type="text"
            name="summa"
            id="summa"
            value={local.summa}
            onChange={(e) => setLocal({ ...local, summa: e.target.value })}
          />
        </div>

        <div className="first-box">
          <label htmlFor="first">Boshlang'ich to'lov</label>
          <input
            type="text"
            name="first"
            id="first"
            value={local.bosh_tulov}
            onChange={(e) => setLocal({ ...local, bosh_tulov: e.target.value })}
          />
        </div>

        <div className="foiz-box">
          <label htmlFor="foiz">Yillik foiz stavkasi</label>
          <input
            type="text"
            name="foiz"
            id="foiz"
            value={local.foiz}
            onChange={(e) => setLocal({ ...local, foiz: e.target.value })}
          />
        </div>

        <div className="muddat-box">
          <label htmlFor="muddat">Kredit muddati</label>
          <input
            type="text"
            name="muddat"
            id="muddat"
            value={local.muddat}
            onChange={(e) => setLocal({ ...local, muddat: e.target.value })}
          />
          <select
            value={local.muddat_turi}
            onChange={(e) =>
              setLocal({ ...local, muddat_turi: e.target.value })
            }
          >
            <option value="oy">Oy</option>
            <option value="yil">Yil</option>
          </select>
        </div>

        <div className="free-bool-box">
          <label htmlFor="free-bool">
            Oy-ma oy qo'shimcha to'lov qilmoqchimisiz
          </label>
          <input
            type="checkbox"
            name="free-bool"
            id="free-bool"
            value={local.free_bool}
            onChange={(e) => {
              setLocal({
                ...local,
                free_bool: !local.free_bool,
              });
            }}
          />
        </div>

        {local.free_bool ? (
          <div className="free-box">
            <div className="free-tulov-box">
              <label htmlFor="first">Qo'shimcha to'lov</label>
              <input
                type="text"
                name="free-tulov"
                id="free-tulov"
                value={local.free_tulov}
                onChange={(e) =>
                  setLocal({ ...local, free_tulov: e.target.value })
                }
              />
            </div>

            <div className="free-davr-box">
              <label htmlFor="first">Qo'shimcha to'lov davri</label>
              <input
                type="text"
                name="free-davr"
                id="free-davr"
                value={local.free_davr}
                onChange={(e) =>
                  setLocal({ ...local, free_davr: e.target.value })
                }
              />
            </div>

            <div className="istisno">
              <div className="vaqti">
                <label htmlFor="month">Sanani kiriting :</label>
                <input
                  type="month"
                  name="month"
                  id="month"
                  min={local.bosh_sana}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>

              <div className="miqdori">
                <label htmlFor="miqdor">Miqdorini kiriting (+, -): </label>
                <input
                  type="text"
                  name="miqdor"
                  id="miqdor"
                  value={miq}
                  onChange={(e) => setMiq(e.target.value)}
                />
              </div>

              <button
                type="button"
                onClick={() => {
                  if (date && miq) {
                    setLocal({
                      ...local,
                      istisno: [...local.istisno, { date: date, miqdor: miq }],
                    });
                    setDate("");
                    setMiq("");
                  }
                }}
              >
                Qo'shish
              </button>
            </div>
          </div>
        ) : (
          ""
        )}

        <button className="hisoblash" onClick={() => rendar()}>
          Hisoblash
        </button>
      </form>
    </div>
  );
};

export default Input;
