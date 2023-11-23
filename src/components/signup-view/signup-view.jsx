import { useState } from "react";

export const SignupView = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");

    const handleSubmit = (event) => {
        // this prevents the default behavior of the form which is to reload the entire page
        event.preventDefault();

        const data = {
            access: username,
            secret: password,
            email: email,
            birthday: birthday
        };

        fetch("https://my-movies-api-23e4e5dc7a5e.herokuapp.com/users", {
            method: "POST",
            body: JSON.stringify(data),
            header: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            if (response.ok) {
                alert("Signup successful");
                window.location.reload();
            } else {
                alert("Signup failed");
            }
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                minLength="3"
                />
            </label>
            <label>
                Password:
                <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
            </label>
            <label>
                Email:
                <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
            </label>
            <label>
                Birthday:
                <input
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                required
                />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
};