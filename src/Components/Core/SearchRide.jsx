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
      <div className="w-full h-full flex flex-row overflow-auto">
        <div className="flex flex-col h-full w-1/2 gap-5 ml-4">
          <div className="flex flex-col">
            <div>Start</div>
            <div className="flex flex-row mr-2">
              <input
                className="bg-white text-black p-1 rounded w-full"
                value={start.adr}
                placeholder="Please select a location"
                // onChange={(e) =>
                //   this.setState({
                //     start: { ...start, adr: e.currentTarget.value },
                //   })
                // }
              />
              <LocationSearchPopup onLocationSelect={this.handleStartSelect} />
            </div>
          </div>
          <div className="flex flex-col">
            <div>Arrival</div>
            <div className="flex flex-row mr-2">
              <input
                className="bg-white text-black p-1 rounded w-full"
                value={arrival.adr}
                placeholder="Please select a location"
                // onChange={(e) =>
                //   this.setState({
                //     arrival: { ...arrival, adr: e.currentTarget.value },
                //   })
                // }
              />

              <LocationSearchPopup
                onLocationSelect={this.handleArrivalSelect}
              />
            </div>
          </div>
          <div className="flex flex-col w-max">
            {this.state.arrival.adr && this.state.start.adr && (
              <DirectionPopup
                origin={this.state.start.adr}
                destination={this.state.arrival.adr}
              />
            )}
          </div>
          <div className="flex flex-col w-min h-max">
            <button
              className="bg-green-600 rounded px-2"
              onClick={this.handleRideSearch}
            >
              Search
            </button>
          </div>
        </div>
        <div className="flex flex-col w-1/2 h-full text-black flex overflow-x-hidden">
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
  <div class="border-gray-400 flex flex-row mb-2 w-full h-32 ml-16">
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
