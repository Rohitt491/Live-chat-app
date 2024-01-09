import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { contactsroute } from '../utils/APIroutes.js';
export default function Contacts() {
    const [ Details, Setdetails] = useState([])
    const details = async() => {
        const api = await axios.get(`${contactsroute}`)
        const data = api.data;
        Setdetails(data);
    }
    useEffect(() => {
        details()
    }, [])

    return (
        <div>
             {Details.length > 0 ? (
            Details.map((e, index) => (
                <div key={index} style={{ color: 'white' }}>
                    {e.username}
                    {e.email}
                    <img src={`data:image/svg+xml;base64,${e.avatarimage}`} alt="img" />
                </div>
            ))
        ) : (
            <div>Loading...</div>
        )}
        </div>
    )
}

