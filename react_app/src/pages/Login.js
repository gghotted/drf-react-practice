import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import axios from 'axios';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import MyContainer from './components/MyContainer';
import { Alert, Box, Paper, Stack } from '@mui/material';

function Login() {
    const [errmsg, setErrmsg] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    const toPrevPage = () => {
        if (location.state && location.state.from) navigate(-1);
        else navigate('/');
    }

    const handleLoginButton = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        try{
            await axios.post('/user/login/', {
                username: data.get('username'),
                password: data.get('password'),
            })
            toPrevPage();
        } catch (e) {
            setErrmsg(e.response.data.non_field_errors[0]);
        }

    }

    return (
        <MyContainer>
            <Paper>
                <Box component="form" onSubmit={handleLoginButton}>
                    <Stack spacing={3} p={25}>
                        <TextField
                            required
                            id="username"
                            label="username"
                            name="username"
                        />
                        <TextField
                            required
                            id="password"
                            label="password"
                            name="password"
                            type="password"
                        />
                        {errmsg !== '' &&
                        <Alert severity='error'>{errmsg}</Alert>}
                        <Button color={'success'} variant='contained' type="submit">로그인</Button>
                    </Stack>
                </Box>
            </Paper>
        </MyContainer>
    )
}

export default Login;