import * as React from 'react';
import { Container } from 'reactstrap';

export default (props: { children?: React.ReactNode }) => (
    <React.Fragment>
        <Container>
            {props.children}
        </Container>
    </React.Fragment>
);
