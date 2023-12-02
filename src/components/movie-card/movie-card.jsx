import PropTypes from "prop-types";
import "./movie-card.scss";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BookmarkHeart, BookmarkHeartFill } from "react-bootstrap-icons";

export const MovieCard = ({ movie, addFav, removeFav, isFavorite }) => {
    return (
        <Card className="h-100 mt-5 card-shadow">
            <Card.Img variant="top card-img" src={movie.ImagePath} />
            <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text>{movie.Director.Name}</Card.Text>
                <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
                    <Button variant="link">
                        Open
                    </Button>
                </Link>
                <div>
                    {isFavorite ? (
                        <BookmarkHeartFill size={35} color="orange" className="fav-button my-2" onClick={() => removeFav(movie._id)}/>
                    ) : (
                        <BookmarkHeart size={35} color="orange" className="fav-button my-2" onClick={() => addFav(movie._id)}/>
                    )}
                </div>
            </Card.Body>
        </Card>
    );
};

// define all the props constraints for the MovieCard
MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string,        
    }).isRequired
};