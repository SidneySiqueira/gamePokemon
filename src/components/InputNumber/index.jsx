import React, { useEffect, useState } from "react";

import chevron from "assets/images/chevronDownBlack.png";

import * as S from "./styled";

export default function InputNumber({
  className,
  label,
  placeholder,
  name,
  suffix,
  data,
  setData,
  invalidated,
}) {
  // const [alert, setAlert] = useState(false);
  const [number, setNumber] = useState("");

  const handleIncrease = () => {
    setNumber(+number + 1);
  };

  const handleDecrease = () => {
    setNumber(+number - 1);
  };

  // useEffect(() => {
  //   if (number >= 0) {
  //     setAlert(false);
  //   } else {
  //     setAlert(true);
  //   }
  // }, [number]);

  useEffect(() => {
    setData({ ...data, [name]: number });
  }, [number]);

  return (
    <S.InputNumberWrapper className={className}>
      {label && <S.Label>{label}</S.Label>}

      <S.InputContent>
        <S.Input
          value={number === "" ? "" : ("0" + data[name]).slice(-2)}
          type="number"
          placeholder={placeholder}
          name={name}
          onChange={(e) => {
            setNumber(e.currentTarget.value);
          }}
        />

        {suffix && <S.InputSuffix>{suffix}</S.InputSuffix>}

        <S.InputActions>
          <S.Arrow
            src={chevron}
            className="increase"
            alt="Mais"
            onClick={() => handleIncrease()}
          />
          <S.Arrow
            src={chevron}
            className="decrease"
            alt="Menos"
            onClick={() => handleDecrease()}
          />
        </S.InputActions>
      </S.InputContent>
      {invalidated && (
        <S.Alert>Este campo é obrigatório</S.Alert>
      )}
    </S.InputNumberWrapper>
  );
}
