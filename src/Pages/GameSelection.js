//import { options } from "prettier-plugin-tailwindcss";
import React from "react";

export default class GameSelection extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClickForward = (event) => {
    const { name, value } = event.target
    let { handleUpdate, handleNext } = this.props
    // Is it possible to have 2 setState function overlaps together without doing callbacks?
    handleUpdate(name, value);
    handleNext();
  }

  render() {
  let { questionList, handleRestart } = this.props
  let questionObj = questionList[0];

  let buttonList = questionObj.display.map((option) => {
    return <button className="btn btn-lg btn-wide font-bold text-3xl" onClick={this.handleClickForward} key={option} name={questionObj.name} value={option}>{option}</button>
  })

    return (
      <div className="h-screen flex flex-col justify-center content-center items-center gap-4">
        {buttonList}
        <button onClick={handleRestart} name="restart" value="Restart">Restart</button>
      </div>
    );
  }
}