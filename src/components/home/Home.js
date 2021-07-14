import React, { useContext, useState, useEffect } from 'react'
import {UserContext} from '../../UserContext'
import {Link} from 'react-router-dom'
import RoomList from './RoomList'
import io from 'socket.io-client'
import {authHeader} from '../../helper/auth'
import axios from 'axios'
import makeToast from '../../lib/Toster'
let socket;    
export const Home = () => {
    const ENDPOINT = 'http://127.0.0.1:3002'
    const {user, setUser} = useContext(UserContext)
    const [room, setRoom] = useState('');
    const [rooms, setRooms] = useState([])
    const [roomError, setRoomError] = useState('')
    useEffect(() => {
        socket = io(ENDPOINT)
        return() => {
            socket.emit('disconnect')
            socket.off()
        }
    }, [ENDPOINT])
    const token = authHeader()
    useEffect(async() => {
        try {
            axios.get('http://localhost:3002/currentUser', {
                headers: authHeader()
            }).then(res => {
            setUser(res.data)
            }).catch(error => {
            })
        } catch (error) {
            
        }
    }, [])
    useEffect(async() => {
        try {
            axios.get('http://localhost:3002/room', {
                headers: authHeader()
            }).then(res => {
                setRooms(res.data.rooms)
            }).catch(error => {
                console.log(error.response)
            })
        } catch (error) {
            console.log(error.response)
        }
    }, [])
    const handleSubmit = async e => {
        try {
            e.preventDefault();
            const res = await axios.post('http://localhost:3002/room', {
                name: room
            }, {headers: authHeader()}).then(response => {
                makeToast("success", "room created sucessfully")                
            })
        } catch (error) {
            setRoomError(error.response.data.error)
            console.log(error.response)
        }
    }
    
    useEffect(()=> {
        let userData = user
        socket.on('room-created', room => {
            makeToast("success", `${userData.name} created a new room ${room.name}`)
            setRoom('')
            setRooms([...rooms, room])
        })
    }, [rooms])
    return (
        <div>        
            <div className="row">
                <div className="col s12 m6">
                <div className="card blue-grey darken-1">
                    <div className="card-content white-text">
                    <span className="card-title">Welcome {user ? user.name : ''}</span>
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="input-field col s12">
                            <input placeholder="Enter a room Name" id="room" 
                            type="text" value={room} onChange= {e => setRoom(e.target.value)} />
                            <div className="email error red-text">{roomError}</div>
                            <label forhtml="room">Room</label>
                            </div>
                        </div>
                        <button className="btn">Create Room</button>
                    </form>
                    </div>
                    <div className="card-action">
                    {/* <a href="#" onClick={setAsJohn}>set as john</a>
                    <a href="#" onClick={setAsTom}>set as tom</a> */}
                    </div>
                </div>
                </div>
                <div className="col s6 m5 offset-1">
                    <RoomList rooms={rooms} />
                </div>
            </div>
        <Link to={'/chat'}>
            <button>go to chat</button>
        </Link>
        </div>
    )
}
export default Home