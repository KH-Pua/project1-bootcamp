import React from "react";
import selectionsObj from "../utils.js";
//import { options } from "prettier-plugin-tailwindcss";

export default class PlaylistSelection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionNo: 1,
      categorySelection: "",
    };
  }

  handleClickForward = (event) => {
    let { questionNo, categorySelection } = this.state;
    let { handleUpdate } = this.props;
    let { value } = event.target;

    if (value === "Eastern" || value === "Western") {
      this.setState({
        questionNo: questionNo + 1,
        categorySelection: value.toLowerCase(),
      });
    } else {
      let playlist = selectionsObj[categorySelection][value.toLowerCase()];

      handleUpdate("playlistSelection", playlist);
      this.handleSongSelectionInitialize(playlist);
    }
  };

  handleSongSelectionInitialize = (playlistSelection) => {
    let { handleNext, handleUpdate } = this.props;

    // 1) Get Random number from playlistSelection.length e.g.("0-149")
    let randomIndexForAns = this.generateRandomIndexNumber(playlistSelection);

    console.log(playlistSelection);
    // 2) Access the array via the given number
    let correctTrack = playlistSelection[randomIndexForAns];

    console.log(correctTrack);
    // 3) Remove the selected song from the playlist and update the state
    playlistSelection.splice(randomIndexForAns, 1);

    // 4) Generate 3 random numbers
    let randomArrOfIndex = [];
    for (let i = 0; i < 2; i++) {
      let randomNumber = this.generateRandomIndexNumber(playlistSelection);
      randomArrOfIndex.push(randomNumber);
    }

    // 5) Map the 2 random numbers array and return an array of 3 track object.
    let remainingTrack = randomArrOfIndex.map((randomNumber) => {
      return playlistSelection[randomNumber];
    });

    // 6) Combined both "correctTrack" & "Remaining Track"
    let combinedTrack = remainingTrack.concat(correctTrack);

    // 7) Pass the modified/newly added item to parent state
    handleUpdate("playlistSelection", playlistSelection);
    handleUpdate("correctAnswer", correctTrack);
    handleUpdate("combinedTrack", combinedTrack);

    handleNext();
  };

  generateRandomIndexNumber = (arr) => {
    return Math.floor(Math.random() * arr.length);
  };

  render() {
    let { questionNo, categorySelection } = this.state;
    let { questionList, handlePrevious, handleRestart } = this.props;
    let buttonList;

    if (questionNo === 1) {
      buttonList = questionList[questionNo].display.map((option) => {
        return (
          <button
            className="btn btn-lg btn-wide font-bold text-3xl"
            onClick={this.handleClickForward}
            key={option}
            value={option}
          >
            {option}
          </button>
        );
      });
    } else if (questionNo === 2) {
      buttonList = questionList[questionNo].display[categorySelection].map(
        (option) => {
          return (
            <button
              className="btn btn-lg btn-wide font-bold text-3xl"
              onClick={this.handleClickForward}
              key={option}
              value={option}
            >
              {option}
            </button>
          );
        }
      );
    }

    return (
      <div className="h-screen flex flex-col justify-center content-center items-center gap-4">
        {buttonList}
        <div className="flex justify-between content-center items-center gap-4">
          <button onClick={handlePrevious} value="back">
            Back
          </button>
          <button onClick={handleRestart} value="restart">
            Restart
          </button>
        </div>
      </div>
    );
  }
}
