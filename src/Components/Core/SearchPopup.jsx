// import { APIKey, API_key } from "../../app-config";

import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import Popup from "reactjs-popup";
import { APIKey } from "../../app-config";

import Geocode from "react-geocode";
Geocode.setApiKey(APIKey);

const LocationIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-3   w-3"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default class LocationSearchPopup extends React.Component {
  state = {
    lat: 48.90628463347675,
    lng: 2.6378664312499955,
  };
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      lat: 48.90628463347675,
      lng: 2.6378664312499955,
    };
  }

  handleChange = (address) => {
    this.setState({ address });
  };

  handleSelect = (address) => {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        this.setState({ address, lat, lng });
      })
      .catch((error) => console.error("Error", error));
  };

  handleMarkerPositionChagne = async (lat, lng) => {
    console.log(lat, lng);
    let response;
    try {
      response = await Geocode.fromLatLng(lat, lng);
    } catch {
      return;
    }

    const address = response.results[0].formatted_address;
    this.setState({ address, lat, lng });
  };

  handleLocationSelect = (closeCB) => {
    const { lat, lng, address } = this.state;
    this.props.onLocationSelect(lat, lng, address);
    closeCB();
  };

  render() {
    return (
      <Popup
        modal
        trigger={
          <button className="ml-2 rounded p-2 bg-green-600">
            <LocationIcon />
          </button>
        }
        arrow={false}
      >
        {(close) => (
          <div className="bg-gray-900 rounded flex flex-col items-center p-4 ">
            <div className="w-full h-full flex flex-row space-x-4">
              <PlacesAutocomplete
                value={this.state.address}
                onChange={this.handleChange}
                onSelect={this.handleSelect}
              >
                {({
                  getInputProps,
                  suggestions,
                  getSuggestionItemProps,
                  loading,
                }) => (
                  <div className="w-full h-full relative mb-3">
                    <input
                      {...getInputProps({
                        placeholder: "Entrez une adresse",
                        className: "w-full rounded p-1 text-center ",
                      })}
                    />
                    <div className="absolute space-y-1 mt-2 z-10 bg-gray-700">
                      {loading && <div>Loading...</div>}
                      {suggestions.length > 0 &&
                        suggestions.map((suggestion, key) => {
                          const className = suggestion.active
                            ? "bg-green-900 rounded m-1 p-1"
                            : "bg-gray-600 rounded  m-1 p-1";
                          // inline style for demonstration purpose
                          const style = suggestion.active
                            ? { backgroundColor: "#fafafa", cursor: "pointer" }
                            : { backgroundColor: "#ffffff", cursor: "pointer" };
                          return (
                            <div
                              {...getSuggestionItemProps(suggestion, {
                                className,
                              })}
                              key={key}
                            >
                              <span>{suggestion.description}</span>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                )}
              </PlacesAutocomplete>
              <button
                className="h-8 w-max bg-green-600 p-1 rounded text-center"
                onClick={() => this.handleLocationSelect(close)}
              >
                Select location
              </button>
            </div>
            <div style={{ width: "800px", height: "600px" }}>
              <GoogleMap
                mapContainerStyle={{ width: "800px", height: "600px" }}
                center={this.state}
                zoom={10}
              >
                {/* Child components, such as markers, info windows, etc. */}
                <Marker
                  position={this.state}
                  draggable={true}
                  onDragEnd={(e) => {
                    this.handleMarkerPositionChagne(
                      e.latLng.lat(),
                      e.latLng.lng()
                    );
                  }}
                />
              </GoogleMap>
            </div>
          </div>
        )}
      </Popup>
    );
  }
}
