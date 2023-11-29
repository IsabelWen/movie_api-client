import { MovieCard } from "../movie-card/movie-card";
import { Row, Col, Button } from "react-bootstrap";

export const FavoriteMovies = ({ favoriteMovieList, removeFav }) => {
    return (
        <>
            <h2>Favorite Movies</h2>
                <Row className="justify-content-center">
                    {
                    favoriteMovieList?.length !== 0 ?
                    favoriteMovieList?.map((movie) => (
                        <Col sm={7} md={5} lg={3} xl={2} className="mx-2 mt-2 mb-5 col-6 similar-movies-img" key={movie._id}>
                            <MovieCard
                                movie={movie}
                            />
                            <Button variant="primary" className="ms-2 my-2" onClick={() => removeFav(movie._id)}>Remove from list</Button>
                        </Col>
                    ))
                    : <Col>
                    <p>There are no favorites Movies</p>
                    </Col>
                    }
                </Row>
        </>
    );
}