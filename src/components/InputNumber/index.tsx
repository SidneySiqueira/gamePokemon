import React, { useEffect, useState } from "react";
import chevron from "../../assets/images/chevronDownBlack.png";
import { Data } from "../../types/pokemon";
import * as S from "./styled";


interface InputNumber{
  className?: string,
  label: string,
  placeholder: string,
  name: string,
  suffix?: string,
  data: Data,
  setData: React.Dispatch<React.SetStateAction<Data>>,
  invalidated: boolean,
}

export default function InputNumber({
  className,
  label,
  placeholder,
  name,
  suffix,
  data,
  setData,
  invalidated,
}: InputNumber) {
  const [alert, setAlert] = useState(false);
  const [number, setNumber] = useState<string | number>("");

  useEffect(() => {
    if (invalidated && data[name] === 0) {
      setAlert(true);
    } else {
      setAlert(false);
    }
  }, [invalidated]);

  const handleIncrease = () => {
    setNumber(+number + 1);
  };

  const handleDecrease = () => {
    setNumber(+number - 1);
  };

  useEffect(() => {
    setData({ ...data, [name]: number });
  }, [number]);

  useEffect(()=>{
    if (number > 0) {
      setAlert(false)
    }
  },[number])

  return (
    <S.InputNumberWrapper className={className}>
      {label && <S.Label>{label}</S.Label>}

      <S.InputContent>
        <S.Input
          value={number === "" ? "" : ("0" + data[name]).slice(-2)}
          type="number"
          placeholder={placeholder}
          name={name}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
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
      {alert && (
        <S.Alert>Este campo é obrigatório</S.Alert>
      )}
    </S.InputNumberWrapper>
  );
}
