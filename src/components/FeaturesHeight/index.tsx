import { Data } from "../../types/pokemon";
import * as S from "./styled";


interface FeaturesHeight{
    pokemon: Data,
    customPokemon: Data,
    setCustomPokemon: (value: Data) => void,
}

export default function FeaturesHeight({ pokemon, customPokemon, setCustomPokemon}: FeaturesHeight) {
    return (
        <>
            {pokemon.id !== 0 ?
            <S.FeaturesHeight>
              altura
              <br />
              {`${pokemon && pokemon?.height} m`}
            </S.FeaturesHeight> : <S.FeaturesHeight>altura<br /><S.InputFeature placeholder={`${pokemon && pokemon?.height}`} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCustomPokemon({ ...customPokemon, height: +e.target.value } as Data)} />m</S.FeaturesHeight>}
        </>
    )
}