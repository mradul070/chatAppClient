import React, {useContext, useState, useEffect} from 'react'
import {UserContext} from '../../UserContext'
import {useParams} from 'react-router-dom'
import io from 'socket.io-client'
import Message from '../Message/Message'
import Input from '../Input/Input'
import {authHeader} from '../../helper/auth'
import axios from 'axios'
let socket;
const Chat = () => {
    const ENDPOINT = 'http://localhost:3002'
    const {user, setUser} = useContext(UserContext)
    let {roomId, room_name} = useParams();
    const  [message, setMessage ] = useState('') 
    const [messages, setMessages] = useState([])
    useEffect(() => {
        socket = io(ENDPOINT)
            socket.emit('join', {name: user.name, roomId, userId: user._id})
    }, [])
    useEffect(() => {
        const req = axios.get(`http://localhost:3002/message?roomId=${roomId}`, {
            headers: authHeader()
        }).then(res => {
            setMessages(res.data)
        }).catch(error => {
        })
    }, [])
    useEffect(()=> {
        socket.on('message', message => {
            setMessage('')
            setMessages([...messages, message])
        })
    })
    const sendMessage = event => {
        event.preventDefault();
        if (message) {
            const res = axios.post('http://localhost:3002/message', {
                message: message, roomId: roomId
            }, {headers: authHeader()}).then(response => {
                setMessage('')  
            }).catch(error => {
            })
        }
    }        
    return (
        <div className="outerContainer">
            <div className="container">
                <Message messages={messages} user_id={user._id} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} /> 
            </div>
        </div>
    )
}

export default Chat