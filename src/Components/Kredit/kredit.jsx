import React from "react";
import Input from "../Input/input";
import { useState } from "react";
import Output from "../Output/output";

const Kredit = () => {
  const [baza, setBaza] = useState({
    bosh_sana: "",
    muddat: "",
    foiz: "",
    summa: "",
    bosh_tulov: "",
    free_bool: "",
    free_tulov: "",
    free_davr: "",
    istisno: [],
  });

  const [output, setOutput] = useState(false);

  return (
    <div className="kredit">
      <Input global={baza} setOutput={setOutput} />
      {output ? (
        <Output global={baza} />
      ) : (
        ""
      )}
    </div>
  );
};

export default Kredit;
