import * as React from 'react';

import './App.css';
import { Typography, Link } from '@material-ui/core';

class About extends React.Component {

    public render() {
        return (
            <div style={{ padding: 25 }}>
                <Typography>SaunaSim originated when Mark commissioned the construction of a trailer sauna. While installing a water tank, Mark asked a group chat about the thermodynamics of adding a water tank. The resulting discussion evolved into SaunaSim.</Typography>
                <Typography variant="title" style={{ paddingTop: 10, paddingBottom: 5 }}>Creators</Typography>
                <div style={{ paddingLeft: 10 }}>
                    <Typography>Brent Halonen created the model in Julia. <Link
                        href={"https://github.com/bhalonen/SaunaModel.jl"}
                        target="_blank"
                    >
                        SaunaModel.jl
                </Link>
                    </Typography>
                    <Typography>Mark Halonen created the web server in Julia and this website in React. <Link
                        href={"https://github.com/markhalonen/sauna-sim"}
                        target="_blank"
                    >
                        sauna-sim
                </Link></Typography>
                </div>
            </div>
        )
    }
}

export default About;
