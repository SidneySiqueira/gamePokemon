import { Data } from "../../types/pokemon";
import * as S from "./styled";


interface Features{
    name:string
    pokemon: Data,
    existing: number | string,
    creating: number | string,
    customPokemon: Data,
    setCustomPokemon: (value: Data) => void,
}

export default function Features({name, pokemon, existing, creating, customPokemon, setCustomPokemon}: Features) {
    return (
        <>
            {pokemon.id !== 0 ?
                <S.Features>
                    {name}
                    <br />
                    {name === "hp" ? `${existing ? existing : creating}/${existing ? existing : creating}`:`${existing ? existing : creating}${name === "peso"? "kg" : ""}`}
                </S.Features> : <S.Features>{name}<br /><S.InputFeature placeholder={`${existing ? existing : creating}`} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCustomPokemon({ ...customPokemon, [name]: +e.target.value } as Data)} />{name === "peso"? "kg" : ""}</S.Features>}
        </>
    )
}