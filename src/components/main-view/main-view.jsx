import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view.jsx";
import { SignupView } from "../signup-view/signup-view.jsx";
import "./main-view.scss";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser? storedUser: null);
    const [token, setToken] = useState(storedToken? storedToken: null);
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setselectedMovie] = useState(null);

    // Connect App to API with Hook
    useEffect(() => {
        if (!token) {
            return;
        }

        fetch("https://my-movies-api-23e4e5dc7a5e.herokuapp.com/movies", {
            headers: { Authorization: `Bearer ${token}`}
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                const moviesFromApi = data.map((movie) => {
                    return {
                        _id: movie._id,
                        Title: movie.Title,
                        ImagePath: movie.ImagePath,
                        Description: movie.Description,
                        Year: movie.Year,
                        Genre: {
                            Name: movie.Genre.Name
                        },
                        Director: {
                            Name: movie.Director.Name
                        }
                    };
                });
                setMovies(moviesFromApi);
            });
    }, [token]);

    //Require Login
    if (!user) {
        return (
            <Row className="justify-content-md-center mt-5">
                <Col md={5}>
                    <LoginView 
                        onLoggedIn={(user, token) => {
                            setUser(user);
                            setToken(token);
                        }}
                    />
                    or
                    <SignupView />
                </Col>
            </Row>
        );
    }

    // Show Movie Info (MovieView) with similar Movies 
    if (selectedMovie) {
        let similarMovies = movies.filter((movie) => 
        {
            return movie._id !== selectedMovie._id && movie.Genre.Name === selectedMovie.Genre.Name;
        });
        if(similarMovies.length === 0) {
            return (
                <Row className="justify-content-md-center">
                    <Col md={8}>
                        <MovieView movie={selectedMovie} onBackClick={() => setselectedMovie(null)} /><br />
                        <h2>Similar Movies</h2>
                        <p>There are no similar movies.</p>
                    </Col>
                </Row>
            );
        } else {
            return (
                <>
                <MovieView movie={selectedMovie} onBackClick={() => setselectedMovie(null)} /><br />
                <h2>Similar Movies</h2>
                <Row className="justify-content-md-start">
                    {similarMovies.map((movie) => (
                        <Col md={2} className="mx-2" key={movie._id}>
                        <MovieCard
                            movie={movie}
                            onMovieClick={(newSelectedMovie) => {
                                setselectedMovie(newSelectedMovie);
                            }}
                        />
                        </Col>
                    ))}
                </Row>
                </>  
            );
        }
    }

    // Return empty list and Logout Button
    if (movies.length === 0) {
        return (
            <Row className="justify-content-md-center">
                <Col>
                    <p>The list is empty!</p>
                    <Button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</Button>
                </Col>
            </Row>
        );
    }

    // Return MovieCards and Logout Button
    return (
        <Row className="justify-content-md-center">
            {movies.map((movie) => (
                <Col md={3} className="mb-5" key={movie._id}>
                    <MovieCard
                        movie={movie}
                        onMovieClick={(newSelectedMovie) => {
                            setselectedMovie(newSelectedMovie);
                        }}
                        style={img={height:"300px"}}
                    />
                </Col>
            ))}
            <Button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</Button>
        </Row>
    );
};