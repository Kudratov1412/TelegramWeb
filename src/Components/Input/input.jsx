import "./input.css";

const Input = () => {
  return (
    <div className="input">
      <div className="muddat-box">
        <label htmlFor="muddat">Kredit muddati</label>
        <input type="number" name="muddat" id="muddat" />
        <Select>
          <option value="oy">Oy</option>
          <option value="yil">Yil</option>
        </Select>
      </div>
    </div>
  );
};

export default Input;
