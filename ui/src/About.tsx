import * as React from 'react';

import './App.css';
import { Typography, Link } from '@material-ui/core';

class About extends React.Component {

    public render() {
        return (
            <div style={{ padding: 25 }}>
                <Typography>SaunaSim originated when Mark commissioned the construction of a trailer sauna. Mark asked a group chat about the thermodynamics of a water tank, and the resulting discussion evolved into SaunaSim.</Typography>
                <Typography variant="title" style={{ paddingTop: 10, paddingBottom: 5 }}>Creators</Typography>
                <div style={{ paddingLeft: 10 }}>
                    <Typography><strong>Brent Halonen</strong> created the simulator (<Link
                        href={"https://github.com/bhalonen/SaunaModel.jl"}
                        target="_blank"
                    >
                        SaunaModel.jl
                </Link>) in Julia, a programming language that aims to be "A fresh approach to technical computing".
                    </Typography>
                    <Typography><strong>Mark Halonen</strong> created this website (<Link
                        href={"https://github.com/markhalonen/sauna-sim"}
                        target="_blank"
                    >
                        sauna-sim
                </Link>) using Julia for the server and React for the UI. </Typography>

                </div>
                <Typography variant="title" style={{ paddingTop: 30, paddingBottom: 5 }}>How a wood sauna works</Typography>
                <iframe style={{ marginLeft: 10 }} width="560" height="315" src="https://www.youtube.com/embed/fzaNYXj-7uQ" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen={true} />
                <Typography variant="title" style={{ paddingTop: 30, paddingBottom: 5 }}>IR video of throwing steam</Typography>

                <iframe style={{ marginLeft: 10 }} width="560" height="315" src="https://www.youtube.com/embed/fQZfXllGo0s" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen={true} />
            </div>
        )
    }
}

export default About;
