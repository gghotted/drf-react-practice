import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import axios from 'axios';

import Button from '@mui/material/Button';
import { Paper, Stack, Typography } from '@mui/material';

function LoginInfo(props) {
    const [user, setUser] = useState(null);
    const [loading, setLoding] = useState(false);
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const fetchUser = async () => {
        setUser(null);
        setError(false);
        setLoding(true);
        try {
            const res = await axios.get('/user/me/');
            setUser(res.data);
        } catch (e) {
            if (e.response.status !== 401) {
                console.log(e);
                setError(e);
            }
        }
        setLoding(false);
    }

    const handleLogoutButton = async () => {
        await axios.post('/user/logout/')
        fetchUser();
    }

    useEffect(() => {
        fetchUser();
    }, []);

    if (props.onLogin && user) props.onLogin();
    if (props.onLogout && !user) props.onLogout();

    if (loading) return <div>로딩중</div>;
    if (error) return <div>에러발생</div>;
    if (!user) return (
        <Stack>
            <Button
                LinkComponent={Link}
                to="/login"
                state={{
                    from: location.pathname + location.search
                }}
            >
                로그인
            </Button>
        </Stack>
    )
    else return (
        <Stack textAlign={'center'} spacing={4} sx={{p:3}}>
            <Typography>{user.username}님 환영합니다</Typography>
            <Button onClick={handleLogoutButton}>로그아웃</Button>
        </Stack>
    )
}

export default LoginInfo;