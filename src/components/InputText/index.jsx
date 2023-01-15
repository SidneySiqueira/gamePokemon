import React, { useState } from "react";

import * as S from "./styled";

export default function InputText({
  className,
  label,
  type,
  placeholder,
  name,
  data,
  setData,
  invalidated,
}) {
  return (
    <S.InputTextWrapper className={className}>
      {label && <S.Label>{label}</S.Label>}

      <S.Input
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={(e) => setData({ ...data, [name]: e.target.value })}
      />
      {invalidated &&<S.Alert>Este campo é obrigatório</S.Alert>}
    </S.InputTextWrapper>
  );
}
