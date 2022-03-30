import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import axios from 'axios';

import Button from '@mui/material/Button';
import { Stack } from '@mui/material';

function LoginInfo() {
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

    const handleCreatePostButton = () => {
        navigate('/create', {state: {from: location.pathname + location.search}})
    }

    useEffect(() => {
        fetchUser();
    }, []);

    if (loading) return <div>로딩중</div>;
    if (error) return <div>에러발생</div>;
    if (!user) return (
        <Button
            LinkComponent={Link}
            to="/login"
            state={{
                from: location.pathname + location.search
            }}
        >
            로그인
        </Button>
    )
    else return (
        <Stack direction="row" justifyContent="space-between">
            <div>{user.username}님 환영합니다.</div>
            <Button color="error" variant='outlined' onClick={handleLogoutButton}>로그아웃</Button>
            <Button variant='outlined' onClick={handleCreatePostButton}>쓰기</Button>
        </Stack>
    )
}

export default LoginInfo;