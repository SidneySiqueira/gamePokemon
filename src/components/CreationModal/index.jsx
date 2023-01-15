import React, { useEffect, useState } from "react";
import * as S from "./styled";
import close from "../../assets/images/close.png";
import Button from "components/Button";
import camera from "../../assets/images/camera.png";
import InputText from "components/InputText";
import DropdownPage from "components/Dropdown";
import InputNumber from "components/InputNumber";
import { options } from "utills/options";
import { usePokemon } from "Provider/context";

export default function CreationModal({setOpenCreationModal}) {
  const {myPokemons, setMyPokemons} = usePokemon()
  const [dataAbilities, setDataAbilities] = useState({});
  const [numberOfAbilities, setNumberOfAbilities] = useState(0)
  const [invalidated, setInvalidated] = useState(false)

  const [data, setData] = useState({
    id: 0,
    name: "",
    hp: 0,
    weight: 0,
    height: 0,
    type1: "",
    type2: "",
    abilities: [],
    defense: 0,
    attack: 0,
    specialDefense: 0,
    specialAttack: 0,
    speed: 0,
  });

  const newPokemon = () => {
    if (data.name !== "" && data.hp !== 0 && data.weigth !== 0 && data.heigth !== 0 && data.type1 !== "" && data.abilities !== [] && data.defense !== 0 && data.attack !== 0 && data.specialDefense !== 0 && data.specialAttack !== 0 && data.speed !== 0) {
      setMyPokemons([...myPokemons, data])
      setOpenCreationModal(false)
    } else {
      setInvalidated(true)
    }
  }

  const handleIncrease = () => {
    setNumberOfAbilities(+numberOfAbilities + 1);
  };

  const handleDecrease = () => {
    setNumberOfAbilities(+numberOfAbilities - 1);
  };

  const abilities = Object.values(dataAbilities);

  useEffect(() => {
    setData({ ...data, abilities: abilities });
  }, [dataAbilities]);

  return (
    <S.Modal>
      <S.Form>
        <S.Close onClick={()=> setOpenCreationModal(false)}>
          <S.X src={close} />
        </S.Close>
        <S.ImagePokemonBox>
          <S.ImagePokemon src={camera} />
        </S.ImagePokemonBox>
        <S.Box>
          <InputText
            label={"nome"}
            placeholder={"NOME"}
            name={"name"}
            data={data}
            invalidated={invalidated}
            setData={setData}
          />
        </S.Box>
        <S.Box>
          <InputNumber
            label={"hp"}
            placeholder={"HP"}
            name={"hp"}
            data={data}
            invalidated={invalidated}
            setData={setData}
          />
        </S.Box>
        <S.Box>
          <InputNumber
            label={"peso"}
            placeholder={"PESO"}
            suffix={"Kg"}
            name={"weight"}
            data={data}
            invalidated={invalidated}
            setData={setData}
          />
        </S.Box>
        <S.Box>
          <InputNumber
            label={"altura"}
            placeholder={"ALTURA"}
            name={"height"}
            data={data}
            invalidated={invalidated}
            suffix={"Cm"}
            setData={setData}
          />
        </S.Box>
        <S.Topics>tipo</S.Topics>
        <DropdownPage
          options={options}
          data={data}
          invalidated={invalidated}
          name={"type1"}
          setData={setData}
        />
        {data.type1 !== "" && 
        <DropdownPage
          options={options}
          data={data}
          invalidated={invalidated}
          name={"type2"}
          setData={setData}
        />}
        <S.Topics>habilidades</S.Topics>
        <S.Box>
          <InputText
            placeholder={"HABILIDADE 1"}
            name={"abilities1"}
            data={dataAbilities}
            invalidated={invalidated}
            setData={setDataAbilities}
          />
        </S.Box>
        {numberOfAbilities >= 1 &&
          <S.Box>
          <InputText
            placeholder={"HABILIDADE 2"}
            name={"abilities2"}
            data={dataAbilities}
            invalidated={invalidated}
            setData={setDataAbilities}
          />
        </S.Box>}
        {numberOfAbilities >= 2 &&
          <S.Box>
          <InputText
            placeholder={"HABILIDADE 3"}
            name={"abilities3"}
            data={dataAbilities}
            invalidated={invalidated}
            setData={setDataAbilities}
          />
        </S.Box>}
        {numberOfAbilities >= 3 &&
          <S.Box>
          <InputText
            placeholder={"HABILIDADE 4"}
            name={"abilities4"}
            data={dataAbilities}
            invalidated={invalidated}
            setData={setDataAbilities}
          />
        </S.Box>}
        <S.IconBox>
          {numberOfAbilities > 0 &&<S.Icon onClick={handleDecrease} src="https://cdn-icons-png.flaticon.com/512/2740/2740679.png"/>}
          {numberOfAbilities < 3 &&<S.Icon onClick={handleIncrease} src="https://cdn-icons-png.flaticon.com/512/1828/1828926.png"/>}
          </S.IconBox>
        <S.Topics>Estatísticas</S.Topics>
        <S.Box>
          <InputNumber
            label={"defesa"}
            placeholder={"00"}
            name={"defense"}
            data={data}
            invalidated={invalidated}
            setData={setData}
          />
        </S.Box>
        <S.Box>
          <InputNumber
            label={"ataque"}
            placeholder={"00"}
            name={"attack"}
            data={data}
            invalidated={invalidated}
            setData={setData}
          />
        </S.Box>
        <S.Box>
          <InputNumber
            label={"defesa-especial"}
            placeholder={"00"}
            name={"specialDefense"}
            data={data}
            invalidated={invalidated}
            setData={setData}
          />
        </S.Box>
        <S.Box>
          <InputNumber
            label={"ataque-especial"}
            placeholder={"00"}
            name={"specialAttack"}
            data={data}
            invalidated={invalidated}
            setData={setData}
          />
        </S.Box>
        <S.Box>
          <InputNumber
            label={"velocidade"}
            placeholder={"00"}
            name={"speed"}
            data={data}
            invalidated={invalidated}
            setData={setData}
          />
        </S.Box>
        <S.BoxButton>
          <Button text={"Criar Pokemon"} onClick={newPokemon}/>
        </S.BoxButton>
      </S.Form>
    </S.Modal>
  );
}
