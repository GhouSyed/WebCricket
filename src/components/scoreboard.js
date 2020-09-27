import React from "react";
import { InningsSummary } from "./inningsSummary";
export class ScoreBoard extends React.Component {
  render() {
    const stats = this.props.stats;
    if (stats.runs == undefined) return <h1>Press Start Button!</h1>;
    return (
      <div className=" scoreboard text-left">
        <h3>ScoreCard:</h3>
        <h4>
          {stats.batting}:{stats.runs}/{stats.wickets}(R.R :{stats.rr}) ,Overs{" "}
          {stats.overs}
        </h4>
        <h4>Target: {stats.target > 0 ? stats.target : "-"}</h4>
        <h2>{stats.winner}</h2>
       {stats.innings.map(inning => {return <InningsSummary innings={inning}/>})}
      </div>
    );
  }
}
