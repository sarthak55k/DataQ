import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import { NavsBar } from "./NavsBar";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import axios from "axios";
import Spinner from "./spinner";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

export class Leaderboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
    };
  }
  useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });
  
  // componentDidMount = () => {
  //   // localStorage.removeItem('yourTok')
  //   this.authListener();
  // };

  // authListener = () => {
  //   let tok = null;
  //   tok = localStorage.getItem("yourTok");
  //   axios
  //     .get(`${process.env.REACT_APP_NODEJS_URL}/leaderboard`)

  //     .then((res) => {
  //       console.log(res);
  //       this.setState({
  //         data: res.data.Leaderboard,
  //       });
  //     });
  // };
  

  render() {
    let data = [
      {
        rank:'🥇 1',
        username:"Dhiraj Jha",
        score1:.941,
        score2:.581,
        score3:.877,
        final:801.433
      },
      {
        rank:'🥈 2',
        username:"Prathamesh Sonawane",
        score1:.921,
        score2:.619,
        score3:.731,
        final:735.892
      },
      {
        rank:'3',
        username:"Sarvesh Suresh",
        score1:.928,
        score2:.683,
        score3:'0.640',
        final:687.236
      },
      {
        rank:'4',
        username:"Shreyas Nahar",
        score1:.926,
        score2:.619,
        score3:.627,
        final:684.934
      },
      {
        rank:'5',
        username:"Shubhranshu Kumar Gupta",
        score1:.924,
        score2:.608,
        score3:.629,
        final:682.231
      },
    ];
    return data ? (
      <div className="container-fluid px-0">
        <NavsBar></NavsBar>
        <div className="aligning ">
          <div className="overlay mt-5 leaderStyle3">
            <div className="container">
              <h1 style={{textAlign:'center'}}>Congratulations to all the winners! 🌟</h1>
              <h4 style={{textAlign:'center'}}>Top two submissions will get cash prizes!</h4>
              <h3 className="text-center p-3">Final Leaderboard</h3>
              <h5 className="text-center p-3">Scores are calculated on 100% data</h5>
              <TableContainer component={Paper}>
                <Table
                  striped
                  bordered
                  hover
                  size="sm"
                  className={this.useStyles.table}
                >
                  <TableHead>
                    <TableRow className="leaderStyle2">
                      <TableCell>Rank</TableCell>
                      <TableCell>Username</TableCell>
                      <TableCell>C1</TableCell>
                      <TableCell>C2</TableCell>
                      <TableCell>C3</TableCell>
                      <TableCell>Final Score</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((val, index) => {
                      return (
                        <TableRow>
                          <TableCell>{val.rank}</TableCell>
                          <TableCell>{val.username}</TableCell>
                          <TableCell>
                            {val.score1}
                          </TableCell>
                          <TableCell>
                            {val.score2}
                          </TableCell>
                          <TableCell>
                            {val.score3}
                          </TableCell>
                          <TableCell>
                            {Math.round(val.final * 1000) / 1000}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </div>

        <div className="top" />
        <div className="bottom" />
      </div>
    ) : (
      <Spinner />
    );
  }
}

export default Leaderboard;
