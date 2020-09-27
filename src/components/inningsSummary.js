import React, { Fragment } from "react";

export class InningsSummary extends React.Component {
  innings = this.props.innings;
  getBatsmen = (deliveries) => {
    let batsmen = [];
    let bScore = [];
    deliveries.forEach((delivery) => {
      if (delivery.scored === "out") {
        const scored = bScore;
        batsmen.push(
          scored.filter(
            (score) => !(score.scored == "wd" || score.scored == "nb")
          )
        );
        bScore = [];
      } else {
        // console.log(delivery);
        bScore.push(delivery);
      }
    });
    if (bScore.length > 0) {
      const scored = bScore;
      batsmen.push(
        scored.filter(
          (score) => !(score.scored == "wd" || score.scored == "nb")
        )
      );
    }
    return batsmen;
  };
  render() {
    return (
      <Fragment>
        <h3>{this.innings.batting} Summary:</h3>
        <h4>
          Score of {this.innings.batting} :{this.innings.runs}/
          {this.innings.wickets} | extras : {this.innings.extras}
        </h4>
        <table className="table">
          <thead>
            <tr>
              <th>Batsmen</th>
              <th>Runs</th>
              <th>bowls</th>
              <th>4s</th>
              <th>6s</th>
              <th>Wicket By</th>
              <th>SR</th>
            </tr>
          </thead>
          <tbody>
            {this.getBatsmen(this.innings.deliveries).map(
              (deliveries, index) => {
                return (
                  <tr>
                    <td>Batsmen {index + 1}</td>
                    <td>
                      {!(deliveries.length > 0)
                        ? 0
                        : deliveries
                            .map((delivery) => {
                              return delivery.value;
                            })
                            .reduce((a, b) => a + b)}
                    </td>
                    <td>{deliveries.length}</td>
                    <td>
                      {
                        deliveries.filter((delivery) => delivery.value === 4)
                          .length
                      }
                    </td>
                    <td>
                      {
                        deliveries.filter((delivery) => delivery.value === 6)
                          .length
                      }
                    </td>
                    <td>
                      {(this.innings.batting == "Team-A"
                        ? "B-Bowler-"
                        : "A-Bowler-") +
                        Math.round(Math.random() * (11 - 6) + 6)}
                    </td>
                    <td>
                      {!(deliveries.length > 0)
                        ? 0
                        : (deliveries
                            .map((delivery) => {
                              return delivery.value;
                            })
                            .reduce((a, b) => a + b) /
                            deliveries.length) *
                          100}
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
        {/* <h4>
          Bowler name | Overs | Runs | Wickets | Econ | 0s | 4s | 6s | WD | NB
        </h4> */}
      </Fragment>
    );
  }
}
