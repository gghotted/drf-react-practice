import { Box, Button, Paper, Stack, TextField } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MyContainer from "./components/MyContainer";

function Create(props) {
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log(data.get('title'));
        const res = await axios.post('/post/', {
            title: data.get('title'),
            content: data.get('content'),
        });
        navigate('/');
    }

    return (
        <MyContainer>
            <Box component="form" onSubmit={
                props.onSubmit ? props.onSubmit : handleSubmit}>
                <Box p={1} textAlign='right'>
                    <Button 
                        onClick={()=> {navigate('/')}}
                        variant="contained"
                        color="warning"
                    >
                        취소
                    </Button>
                </Box>
                <Paper>
                    <Stack p={3} spacing={1}>
                        <TextField
                            required
                            id="title"
                            label="title"
                            name="title"
                            fullWidth
                            defaultValue={
                                props.title ? props.title : ""
                            }
                        />
                        <TextField
                            required
                            id="content"
                            label="content"
                            name="content"
                            fullWidth
                            multiline
                            rows={20}
                            defaultValue={
                                props.content ? props.content : ""
                            }
                        />
                    </Stack>
                </Paper>
                <Box p={1} textAlign='right'>
                    <Button type="submit" variant="contained" color='success'>저장</Button>
                </Box>
                {/* <Stack direction="row" justifyContent="space-between">
                    <div></div>
                    <Button type="submit" variant="outlined">저장</Button>
                    <Button 
                        onClick={()=> {navigate('/')}}
                        variant="outlined"
                        color="error"
                    >
                        취소
                    </Button>
                </Stack> */}
            </Box>
        </MyContainer>
    )
}

export default Create;