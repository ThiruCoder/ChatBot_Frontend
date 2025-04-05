import React, { useEffect, useRef, useState, useTransition } from 'react'
import { Box, AppBar, Toolbar, Typography, TextField, IconButton, Avatar, Badge, List, ListItem, ListItemAvatar, ListItemText, Divider, CardHeader } from '@mui/material';
import { Send, EmojiEmotions, AttachFile, Videocam, Mic } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import io from 'socket.io-client';
const SERVER_URL = import.meta.env.REACT_APP_SERVER_URL || 'https://chatbot-backend-l5r0.onrender.com'


// ✅ Fix socket connection
const socket = io(SERVER_URL, {
    transports: ["websocket", "polling"], // WebSocket first, fallback to polling
    withCredentials: true,
    autoConnect: true, // Ensures auto connection
});

const GetChatBox = ({ username }) => {
    const [room, setRoom] = useState('general');
    const [message, setMessage] = useState([]);
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const [typingUsers, setTypingUsers] = useState([]);

    const messagesEndRef = useRef(null);
    const [ispending, startTransaction] = useTransition()

    useEffect(() => {
        // Prompt for username

        socket.emit('connection', { username: username })
        // Join room
        socket.emit('joinRoom', { username: username, room });

        // Listen for messages
        socket.on('message', (message) => {
            setMessages(prev => [...prev, message]);
        });

        // Listen for typing indicators
        socket.on('typing', ({ username, isTyping }) => {
            if (isTyping) {
                setTypingUsers(prev => [...new Set([...prev, username])]);
            } else {
                setTypingUsers(prev => prev.filter(user => user !== username));
            }
        });

        return () => {
            socket.off('message');
            socket.off('typing');
        };
    }, [room, socket, isTyping, setMessages, setTypingUsers]);
    // console.log('messages', message);
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    console.log('typingUsers', typingUsers, isTyping);


    const sendMessage = (e) => {
        e.preventDefault();

        if (message.trim()) {
            socket.emit('sendMessage', { username, room, message });
            console.log(username, room, message);

            setMessage('');
            socket.emit('typing', { username, room, isTyping: false });
            setIsTyping(false);
        }
    };

    const handleMessage = (e) => {
        setMessage(e.target.value)
    }
    console.log(typingUsers);


    const handleTyping = (e) => {

        if (!isTyping && e.target.value) {
            setIsTyping(!isTyping);
            socket.emit('typing', { username, room, isTyping: true });
        } else if (isTyping && !e.target.value) {
            setIsTyping(!isTyping);
            socket.emit('typing', { username, room, isTyping: false });
        }
    };


    return (
        <>
            <AppBar position="static" color="primary">
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box>
                        <CardHeader
                            title={<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                Chat Room: {room}
                            </Typography>}
                            subheader={
                                typingUsers.length > 0 && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}

                                    >
                                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                                            <Typography variant="caption" color="text.secondary">
                                                {typingUsers.join(', ')} {typingUsers.length > 1 ? 'are' : 'is'} typing

                                            </Typography>
                                            <div className="typing-indicator">
                                                <div className="typing-circle"></div>
                                                <div className="typing-circle"></div>
                                                <div className="typing-circle"></div>
                                                <div className="typing-shadow"></div>
                                                <div className="typing-shadow"></div>
                                                <div className="typing-shadow"></div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )
                            }

                        />
                    </Box>
                    <Badge color="secondary" variant="dot" overlap="circular">
                        <Avatar alt={username} src="/static/images/avatar/1.jpg" />
                    </Badge>
                </Toolbar>
            </AppBar>

            <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
                <List>
                    <AnimatePresence>
                        {messages.map((msg, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                        <Avatar alt={msg.user} src="/static/images/avatar/1.jpg" />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={msg.user}
                                        secondary={
                                            <>
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                    sx={{ color: 'white', opacity: 0.8 }}
                                                >
                                                    {msg.text}
                                                </Typography>
                                                <Typography
                                                    component="span"
                                                    variant="caption"
                                                    sx={{ color: 'white', opacity: 0.6, fontSize: 9 }}
                                                    display="block"
                                                >
                                                    {new Date(msg.timestamp).toLocaleTimeString()}
                                                </Typography>
                                            </>
                                        }
                                    />
                                </ListItem>
                                <Divider variant="inset" component="li" />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    <div ref={messagesEndRef} />
                </List>


            </Box>

            <Box component="form" onSubmit={sendMessage} sx={{ p: 2, borderTop: '1px solid #eee' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton color="primary">
                        <AttachFile />
                    </IconButton>
                    <IconButton color="primary">
                        <EmojiEmotions />
                    </IconButton>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Type a message"
                        value={message}
                        onKeyUp={handleTyping}
                        onChange={handleMessage}
                        sx={{
                            mx: 1,
                            label: {
                                color: 'white',

                            },
                            input: {
                                color: 'white'
                            }
                        }}
                    />
                    <IconButton color="primary" type="submit" disabled={!message}>
                        <Send />
                    </IconButton>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                    <IconButton size="small">
                        <Videocam fontSize="small" />
                    </IconButton>
                    <IconButton size="small">
                        <Mic fontSize="small" />
                    </IconButton>
                </Box>
            </Box>
        </>
    )
}

export default GetChatBox