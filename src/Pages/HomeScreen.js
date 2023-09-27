import React from "react";
//import { options } from "prettier-plugin-tailwindcss";

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="h-screen flex flex-col justify-center content-center items-center">
        <br />
        <header className="flex flex-col justify-center content-center items-center">
          <h1 className="text-7xl font-bold">uPLAY</h1>
          <h1 className="text-7xl font-bold">iGUESS</h1>
        </header>
        <br />
        <p className="text-xs">Powered by Spotify.</p>
        <br />
        <button className="btn" onClick={this.props.handleNext}>
          START
        </button>
      </div>
    );
  }
}
