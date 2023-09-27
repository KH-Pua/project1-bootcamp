import React from "react";

export default class MusicPlayer extends React.Component {
  constructor(props) {
    super(props);
    //this.audioRef = React.createRef();
    this.state = {};
  }

  // togglePlay = () => {
  //   let { isPlaying, handleUpdate } = this.props
  //   const audioElement = this.audioRef.current;

  //   if (isPlaying) {
  //     audioElement.pause();
  //   } else {
  //     audioElement.play();
  //   }
  //   handleUpdate("isPlaying", !isPlaying);
  // };

  playAudio = () => {
    let { audioRef } = this.props;
    const audioElement = audioRef.current;
    audioElement.play();
  };

  addAudioEventListener = () => {
    let { handleUpdate, audioRef } = this.props;
    const audioElement = audioRef.current;
    audioElement.addEventListener("ended", () => {
      handleUpdate("isPlaying", false);
    });
  };

  componentDidMount() {
    this.playAudio();
    this.addAudioEventListener();
  }

  componentDidUpdate(prevProps) {
    let { handleUpdate, source } = this.props;
    if (prevProps.source !== source) {
      this.playAudio();
      handleUpdate("isPlaying", true);
    }
  }

  render() {
    let { isPlaying, source, togglePlay, audioRef } = this.props;
    return (
      <div>
        <audio ref={audioRef} src={source} />
        <button
          className="btn btn-circle w-20 h-20 text-lg font-bold"
          onClick={togglePlay}
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
      </div>
    );
  }
}
