import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import { BookmarkHeart, BookmarkHeartFill } from "react-bootstrap-icons";

export const MovieView = ({ movies, removeFav, addFav}) => {

    const { movieId } = useParams();
    const movie = movies.find((movie) => movie._id === movieId);

    // Similar Movies
    const selectedMovie = movies.find((movie) => movie._id === movieId);
    const similarMovies = movies.filter((movie) => {
        return movie._id !== movieId && movie.Genre.Name === selectedMovie.Genre.Name;
    });

    // User
    const user = JSON.parse(localStorage.getItem('user'));
    //const FavoriteMovies = {user.FavoriteMovies}; //parsing error? how to get user in?

    // Debug
    //console.log(user);


    return (
        <>
            <Row className="my-5 justify-content-md-center">
                <Col md={5} className="col-12">
                    <img style={{maxWidth: '500px'}} src={movie.ImagePath} alt="movie cover" className="mx-auto w-100" />
                </Col>
                <Col md={7} className="col-12">
                    <div className="my-1">
                        <span className="h1">
                            {movie.Title}
                            {user.FavoriteMovies.includes(movie._id) ? (
                                <BookmarkHeartFill size={40} color="orange" style={{cursor: 'pointer'}} className="my-2 mx-2"on onClick={() => removeFav(movie._id)}/>
                            ) : (
                                <BookmarkHeart size={40} color="orange" style={{cursor: 'pointer'}}  className="my-2 mx-2" onClick={() => addFav(movie._id)}/>
                            )}
                        </span>
                        <br/><br/>
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
                    <Link to={`/`}>
                        <a className="my-2">Back</a>
                    </Link>
                </Col>
            </Row>
            <h2>Similar Movies</h2>
            <Row className="justify-content-center">
                {
                similarMovies.length !== 0 ?
                similarMovies.slice(0,5).map((movie) => (
                    <Col  sm={5} md={4} lg={3} xl={2} className="mx-2 my-3 col-6 similar-movies-img" key={movie._id}>
                        <MovieCard
                            movie={movie} 
                            removeFav={removeFav} 
                            addFav={addFav} 
                            isFavorite={user.FavoriteMovies.includes(movie._id)}
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
