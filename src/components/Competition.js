import React, { Component } from "react";
import "../css/temp.css";

import { LevelsList } from "./LevelsList.js";
import { NavsBar } from "./NavsBar";
import axios from "axios";
import { Redirect } from "react-router";
import Spinner from "./spinner";
import { Card } from "react-bootstrap";
import Countdown from "./Countdown";
import { Grid } from "@material-ui/core";
export class Competition extends Component {
  constructor(props) {
    super(props);

    this.state = {
      levels: [],
      levelDescription: false,
      user: null,
      compId: null,
      date: new Date().toLocaleString(),
    };
  }

  componentDidMount = () => {
    // localStorage.removeItem('yourTok')
    this.authListener();
  };

  authListener = () => {
    let tok = null;
    tok = localStorage.getItem("yourTok");
    axios
      .get(`${process.env.REACT_APP_NODEJS_URL}/competitions`, {
        headers: { Authorization: `Bearer ${tok}` },
      })
      .then((res) => {
        console.log(res);
        this.setState({
          levels: res.data.allCompetitions,
          user: res.data.user,
          rank: res.data.rank,
          date: new Date(2021, 2, 7, 16),
        });
      });
  };

  handleView = (index) => {
    // fetching of the levels data here

    this.setState({
      compId: index,
      levelDescription: true,
    });
  };

  render() {
    let { user } = this.state;
    if (this.state.compId != null) {
      return <Redirect to={`/competition/${this.state.compId}`} />;
    }

    return user ? (
      <div className="container-fluid px-0">
        <NavsBar />
        <div className="aligning ">
          <div className="overlay">
            <LevelsList
              levels={this.state.levels}
              handleView={this.handleView}
              userLevel={user.CurrentLevel}
            />
          </div>

        </div>
        <div className="top">
          <h2 className="comp">
            Competitions
            <hr className="hrTag" />
          </h2>

          <Card className="cardStyle">
            <Card.Body>
              <Card.Title className="text-center" style={{ fontSize: "2vh" }}>
                {user.username}
              </Card.Title>
              <Card.Subtitle className="mb-2 p-2 text-center text-muted">
                {user.email}
              </Card.Subtitle>
              <Card.Text>
                <Grid container>
                  <Grid item xs={4}>
                    <ul className="mt-3">
                      <ul className="liSty">
                        Current level: {user.CurrentLevel + 1}
                      </ul>
                      <ul className="liSty">Rank:{this.state.rank + 1}</ul>
                    </ul>
                  </Grid>
                  <Grid item xs={8}>
                    <Card.Text style={{ margin: "1%" }}>
                      Time Remaining:
                      <Countdown endTime={this.state.date} />
                    </Card.Text>
                  </Grid>
                </Grid>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>

        <div className="bottom" />
      </div>
    ) : (
      <Spinner />
    );
  }
}

export default Competition;
