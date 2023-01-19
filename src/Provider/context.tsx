import { createContext, useContext, useEffect, useState } from "react";
import { Data, PokemonType } from "../types/pokemon";

type MyContextProps = {
    myPokemons: Array<PokemonType | Data>;
    setMyPokemons: (myPokemons: Array<PokemonType | Data>) => void;
};
type MyProviderProps = {
    children: React.ReactNode;
};

const PokemonContext = createContext({} as MyContextProps);

const PokemonContextProvider = ({ children }: MyProviderProps) => {
    const [myPokemons, setMyPokemons] = useState<Array<PokemonType|Data>>([])

    useEffect(() => {
        if (typeof window !== "undefined") {
            const item = window.localStorage.getItem('pokemon');
            if (item !== null) {
                const response = JSON.parse(item);
                if (response) setMyPokemons(response)
            }
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