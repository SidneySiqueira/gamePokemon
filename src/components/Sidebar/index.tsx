import React from "react";
import Button from "../Button";
import pokeball from "../../assets/images/pokeball.png";
import iconPlus from "../../assets/images/plus.png";
import * as S from "./styled";
import { usePokemon } from "../../Provider/context";
import { Data, PokemonType } from "../../types/pokemon";

interface Sidebar{
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
  setPokemon: React.Dispatch<React.SetStateAction<PokemonType|Data>>
  setIsMyPokemon: React.Dispatch<React.SetStateAction<boolean>>, 
  setOpenCreationModal: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Sidebar({setOpenModal,setPokemon, setIsMyPokemon, setOpenCreationModal}: Sidebar) {
  const { myPokemons } = usePokemon();

  const existPokemonCreate= myPokemons.find((item) => item.id === 0)

  return (
    <S.SideBarWrapper>
      <S.SideBarList>
          {myPokemons &&
            myPokemons?.map((item , index) => {
              return <S.SideBarItem key={index} onClick={()=> {
                setPokemon(item)
                setIsMyPokemon(true)
                setOpenModal(true)
              }}><img src={item?.sprites? item?.sprites?.front_shiny : pokeball}/></S.SideBarItem>
            })}
            {myPokemons.length < 6 && (<S.SideBarItem>?</S.SideBarItem>)}
      </S.SideBarList>
      {existPokemonCreate === undefined && (<Button icon={iconPlus} onClick={()=> {myPokemons.length < 6 && setOpenCreationModal(true)}}/>)}
    </S.SideBarWrapper>
  );
}
