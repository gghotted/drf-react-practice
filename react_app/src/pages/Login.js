import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import axios from 'axios';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import MyContainer from './components/MyContainer';
import { Alert, Box } from '@mui/material';

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
            <Box component="form" onSubmit={handleLoginButton}>
                <TextField
                    required
                    id="username"
                    label="username"
                    name="username"
                    fullWidth
                    sx={{
                        mt: 3
                    }}
                />
                <TextField
                    required
                    id="password"
                    label="password"
                    name="password"
                    fullWidth
                    type="password"
                    sx={{
                        mt: 1,
                        mb: 3
                    }}
                />
                {errmsg !== '' &&
                <Alert severity='error'>{errmsg}</Alert>}
                <Button fullWidth variant='outlined' type="submit">로그인</Button>
            </Box>
        </MyContainer>
    )
}

export default Login;