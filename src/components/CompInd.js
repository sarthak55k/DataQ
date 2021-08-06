import React, {Component} from "react";
import "../css/temp.css";
import {Redirect} from "react-router";
import {LevelDes} from "./LevelDes.js";
import {NavsBar} from "./NavsBar";
import axios from "axios";
import Spinner from "./spinner";
import {Markup} from "interweave";
import Alert from "@material-ui/lab/Alert";

export class CompInd extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null,
            data: null,
            file: null,
            scores: null,
            fileName: null,
            submissionsLeft: 0,
            alert: false,
            message: "",
            invalid: false,
        };
    }

    componentDidMount = () => {
        // localStorage.removeItem('yourTok')
        this.authListener();
    };

    authListener = () => {
        let tok = null;
        tok = localStorage.getItem("yourTok");
        let data = {
            CompID: this.props.match.params.compId,
        };

        const headers = {
            Authorization: `Bearer ${tok}`,
        };

        if (data.CompID <= 2 && data.CompID >= 0) {
            axios
                .post(`${process.env.REACT_APP_NODEJS_URL}/competition/View`, data, {
                    headers: headers,
                })
                .then((res) => {
                    console.log(res);
                    this.setState({
                        data: res.data.Competition,
                        user: res.data.user,
                        scores: res.data.Scores,
                        submissionsLeft: res.data.SubmissionsLeft,
                    });
                })
                .catch((e) => {
                    if (e.message) {
                        this.setState({alert: true, message: e.message});
                    }
                });
        } else {
            this.setState({
                invalid: true,
            });
        }
    };

    handleFileChange = (e) => {
        let {fileName} = this.state;
        this.setState({file: e[0]});

        fileName = e[0].name;
        this.setState({
            fileName,
        });
    };

    handleSubmission = (e) => {
        e.preventDefault();
        let {fileName, file} = this.state;

        let formData = new FormData();
        formData.append("csvFile", file);
        formData.append("fileName", fileName);

        formData.append("CompID", this.props.match.params.compId);
        formData.append("ThresholdScore60", this.state.data.ThresholdScore60);
        formData.append("ThresholdScore100", this.state.data.ThresholdScore100);

        console.log(this.props.match.params.compId, formData);
        axios({
            method: "post",
            url: `${process.env.REACT_APP_NODEJS_URL}/submission`,
            data: formData,

            headers: {
                Authorization: `Bearer ${localStorage.getItem("yourTok")}`,
                "Content-type": "multipart/form-data",
            },
        })
            .then((res) => {
                console.log(res);
                if (res.data.msg) {

                    this.setState({alert: true, message: res.data.msg});

                    alert(res.data.msg)

                    window.location.reload();
                    return;
                }
                alert("Submission done !!");
                window.location.reload();
            })
            .catch((error) => {
                alert(error.response.data.error)

            });
    };

    render() {
        let {data, user, scores} = this.state;
        console.log(user);
        return (
            <div className="container-fluid px-0">
                {this.state.user ? (
                    this.props.match.params.compId <= user.CurrentLevel ? (
                        <div>
                            <NavsBar></NavsBar>
                            {this.state.alert && (
                                <Alert
                                    onClose={() => {
                                        this.setState({alert: false, message: ""});
                                    }}
                                >
                                    {this.state.message}
                                </Alert>
                            )}
                            <div className="aligning ">
                                <div className="popup">
                                    <img
                                        src="/img/dataset.png"
                                        style={{width: "150px", height: "150px"}}
                                    />

                                    <hr className="hrTag2"/>
                                    <div className="mt-4">
                                        <h4>{data.Name} </h4>
                                        <p className="sentenceBrk text-muted">
                                            <Markup content={data.Introduction}/>
                                        </p>
                                    </div>
                                </div>

                                <div className="overlay">
                                    <LevelDes
                                        data={data}
                                        // name={data.Name}
                                        // description={data.Introduction}
                                        // rules = {data.Rules}
                                        // dataset = {data.DataSet}
                                        // trainLink = {data.TrainLink}
                                        // sampleLink = {data.SampleLink}
                                        // testLink = {data.TestLink}
                                        leaderBoard={scores}
                                        user={user}
                                        submissionsLeft={this.state.submissionsLeft}
                                        fileName={this.state.fileName}
                                        handleSubmission={this.handleSubmission}
                                        handleFileChange={this.handleFileChange}
                                    ></LevelDes>
                                </div>
                            </div>
                            <div className="top"/>
                            <div className="bottom"/>
                        </div>
                    ) : (
                        <div>not allowed</div>
                    )
                ) : this.state.invalid ? (
                    <Redirect to="/404"/>
                ) : (
                    <Spinner/>
                )}
            </div>
        );
    }
}

export default CompInd;
