import { Fragment } from 'react'

import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import LoginInfo from './LoginInfo';

function MyContainer(props) {   
    return (
        <Fragment>
            <CssBaseline />
            <Container maxWidth="lg">
                <LoginInfo></LoginInfo>
                {props.children}
            </Container>
        </Fragment>
    );
}

export default MyContainer;