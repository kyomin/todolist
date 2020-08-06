import React from 'react';
import { withRouter } from 'react-router-dom';

import DrawTodoList from './Sections/DrawTodoList/DrawTodoList';

function LandingPage() {
    return (
        <DrawTodoList />
    );
}

export default withRouter(LandingPage);