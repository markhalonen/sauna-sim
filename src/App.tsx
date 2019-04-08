import * as React from 'react';

import './App.css';

import Plot from 'react-plotly.js';

interface ISimulationResult {
  relative_humidity: number[];
  time: number[];
  watt_into_human: number[];
  human_exper_temperature: number[]
}

interface IState {
  simulationRunning: boolean,
  result: ISimulationResult
}

class App extends React.Component {
  public readonly state: IState = {
    result: { relative_humidity: [], time: [], watt_into_human: [], human_exper_temperature: [] },
    simulationRunning: false,

  }

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Sauna And Sim</h1>
        </header>
        <p className="App-intro">
          This is an interative sauna simulation app. Use at your own rdisk.
        </p>
        <button disabled={this.state.simulationRunning} onClick={this.runSimulationClicked}>Run Simulation</button>
        <div>
          <Plot
            data={[
              {

                marker: { color: 'red' },
                mode: 'lines+points' as any,
                type: 'scatter' as any,
                x: this.state.result.time,
                y: this.state.result.human_exper_temperature,
              },
            ]}
            layout={{
              title: 'Experienced Temperature Vs Time',
              xaxis: { title: "Time (seconds)" },
              yaxis: { title: "Experienced Temperature" },
              width: 700, height: 500,
            }}
          />
        </div>
      </div>
    );
  }

  private runSimulationClicked = async () => {
    this.setState({ simulationRunning: true })
    const result = await fetch('https://54.89.198.175').then((response) => {
      return response.json();
    })
      .then((myJson) => {
        return myJson
      });
    this.setState({ result })
    this.setState({ simulationRunning: false })
  }
}

export default App;
