import * as React from 'react';

import './App.css';
import { Typography, Link } from '@material-ui/core';

class About extends React.Component {

    public render() {
        let vidWidth = window.innerWidth - 50
        vidWidth = vidWidth > 560 ? 560 : vidWidth;
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

                </Link>) in Julia, a programming language that aims to be "A fresh approach to technical computing". Brent also wrote up a <Link
                            href={"https://bhalonen.github.io/SaunaModel.jl/"}
                            target="_blank"
                        >
                            documentation page
                </Link> detailing the thermodynamics and physics involved in the making of this simulator.
                    </Typography>
                    <Typography><strong>Mark Halonen</strong> created this website (<Link
                        href={"https://github.com/markhalonen/sauna-sim"}
                        target="_blank"
                    >
                        sauna-sim
                </Link>) using Julia for the server and React for the UI. He wrote about his experience in deploying Julia in <Link
                            href={"https://medium.com/@markhalonen/deploying-julia-1eb8a1686ca1"}
                            target="_blank"
                        >this blog post.</Link></Typography>



                </div>
                <Typography variant="title" style={{ paddingTop: 30, paddingBottom: 5 }}>How a wood sauna works</Typography>
                <iframe style={{ marginLeft: 10 }} width={vidWidth} height="315" src="https://www.youtube.com/embed/fzaNYXj-7uQ" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen={true} />
                <Typography variant="title" style={{ paddingTop: 30, paddingBottom: 5 }}>IR video of throwing steam</Typography>

                <iframe style={{ marginLeft: 10 }} width={vidWidth} height="315" src="https://www.youtube.com/embed/wXhTnEXXBEs" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen={true} />
            </div>
        )
    }
}

export default About;
