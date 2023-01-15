import React from "react";

import chevron from "assets/images/chevronDownBlack.png";

import * as S from "./styled";

export default function DropdownPage ({ label, options, data, name, setData, invalidated }) {

  return (
  <S.DropdownWrapper>
    {label && <S.Label>{label}</S.Label>}

    <S.DropdownContent>
      <S.Select onChange={(e)=> setData({...data, [name]: e.target.value })}>
        <S.DropdownOption value="">Selecione o(s) tipo(s)</S.DropdownOption>
        {options &&
          options.map((option, index) => (
            <S.DropdownOption key={index} value={option.value} >
              {option.text}
            </S.DropdownOption>
          ))}
      </S.Select>
      <S.DropdownIcon src={chevron} alt="Chevron" />
    </S.DropdownContent>
    {invalidated && (
        <S.Alert>Este campo é obrigatório! Selecione ao menos um tipo</S.Alert>
      )}
  </S.DropdownWrapper>
  )
};


