import React from "react";
import MusicPlayer from "../Components/MusicPlayer";
//import { options } from "prettier-plugin-tailwindcss";

export default class GamePlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedButtonValue: "",
      result: "",
    };
  }

  generateRandomIndexNumber = (arr) => {
    return Math.floor(Math.random() * arr.length);
  };

  songSelection = () => {
    let { playlistSelection, handleNext, handleUpdate } = this.props;
    let { result, selectedButtonValue } = this.state;

    if (result !== "" || selectedButtonValue !== "") {
      this.setState({
        selectedButtonValue: "",
        result: "",
      });
    }

    if (playlistSelection.length > 3 || playlistSelection.length === 3) {
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
      let shuffledArrayTrack = this.shuffleArray(combinedTrack);

      // 7) Pass the modified/newly added item to parent state
      handleUpdate("playlistSelection", playlistSelection);
      handleUpdate("correctAnswer", correctTrack);
      handleUpdate("combinedTrack", shuffledArrayTrack);
    } else {
      //Exit GamePlay
      handleNext();
    }
  };

  shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  selectKeyValuePairs = (obj, keys) => {
    const result = {};

    keys.forEach((key) => {
      result[key] = obj[key];
    });

    return Object.entries(result);
  };

  validateAnswerEasy = (event) => {
    let { correctAnswer, handleUpdate, scoreCount, isPlaying, togglePlay } =
      this.props;

    if (event.target.value === correctAnswer.trackName) {
      //1) ScoreCount + 1
      handleUpdate("scoreCount", scoreCount + 1);
      if (isPlaying === true) {
        togglePlay();
      }
      //2) Set gameState to correct (When Correct the button will turn green)
      this.setState(
        {
          selectedButtonValue: event.target.value,
        },
        () => {
          setTimeout(() => {
            this.songSelection();
          }, 2000);
        }
      );
    } else {
      if (isPlaying === true) {
        togglePlay();
      }
      this.setState(
        {
          selectedButtonValue: event.target.value,
        },
        () => {
          setTimeout(() => {
            this.songSelection();
          }, 2000);
        }
      );
    }
  };

  validateAnswerIntermediate = (event) => {
    let { selectedButtonValue } = this.state;
    let { correctAnswer, handleUpdate, scoreCount, isPlaying, togglePlay } =
      this.props;
    let { name, value } = event.target;

    delete correctAnswer.albumArt;
    delete correctAnswer.trackPreviewUrl;

    if (Object.keys(selectedButtonValue).length === 3) {
      if (this.objectsComparison(correctAnswer, selectedButtonValue)) {
        if (isPlaying === true) {
          togglePlay();
        }
        handleUpdate("scoreCount", scoreCount + 1);
        this.setState(
          {
            result: true,
          },
          () => {
            setTimeout(() => {
              this.songSelection();
            }, 3000);
          }
        );
      } else {
        if (isPlaying === true) {
          togglePlay();
        }
        this.setState(
          {
            result: false,
          },
          () => {
            setTimeout(() => {
              this.songSelection();
            }, 3000);
          }
        );
      }
    } else {
      this.setState({
        selectedButtonValue: {
          ...selectedButtonValue,
          [name]: value,
        },
      });

      let obj = { ...selectedButtonValue };
      console.log(obj);

      obj[name] = value;
      console.log(obj);

      if (Object.keys(obj).length === 3) {
        if (this.objectsComparison(correctAnswer, obj)) {
          if (isPlaying === true) {
            togglePlay();
          }
          handleUpdate("scoreCount", scoreCount + 1);
          this.setState(
            {
              result: true,
            },
            () => {
              setTimeout(() => {
                this.songSelection();
              }, 2000);
            }
          );
        } else {
          if (isPlaying === true) {
            togglePlay();
          }
          this.setState(
            {
              result: false,
            },
            () => {
              setTimeout(() => {
                this.songSelection();
              }, 2000);
            }
          );
        }
      }
    }
  };

  objectsComparison = (obj1, obj2) => {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
      return false;
    }
    for (const key of keys1) {
      if (obj1[key] !== obj2[key]) {
        return false;
      }
    }
    return true;
  };

  componentDidMount() {
    // let { countdownTimer, handleUpdate, handleNext } = this.props;
    // // NEED TO WAIT FOR 2 SECONDS BEFORE THE COUNTDOWN STARTS? E.G. (READY.... START!)
    // this.timerInterval = setInterval(() => {
    //   if (countdownTimer > 0) {
    //     console.log(countdownTimer);
    //     handleUpdate("countdownTimer", countdownTimer - 1);
    //   } else {
    //     clearInterval(this.timerInterval);
    //     handleNext();
    //   }
    // }, 1000);
  }

  componentWillUnmount() {
    // clearInterval(this.timerInterval);
  }

  render() {
    let {
      gameSelection,
      combinedTrack,
      scoreCount,
      handleNext,
      handleUpdate,
      isPlaying,
      togglePlay,
      audioRef,
    } = this.props;
    const { correctAnswer } = this.props;
    let { selectedButtonValue, result } = this.state;
    let selectionButtons, exitButton;
    let announcement, instruction;

    // Play button
    let trackUrl = correctAnswer.trackPreviewUrl;

    if (gameSelection === "Easy") {
      instruction = <p className="text-xs">Select Track</p>;

      // Map shuffled track into buttons
      selectionButtons = combinedTrack.map((object) => (
        <button
          className="btn btn-lg btn-wide normal-case"
          onClick={this.validateAnswerEasy}
          key={`${object.trackName}${object.artistName}${object.albumName}`}
          value={object.trackName}
        >
          {object.trackName}
        </button>
      ));

      if (selectedButtonValue === "") {
        // Return original selectionButtons here.
        selectionButtons.forEach((buttonObj) => {
          return buttonObj;
        });
      } else if (selectedButtonValue === correctAnswer.trackName) {
        // Selected button appear green through accessing the JSX Object and append/edit certain className
        selectionButtons = selectionButtons.map((buttonObj) => {
          if (buttonObj.props.value === selectedButtonValue) {
            console.log(buttonObj.props.value);
            return React.cloneElement(buttonObj, {
              className: "btn btn-lg btn-wide bg-green-500 normal-case",
            });
          } else {
            console.log(buttonObj.props.value);
            return React.cloneElement(buttonObj, {
              className: "btn btn-lg btn-wide btn-disabled normal-case",
            });
          }
        });
        announcement = "Congratz, You are correct!";
      } else if (selectedButtonValue !== correctAnswer.trackName) {
        // Selected button appear red, while correctAnswer.trackName button appear green
        selectionButtons = selectionButtons.map((buttonObj) => {
          if (buttonObj.props.value === selectedButtonValue) {
            console.log(buttonObj.props.value);
            return React.cloneElement(buttonObj, {
              className: "btn btn-lg btn-wide bg-red-500 normal-case",
            });
          } else if (buttonObj.props.value === correctAnswer.trackName) {
            console.log(buttonObj.props.value);
            return React.cloneElement(buttonObj, {
              className: "btn btn-lg btn-wide bg-green-500 normal-case",
            });
          } else {
            console.log(buttonObj.props.value);
            return React.cloneElement(buttonObj, {
              className: "btn btn-lg btn-wide btn-disabled normal-case",
            });
          }
        });
        announcement = "Wrong Answer!";
      }
    } else if (gameSelection === "Intermediate") {
      instruction = (
        <div className=" flex flex-col justify-center content-center items-center gap-1">
          <p className="text-xs">Select Track, Artist & Album.</p>
          <p className="text-xs">Selection with the same category will be overlapped.</p>
        </div>
      )

      //1) Select certain "values" from given "keys", return a nested key, value entries array.
      let nestedKeyValuePairs = combinedTrack.map((trackObj) =>
        this.selectKeyValuePairs(trackObj, [
          "trackName",
          "artistName",
          "albumName",
        ])
      );

      //2) Mapped the key value pairs into buttons
      let nestedArrButtons = nestedKeyValuePairs.map((entriesArr) =>
        entriesArr.map((attr) => (
          <button
            className="btn btn-md btn-wide text-sm normal-case"
            onClick={this.validateAnswerIntermediate}
            name={attr[0]}
            key={`${attr[0]}${attr[1]}`}
            value={attr[1]}
          >
            {attr[1]}
          </button>
        ))
      );

      //3) Flatten array and shuffle.
      selectionButtons = [].concat(...nestedArrButtons);

      if (result === "") {
        selectionButtons = selectionButtons.map((buttonObj) => {
          if (
            buttonObj.props.value === selectedButtonValue[buttonObj.props.name]
          ) {
            return React.cloneElement(buttonObj, {
              className: "text-sm btn btn-md btn-wide bg-slate-400 normal-case",
            });
          }
          return buttonObj;
        });
      } else if (result === true) {
        selectionButtons = selectionButtons.map((buttonObj) => {
          if (
            buttonObj.props.value === selectedButtonValue[buttonObj.props.name]
          ) {
            return React.cloneElement(buttonObj, {
              className: "text-sm btn btn-md btn-wide bg-green-500 normal-case",
            });
          }
          return buttonObj;
        });
        announcement = "Congratz, You are correct!";
      } else if (result === false) {
        selectionButtons = selectionButtons.map((buttonObj) => {
          if (buttonObj.props.value === correctAnswer[buttonObj.props.name]) {
            return React.cloneElement(buttonObj, {
              className: "text-sm btn btn-md btn-wide bg-green-500 normal-case",
            });
          }
          if (
            buttonObj.props.value === selectedButtonValue[buttonObj.props.name]
          ) {
            return React.cloneElement(buttonObj, {
              className: "text-sm btn btn-md btn-wide bg-red-500 normal-case",
            });
          }
          return buttonObj;
        });
        announcement = "Wrong Answer!";
      }
    }

    exitButton = <button onClick={handleNext}>Quit Game</button>;

    return (
      <div className="h-screen flex flex-col justify-center content-center items-center gap-3">
        <p>Score: {scoreCount}</p>
        <MusicPlayer
          source={trackUrl}
          isPlaying={isPlaying}
          togglePlay={togglePlay}
          audioRef={audioRef}
          handleUpdate={handleUpdate}
        ></MusicPlayer>
        {instruction}
        {selectionButtons}
        <div>
          <p className="font-bold">{announcement}</p>
          <br />
          {exitButton}
        </div>
      </div>
    );
  }
}
