import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import axios from 'axios';

import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Stack } from '@mui/material';

import MyContainer from './components/MyContainer';

function Detail() {
    let { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [post, setPost] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const fetchPost = async () => {
        const res = await axios.get(`/post/${id}/`);
        setPost(res.data);
    }

    const toListPage = () => {
        if (location.state && location.state.from) navigate(-1);
        else navigate('/');
    }

    const handleGoListButton = () => {
        toListPage();
    }

    const handleGoUpdateButton = () => {
        navigate(`/${id}/update`)
    }

    const handleDeleteButton = async () => {
        await axios.delete(`/post/${id}/`);
        navigate('/');
    }

    const handleDeleteSafeButton = () => {
        setDeleteDialogOpen(true);
    }

    useEffect(() => {
        fetchPost();
    }, []);

    if (!post) return null;

    return (
        <MyContainer>
            <Box p={1} textAlign={'right'}>
                {post.has_update_permission === true &&
                (<Button variant='contained' onClick={handleGoUpdateButton}>수정</Button>)}
                {post.has_delete_permission === true &&
                (<Button variant='contained' color='warning' onClick={handleDeleteSafeButton}>삭제</Button>)}
            </Box>
            <Paper 
                sx={{
                    p: 2,
                }}
            >
                {post.title}
                <Divider
                    sx={{
                        mb: 2,
                    }}
                />
                {post.content}
            </Paper>
            <Box p={1} textAlign={'right'}>
                <Button variant='contained' color={'inherit'} onClick={handleGoListButton}>목록</Button>
            </Box>
            <Dialog open={deleteDialogOpen} onClose={() => {setDeleteDialogOpen(false)}}>
                <DialogTitle>삭제 할까요?</DialogTitle>
                <DialogContent><DialogContentText>삭제 후 복구가 불가능 합니다.</DialogContentText></DialogContent>
                <DialogActions>
                    <Button variant='contained' onClick={() => {setDeleteDialogOpen(false)}}>취소</Button>
                    <Button variant='contained' color='warning' onClick={handleDeleteButton}>삭제</Button>
                </DialogActions>
            </Dialog>
        </MyContainer>
    )
}

export default Detail;