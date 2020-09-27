import React, { Fragment } from "react";
import * as scoreService from "../services/scoreService";
import { ScoreBoard } from "./scoreboard";
export class Match extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matchStatus: { button: "start", class: "btn-info" },
      stats: {},
    };
  }
  handleClick = () => {
    const { matchStatus } = this.state;
    if (matchStatus.button === "start") {
      this.setState({ matchStatus: { button: "stop", class: "btn-danger" } });
      scoreService.generateScore(1000);
      this.interval = setInterval(this.getStats, 1000);
    } else {
      this.setState({
        matchStatus: { button: "start", class: "btn-info" },
      });
      clearInterval(this.interval);
      scoreService.pauseScore();
    }
  };
  getStats = () => {
    this.setState({ stats: scoreService.displayScore() });
  };
  render() {
    return (
      <Fragment>
        <div className="text-center">
          <h1>Welcome To js web Cricket</h1>
          <button
            className={`btn ${this.state.matchStatus.class}`}
            onClick={this.handleClick}
          >
            {this.state.matchStatus.button}
          </button>
        </div>
        <div className="singleGrid">
          <ScoreBoard className="scoreboard" stats={this.state.stats} />
        </div>
      </Fragment>
    );
  }
}
