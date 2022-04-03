import { Fragment } from 'react'

import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import LoginInfo from './LoginInfo';
import { Box, Grid } from '@mui/material';
import logo from '../../staticfiles/post-logo.png'

function MyContainer(props) {   
    return (
        <Fragment>
            <CssBaseline />
            <Box>
            </Box>
            <Container 
                maxWidth="lg"
                sx={{
                    backgroundColor: "#f5f5f5",
                    minHeight: "100vh",
                    pb: 5
                }}
            >
                <Box 
                    textAlign='center'
                    sx={{
                        p:2,
                        backgroundColor: 'dimgray'
                    }}
                >
                    <a href="/">
                        <img
                            src={logo}
                            width='80'
                        />
                    </a>
                </Box>
                <Grid container>
                    <Grid 
                        item
                        xs={3}
                        sx={{
                            p:1
                        }}
                    >
                        <LoginInfo></LoginInfo>
                    </Grid>
                    <Grid
                        item
                        xs={9}
                        sx={{
                            p:1
                        }}
                    >
                        {props.children}
                    </Grid>
                </Grid>
            </Container>
        </Fragment>
    );
}

export default MyContainer;