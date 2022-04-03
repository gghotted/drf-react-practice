import { Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function Categories() {
    return (
        <Stack textAlign={'center'} spacing={2} sx={{p:3}}>
            <Typography component={Link} to={'/'} sx={{textDecoration: 'none', color: 'black'}}>
                카테고리 1
            </Typography>
            <Typography component={Link} to={'/'} sx={{textDecoration: 'none', color: 'black'}}>
                카테고리 2
            </Typography>
        </Stack>
    )
}

export default Categories