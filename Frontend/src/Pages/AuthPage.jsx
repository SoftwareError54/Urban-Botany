import { useState, useEffect } from "react";

const primary = '#568c71';
const secondary = '#F2ea9e';
const terciary = '#67b296';
const headerText = '#ffffff';
import { login, signup} from "../services/api";
import {useNavigate} from "react-router-dom";

function getUserIdFromToken(token){
    try{
        const payload = token.split('.')[1];
        const decoded = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
        return decoded.userId || decoded.user_id || decoded.id || null;
    } catch(e){
        console.error('Failed to decode token', e);
        return null;
    }
}

function Signup({setAction}){
    const navigate = useNavigate();
    async function handleSubmit(e){
        e.preventDefault();
        const form = e.target;

        const email = form.email.value;
        const username = form.username.value;
        const password = form.password.value;
        const firstName = form.FirstName.value;
        const lastName = form.LastName.value;
        const DoB = form.DoB.value;
        const phoneNumber = form.phoneNumber.value;
        const addressLine1 = form.addressLine1.value;
        const addressLine2 = form.addressLine2.value;
        const city = form.city.value;
        const region = form.region.value;
        const postalCode = form.postalCode.value;
        const country = form.country.value;

        try{
            const payload = {
                username,
                password,
                email,
                DoB,
                firstName,
                lastName,
                phoneNumber,
                addressLine1,
                addressLine2,
                city,
                region,
                postalCode,
                country
            };
            const res = await signup(payload);
            if(res && res.token){
                localStorage.setItem('token', res.token);
                const uid = getUserIdFromToken(res.token);
                if(uid) localStorage.setItem('userId', uid);
            }
            setAction('loggedIn');
            navigate('/rooms');
        } catch(err){
            console.error(err);
            alert(err.message || 'Signup failed');
        }
    }
    return(
        <div style={{display:'flex',flexDirection:'column',alignItems:'center',width:'100%'}}>
        {/* <header style={{width:'100%',background:secondary, padding:12,borderRadius:8,color:headerText,textAlign:'center',marginBottom:12}}>
          
        </header> */}
        <form onSubmit={handleSubmit} style={{background:secondary,padding:20,borderRadius:8,maxWidth:720,width:'100%', paddingRight:40, boxSizing:'border-box'}}>
            <h2 style={{margin:0, color: primary}}>Welcome to Urban Botany</h2>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required style={{width:'100%',padding:'8px 10px',margin:'6px 0 12px',borderRadius:6,border:'1px solid #ccc'}} />
            <br />
            <label htmlFor="DoB">Date of Birth:</label>
            <input type="date" id="DoB" name="DoB" required style={{width:'100%',padding:'8px 10px',margin:'6px 0 12px',borderRadius:6,border:'1px solid #ccc'}} />
            <br />
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" required style={{width:'100%',padding:'8px 10px',margin:'6px 0 12px',borderRadius:6,border:'1px solid #ccc'}} />
            <br />
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required style={{width:'100%',padding:'8px 10px',margin:'6px 0 12px',borderRadius:6,border:'1px solid #ccc'}} />
            <br />
            <label htmlFor ="FirstName">First Name:</label>
            <input type="text" id="FirstName" name="FirstName" required style={{width:'100%',padding:'8px 10px',margin:'6px 0 12px',borderRadius:6,border:'1px solid #ccc'}} />
            <br />
            <label htmlFor="LastName">Last Name:</label>
            <input type="text" id="LastName" name="LastName" required style={{width:'100%',padding:'8px 10px',margin:'6px 0 12px',borderRadius:6,border:'1px solid #ccc'}} />
            <br />
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input type="tel" id="phoneNumber" name="phoneNumber" required style={{width:'100%',padding:'8px 10px',margin:'6px 0 12px',borderRadius:6,border:'1px solid #ccc'}} />
            <br />
            <label htmlFor="addressLine1">Address Line 1:</label>
            <input type="text" id="addressLine1" name="addressLine1" required style={{width:'100%',padding:'8px 10px',margin:'6px 0 12px',borderRadius:6,border:'1px solid #ccc'}} />
            <br />
            <label htmlFor="addressLine2">Address Line 2:</label>
            <input type="text" id="addressLine2" name="addressLine2" style={{width:'100%',padding:'8px 10px',margin:'6px 0 12px',borderRadius:6,border:'1px solid #ccc'}} />
            <br />
            <label htmlFor="city">City:</label>
            <input type="text" id="city" name="city" required style={{width:'100%',padding:'8px 10px',margin:'6px 0 12px',borderRadius:6,border:'1px solid #ccc'}} />
            <br />
            <label htmlFor="state">Region:</label>
            <input type="text" id="region" name="region" required style={{width:'100%',padding:'8px 10px',margin:'6px 0 12px',borderRadius:6,border:'1px solid #ccc'}} />
            <br />
            <label htmlFor="postalCode">Postal Code:</label>
            <input type="text" id="postalCode" name="postalCode" required style={{width:'100%',padding:'8px 10px',margin:'6px 0 12px',borderRadius:6,border:'1px solid #ccc'}} />
            <br />
            <label htmlFor="country">Country:</label>
            <input type="text" id="country" name="country" required style={{width:'100%',padding:'8px 10px',margin:'6px 0 12px',borderRadius:6,border:'1px solid #ccc'}} />
            <br />
            
            <button type="submit" style={{background:primary,color:headerText,border:'none',padding:'10px 14px',borderRadius:8,cursor:'pointer'}}>Sign Up</button>
        
        </form>
        </div>

    )
}

