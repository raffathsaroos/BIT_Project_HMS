import {useState}  from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {

                    const [email, setEmail] = useState('');
                    const [password, setPassword] = useState('');
					const navigate = useNavigate();
                    const handleSubmit = (e) =>  { 
                                                    e.preventDefault();
                                                    console.log({ email, password });
													navigate('/home');
}
             


return (
             <form onSubmit={handleSubmit}>
             <div> 
             <h2> Login page </h2>
              <p>  username or email </p>
              <input type="text" value={email}  onChange={(e) => setEmail(e.target.value)}  />
              <p> password </p>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
               <br /> <br /> <br />
               <input type="submit"/>

               </div>
               </form>
);
}

export default Login;

