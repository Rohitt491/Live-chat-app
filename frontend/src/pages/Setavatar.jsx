import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import loader from '../assets/loader.gif';
import { Buffer } from 'buffer'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { setavatarroute } from '../utils/APIroutes.js';
import 'react-toastify/dist/ReactToastify.css'

export default function Setavatar() {
    const api = 'https://api.multiavatar.com/456879945'
    const url = "https://api.multiavatar.com/avatar"
    const api_key = "mJoOUBzW8fjc19"

    const headers = {
        "Authorization": `${api_key}`,
        // "Content-Type": "application/json",
    }
    const navigate = useNavigate();
    const [avatars, setAvatars] = useState([]);
    const [isLoading, setLoading] = useState(true)
    const [Selectedavatar, setSelectedavatar] = useState(undefined)
    const toastoptions = {
        position: 'bottom-right',
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark'

    }
    useEffect(() =>{
        if(!localStorage.getItem('user')){
            navigate('/login')
        }
    },[])
    const Setprofilepic = async () => {
        if (Selectedavatar === undefined){
            toast.error('Please Select Avatar', toastoptions)
        }else{
          try {
              const user = await JSON.parse(localStorage.getItem('user'))
              const {data} = await axios.post(`${setavatarroute}/${user._id}`,
              {
                 image: avatars[Selectedavatar]
              });
              console.log(data.image)
              if(data.isSet){
                  user.isAvatarimageset = true;
                  user.avatarimage = data.image;
                  localStorage.setItem('user', JSON.stringify(user));
                  navigate('/')
              }else{
                  toast.error('Error setting Avatar', toastoptions)
              }
          } catch (error) {
            console.log(error)
          }
        }
    }
    useEffect(() => {
        const loadData = async () => {
            const data = [];
            // set loop to generate random number to put i the end of api so everytime new avatars should show
            for (let i = 0; i < 3; i++) {
                const image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}? ${api_key}`
                );
                if (image.data) {
                    const buffer = new Buffer(image.data)
                    data.push(buffer.toString('base64'));
                }
            }
            setAvatars(data);
            setLoading(false);
        };
        loadData()

    }, [])

    return (
        <>
        {
            isLoading ? <Container>
                <img src={loader} alt="loader" />
            </Container>:
            <Container>
            <div className="title-cont">
                <h1>Pick an avatar as your profile picture</h1>
            </div>
            <div className="avatars">
                {
                    avatars.map((e, index) => {
                        return (
                            <div key={index} className={`avatar ${Selectedavatar === index ? 'selected' : ''}`}>
                                <img src={`data:image/svg+xml;base64,${e}`} alt="avatar"
                                    onClick={() => setSelectedavatar(index)} />
                            </div>
                        )
                    })
                }
            </div>
            <button onClick={Setprofilepic}>Set as Profle Picture</button>
        </Container> 
        }
            <ToastContainer />
        </>
    )
}
const Container = styled.div`
display:flex;
align-items:center;
justify-content:center;
flex-direction:column;
gap:2rem;
background-color:#131424;
height:100vh;
.loader{
    max-inline-size:100%;
}

.title-cont{
    color:white;
}
.avatars{
    display:flex;
    gap:2rem;

    .avatar{
        display:flex;
        justify-content:center;
        align-items:center;
        transition:0.3s ease-in-out;
        padding:0.4rem;
        border-radius:5rem;
        border:0.4rem solid transparent;
    }
    
    img{
    height: 6rem;
    }

    .selected{
        border:0.4rem solid #4e0eff;
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
`
    ;