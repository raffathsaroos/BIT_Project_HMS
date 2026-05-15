import {useState}  from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function Signup() {
    const [email, setEmail] = useState('');
                    const [password, setPassword] = useState('');
					const [error, setError] = useState('');
					const navigate = useNavigate();
                    const handleSubmit = async (e) =>  { 
                                                    e.preventDefault();
                                                    setError('');

             
try {
	
	
	const response = await axios.post('http://localhost:5000/api/users/signup', {
                email,
                password
				
            });
	


if (response.data.success) {
	alert("Data saved successfully!");
	console.log("Signup Successful:", response.data.user);
	localStorage.setItem('userInfo', JSON.stringify(response.data.user));
	
}}
catch (err){
	setError(err.response?.data?.message || "something went wrong !");
            console.error("Signup Error:", err);
}
}

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <h2> Signup page </h2>
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
                <input type="submit" value="submit" />
				<button 
    onClick={() => navigate('/login')} 
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
    Login
</button>
            </div>
        </form>
    );
}


export default Signup;