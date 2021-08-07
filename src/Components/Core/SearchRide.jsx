import React, { Component } from "react";
import { searchRide } from "../../Services/rideService";
import DirectionPopup from "./DirectionPopup";
import LocationSearchPopup from "./SearchPopup";

class SearchRide extends Component {
  state = {
    start: { lat: 0, long: 0, adr: "" },
    arrival: { lat: 0, long: 0, adr: "" },
    rides: [],
  };

  handleStartSelect = (lat, long, adr) => {
    this.setState({ start: { lat, long, adr } });
  };

  handleArrivalSelect = (lat, long, adr) => {
    this.setState({ arrival: { lat, long, adr } });
  };

  handleRideSearch = async () => {
    const { start, arrival } = this.state;
    const rides = await searchRide(
      start.lat,
      start.long,
      arrival.lat,
      arrival.long
    );
    console.log(rides);
    this.setState({ rides });
  };

  render() {
    const { start, arrival } = this.state;
    return (
      <div className="w-full h-full flex flex-col gap-5 p-x-16">
        <div className="flex flex-col">
          <div>Start</div>
          <div>
            <span className="bg-white text-black p-1 rounded">
              {start.adr ? start.adr : "Plase select a location"}
            </span>
            <LocationSearchPopup onLocationSelect={this.handleStartSelect} />
          </div>
        </div>
        <div className="flex flex-col">
          <div>Arrival</div>
          <div>
            <span className="bg-white text-black p-1 rounded">
              {arrival.adr ? arrival.adr : "Plase select a location"}
            </span>
            <LocationSearchPopup onLocationSelect={this.handleArrivalSelect} />
          </div>
        </div>
        <div>
          {this.state.arrival.adr && this.state.start.adr && (
            <DirectionPopup
              origin={this.state.start.adr}
              destination={this.state.arrival.adr}
            />
          )}
        </div>
        <div>
          <button
            className="bg-green-600 rounded px-2"
            onClick={this.handleRideSearch}
          >
            Search
          </button>
        </div>
        <div className="flex flex-col space-y-4">
          {this.state.rides.map((r, key) => (
            <div key={key}>{JSON.stringify(r)}</div>
          ))}
        </div>
      </div>
    );
  }
}

export default SearchRide;
