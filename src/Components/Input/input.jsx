import { useRef, useState } from "react";
import "./input.css";

const Input = ({ global }) => {
  const [local, setLocal] = useState({
    muddat: "",
    yillik_foiz: "",
    summa: "",
    bosh_tulov: "",
    free_bool: true,
    free_tulov: "",
    free_davr: "",
  });

  return (
    <div className="input">
      <form action="#">
        <div className="summa-box">
          <label htmlFor="summa">Umumiy narx</label>
          <input type="text" name="summa" id="summa" />
        </div>

        <div className="first-box">
          <label htmlFor="first">Boshlang'ich to'lov</label>
          <input type="text" name="first" id="first" />
        </div>

        <div className="foiz-box">
          <label htmlFor="foiz">Yillik foiz stavkasi</label>
          <input type="text" name="foiz" id="foiz" />
        </div>

        <div className="muddat-box">
          <label htmlFor="muddat">Kredit muddati</label>
          <input type="text" name="muddat" id="muddat" />
          <select>
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
              <input type="text" name="free-tulov" id="free-tulov" />
            </div>

            <div className="free-davr-box">
              <label htmlFor="first">Qo'shimcha to'lov davri</label>
              <input type="text" name="free-davr" id="free-davr" />
            </div>

            <div className="istisno">
              <div className="vaqti">
                <label htmlFor="date">Sanani kiriting :</label>
                <input type="date" name="date" id="date" />
              </div>

              <div className="miqdori">
                <label htmlFor="miqdor">Miqdorini kiriting (+, -): </label>
                <input type="text" name="miqdor" id="miqdor" />
              </div>

              <button type="button">Qo'shish</button>
            </div>
          </div>
        ) : (
          ""
        )}

        <button className="hisoblash">Hisoblash</button>
      </form>
    </div>
  );
};

export default Input;
