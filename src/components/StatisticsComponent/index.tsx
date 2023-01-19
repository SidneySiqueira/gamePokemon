import { Data } from "../../types/pokemon";
import * as S from "./styled";

interface StatisticsComponent {
    name:string
    technique:string
    pokemon: Data,
    existing: number,
    creating: number,
    customPokemon: Data,
    setCustomPokemon: (value: Data) => void,
}


export default function StatisticsComponent({ name,technique, pokemon, existing, creating, customPokemon, setCustomPokemon }: StatisticsComponent) {
    return (
        <>
            {pokemon.id !== 0 ?
                <S.Levels>
                    <S.LevelsP>{name}</S.LevelsP>
                    <S.LevelsP>
                        {pokemon && pokemon?.id !== +0
                            ? existing
                            : creating}
                    </S.LevelsP>
                </S.Levels> :
                <S.Levels>
                    <S.LevelsP>{name}</S.LevelsP>
                    <S.InputFeature placeholder={pokemon && pokemon?.id !== +0
                        ? existing
                        : creating} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCustomPokemon({ ...customPokemon, [technique]: +e.target.value } as Data)} />
                </S.Levels>
            }
        </>
    )
}