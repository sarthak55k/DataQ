import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import { Markup } from "interweave";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

const useS = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
  clrs: {
    fontWeight: "bold",
    fontFamily: "sans-serif",
    fontSize: "large",
    color: "#03045E",
  },
});

const columns = [
  {
    id: "rank",
    label: "Rank",
    align: "center",
    minWidth: 100,
  },
  {
    id: "username",
    label: "Username",
    align: "center",
    minWidth: 100,
  },
  {
    id: "last",
    label: "Last",
    minWidth: 100,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "totalEntry",
    label: "Total Entry",
    minWidth: 100,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "score",
    label: "Score",
    minWidth: 100,
    align: "center",
    format: (value) => value.toFixed(2),
  },
];

function createData(rank, username, last, totalEntry, score) {
  return { rank, username, last, totalEntry, score };
}

export const LevelDes = (props) => {
  let rows = [];
  props.leaderBoard.map((val, index) => {
    let ts = new Date(val.Submissions.maxDate);
    rows.push(
      createData(
        index + 1,
        val.Submissions.username,
        ts.toDateString(),
        val.Submissions.IndividualTotalSubs,
        val.Submissions.maxScore60
      )
    );
  });
  const classes = useS();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  let disable = true;
  let error = null;
  let formisValid = false;
  let allowedExtensions = /(\.csv)$/i;
  if (props.fileName != null) {
    if (!allowedExtensions.exec(props.fileName)) {
      error = "*Please upload a valid csv";
    }
  }

  return (
    <div>
      <Tabs
        className="tabStyle"
        fill
        defaultActiveKey="description"
        id="uncontrolled-tab-example"
      >
        <Tab eventKey="description" title="Description">
          <div className="container p-5 text-muted">
            <h4>{props.data.Name}</h4>
            <br />

            {/* {props.data.description} */}
            <Markup content={props.data.Introduction} />
          </div>
        </Tab>
        <Tab eventKey="rules" title="Rules">
          <div className="container p-5 text-muted">
            <Markup content={props.data.Rules}></Markup>
          </div>
        </Tab>
        <Tab eventKey="dataset" title="Dataset">
          <div className="container p-5 text-muted">
            <p className="mt-5">
              You can the download the various files from here:
            </p>

            <div className="row">
              <a
                href={props.data.SampleLink}
                rel="noopener noreferrer"
                target="_blank"
                className="text-decoration-none"
                style={{
                  color: "green",
                }}
              >
                <span>
                  <div class="downloadbox">sample_submission.csv</div>
                </span>
              </a>
              <a
                href={props.data.TrainLink}
                rel="noopener noreferrer"
                target="_blank"
                className="text-decoration-none"
              >
                <span>
                  <div class="downloadbox">train.csv</div>
                </span>
              </a>
              <a
                href={props.data.TestLink}
                rel="noopener noreferrer"
                target="_blank"
                className="text-decoration-none"
              >
                <span>
                  <div class="downloadbox">test.csv</div>
                </span>
              </a>
            </div>
            <br></br>
            <Markup content={props.data.DataSet} />

            <br />
          </div>
        </Tab>
        <Tab eventKey="submission" title="Submit">
          <div className="container pt-5 text-muted">
            <h4>Submission</h4>
            {/* {props.submit} */}
            You have {props.submissionsLeft} Left for the day for Competition{" "}
            {props.data.CompID + 1}
            <form
              className="submission"
              method="post"
              onSubmit={props.handleSubmission}
            >
              <div className="custom-file" style={{ width: "50vh" }}>
                <input
                  type="file"
                  name="file"
                  className="custom-file-input "
                  id="customFile"
                  onChange={(e) => {
                    props.handleFileChange(e.target.files);
                  }}
                />
                <label className="custom-file-label" for="customFile">
                  {props.fileName ? props.fileName : "Choose file"}
                </label>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="btn btn-outline-primary ml-5 "
                  disabled={
                    !props.fileName ||
                    props.submissionsLeft <= 0 ||
                    !allowedExtensions.exec(props.fileName)
                  }
                >
                  Upload
                </button>
                {error != null ? <p>{error}</p> : ""}
              </div>
            </form>
          </div>
        </Tab>
        <Tab eventKey="leaderboad" title="Leaderboard">
          <div className="container">
            {/* <Table striped bordered hover size="sm" className='leaderStyle'>
                    <thead >
                        <tr className ='leaderStyle2'>
                        <th>Rank</th>
                        <th >Username</th>
                        <th>Last</th>
                        <th>Total Entrys</th>
                        <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>

                        {props.leaderBoard.map( (val,index) => {
                           
                           let ts = new Date(val.Submissions.maxDate)
                           return(
                            <tr >
                            <td>{index+ 1}</td>
                            <td>{val.Submissions.username}</td>
                            <td>{ts.toDateString() }</td>
                            <td>{val.Submissions.IndividualTotalSubs}</td>
                            <td>{val.Submissions.maxScore60}</td>
                            </tr>)
                        })}
                    </tbody>
                    </Table> */}

            <Paper className={classes.root}>
              <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ minWidth: column.minWidth }}
                          className={classes.clrs}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={row.code}
                          >
                            {columns.map((column) => {
                              const value = row[column.id];
                              return (
                                <TableCell
                                  key={column.id}
                                  align={column.align}
                                  style={{ fontWeight: "bold" }}
                                >
                                  {column.format && typeof value === "number"
                                    ? column.format(value)
                                    : value}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </Paper>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};
