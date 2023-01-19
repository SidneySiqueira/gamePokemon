import React from "react";
import * as S from "./styled";

import { typesTrasnlations } from "../../utills/typesTranslation";
import { Option, options } from "../../utills/options";
import { Data } from "../../types/pokemon";

interface DropdownModification{
    name: string
    pokemon: string, 
    customPokemon: Data, 
    setCustomPokemon: (value: Data)=> void
}

export default function DropdownModification({name, pokemon, customPokemon, setCustomPokemon}: DropdownModification) {
    return (
        <>
            <S.Select onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCustomPokemon({ ...customPokemon, [name]: e.target.value } as Data)}>
                <S.DropdownOption value={typesTrasnlations[pokemon]}>{typesTrasnlations[pokemon && pokemon]}</S.DropdownOption>
                {options &&
                    options.map((option: Option, index: number) => (
                        <S.DropdownOption key={index} value={option.value} >
                            {option.text}
                        </S.DropdownOption>
                    ))}
            </S.Select>
        </>
    )
} 