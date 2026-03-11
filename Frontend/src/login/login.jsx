import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login(){
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/login', {  // adjust URL to your backend
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userName, password })
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('userId', data.userId);
                navigate('/rooms');
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            setError('Error: ' + err.message);
        }
    };

    return(
        <>
        <h1>Login</h1>
        {error && <p style={{color: 'red'}}>{error}</p>}
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="userName">Enter a Username</label>
                <input type="text" id="userName" name="userName" placeholder="Username" value={userName} onChange={(e) => setUserName(e.target.value)}></input>
            </div>
            <div>
                <label htmlFor="password">Enter a Password</label>
                <input type="password" id="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
            </div>
            <div>
                <input type="submit" value="Submit"></input>
            </div>
        </form>
        <button type="button">Sign Up</button>
        </>
    );
}