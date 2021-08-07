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
      <div className="w-full h-full flex flex-col gap-5 p-x-16 overflow-auto">
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
        <div className="flex flex-col mx-auto w-full h-full items-center justify-center text-black flex overflow-scroll">
          {this.state.rides
            .sort((a, b) => a.price - b.price)
            .map(({ name, type, price, arrivalTime }, key) => {
              const data = { name, type, price, arrivalTime };
              return (
                <div key={key}>
                  <RideOffer {...data} />
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

const RideOffer = ({ name, type, price, arrivalTime }) => (
  <div class="border-gray-400 flex flex-row mb-2" style={{ width: 512 }}>
    <div class="select-none cursor-pointer bg-gray-200 rounded-md flex flex-row items-center p-4">
      <div class="flex flex-col rounded-md w-10 h-10 bg-gray-300 justify-center items-center mr-4">
        {type.substr(0, 3)}
      </div>
      <div class="flex-1 pl-1 mr-16">
        <div class="font-medium">{name}</div>
        <div class="text-gray-600 text-sm">{price} €</div>
      </div>
      <div class="text-gray-600 text-xs">
        {Math.floor(arrivalTime / 60)} min
      </div>
    </div>
  </div>
);

export default SearchRide;
