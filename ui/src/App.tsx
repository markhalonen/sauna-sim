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
  result: ISimulationResult,
  params: any
}

class App extends React.Component {
  public readonly state: IState = {
    result: { relative_humidity: [], time: [], watt_into_human: [], human_exper_temperature: [] },
    simulationRunning: false,
    params: {}
  }

  public async componentDidMount() {
    // Get simulation params
    const params = await fetch('http://localhost:8000/params').then((response) => {
      return response.json();
    })
      .then((myJson) => {
        return myJson
      });
    this.setState({ params })
  }

  public render() {
    let width = window.innerWidth * .8
    width = width > 700 ? 700 : width
    const height = width * .6
    const paramsComponents = this.getParams(this.state.params, 0, [])
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Sauna And Sim</h1>
        </header>
        <p className="App-intro">
          This is an interative sauna simulation app. Use at your own rdisk.
        </p>
        <div className="Params">
          <h2>Scenario Settings</h2>
          {paramsComponents}
        </div >
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
              width,
              height

            }}
          />
        </div>
        <div>
          <Plot
            data={[
              {

                marker: { color: 'red' },
                mode: 'lines+points' as any,
                type: 'scatter' as any,
                x: this.state.result.time,
                y: this.state.result.watt_into_human,
              },
            ]}
            layout={{
              title: 'Experienced Energy Vs Time',
              xaxis: { title: "Time (seconds)" },
              yaxis: { title: "Experienced Energy" },
              width,
              height
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
        result.push(newPath.join(".") + "=" + ob[k])
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

    const result = await fetch(`http://localhost:8000/simulate?${urlParams}`).then((response) => {
      return response.json();
    })
      .then((myJson) => {
        return myJson
      });
    this.setState({ result })
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
    return <div>
      {path.length ? <h4 style={{ paddingLeft: padding }}>{path[path.length - 1]}</h4> : <p />}
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
            return <div className="ParamRow">
              <p style={{ paddingLeft: padding + 5 }} className="Param">{k}</p>
              <input type="text" value={params[k].val} className="Param" onChange={onChange} />
              <p className="Param">{params[k].unit}</p>
            </div>
          } else {

            return this.getParams(params[k], padding + 10, newPath)
          }
        })}
    </div>
  }
}

export default App;
