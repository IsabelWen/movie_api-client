import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";

export const MovieView = ({ movies, setUser}) => {

    const { movieId } = useParams();
    const movie = movies.find((movie) => movie._id === movieId);

    // Similar Movies?
    const selectedMovie = movies.find((movie) => movie._id === movieId);
    const similarMovies = movies.filter((movie) => {
        return movie._id !== movieId && movie.Genre.Name === selectedMovie.Genre.Name;
    });

    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    // Debug
    console.log(similarMovies);

    // Favorite Movie?
    const [isFavorite, setIsFavorite] = useState(
        false
    );

    useEffect(() => {
        if (user?.FavoriteMovies && user.FavoriteMovies?.includes(movie._id)) {
            setIsFavorite(true);
        }
    }, [user]);

    // Add Favorite Movie
    const addFav = () => {

        fetch(`https://my-movies-api-23e4e5dc7a5e.herokuapp.com/users/${user.Username}/movies/${movie._id}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                alert("Failed to add")
            }
        }).then((user) => {
            if (user) {
                alert("Added successfully");
                localStorage.setItem('user', JSON.stringify(user));
                setUser(user);
                setIsFavorite(true);
            }
        }).catch(error => {
            console.error('Error: ', error);
        });
    };

        // Remove Favorite Movie
        const removeFav = () => {

            fetch(`https://my-movies-api-23e4e5dc7a5e.herokuapp.com/users/${user.Username}/movies/${movie._id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    alert("Failed to remove")
                }
            }).then((user) => {
                if (user) {
                    alert("Removed successfully from favorite Movies");
                    localStorage.setItem('user', JSON.stringify(user));
                    setUser(user);
                    setIsFavorite(false);
                }
            }).catch(error => {
                console.error('Error: ', error);
            });
        };

    return (
        <>
            <Row className="my-5 justify-content-md-center">
                <Col md={7} className="col-12">
                    <img src={movie.ImagePath} alt="movie cover" className="mx-auto w-100" />
                </Col>
                <Col md={5} className="col-12">
                    <div className="my-1">
                        <span className="h1">{movie.Title}</span>
                    </div>
                    <div className="my-1">
                        <span className="h6">Description: </span>
                        <span>{movie.Description}</span>
                    </div>
                    <div className="my-1">
                        <span className="h6">Director: </span>
                        <span>{movie.Director.Name}</span>
                    </div>
                    <div className="my-1">
                        <span className="h6">Genre: </span>
                        <span>{movie.Genre.Name}</span>
                    </div>
                    <div className="my-1">
                        <span className="h6">Year: </span>
                        <span>{movie.Year}</span>
                    </div>
                    <div>
                        {isFavorite ? (
                            <Button className="my-2 me-2"on onClick={removeFav}>Remove from Favorite</Button>
                        ) : (
                            <Button className="my-2 me-2" onClick={addFav}>Add to Favorite</Button>
                        )}
                    </div>
                    <Link to={`/`}>
                        <Button className="my-2">Back</Button>
                    </Link>
                </Col>
            </Row>
            <h2>Similar Movies</h2>
            <Row className="justify-content-center">
                {
                similarMovies.length !== 0 ?
                similarMovies.slice(0,5).map((movie) => (
                    <Col sm={5} lg={4} xl={3} className="mx-2 my-3 col-6 similar-movies-img" key={movie._id}>
                        <MovieCard
                            movie={movie}
                        />
                    </Col>
                ))
                : <Col>
                <p>There are no similar Movies</p>
                </Col>
                }
            </Row>
        </>
    );
};
    /*
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
                <Row className="justify-content-right justify-content-md-center">
                    {similarMovies.slice(0,5).map((movie) => (
                        <Col sm={6} md={4} lg={3} xl={2} className="mx-2 my-3 col-7 similar-movies-img" key={movie._id}>
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
    );*/