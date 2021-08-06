import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Markup } from "interweave";
export const LevelsList = (props) => {
  console.log(props);
  return (
    <div className="container p-5 " style={{ marginBottom: "1em" }}>
      <h3>Levels</h3>
      <hr />
      {props.levels.map((val, index) => {
        let style = {
          borderRadius: "10px",
          padding: "1em",
          boxShadow: "0 0 10px",
        };
        let buttonColor = "";
        let disabled = "disabled";
        if (index < props.userLevel) {
          style = { ...style, border: "#e5ffcc 5px solid" };
          disabled = "";
          buttonColor = "complete";
        } else if (index == props.userLevel) {
          style = { ...style, border: "#ccffff  5px solid" };
          disabled = "";
          buttonColor = "current";
        } else {
          style = { ...style, border: "#ffcccc  5px solid" };
          buttonColor = "disabled";
        }
        return (
          <>
            <div className="mt-4 level-list" style={style}>
              <ul key={"l" + index}>
                <h5>{val.Name}</h5>
                <Markup className="sentenceBrk" content={val.Introduction} />
                <button
                  className={"button " + disabled + " " + buttonColor}
                  onClick={() => props.handleView(index)}
                >
                  view
                </button>
              </ul>
            </div>
          </>
        );
      })}
    </div>
  );
};
