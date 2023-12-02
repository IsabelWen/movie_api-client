import { useState } from "react";
import {useNavigate} from "react-router-dom";
import { Col, Row, Container } from "react-bootstrap";
import { Button, Card, Form } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import { PersonSquare } from "react-bootstrap-icons";

export const ProfileView = ({ user, movies, setUser, removeFav, addFav}) => {
    const [username, setUsername] = useState(user.Username);
    const [password, setPassword] = useState(user.Password);
    const [email, setEmail] = useState(user.Email);
    const [birthday, setBirthday] = useState(user.Birthday);

    // Navigate
    const navigate = useNavigate();

    // Return list of favorite Movies
    const favoriteMovieList = movies.filter(m => user.FavoriteMovies.includes(m._id));

    // Token
    const token = localStorage.getItem('token');

    // Update user info
    const handleUpdate = (event) => {
        // this prevents the default behavior of the form which is to reload the entire page
        event.preventDefault();

        const user = JSON.parse(localStorage.getItem('user'));

        const data ={
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        }

        fetch(`https://my-movies-api-23e4e5dc7a5e.herokuapp.com/users/${user.Username}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }).then(async (response) => {
            console.log(response)
            if (response.ok) {
                const updatedUser = await response.json();
                localStorage.setItem('user', JSON.stringify(updatedUser));
                setUser(updatedUser);
                alert("Update was successful");
            } else {
                alert("Update failed")
            }
        }).catch(error => {
            console.error('Error: ', error);
        });
    };


    // Delete User
    const handleDelete = () => {
        fetch(`https://my-movies-api-23e4e5dc7a5e.herokuapp.com/users/${user.Username}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            if (response.ok) {
                setUser(null);
                alert("User has been deleted")
                localStorage.clear();
                navigate('/'); // go back to home page
            } else {
                alert("Something went wrong.")
            }
        })
    }


    return (
        <Container className="my-5">
            <Row>
                <Col md={5}>
                    <Card>
                        <Card.Body>
                            <Card.Title>My Profile</Card.Title>
                            <PersonSquare variant="top" color="orange" className="my-4" size={180} />
                            <Card.Text>Username: {user.Username}</Card.Text>
                            <Card.Text>Email: {user.Email}</Card.Text>
                            <Card.Text>Birthday: {user.Birthday}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={7}>
                    <Form onSubmit={handleUpdate}>
                        <Form.Group controlId="formUsername">
                            <Form.Label>Username:</Form.Label>
                            <Form.Control
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            minLength="5"
                            />
                        </Form.Group>
                        <Form.Group controlId="formPassword">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                            value={null}
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBirthday">
                            <Form.Label>Birthday:</Form.Label>
                            <Form.Control
                            type="date"
                            value={birthday}
                            onChange={(e) => setBirthday(e.target.value)}
                            />
                        </Form.Group>
                        <Button type="submit" onClick={handleUpdate} className="mt-2 me-2">Update</Button>
                        <Button onClick={handleDelete} className="mt-2">Delete User</Button>
                    </Form>
                </Col>
            </Row>
            <Row>
                <h2 className="mt-5">Favorite Movies</h2>
                <Row className="justify-content-center">
                    {
                    favoriteMovieList?.length !== 0 ?
                    favoriteMovieList?.map((movie) => (
                        <Col sm={7} md={5} lg={3} xl={2} className="mx-2 mt-2 mb-5 col-6 similar-movies-img" key={movie._id}>
                            <MovieCard
                                movie={movie}
                                removeFav={removeFav}
                                addFav={addFav}
                                isFavorite={user.FavoriteMovies.includes(movie._id)}
                            />
                        </Col>
                    ))
                    : <Col>
                    <p>There are no favorites Movies</p>
                    </Col>
                    }
                </Row>
            </Row>
        </Container>
    );
};

