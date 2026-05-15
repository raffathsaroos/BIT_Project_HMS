import {useState}  from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {

                    const [email, setEmail] = useState('');
                    const [password, setPassword] = useState('');
					const [error, setError] = useState('');
					const navigate = useNavigate();
                    const handleSubmit = async (e) =>  { 
                                                    e.preventDefault();
                                                    setError('');

             
try {
	
	
	const response = await axios.post('http://localhost:5000/api/users/login', {
                email,
                password
            });
	


if (response.data.success) {
	console.log("Login Successful:", response.data.user);
	localStorage.setItem('userInfo', JSON.stringify(response.data.user));
	navigate('/home');
}}
catch (err){
	setError(err.response?.data?.message || "something went wrong !");
            console.error("Login Error:", err);
}
}
return (
        <form onSubmit={handleSubmit}>
            <div>
                <h2> Login page </h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                
                <p> username or email </p>
                <input 
                    type="text" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
                
                <p> password </p>
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                
                <br /> <br /> <br />
                <input type="submit" value="Login" />
				<button 
    onClick={() => navigate('/signup')} 
    style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        boxShadow: '0px 4px 6px rgba(0,0,0,0.2)',
        fontWeight: 'bold'
    }}
>
    Create New Account
</button>
            </div>
        </form>
		
    );
}

export default Login;

