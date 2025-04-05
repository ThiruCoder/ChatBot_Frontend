import React, { useState, useEffect, useRef } from 'react';
import { Box, IconButton, TextField } from '@mui/material'
import './ChatboxHome.css';
import GetChatBox from './GetChatBox';
import GetUser from './GetUser';


function ChatBox() {
    const [switchCase, setSwitchCase] = useState(0)
    const [username, setUsername] = useState([])
    const SwitchFunction = () => {
        switch (switchCase) {
            case 0:
                return (<GetUser switchCase={switchCase} setSwitchCase={setSwitchCase} setUsername={setUsername} />);
            case 1:
                return (<GetChatBox switchCase={switchCase} setSwitchCase={setSwitchCase} username={username} />)
            default:
                return (<GetUser />)
        }
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <SwitchFunction />
        </Box>
    );
}

export default ChatBox;