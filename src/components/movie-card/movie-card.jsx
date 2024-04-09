import PropTypes from "prop-types";
import "./movie-card.scss";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BookmarkHeart, BookmarkHeartFill } from "react-bootstrap-icons";

export const MovieCard = ({ movie, addFav, removeFav, isFavorite }) => {
    return (
        <Card className="h-100 mt-5 card-shadow">
            <div className="position-relative .d-inline-block">
                <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
                    <Card.Img variant="top card-img" src={movie.ImagePath} />
                </Link>
                <div>
                    {isFavorite ? (
                        <BookmarkHeartFill size={40} color="orange" className="fav-button mt-2 me-2 top-0 end-0" onClick={() => removeFav(movie._id)}/>
                    ) : (
                        <BookmarkHeart size={40} color="orange" className="fav-button mt-2 me-2 top-0 end-0" onClick={() => addFav(movie._id)}/>
                    )}
                </div>
            </div>
            <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
                <Card.Body>
                    <Card.Title>{movie.Title}</Card.Title>
                    <Card.Text>{movie.Director.Name}</Card.Text>
                </Card.Body>
            </Link>
        </Card>
    );
};

// define all the props constraints for the MovieCard
MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string,        
    }).isRequired
};