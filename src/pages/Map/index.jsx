import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import axios from "axios";
import Sidebar from "components/Sidebar";
import * as S from "./styled";
import ashFront from "../../assets/images/ashFront.png";
import ashLeftLeg from "../../assets/images/ashLeftLeg.png";
import ashRightLeg from "../../assets/images/ashRightLeg.png";
import ashStop from "../../assets/images/ashStop.png";
import searchTooltip from "../../assets/images/searchTooltip.png";
import searchingTooltip from "../../assets/images/searchingTooltip.png";
import tooltipError from "../../assets/images/tooltipError.png";
import Modal from "components/Modal";
import { usePokemon } from "Provider/context";
import CreationModal from "components/CreationModal";

export default function MapPage() {
  const [pokemon, setPokemon] = useState();
  const [AshPosition, setAshPosition] = useState(ashFront);
  const [openModal, setOpenModal] = useState(false);
  const [openCreationModal, setOpenCreationModal] = useState(false);
  const [id, setId] = useState();
  const [showTooltip, setShowTooltip] = useState(false);
  const [loading, setLoading] = useState();
  const { myPokemons, setMyPokemons } = usePokemon();
  const [isMyPokemon, setIsMyPokemon] = useState(false);


  const res = myPokemons;
  const goPokeball = (dado) => {
    if (myPokemons?.length < 6) {
      if (!myPokemons.length) {
        const res = [dado];
        if (res) {
          setMyPokemons(res);
        }
      } else {
        res.push(dado);
        setMyPokemons(res);
      }
    }
    localStorage.setItem("pokemon", JSON.stringify(myPokemons));
    setOpenModal(false);
  };

  useEffect(() => {
    if (myPokemons.length !== 0) {
      localStorage.setItem("pokemon", JSON.stringify(myPokemons));
    }
  }, [myPokemons]);

  const idRef = useRef();
const randomNumber = () => {
    const newId = Math.floor(Math.random() * 807 + 1);
    if (newId !== idRef.current) {
        idRef.current = newId;
        setId(newId);
    }
  };

  useLayoutEffect(() => {
    randomNumber();
  }, [pokemon]);

  const url = `https://pokeapi.co/api/v2/pokemon`;

  const getPokemon = (id) => {
    if (id !== 0) {
      axios
        .get(`${url}/${id}`)
        .then((res) => {
          if(res?.data) setPokemon(res.data);
        })
        .catch((error) => {
          window.location.href = '/';
        });
      setOpenModal(true);
    } else {
      const pokemonCreating = myPokemons?.filter((item) => item?.id === 0);
      setPokemon(pokemonCreating[0]);
      setOpenModal(true);
    }
    setTimeout(() => {
      setLoading(false)
    }, 1500);
  };

  const removePokemon = (removed) => {
    if (removed.id === 0) {
      let index = myPokemons.indexOf(removed);
      if (index > -1) {
        const newMyPokemons = myPokemons;
        const removedInMyPokemons = newMyPokemons.splice(index, 1);
        setMyPokemons(newMyPokemons);
        setOpenModal(false);
      }
    } else {
      const newCaptured = myPokemons.filter((item) => item.id !== removed.id);
      return setMyPokemons(newCaptured), setOpenModal(false);
    }
    localStorage.setItem("pokemon", JSON.stringify(myPokemons));
  };

  var timer=
  useEffect(() => {
    if (loading) {
      if (AshPosition === ashLeftLeg) {
        timer = setTimeout(() => {
          setAshPosition(ashStop);
        }, 500);
      }
      if (AshPosition === ashStop) {
        timer = setTimeout(() => {
          setAshPosition(ashRightLeg);
        }, 500);
      }
      if (AshPosition === ashRightLeg) {
        timer = setTimeout(() => {
          setAshPosition(ashLeftLeg);
        }, 500);
      }
  
      return () => {
        clearTimeout(timer);
      };
    }
   
  }, [AshPosition]);

  useEffect(()=>{
    if (AshPosition === ashLeftLeg) {
      setTimeout(() => {
        setAshPosition(ashStop);
      }, 2000);
    }
},[])

  const AshWalk = () => {
    setLoading(true)
    setIsMyPokemon(false);
    setAshPosition(ashLeftLeg);
    setTimeout(() => {
      if (id) {
        getPokemon(id !== idRef && id);
      }
    }, 3000);
  };

  useEffect(()=>{
    if (openModal) {
      setTimeout(() => {
        setAshPosition(ashFront)
      }, 3000);
    }
  },[openModal])

  return (
    <S.MapWrapper className="map">
      <Sidebar
        getPokemon={getPokemon}
        setIsMyPokemon={setIsMyPokemon}
        setOpenCreationModal={setOpenCreationModal}
      />
      <S.TooltipCard>
        <S.AshBox onClick={() => {AshPosition === ashFront && myPokemons.length < 6 && AshWalk()}}>
          <S.Ash src={AshPosition} />
        </S.AshBox>
        {loading? <S.IconTooltip src={searchingTooltip} />:
        <S.TooltipBox>
          <S.IconTooltip src={myPokemons.length < 6 ? searchTooltip : tooltipError} />
        </S.TooltipBox>}
      </S.TooltipCard>
      {openModal && (
        <Modal
          pokemon={pokemon}
          setOpenModal={setOpenModal}
          goPokeball={goPokeball}
          isMyPokemon={isMyPokemon}
          removePokemon={removePokemon}
        />
      )}
      {openCreationModal && (
        <CreationModal setOpenCreationModal={setOpenCreationModal} />
      )}
    </S.MapWrapper>
  );
}
