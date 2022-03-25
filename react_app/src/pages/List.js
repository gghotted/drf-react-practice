import { useState, useEffect, Fragment } from 'react'
import axios from 'axios'

import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';

function List() {
    const [posts, setPosts] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    const [page, setPage] = useState(1);

    const fetchPosts = async (page) => {
        // alert('run fetchPosts');
        setPosts(null);
        setError(null);
        setLoading(true);
        
        try {
            const res = await axios.get(`/post/?page=${page}`);
            setPosts(res.data);
            setPage(page);
        } catch (e){
            setError(e);
            console.log(e);
            return ;
        }
        setLoading(false);
    }

    const handlePageChange = (event, value) => {
        fetchPosts(value);
    }

    useEffect(() => {
        fetchPosts(1);
    }, []);

    if (error) return <div>에러발생</div>;
    if (loading) return <div>로딩중</div>;
    if (!posts) return <div>posts 없음</div>;
    
    return (
        <Fragment>
            <CssBaseline />
            <Container maxWidth="lg">
                <TableContainer component={Paper} elevation={2}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>번호</TableCell>
                                <TableCell>제목</TableCell>
                                <TableCell>작성자</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {posts.results.map((post) => (
                                <TableRow
                                    key={post.id}
                                    component={Link}
                                    hover={true}
                                    href={`/${post.id}`}
                                >
                                    <TableCell>{post.id}</TableCell>
                                    <TableCell>{post.title}</TableCell>
                                    <TableCell>{post.user}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Stack
                        alignItems={'center'}
                    >
                        <Pagination 
                            page={page}
                            onChange={handlePageChange}
                            count={Math.ceil(posts.count / 10)}
                        />
                    </Stack>
                </TableContainer>
            </Container>
        </Fragment>
    );
}

export default List;