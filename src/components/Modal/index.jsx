import React from "react";
import * as S from "./styled";
import pokeball from "../../assets/images/pokeball.png";
import close from "../../assets/images/close.png";
import Button from "components/Button";
import { typesTrasnlations } from "utills/typesTranslation";
import { typePower } from "utills/typePower";

export default function Modal({
  pokemon,
  setOpenModal,
  goPokeball,
  isMyPokemon,
  removePokemon,
}) {

  const skillsArray = [];
  const skills =
    pokemon && pokemon?.id === 0
      ? skillsArray.push(pokemon?.abilities)
      : pokemon?.abilities.map((item) => {
          return skillsArray.push(item?.ability?.name);
        });

  const existingPokemonHp =
    pokemon && pokemon.id !== 0 && pokemon?.stats[0].base_stat;
  const creatingPokemonHp = pokemon && pokemon.id === 0 && pokemon?.hp;
  const existingPokemonDefense =
    pokemon && pokemon.id !== 0 && pokemon?.stats[2].base_stat;
  const creatingPokemonDefense =
    pokemon && pokemon.id === 0 && pokemon?.defense;
  const existingPokemonAttack =
    pokemon && pokemon.id !== 0 && pokemon?.stats[1].base_stat;
  const creatingPokemonAttack = pokemon && pokemon.id === 0 && pokemon?.attack;
  const existingPokemonSpecialDefense =
    pokemon && pokemon.id !== 0 && pokemon?.stats[4].base_stat;
  const creatingPokemonSpecialDefense =
    pokemon && pokemon.id === 0 && pokemon?.specialDefense;
  const existingPokemonSpecialAttack =
    pokemon && pokemon.id !== 0 && pokemon?.stats[3].base_stat;
  const creatingPokemonSpecialAttack =
    pokemon && pokemon.id === 0 && pokemon?.specialAttack;
  const existingPokemonSpeed =
    pokemon && pokemon.id !== 0 && pokemon?.stats[5].base_stat;
  const creatingPokemonSpeed = pokemon && pokemon.id === 0 && pokemon?.speed;

  return (
    <S.Modal>
      <S.Form>
        <S.Close onClick={() => {setOpenModal(false);
        
        }}>
          <S.X src={close} />
        </S.Close>
        <S.ImagePokemonBox>
          <S.ImagePokemon
            src={pokemon?.sprites?.front_shiny && pokemon?.sprites?.front_shiny}
          />
        </S.ImagePokemonBox>
        <S.Name>{pokemon && pokemon?.name}</S.Name>
        <S.FeaturesBox>
          <S.Features>
            hp
            <br />
            {`${existingPokemonHp ? existingPokemonHp : creatingPokemonHp}/${
              existingPokemonHp ? existingPokemonHp : creatingPokemonHp
            }`}
          </S.Features>
          <S.FeaturesHeight>
            altura
            <br />
            {`${pokemon && pokemon?.height} m`}
          </S.FeaturesHeight>
          <S.Features>
            peso
            <br />
            {`${pokemon && pokemon?.weight} kg`}
          </S.Features>
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
          </S.PokemonsTypes>:
          <S.PokemonsTypes>
          <S.BadgeTypes
            style={{ backgroundColor: typePower(pokemon && pokemon?.type1) }}
          >
            {typesTrasnlations[pokemon && pokemon?.type1]}
          </S.BadgeTypes>
          {pokemon && pokemon?.type2 && (
            <S.BadgeTypes
              style={{
                backgroundColor: typePower(pokemon && pokemon?.type2),
              }}
            >
              {typesTrasnlations[pokemon && pokemon?.type2]}
            </S.BadgeTypes>
          )}
        </S.PokemonsTypes>
        }
        <S.Topics>habilidades</S.Topics>
        <S.Habilities>
          <S.Techniques>{skillsArray.toString()}</S.Techniques>
        </S.Habilities>
        {isMyPokemon && (
          <>
            <S.Topics>estatística</S.Topics>
            <S.Statistics>
              <S.Levels>
                <S.LevelsP>defesa</S.LevelsP>
                <S.LevelsP>
                  {pokemon && pokemon?.id !== +0
                    ? existingPokemonDefense
                    : creatingPokemonDefense}
                </S.LevelsP>
              </S.Levels>
              <S.Levels>
                <S.LevelsP>ataque</S.LevelsP>
                <S.LevelsP>
                  {pokemon && pokemon?.id !== +0
                    ? existingPokemonAttack
                    : creatingPokemonAttack}
                </S.LevelsP>
              </S.Levels>
              <S.Levels>
                <S.LevelsP>defesa especial</S.LevelsP>
                <S.LevelsP>
                  {pokemon && pokemon?.id !== +0
                    ? existingPokemonSpecialDefense
                    : creatingPokemonSpecialDefense}
                </S.LevelsP>
              </S.Levels>
              <S.Levels>
                <S.LevelsP>ataque especial</S.LevelsP>
                <S.LevelsP>
                  {pokemon && pokemon?.id !== +0
                    ? existingPokemonSpecialAttack
                    : creatingPokemonSpecialAttack}
                </S.LevelsP>
              </S.Levels>
              <S.Levels>
                <S.LevelsP>velocidade</S.LevelsP>
                <S.LevelsP>
                  {pokemon && pokemon?.id !== +0
                    ? existingPokemonSpeed
                    : creatingPokemonSpeed}
                </S.LevelsP>
              </S.Levels>
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
