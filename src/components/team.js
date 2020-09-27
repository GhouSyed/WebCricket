import React, { Fragment as div } from "react";
import { Player } from "./player";

export class Team extends React.Component {
  render() {
    return (
      <div>
        {this.props.team.map((player) => {
          return <Player name={player.name} key={player.name} />;
        })}
      </div>
    );
  }
}
