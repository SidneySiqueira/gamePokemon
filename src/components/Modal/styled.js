import styled from "styled-components";

export const Modal = styled.div`
  width: 400px;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 10%;
  /* left: 33%; */
  padding-top: 3%;
  background: linear-gradient(to right, #42e87a, #38f9d6);
  max-height: 80%;
  border-radius: 10px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0;
  }
  &::-webkit-scrollbar-track {
    background-color: none;
  }
  &::-webkit-scrollbar-thumb {
    background-color: none;
    border-radius: 20px;
  }
  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
    min-height: 100%;
    top: 0;
    left: 0;
  }
`;

export const Close = styled.div`
  position: absolute;
  width: 30px;
  padding: 10px 20px;
  background-color:#f7f9fc;
  border: 2px solid #8f9bb3;
  border-radius: 100%;
  z-index: 1;
  top: -150px;
  right: 20px;
  display: flex;
  justify-content: center;
  cursor: pointer;
  @media (max-width: 768px) {
    top: -120px;
  }
`;

export const X = styled.img``;

export const ImagePokemonBox = styled.div`
  width: 250px;
  height: 250px;
  margin: -125px auto 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border: 5px solid #00d68f;
  border-radius: 100%;
`;

export const ImagePokemon = styled.img`
  width: 200px;
`;

export const Form = styled.div`
  width: 100%;
  /* height: 70%; */
  background-color: white;
  margin: 30% 0 0;
  padding: 0 0 30%;
  /* top: 30%; */
  bottom: 0;
  position: relative; 
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  display: block;
  align-items: center;
  justify-content: center;
`;

export const Name = styled.p`
  margin: 30px 10px 0;
  font-size: 22px;
  font-family: sans-serif;
  text-align: center;
  text-transform: uppercase;
`;

export const FeaturesBox = styled.div`
  margin: 60px 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  text-align: center;
`;
export const Features = styled.div`
  width: 33%;
  font-family: sans-serif;
  font-size: 14px;
  text-align: center;
  text-transform: uppercase;
`;
export const FeaturesHeight = styled.div`
  width: 33%;
  font-family: sans-serif;
  font-size: 14px;
  text-align: center;
  text-transform: uppercase;
  border-left: 1px solid #c5cee0;
  border-right: 1px solid #c5cee0;
`;

export const Topics = styled.h1`
  font-family: sans-serif;
  margin: 30px 10px;
  text-align: center;
  text-transform: uppercase;
`;
export const PokemonsTypes = styled.div`
  margin: 30px 10px;
  display: flex;
  justify-content: center;
`;

export const BadgeTypes = styled.p`
  font-family: sans-serif;
  font-size: 16px;
  text-align: center;
  padding: 0 20px;
  margin: 20px 5px;
  border-radius: 20px;
  color: white;
  text-transform: uppercase;
`;

export const Habilities = styled.div`
  margin: 30px 10px;
  display: flex;
  justify-content: center;
`;

export const Techniques = styled.p`
  font-family: sans-serif;
  font-size: 16px;
  text-align: center;
  margin: 20px 0;
  text-transform: capitalize;
`;

export const BoxPokeball = styled.div`
  position: fixed;
  width: 400px;
  bottom: 70px;
  display: flex;
  justify-content: center;
  @media (max-width: 768px) {
    width: 100%;
    left: 0;
  }
;
`;

export const Pokeball = styled.img`
  width: 180px;
  cursor: pointer;
`;

export const Statistics = styled.ul`
  margin: 30px 30px;
`;

export const Levels = styled.li`
  margin: 10px;
  display: flex;
  justify-content: space-between;
  margin: 15px;
`;

export const LevelsP = styled.p`
  font-family: sans-serif;
  font-size: 16px;
  text-transform: capitalize;
`;