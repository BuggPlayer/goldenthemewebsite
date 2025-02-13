import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GoogleOAuthProvider, useGoogleOneTapLogin } from '@react-oauth/google';



const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    const googleLogin=useGoogleOneTapLogin({
        onSuccess: credentialResponse => {
          console.log(credentialResponse);
        },
        onError: () => {
          console.log('Login Failed');
        },
      });
      


    const handleLogin = async (e) => {
        e.preventDefault();
        // Send login request to the backend
        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            if (response.ok) {
                navigate('/'); // Redirect to home page after successful login
            } else {
                alert('Invalid credentials');
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Login</h2>
            <form onSubmit={handleLogin} style={styles.form}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    style={styles.input}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={styles.input}
                />
                <button type="submit" style={styles.button}>
                    Login
                </button>
            </form>
            <p style={styles.text}>Don't have an account? <Link to="/signup" style={styles.link}>Sign Up</Link></p>
            <p style={styles.text}>or</p>
           
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: 'var(--primary-bg)',
        color: 'var(--text-color)',
    },
    heading: {
        fontSize: '2rem',
        marginBottom: '20px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        width: '300px',
    },
    input: {
        margin: '10px 0',
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid var(--border-color)',
        backgroundColor: 'var(--secondary-bg)',
        color: 'var(--text-color)',
    },
    button: {
        padding: '10px',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: 'var(--highlight-color)',
        color: 'var(--text-color-secondary)',
        cursor: 'pointer',
        marginTop: '10px',
    },
    text: {
        margin: '10px 0',
        color: 'var(--text-color)',
    },
    link: {
        color: 'var(--highlight-color)',
        textDecoration: 'none',
    },
    googleButton: {
        padding: '10px',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: '#db4437',
        color: 'var(--text-color-secondary)',
        textDecoration: 'none',
        textAlign: 'center',
        cursor: 'pointer',
    },
};

export default Login;