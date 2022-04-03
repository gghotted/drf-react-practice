import { Fragment } from 'react'

import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import LoginInfo from './LoginInfo';
import Categories from './Categories';
import { Box, Grid, Paper, Typography } from '@mui/material';
import logo from '../../staticfiles/post-logo.png'

function MyContainer(props) {
    return (
        <Fragment>
            <CssBaseline />
            <Container 
                maxWidth="lg"
                sx={{
                    backgroundColor: "#f5f5f5",
                    minHeight: "100vh",
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
                <Box>
                    <Grid container>
                        <Grid 
                            item
                            xs={3}
                            sx={{
                                p:1
                            }}
                        >
                            <Paper>
                                <LoginInfo onLogin={props.onLogin} onLogout={props.onLogout}/>
                            </Paper>
                            <Paper sx={{mt:1}}>
                                <Categories/>
                            </Paper>
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
                </Box>
                <Box textAlign={'center'} p={3}>
                    <Typography>ⓒ copyright</Typography>
                </Box>
            </Container>
        </Fragment>
    );
}

export default MyContainer;