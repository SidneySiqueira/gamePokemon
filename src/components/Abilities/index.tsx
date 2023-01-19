import { abilitiesArray, Data } from "../../types/pokemon";
import * as S from "./styled";

interface Abilities{
    pokemon: Data, 
    skillsArray: string[] | abilitiesArray[], 
    customPokemon: Data,
    setCustomPokemon: (value: Data) => void,
}

export default function Abilities({pokemon, skillsArray, customPokemon, setCustomPokemon}: Abilities){
    return(
    <>
        {pokemon.id !== 0 ?
          <>
            <S.Topics>habilidades</S.Topics>
            <S.Abilities>
              <S.Techniques>{skillsArray.toString()}</S.Techniques>
            </S.Abilities>
          </> : <>
            <S.Topics>habilidades</S.Topics>
            <S.Abilities>
              <S.InputAbilities placeholder={skillsArray.toString()} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCustomPokemon({ ...customPokemon, abilities: [e.target.value] } as Data)} />
            </S.Abilities>
          </>}
    </>
    )
}