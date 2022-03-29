import { Box, Button, Stack, TextField } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MyContainer from "./components/MyContainer";

function Create() {
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
           <Box component="form" onSubmit={handleSubmit}>
                <TextField
                    required
                    id="title"
                    label="title"
                    name="title"
                    fullWidth
                    sx={{
                        mt: 3
                    }}
                />
                <TextField
                    required
                    id="content"
                    label="content"
                    name="content"
                    fullWidth
                    multiline
                    rows={20}
                    sx={{
                        mt: 1,
                    }}
                />
                <Stack direction="row" justifyContent="space-between">
                    <div></div>
                    <Button type="submit" variant="outlined">저장</Button>
                    <Button 
                        onClick={()=> {navigate('/')}}
                        variant="outlined"
                        color="error"
                    >
                        취소
                    </Button>
                </Stack>
            </Box> 
        </MyContainer>
    )
}

export default Create;