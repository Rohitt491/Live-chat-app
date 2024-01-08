import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.svg';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { signuproute } from '../utils/APIroutes.js';
import 'react-toastify/dist/ReactToastify.css'
export default function Signup() {
    const Navigate = useNavigate();
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        conpass: ''
    });

    useEffect(() => {
        if(localStorage.getItem('user')){
          Navigate('/')
        }
      }, [])

    const toastoptions = {
        position: 'bottom-right',
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark'

    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (handleValidation()) {
            const { username, password, email } = values;
            const { data } = await axios.post(signuproute, {
                username, email, password
            });
            if (data.status === false) {
                toast.error(data.msg, toastoptions)
            }
            if (data.status === true) {
                localStorage.setItem('user', JSON.stringify(data.user));
                Navigate('/');
            }
        }
    }

    const handleValidation = () => {
        const { username, password, conpass, email } = values;
        if (password !== conpass) {
            toast.error('Password and Confirm Password should be same', toastoptions);
            return false;
        } else if (username === '' || email === '') {
            toast.error('Please fill the form Completely', toastoptions);
            return false;
        } else if (email === '') {
            toast.error('Email is missing', toastoptions);
            return false;
        } else if (username.length < 3) {
            toast.error('Name should be more than 3 characters', toastoptions);
            return false;
        } else if (password.length < 6) {
            toast.error('Password should be more than 5 characters', toastoptions);
            return false;
        } else {
            return true;
        }
    }

    const setChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }
    return (
        <>
            <FormContainer>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="brand">
                        <img src={logo} alt="logo" />
                        <h1>Chit Chat</h1>
                    </div>
                    <input type="text" placeholder='Name' name='username'
                        onChange={(e) => { setChange(e) }} />
                    <input type="email" placeholder='Email' name='email'
                        onChange={(e) => { setChange(e) }} />
                    <input type="password" placeholder='Password' name='password'
                        onChange={(e) => { setChange(e) }} />
                    <input type="password" placeholder='Confirm Password' name='conpass'
                        onChange={(e) => { setChange(e) }} />
                    <button type='submit'>Create an User</button>
                    <span>Already an User? <Link to='/login'>Login</Link></span>
                </form>
            </FormContainer>
            <ToastContainer />
        </>
    )
}

const FormContainer = styled.div`
height: 100vh;
width:100vw;
display:flex;
flex-direction:column;
justify-content:center;
gap:1rem;
align-items:center;
background-color:#131324;
.brand{
    display:flex;
    align-items:center;
    gap:1rem;
    justify-content:center;
    img{
        height:5rem;
    }
    h1{
        color:white;
        text-transform:uppercase;
    }
}
form{
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    gap:2rem;
    background-color:#00000076;
    border-radius:2rem;
    padding:3rem 5rem;
    input{
        background-color:transparent;
        padding:1rem;
        border:0.1rem solid #4e0eff;
        color:white;
        width:100%;
        font-size:1rem;
        border-radius:0.4rem;
        &:focus{
            border:0.1rem solid #997af0;
            outline:none;
        }
    }
    button{
        background-color:#997af0;
        color:white;
        padding:1rem 5rem;
        border:none;
        font-weight:bold;
        cursor:pointer;
        border-radius:0.4rem;
        font-size:1rem;
        text-transform:uppercase;
        &:hover{
            background-color:#4e0eff;
        }
    }
    span{
        color:white;
        text-transform:uppercase;
        a{
            color:#4e0eff;
            text-decoration:none;
            font-weight:bold;
        }
    }
}
`;
