// import Login from "../layouts/Login";

import { useState } from "react";
import { login, signup} from "../services/api";
import Rooms from "./Rooms";
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
            console.log(payload);
            const res = await signup(payload);
            console.log('signup success', res);
            if(res && res.token){
                localStorage.setItem('token', res.token);
                const uid = getUserIdFromToken(res.token);
                if(uid) localStorage.setItem('userId', uid);
            }
            // navigate or update app state as needed
            setAction('loggedIn');
            navigate('/rooms');
        } catch(err){
            console.error(err);
            alert(err.message || 'Signup failed');
        }
    }
    return(
        
        <>
        <h1>Welcome to Urban Botany</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
            <br />
            <label htmlFor="DoB">Date of Birth:</label>
            <input type="date" id="DoB" name="DoB" required />
            <br />
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" required />
            <br />
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required />
            <br />
            <label htmlFor ="FirstName">First Name:</label>
            <input type="text" id="FirstName" name="FirstName" required />
            <br />
            <label htmlFor="LastName">Last Name:</label>
            <input type="text" id="LastName" name="LastName" required />
            <br />
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input type="tel" id="phoneNumber" name="phoneNumber" required />
            <br />
            <label htmlFor="addressLine1">Address Line 1:</label>
            <input type="text" id="addressLine1" name="addressLine1" required />
            <br />
            <label htmlFor="addressLine2">Address Line 2:</label>
            <input type="text" id="addressLine2" name="addressLine2" />
            <br />
            <label htmlFor="city">City:</label>
            <input type="text" id="city" name="city" required />
            <br />
            <label htmlFor="state">Region:</label>
            <input type="text" id="region" name="region" required />
            <br />
            <label htmlFor="postalCode">Postal Code:</label>
            <input type="text" id="postalCode" name="postalCode" required />
            <br />
            <label htmlFor="country">Country:</label>
            <input type="text" id="country" name="country" required />
            <br />
            
            <button type="submit">Sign Up</button>
            
        </form>
    </>

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
            console.log('login success', res);
            if(res && res.token){
                localStorage.setItem('token', res.token);
                const uid = getUserIdFromToken(res.token);
                if(uid) localStorage.setItem('userId', uid);
                console.log('stored userId', localStorage.getItem('userId'));
            }
            // navigate or update app state as needed
            setAction('loggedIn');
            navigate('/rooms');
        } catch(err){
            console.error(err);
            alert(err.message || 'Login failed');
        }
    }

    return(
    <>
        <h1>Welcome to Urban Botany</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Email:</label>
            <input type="text" id="email" name="email" required />
            <br />
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required />
            <br />
            <button type="submit">Login</button>
        </form>
    </>

    )
}

function LandingPage(){
    const [action, setAction] = useState("login");

    return(
        <>
            {action === "login" ? (
                <Login setAction={setAction} />
            ) : (
                <Signup setAction={setAction} />
            )}
            {action !== "loggedIn" && (
                <button onClick={() => setAction(action === "login" ? "signup" : "login")}>
                    {action === "login" ? "Don't have an account? Sign up" : "Already have an account? Login"}
                </button>
            )}
        </>

    )
}

export default LandingPage;