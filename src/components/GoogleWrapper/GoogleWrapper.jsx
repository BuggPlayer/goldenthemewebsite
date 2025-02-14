import {useState} from "react";
import { useGoogleLogin } from "@react-oauth/google";

import {useNavigate} from 'react-router-dom';
    
import axios from 'axios';
import { base_URL } from "../../utils/apiList";




const GoolgeLogin = (props) => {
    const api = axios.create({
        baseURL: `${base_URL}`,
        // withCredentials: true,
    });
    
     const googleAuth = (code) => api.get(`${base_URL}/auth/google?code=${code}`);

	const [user, setUser] = useState(null);
	const navigate = useNavigate();
	const responseGoogle = async (authResult) => {
        console.log("code" , authResult)
        try {
            if (authResult?.code) { // Optional chaining to avoid null/undefined errors
                const result = await googleAuth(authResult.code);
                console.log("resuolr" , result)
                if (result?.data?.user) {
                    const { email, name, image , _id } = result.data.user;
                    const token = result.data.token;
    
                    const userObj = { _id,email, name, token, image };
                    localStorage.setItem('user-info', JSON.stringify(userObj));
    
                    navigate('/'); // Navigate after setting user info
                } else {
                    console.error("User information is missing from the response.");
                }
            } else {
                console.error("Invalid authResult:", authResult);
                throw new Error("Authentication failed or missing authorization code.");
            }
        } catch (e) {
            console.error("Error while Google Login:", e.message);
        }
    };
    

	const googleLogin = useGoogleLogin({
		onSuccess: responseGoogle,
		onError: responseGoogle,
		flow: "auth-code",
	});

	return (
      
        <div style={styles.container}>
        <h2 style={styles.heading}>Login</h2>
        <form style={styles.form}>
            <input
                type="text"
                placeholder="Username"
                style={styles.input}
                disabled // Disabled to indicate it's non-functional
            />
            <input
                type="password"
                placeholder="Password"
                style={styles.input}
                disabled // Disabled for the dummy form
            />
            <button type="submit" style={styles.button} disabled>
                Login
            </button>
        </form>
        <p style={styles.orText}>OR</p>
        <button onClick={googleLogin} style={styles.googleButton}>
            Sign in with Google
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
        cursor: 'not-allowed', // Indicating disabled fields
    },
    button: {
        padding: '10px',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: 'var(--highlight-color)',
        color: 'var(--text-color-secondary)',
        cursor: 'not-allowed', // Indicates button is non-functional
        marginTop: '10px',
    },
    orText: {
        margin: '20px 0',
        fontWeight: 'bold',
        color: 'var(--text-color)',
    },
    googleButton: {
        padding: '12px',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: '#db4437',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: '1rem',
        cursor: 'pointer',
        textAlign: 'center',
        width: '100%',
        maxWidth: '300px',
    },
};


export default GoolgeLogin;