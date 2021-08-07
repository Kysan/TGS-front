import React, { Component } from "react";
import LocationSearchPopup from "./SearchPopup";

class SearchRide extends Component {
  state = {
    start: { lat: 0, long: 0, adr: "" },
    arrival: { lat: 0, long: 0, adr: "" },
  };

  handleStartSelect = (lat, long, adr) => {
    this.setState({ start: { lat, long, adr } });
  };

  handleArrivalSelect = (lat, long, adr) => {
    this.setState({ arrival: { lat, long, adr } });
  };

  render() {
    const { start, arrival } = this.state;
    return (
      <div className="w-full h-full flex flex-col gap-5 p-x-16">
        <div>
          start: {start.adr}
          <LocationSearchPopup onLocationSelect={this.handleStartSelect} />
        </div>
        <div>
          arrival: {arrival.adr}
          <LocationSearchPopup onLocationSelect={this.handleArrivalSelect} />
        </div>
      </div>
    );
  }
}

export default SearchRide;
