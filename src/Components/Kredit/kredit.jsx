import React from "react";
import Input from "../Input/input";
import { useState } from "react";
import Output from "../Output/output";

const Kredit = () => {
  const [baza, setBaza] = useState({
    muddat: "",
    yillik_foiz: "",
    oylik_foiz: "",
    summa: "",
    bosh_tulov: "",
    free_bool: "",
    free_tulov: "",
    free_davr: "",
  });

  const [output, setOutput] = useState(false);

  return (
    <div className="kredit">
      <Input global={baza} />
      {output ? <Output /> : ""}
    </div>
  );
};

export default Kredit;
