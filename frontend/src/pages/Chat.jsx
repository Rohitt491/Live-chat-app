import React from 'react'
import styled from 'styled-components';
import Contacts from './Contacts.jsx'
export default function Chat() {
  return (
    <Container>
      <div className='container'>
        <Contacts/>
        </div>
    </Container>
  )
}
const Container = styled.div`
height:100vh;
width:100vw;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
gap:1rem;
background-color:#131424;
  .container{
    height:85vh;
    width:85vw;
    background-color:#00000076;
    display:grid;
    grid-template-columns:25% 75%;
    @media screen and (min-width:720px) and max-width:1200px){
      grid-template-columns:35% 65%;
    }
    @media (max-width:768px){
      grid-template-columns:40% 60%;
    }
    color:white
  }
`