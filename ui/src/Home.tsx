import * as React from 'react';

import './App.css';

import { withStyles } from '@material-ui/core/styles';
import Plot from 'react-plotly.js';
import Button from '@material-ui/core/Button';
import { ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails, Divider, Link } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { event as googleAnalyticsEvent } from "react-ga"

interface IBodyResult {
    time: number[];
    temperature: number[];
}

interface ISimulationResult {
    relative_humidity: number[];
    time: number[];
    watt_into_human: number[];
    human_exper_temperature: number[];
    body: IBodyResult;
}

interface IState {
    simulationRunning: boolean,
    result: ISimulationResult,
    params: any,
    error: boolean
}

const apiUrl = "https://api.saunasim.com"

const styles = (theme: Theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
});

class Home extends React.Component {
    public readonly state: IState = {
        result: { relative_humidity: [], time: [], watt_into_human: [], human_exper_temperature: [], body: { time: [], temperature: [] } },
        simulationRunning: false,
        params: {},
        error: false
    }

    public async componentDidMount() {
        // Get simulation params
        const params = await fetch(`${apiUrl}/params`).then((response) => {
            return response.json();
        })
            .then((myJson) => {
                return myJson
            });
        this.paramsToSigFigs(params, 5)
        this.setState({ params })
    }

    public render() {
        let width = window.innerWidth
        width = width > 700 ? 700 : width
        const height = width * .6
        const paramsComponents = this.getParams(this.state.params, 0, [])
        return (
            <div className="App">
                <Typography variant="h6" style={{ padding: 15 }}>
                    This is an interactive sauna simulation app. Use at your own rdisk.
        </Typography>

                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="title">Parameters</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <div className="Params">
                            <div className="ParamsContainer">
                                {paramsComponents}
                            </div>
                            <Typography style={{ paddingTop: 15 }}>These parameters are programmatically generated from <Link
                                href={"https://github.com/bhalonen/SaunaModel.jl/blob/master/src/api/default_components.jl"}
                                target="_blank"
                            >
                                SaunaModel.jl
                </Link>. That's pretty neat. </Typography>
                        </div >
                    </ExpansionPanelDetails>
                </ExpansionPanel>

                <Button variant="contained" disabled={this.state.simulationRunning} onClick={this.runSimulationClicked} style={{ margin: 15 }}>Run Simulation</Button>
                {this.state.error && <Typography style={{ color: "red" }}>Sorry, the model cannot converge on a solution with these parameters</Typography>}
                <div>
                    <Plot
                        data={[
                            {

                                marker: { color: 'red' },
                                mode: 'lines+points' as any,
                                type: 'scatter' as any,
                                x: this.state.result.time.map(t => t / 60),
                                y: this.state.result.human_exper_temperature,
                            },
                        ]}
                        layout={{
                            title: 'Experienced Temperature Vs Time',
                            xaxis: { title: "Time (minutes)" },
                            yaxis: { title: "Experienced Temperature" },
                            width,
                            height,
                            plot_bgcolor: "#F8F8F8"

                        }}
                    />
                </div>
                <Divider variant="middle" />
                <div>
                    <Plot
                        data={[
                            {

                                marker: { color: 'red' },
                                mode: 'lines+points' as any,
                                type: 'scatter' as any,
                                x: this.state.result.time.map(t => t / 60),
                                y: this.state.result.relative_humidity,
                            },
                        ]}
                        layout={{
                            title: 'Room Water Vapor Proportion vs Time',
                            xaxis: { title: "Time (minutes)" },
                            yaxis: { title: "Water Vapor Proportion" },
                            width,
                            height,
                            plot_bgcolor: "#F8F8F8"
                        }}
                    />
                </div>
                <Divider variant="middle" />
                <div>
                    <Plot
                        data={[
                            {

                                marker: { color: 'red' },
                                mode: 'lines+points' as any,
                                type: 'scatter' as any,
                                x: this.state.result.time.map(t => t / 60),
                                y: this.state.result.watt_into_human,
                            },
                        ]}
                        layout={{
                            title: 'Experienced Power Vs Time',
                            xaxis: { title: "Time (minutes)" },
                            yaxis: { title: "Experienced Power" },
                            width,
                            height,
                            plot_bgcolor: "#F8F8F8"
                        }}
                    />
                </div>
                <Divider variant="middle" />
                <div>
                    <Plot
                        data={[
                            {

                                marker: { color: 'red' },
                                mode: 'lines+points' as any,
                                type: 'scatter' as any,
                                x: this.state.result.body.time.map(t => t / 60),
                                y: this.state.result.body.temperature,
                            },
                        ]}
                        layout={{
                            title: 'Body Temperature Vs Time',
                            xaxis: { title: "Time (minutes)" },
                            yaxis: { title: "Body Temperature" },
                            width,
                            height,
                            plot_bgcolor: "#F8F8F8"
                        }}
                    />
                </div>
            </div >
        );
    }

