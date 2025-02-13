import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        // Send signup request to the backend
        try {
            const response = await fetch('/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });
            if (response.ok) {
                navigate('/login'); // Redirect to login page after successful signup
            } else {
                alert('Signup failed');
            }
        } catch (error) {
            console.error('Signup error:', error);
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Sign Up</h2>
            <form onSubmit={handleSignup} style={styles.form}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    style={styles.input}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    Sign Up
                </button>
            </form>
            <p style={styles.text}>Already have an account? <Link to="/login" style={styles.link}>Login</Link></p>
            <p style={styles.text}>or</p>
            <button
                onClick={() => window.location.href = 'https://www.nozeperfumes.com/auth/google'}
                style={styles.googleButton}
            >
                Sign up with Gmail
            </button>
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

export default Signup;