import React from "react";
import Button from "components/Button";
import iconPlus from "assets/images/plus.png";
import * as S from "./styled";
import { usePokemon } from "Provider/context";

export default function Sidebar({getPokemon, setIsMyPokemon, setOpenCreationModal}) {
  const { myPokemons } = usePokemon();

  const existPokemonCreate= myPokemons.find(item => item.id === 0)

  return (
    <S.SideBarWrapper>
      <S.SideBarList>
          {myPokemons &&
            myPokemons?.map((item) => {
              return <S.SideBarItem onClick={()=> {
                getPokemon(item.id)
                setIsMyPokemon(true)
              }}><img src={item?.sprites?.front_shiny?item?.sprites?.front_shiny:""}/></S.SideBarItem>
            })}
            {myPokemons.length < 6 && (<S.SideBarItem>?</S.SideBarItem>)}
      </S.SideBarList>
      {myPokemons.length < 6 && existPokemonCreate === undefined && (<Button icon={iconPlus} onClick={()=> setOpenCreationModal(true)}/>)}
    </S.SideBarWrapper>
  );
}
