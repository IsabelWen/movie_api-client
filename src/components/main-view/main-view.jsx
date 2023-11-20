import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([
        {
            id: 1,
            title: "Scream",
            description: "A year after the murder of her mother, a teenage girl is terrorized by a masked killer who targets her and her friends by using scary movies as part of a deadly game.",
            director: "Wes Craven",
            genre: "Horror",
            year: "1996",
            image: "https://m.media-amazon.com/images/I/5127F505WAL.jpg"
        },
        {
            id: 2,
            title: "Practical Magic",
            description: "Two witch sisters, raised by their eccentric aunts in a small town, face closed-minded prejudice and a curse which threatens to prevent them ever finding lasting love.",
            director: "Griffin Dunne",
            genre: "Fantasy",
            year: "1998",
            image: "https://m.media-amazon.com/images/I/416BJPBTHBL.jpg"
        },
        {
            id: 3,
            title: "Halloween",
            description: "Fifteen years after murdering his sister on Halloween night 1963, Michael Myers escapes from a mental hospital and returns to the small town of Haddonfield, Illinois to kill again.",
            director: "John Carpenter",
            genre: "Horror",
            year: "1978",
            image: "https://m.media-amazon.com/images/I/71Ao1Iee5bL._AC_UF894,1000_QL80_.jpg"
        }
    ]);

    const [selectedMovie, setselectedMovie] = useState(null);

    if (selectedMovie) {
        return (
            <MovieView movie={selectedMovie} onBackClick={() => setselectedMovie(null)} />
        );
    }

    if (movies.length === 0) {
        return <div>The list is empty!</div>;
    }

    return (
        <div>
            {movies.map((movie) => (
                    <MovieCard
                    key={movie._id}
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                        setselectedMovie(newSelectedMovie);
                    }}
                />
            ))}
        </div>
    );
};