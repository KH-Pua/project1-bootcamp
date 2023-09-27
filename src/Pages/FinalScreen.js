import React from "react";

export default class FinalScreen extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        let { handleRestart, scoreCount } = this.props;

       return (
        <div className="h-screen flex flex-col justify-center content-center items-center">
            <h1 className="text-7xl font-bold">Game</h1>
            <h1 className="text-7xl font-bold">Over</h1>
            <br />
            <p className=" text-lg font-bold">Score: {scoreCount}</p>
            <br />
            <button className="btn" onClick={handleRestart}>Restart</button>
        </div>
       ) 
    }
}