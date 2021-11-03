import { Button, Grid } from '@mui/material';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Message } from '../components/Message';
import { MessageLoader } from '../components/MessageLoader';
import { Context } from '../context/ContextProvider';

export const Chat = () => {

    const [connected, setConnected] = useState(false);
    const socket = useRef();

    const { user, isLoadingMsg, messages, setMessages } = useContext(Context);

    const connect = () => {
        socket.current = new WebSocket(`ws://react-chat-itra.herokuapp.com/messages`);

        socket.current.onopen = () => {
            setConnected(true);
        }

        socket.current.onmessage = (event) => {
            const message = JSON.parse(event.data);
            setMessages(prev => [...prev, message]);
        }

        socket.current.onclose = () => {
            console.log('Socket close');
        }

        socket.current.onerror = () => {
            console.log('Socket error');
        }
    }

    const sendMessage = (e) => {
        const value = e.target.textContent;
        const message = {
            event: 'message',
            message: value,
            username: user.username,
            createdAt: Date.now()
        }
        socket.current.send(JSON.stringify(message));
    }

    useEffect(() => {
        connect();
    }, []);

    return (
        <Grid
            container
            direction="column"
            sx={{
                margin: 'auto'
            }}
        >
            <Grid
                item
                sx={{
                    width: '50%',
                    margin: 'auto',
                }}
            >
                <Grid item>
                    {isLoadingMsg ?
                        Array(3).fill(0).map((_, i) => <MessageLoader key={i} />)
                        :
                        !messages.length ? 'No messages!' : messages.map((item, i) => <Message key={i} {...item} />)}
                </Grid>
                <Grid item>
                    <Button onClick={sendMessage} variant="contained" size="large" sx={{ mr: 1 }}>Bro!</Button>
                    <Button onClick={sendMessage} variant="contained" size="large" color="warning">Sis!</Button>
                </Grid>
            </Grid>
        </Grid>
    );
}
