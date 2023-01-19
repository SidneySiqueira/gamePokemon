import React, { useEffect, useState } from "react";
import * as S from "./styled";
import pokeball from "../../assets/images/pokeball.png";
import editIcon from "../../assets/images/editIcon.png";
import checkIcon from "../../assets/images/checkIcon.png";
import close from "../../assets/images/close.png";
import Button from "../Button";
import { typesTrasnlations } from "../../utills/typesTranslation";
import { typePower } from "../../utills/typePower";
import { Data, PokemonType } from "../../types/pokemon";
import { usePokemon } from "../../Provider/context";
import { Option, options } from "../../utills/options";

interface Modal {
  pokemon: PokemonType,
  setPokemon: React.Dispatch<React.SetStateAction<PokemonType | Data>>,
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
  goPokeball: (dado: PokemonType) => void,
  isMyPokemon: boolean,
  removePokemon: (dado: PokemonType) => void,
}

export default function Modal({
  pokemon,
  setPokemon,
  setOpenModal,
  goPokeball,
  isMyPokemon,
  removePokemon,
}: Modal) {

  const [edit, setEdit] = useState(false);
  const [typing, setTyping] = useState<string>('');
  const { myPokemons, setMyPokemons } = usePokemon();
  const [customPokemon, setCustomPokemon] = useState<Data>();

  const skillsArray = pokemon.id === 0 ? pokemon.abilities : pokemon?.abilities.map((item) => item?.ability?.name);

  const isEdit = myPokemons.find(item => item.name === pokemon?.name);

  const changeName = (name: string) => {
    setCustomPokemon({ ...customPokemon, name } as Data);
  };

  useEffect(() => {
    if (isEdit) {
      setCustomPokemon(isEdit as Data);
    }
  }, [pokemon]);

  useEffect(() => {
    if (customPokemon && isEdit) {
      const index = myPokemons.indexOf(isEdit);
      myPokemons[index] = customPokemon;
      setPokemon(customPokemon);
      setEdit(false);
    }
  }, [customPokemon]);

  useEffect(() => {
    setMyPokemons(myPokemons);
    localStorage.setItem("pokemon", JSON.stringify(myPokemons));
  }, [customPokemon]);

  const existingPokemonHp = pokemon?.id !== 0 ? pokemon?.stats[0].base_stat : undefined;
  const creatingPokemonHp = pokemon?.id === 0 ? pokemon?.hp : undefined;
  const existingPokemonDefense = pokemon?.id !== 0 ? pokemon?.stats[2]?.base_stat : undefined;
  const creatingPokemonDefense = pokemon?.id === 0 ? pokemon?.defense : undefined;
  const existingPokemonAttack = pokemon?.id !== 0 ? pokemon?.stats[1].base_stat : undefined;
  const creatingPokemonAttack = pokemon?.id === 0 ? pokemon?.attack : undefined;
  const existingPokemonSpecialDefense = pokemon?.id !== 0 ? pokemon?.stats[4].base_stat : undefined;
  const creatingPokemonSpecialDefense = pokemon?.id === 0 ? pokemon?.specialDefense : undefined;
  const existingPokemonSpecialAttack = pokemon?.id !== 0 ? pokemon?.stats[3].base_stat : undefined;
  const creatingPokemonSpecialAttack = pokemon?.id === 0 ? pokemon?.specialAttack : undefined;
  const existingPokemonSpeed = pokemon?.id !== 0 ? pokemon?.stats[5].base_stat : undefined;
  const creatingPokemonSpeed = pokemon?.id === 0 ? pokemon?.speed : undefined;

  return (
    <S.Modal>
      <S.Form>
        <S.Close onClick={() => {
          setOpenModal(false);
        }}>
          <S.X src={close} />
        </S.Close>
        <S.ImagePokemonBox>
          <S.ImagePokemon
            src={pokemon?.sprites?.front_shiny ? pokemon?.sprites?.front_shiny : pokeball}
          />
        </S.ImagePokemonBox>
        {!edit ? <S.NameBox><S.Name>{pokemon && pokemon?.name}</S.Name>{isEdit && <S.IconCheck onClick={() => setEdit(true)}><S.IconEdit src={editIcon} /></S.IconCheck>}</S.NameBox> :
          <S.NameBox>
            <S.InputEdit onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setTyping(e.target.value)} />
            <S.IconCheck onClick={() => changeName(typing)}><S.IconImg src={checkIcon} /></S.IconCheck>
            <S.IconClose onClick={() => setEdit(false)}><S.IconImg src={close} /></S.IconClose>
          </S.NameBox>}
        <S.FeaturesBox>
          {pokemon.id !== 0 ?
            <S.Features>
              hp
              <br />
              {`${existingPokemonHp ? existingPokemonHp : creatingPokemonHp}/${existingPokemonHp ? existingPokemonHp : creatingPokemonHp
                }`}
            </S.Features> : <S.Features>hp<br /><S.InputFeature placeholder={`${existingPokemonHp ? existingPokemonHp : creatingPokemonHp}`} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCustomPokemon({ ...customPokemon, hp: +e.target.value } as Data)} /></S.Features>}
          {pokemon.id !== 0 ?
            <S.FeaturesHeight>
              altura
              <br />
              {`${pokemon && pokemon?.height} m`}
            </S.FeaturesHeight> : <S.Features>altura<br /><S.InputFeature placeholder={`${pokemon && pokemon?.height}`} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCustomPokemon({ ...customPokemon, height: +e.target.value } as Data)} />m</S.Features>}
          {pokemon.id !== 0 ?
            <S.Features>
              peso
              <br />
              {`${pokemon && pokemon?.weight} kg`}
            </S.Features> : <S.Features>peso<br /><S.InputFeature placeholder={`${pokemon && pokemon?.weight} `} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCustomPokemon({ ...customPokemon, weight: +e.target.value } as Data)} />kg</S.Features>}
        </S.FeaturesBox>
        <S.Topics>tipo</S.Topics>
        {pokemon && pokemon?.id !== 0 ?
          <S.PokemonsTypes>
            {pokemon &&
              pokemon?.types.map((item, index) => {
                return (
                  <S.BadgeTypes
                    key={index}
                    style={{ backgroundColor: typePower(item?.type?.name) }}
                  >
                    {typesTrasnlations[item?.type?.name]}
                  </S.BadgeTypes>
                );
              })}
          </S.PokemonsTypes> :
          <S.PokemonsTypes>
            <S.BadgeTypes
              style={{ backgroundColor: typePower(pokemon && pokemon?.type1) }}
            ><S.Select onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCustomPokemon({ ...customPokemon, type1: e.target.value } as Data)}>
                <S.DropdownOption value={typesTrasnlations[pokemon && pokemon?.type1]}>{typesTrasnlations[pokemon && pokemon?.type1]}</S.DropdownOption>
                {options &&
                  options.map((option: Option, index: number) => (
                    <S.DropdownOption key={index} value={option.value} >
                      {option.text}
                    </S.DropdownOption>
                  ))}
              </S.Select>
            </S.BadgeTypes>
            {pokemon && pokemon?.type2 && (
              <S.BadgeTypes
                style={{
                  backgroundColor: typePower(pokemon && pokemon?.type2),
                }}
              ><S.Select onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCustomPokemon({ ...customPokemon, type2: e.target.value } as Data)}>
                  <S.DropdownOption value={typesTrasnlations[pokemon && pokemon?.type2]}>{typesTrasnlations[pokemon && pokemon?.type2]}</S.DropdownOption>
                  {options &&
                    options.map((option: Option, index: number) => (
                      <S.DropdownOption key={index} value={option.value} >
                        {option.text}
                      </S.DropdownOption>
                    ))}
                </S.Select>

              </S.BadgeTypes>
            )}
          </S.PokemonsTypes>
        }
        {pokemon.id !== 0 ?
          <>
            <S.Topics>habilidades</S.Topics>
            <S.Habilities>
              <S.Techniques>{skillsArray.toString()}</S.Techniques>
            </S.Habilities>
          </> : <>
            <S.Topics>habilidades</S.Topics>
            <S.Habilities>
              <S.InputAbilities placeholder={skillsArray.toString()} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCustomPokemon({ ...customPokemon, abilities: [e.target.value] } as Data)} />
            </S.Habilities>
          </>}
        {isMyPokemon && (
          <>
            <S.Topics>estatística</S.Topics>
            <S.Statistics>
              {pokemon.id !== 0 ?
                <S.Levels>
                  <S.LevelsP>defesa</S.LevelsP>
                  <S.LevelsP>
                    {pokemon && pokemon?.id !== +0
                      ? existingPokemonDefense
                      : creatingPokemonDefense}
                  </S.LevelsP>
                </S.Levels> :
                <S.Levels>
                  <S.LevelsP>defesa</S.LevelsP>
                  <S.InputFeature placeholder={pokemon && pokemon?.id !== +0
                    ? existingPokemonDefense
                    : creatingPokemonDefense} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCustomPokemon({ ...customPokemon, defense: +e.target.value } as Data)} />
                </S.Levels>}
              {pokemon.id !== 0 ?
                <S.Levels>
                  <S.LevelsP>ataque</S.LevelsP>
                  <S.LevelsP>
                    {pokemon && pokemon?.id !== +0
                      ? existingPokemonAttack
                      : creatingPokemonAttack}
                  </S.LevelsP>
                </S.Levels> :
                <S.Levels>
                  <S.LevelsP>ataque</S.LevelsP>
                  <S.InputFeature placeholder={pokemon && pokemon?.id !== +0
                    ? existingPokemonAttack
                    : creatingPokemonAttack} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCustomPokemon({ ...customPokemon, attack: +e.target.value } as Data)} />
                </S.Levels>}
              {pokemon.id !== 0 ?
                <S.Levels>
                  <S.LevelsP>defesa especial</S.LevelsP>
                  <S.LevelsP>
                    {pokemon && pokemon?.id !== +0
                      ? existingPokemonSpecialDefense
                      : creatingPokemonSpecialDefense}
                  </S.LevelsP>
                </S.Levels> :
                <S.Levels>
                  <S.LevelsP>defesa especial</S.LevelsP>
                  <S.InputFeature placeholder={pokemon && pokemon?.id !== +0
                    ? existingPokemonSpecialDefense
                    : creatingPokemonSpecialDefense} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCustomPokemon({ ...customPokemon, specialDefense: +e.target.value } as Data)} />
                </S.Levels>}
              {pokemon.id !== 0 ?
                <S.Levels>
                  <S.LevelsP>ataque especial</S.LevelsP>
                  <S.LevelsP>
                    {pokemon && pokemon?.id !== +0
                      ? existingPokemonSpecialAttack
                      : creatingPokemonSpecialAttack}
                  </S.LevelsP>
                </S.Levels> :
                <S.Levels>
                  <S.LevelsP>ataque especial</S.LevelsP>
                  <S.InputFeature placeholder={pokemon && pokemon?.id !== +0
                    ? existingPokemonSpecialAttack
                    : creatingPokemonSpecialAttack} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCustomPokemon({ ...customPokemon, specialAttack: +e.target.value } as Data)} />
                </S.Levels>}
              {pokemon.id !== 0 ?
                <S.Levels>
                  <S.LevelsP>velocidade</S.LevelsP>
                  <S.LevelsP>
                    {pokemon && pokemon?.id !== +0
                      ? existingPokemonSpeed
                      : creatingPokemonSpeed}
                  </S.LevelsP>
                </S.Levels> :
                <S.Levels>
                  <S.LevelsP>velocidade</S.LevelsP>
                  <S.InputFeature placeholder={pokemon && pokemon?.id !== +0
                    ? existingPokemonSpeed
                    : creatingPokemonSpeed} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCustomPokemon({ ...customPokemon, speed: +e.target.value } as Data)} />
                </S.Levels>}
            </S.Statistics>
          </>
        )}
        <S.BoxPokeball style={{ marginBottom: isMyPokemon ? "50px" : "0" }}>
          {isMyPokemon ? (
            <Button
              text={"Liberar Pokemon"}
              onClick={() => removePokemon(pokemon)}
            />
          ) : (
            <S.Pokeball src={pokeball} onClick={() => goPokeball(pokemon)} />
          )}
        </S.BoxPokeball>
      </S.Form>
    </S.Modal>
  );
}
