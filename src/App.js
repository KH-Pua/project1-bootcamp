import React from "react";
import HomeScreen from "./Pages/HomeScreen.js";
import GameSelection from "./Pages/GameSelection.js";
import PlaylistSelection from "./Pages/PlaylistSelection.js";
import GamePlay from "./Pages/GamePlay.js";
import FinalScreen from "./Pages/FinalScreen.js";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.audioRef = React.createRef();
    this.state = {
      questionList: [
        {
          question: "Level",
          name: "gameSelection",
          display: ["Easy", "Intermediate"],
        },
        {
          question: "Region",
          name: "region",
          display: ["Eastern", "Western"],
        },
        {
          question: "Genre",
          name: "genre",
          display: {
            eastern: ["Cantopop", "Mandopop"],
            western: ["Classical", "Country", "Roadtrip"],
          },
        },
      ],
      // Flow of the app
      stage: 1,
      // Selection of difficulty
      gameSelection: "",
      // Selection of Playlist
      playlistSelection: "",
      // Combined track for game (3 tracks)
      combinedTrack: "",
      // Timer
      countdownTimer: 60,
      // User selected answer
      userSelectedAnswer: "",
      // Correct answer for each round
      correctAnswer: "",
      // Score
      scoreCount: 0,
      // Player status
      isPlaying: true,
    };
  }

  handleNext = () => {
    let { stage } = this.state;
    this.setState({
      stage: stage + 1,
    });
  };

  handlePrevious = () => {
    let { stage } = this.state;
    if (stage > 0) {
      this.setState({
        stage: stage - 1,
      });
    }
  };

  handleUpdate = (selection, value) => {
    // What to update? 1) Game Selection, Playlist Selection
    if (selection === "gameSelection") {
      this.setState({
        gameSelection: value,
      });
    } else if (selection === "playlistSelection") {
      this.setState({
        playlistSelection: value,
      });
    } else if (selection === "combinedTrack") {
      this.setState({
        combinedTrack: value,
      });
    } else if (selection === "countdownTimer") {
      this.setState({
        countdownTimer: value,
      });
    } else if (selection === "userSelectedAnswer") {
      this.setState({
        userSelectedAnswer: value,
      });
    } else if (selection === "correctAnswer") {
      this.setState({
        correctAnswer: value,
      });
    } else if (selection === "scoreCount") {
      this.setState({
        scoreCount: value,
      });
    } else if (selection === "isPlaying") {
      this.setState({
        isPlaying: value,
      });
    }
  };

  handleRestart = () => {
    this.setState({
      stage: 1,
      gameSelection: "",
      playlistSelection: "",
      combinedTrack: "",
      coundownTimer: 120,
      userSelectedAnswer: "",
      correctAnswer: "",
      scoreCount: 0,
    });
  };

  togglePlay = () => {
    let { isPlaying } = this.state;
    const audioElement = this.audioRef.current;

    if (isPlaying) {
      audioElement.pause();
    } else {
      audioElement.play();
    }

    this.setState((prevState) => ({
      isPlaying: !prevState.isPlaying,
    }));
  };

  render() {
    let {
      questionList,
      stage,
      gameSelection,
      playlistSelection,
      combinedTrack,
      coundownTimer,
      userSelectedAnswer,
      correctAnswer,
      scoreCount,
      isPlaying,
    } = this.state;
    let currentScreen;

    if (stage === 1) {
      currentScreen = <HomeScreen handleNext={this.handleNext}></HomeScreen>;
    } else if (stage === 2) {
      currentScreen = (
        <GameSelection
          questionList={questionList}
          handleNext={this.handleNext}
          handleUpdate={this.handleUpdate}
          handleRestart={this.handleRestart}
        ></GameSelection>
      );
    } else if (stage === 3) {
      currentScreen = (
        <PlaylistSelection
          questionList={questionList}
          gameSelection={gameSelection}
          handleNext={this.handleNext}
          handlePrevious={this.handlePrevious}
          handleUpdate={this.handleUpdate}
          handleRestart={this.handleRestart}
        ></PlaylistSelection>
      );
    } else if (stage === 4) {
      currentScreen = (
        <GamePlay
          handleNext={this.handleNext}
          handleUpdate={this.handleUpdate}
          gameSelection={gameSelection}
          playlistSelection={playlistSelection}
          combinedTrack={combinedTrack}
          coundownTimer={coundownTimer}
          userSelectedAnswer={userSelectedAnswer}
          correctAnswer={correctAnswer}
          scoreCount={scoreCount}
          isPlaying={isPlaying}
          togglePlay={this.togglePlay}
          audioRef={this.audioRef}
        ></GamePlay>
      );
    } else if (stage === 5) {
      currentScreen = (
        <FinalScreen
          handleRestart={this.handleRestart}
          scoreCount={scoreCount}
        ></FinalScreen>
      );
    }

    return <div className="App">{currentScreen}</div>;
  }
}

export default App;
