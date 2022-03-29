import { Fragment } from 'react'

import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

function MyContainer(props) {   
    return (
        <Fragment>
            <CssBaseline />
            <Container maxWidth="lg">
                {props.children}
            </Container>
        </Fragment>
    );
}

export default MyContainer;