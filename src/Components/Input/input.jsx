import { useRef, useState } from "react";
import "./input.css";

const Input = ({ global }) => {
  const [local, setLocal] = useState({
    muddat: "",
    yillik_foiz: "",
    oylik_foiz: "",
    summa: "",
    bosh_tulov: "",
    free_bool: false,
    free_tulov: "",
    free_davr: "",
  });

  const inputRef = useRef(false);

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
          <label htmlFor="foiz">Foiz stavkasi</label>
          <input type="text" name="foiz" id="foiz" />
          <select>
            <option value="oy">Oy</option>
            <option value="yil">Yil</option>
          </select>
        </div>

        <div className="muddat-box">
          <label htmlFor="muddat">Kredit muddati</label>
          <input type="text" name="muddat" id="muddat" />
          <select>
            <option value="oy">Oy</option>
            <option value="yil">Yil</option>
          </select>
        </div>

        <div className="free-box">
          <label htmlFor="free-bool">
            Oy-ma oy qo'shimcha to'lov qilmoqchimisiz
          </label>
          <input
            type="checkbox"
            name="free-bool"
            id="free-bool"
            value={inputRef}
            inputRef={inputRef}
            onChange={() => {
              inputRef.current
                ? (local.free_bool = true)
                : (local.free_bool = false);
            }}
          />
        </div>

        {local.free_bool ? <div>aaaaaaaaa</div> : ""}

        <button className="hisoblash">Hisoblash</button>
      </form>
    </div>
  );
};

export default Input;
