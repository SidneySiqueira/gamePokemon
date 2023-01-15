import React, { createContext, useContext, useEffect, useState } from "react";

const PokemonContext = createContext({});

const PokemonContextProvider = ({ children }) => {
    const [myPokemons, setMyPokemons] = useState([])

    useEffect(() => {
        if (typeof window !== "undefined") {
            const response = JSON.parse(window.localStorage.getItem('pokemon'))
            if(response) setMyPokemons(response)
          }
    }, [])

    return (
        <PokemonContext.Provider value={{ myPokemons, setMyPokemons }}>
            {children}
        </PokemonContext.Provider>
    );
};

export const usePokemon = () => {
    const context = useContext(PokemonContext);
    const { myPokemons, setMyPokemons } = context;
    return { myPokemons, setMyPokemons };
    
}
export default PokemonContextProvider;