    private paramsToUrl() {
        const noUnits = this.stripUnits(this.state.params)
        return this.toDotNotation(noUnits, [], []).join('&')

    }

    private toDotNotation(ob: any, currentPath: string[], result: string[]) {
        // Input: {"a": {"b" : 1}, "c": 2}
        // Output: a.b=1&c=2
        Object.keys(ob).forEach(k => {
            const newPath = [...currentPath]
            newPath.push(k)
            if (isNaN(ob[k])) {
                this.toDotNotation(ob[k], newPath, result)
            } else {
                const dotPath = newPath.join(".")
                if (dotPath === "start_time") {
                    if (ob[k] < 0) {
                        ob[k] = 0
                    }
                }
                if (dotPath === "end_time") {
                    if (ob[k] > 4) {
                        ob[k] = 4
                    }
                }
                result.push(dotPath + "=" + ob[k])
            }
        })
        return result
    }

    private stripUnits(ob: any) {
        // Input {"a": {"val": 1, "unit": "Kg"}}
        // Output {"a": 1}
        const retval = {}
        Object.keys(ob).forEach(k => {
            if (this.isUnit(ob[k])) {
                retval[k] = ob[k].val
            } else {
                retval[k] = this.stripUnits(ob[k])
            }
        })
        return retval
    }

    private runSimulationClicked = async () => {
        this.setState({ simulationRunning: true })

        const urlParams = this.paramsToUrl()

        const result = await fetch(`${apiUrl}/simulate?${urlParams}`).then((response) => {
            return response.json();
        })
            .then((myJson) => {
                return myJson
            });
        googleAnalyticsEvent({ category: 'User', action: 'Ran a simulation' })
        if (result.error) {
            this.setState({ error: true })
            googleAnalyticsEvent({ category: 'User', action: 'Got a simulation error' })
        } else {

            this.setState({ result, error: false })
        }
        this.setState({ simulationRunning: false })
    }

    private paramChanged(event: any, path: string[]) {
        let currentParams = this.state.params
        path.forEach(k => {
            currentParams = currentParams[k]
        })
        currentParams.val = event.target.value
        this.setState({ params: this.state.params })
    }

    private isUnit(ob: any) {
        // return true if it looks like {"val": 1, "unit": "kg"}
        const isSetsEqual = (a: any, b: any) => {
            return a.size === b.size && Array.from(a).every(value => b.has(value));
        }
        const set1 = new Set(Object.keys(ob))
        const set2 = new Set(["val", "unit"])
        return isSetsEqual(set1, set2)
    }

    private getParams(params: any, padding: number, path: string[]) {
        return <React.Fragment key={path.join(".")}>
            {path.length > 0 && <h4 style={{ paddingLeft: padding }}>{path[path.length - 1]}</h4>}
            {Object.keys(params)
                .filter(k => Object.keys(params[k]).length > 0)
                .sort((a, b) => {
                    if (this.isUnit(params[a]) && !this.isUnit(params[b])) {
                        return -1
                    } else if (!this.isUnit(params[a]) && this.isUnit(params[b])) {
                        return 1
                    } else {
                        return 0
                    }
                })
                .map(k => {
                    const newPath = [...path]
                    newPath.push(k)
                    const onChange = (event: any) => this.paramChanged(event, newPath)
                    if (this.isUnit(params[k])) {
                        return <div className="ParamRow" key={newPath.join(".")}>
                            <p style={{ paddingLeft: padding + 5 }} className="Param">{k}</p>
                            <input type="text" value={params[k].val} className="Param" onChange={onChange} />
                            <p className="Param">{params[k].unit}</p>
                        </div>
                    } else {
                        return this.getParams(params[k], padding + 10, newPath)
                    }
                })}
        </React.Fragment>
    }

    private paramsToSigFigs(params: any, sigFigs: number) {
        Object.keys(params).forEach(k => {
            if (this.isUnit(params[k])) {
                params[k].val = Number(Number(params[k].val).toPrecision(sigFigs)).toString()
            } else {
                this.paramsToSigFigs(params[k], sigFigs)
            }
        })
    }
}

export default withStyles(styles)(Home);