function Login({ setAction }){
    const navigate = useNavigate();
    async function handleSubmit(e){
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        try{
            const res = await login(email, password);
            if(res && res.token){
                localStorage.setItem('token', res.token);
                const uid = getUserIdFromToken(res.token);
                if(uid) localStorage.setItem('userId', uid);
            }
            setAction('loggedIn');
            navigate('/rooms');
        } catch(err){
            console.error(err);
            alert(err.message || 'Login failed');
        }
    }

    return(
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',width:'100%'}}>
        {/* <header style={{width:'100%',background:secondary,padding:12,borderRadius:8,color:headerText,textAlign:'center',marginBottom:12}}>
          
        </header> */}
        <form onSubmit={handleSubmit} style={{background:secondary,padding:20,borderRadius:8,maxWidth:420,width:'100%', paddingRight:40, boxSizing:'border-box'}}>
            <h2 style={{margin:0, color: primary}}>Welcome to Urban Botany</h2>
            <label htmlFor="username">Email:</label>
            <input type="text" id="email" name="email" required style={{width:'100%',padding:'8px 10px',margin:'6px 0 12px',borderRadius:6,border:'1px solid #ccc'}} />
            <br />
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required style={{width:'100%',padding:'8px 10px',margin:'6px 0 12px',borderRadius:6,border:'1px solid #ccc'}} />
            <br />
            <button type="submit" style={{background:primary,color:headerText,border:'none',padding:'10px 14px',borderRadius:8,cursor:'pointer'}}>Login</button>
        </form>
    </div>

    )
}

function AuthPage(){
    const [action, setAction] = useState("login");

    useEffect(() => {
        document.body.classList.add('landing-fullscreen');
        return () => document.body.classList.remove('landing-fullscreen');
    }, []);

        const outerPadding = action === 'login'
            ? { paddingTop: '40vh', paddingBottom: 20 }
            : { paddingTop: '6vh', paddingBottom: '6vh' };

        return(
                <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'flex-start',gap:12,padding:20, background: terciary, minHeight:'100vh', width:'100%', boxSizing:'border-box', overflowX:'hidden', ...outerPadding}}>
            {action === "login" ? (
                <Login setAction={setAction} />
            ) : (
                <Signup setAction={setAction} />
            )}
            {action !== "loggedIn" && (
                <button onClick={() => setAction(action === "login" ? "signup" : "login")} style={{background:'transparent',border:`2px solid ${primary}`,color: "black",padding:'8px 12px',borderRadius:8,cursor:'pointer'}}> 
                    {action === "login" ? "Don't have an account? Sign up" : "Already have an account? Login"}
                </button>
            )}
        </div>
    )
}

export default AuthPage;
