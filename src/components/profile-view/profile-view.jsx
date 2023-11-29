import React, { useState } from "react";
import { Col, Row, Container } from "react-bootstrap";
import { Button, Card, Form } from "react-bootstrap";
import { FavoriteMovies } from "./favorite-movie";

export const ProfileView = ({ user, token, movies, setUser }) => {
    const [username, setUsername] = useState(user.Username);
    const [password, setPassword] = useState(user.Password);
    const [email, setEmail] = useState(user.Email);
    const [birthday, setBirthday] = useState(user.Birthday);

    // Return list of favorite Movies
    const favoriteMovieList = user.FavoriteMovies?.map( favoriteMovie => (
        movies.find(movie => (movie._id === favoriteMovie))
    ));


    // Update user info
    const handleUpdate = (event) => {
        event.preventDefault();

        const user = JSON.parse(localStorage.getItem('user'));
        const token = localStorage.getItem('token');

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
                window.location.reload();
                alert("Update was successful");
            } else {
                alert("Update failed")
            }
        }).catch(error => {
            console.error('Error: ', error);
        });
    };


        
  

    // Remove Favorite Movie
    const removeFav = (_id) => {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = localStorage.getItem('token');

        fetch(`https://my-movies-api-23e4e5dc7a5e.herokuapp.com/users/${user.Username}/movies/${_id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            console.log("response")
            if (response.ok) {
                const updatedUser = response.json();
                localStorage.setItem('user', JSON.stringify(updatedUser));
                setUser(updatedUser);
            } else {
                alert("Removal failed.")
            }
        }).catch(error => {
            console.error('Error: ', error);
        });
    }

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
                            <Card.Img variant="top" src="https://via.placeholder.com/250" className="w-50 rounded"/>
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
                            minLength="3"
                            placeholder={user.Username}
                            />
                        </Form.Group>
                        <Form.Group controlId="formPassword">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="*****"
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={user.Email}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBirthday">
                            <Form.Label>Birthday:</Form.Label>
                            <Form.Control
                            type="date"
                            value={birthday}
                            onChange={(e) => setBirthday(e.target.value)}
                            placeholder={user.Birthday}
                            />
                        </Form.Group>
                        <Button type="submit" onClick={handleUpdate} className="mt-2 me-2">Update</Button>
                        <Button onClick={handleDelete} className="mt-2">Delete User</Button>
                    </Form>
                </Col>
            </Row>
            <Row>
                <FavoriteMovies favoriteMovieList={favoriteMovieList} removeFav={removeFav}/>
            </Row>
        </Container>
    );
};

