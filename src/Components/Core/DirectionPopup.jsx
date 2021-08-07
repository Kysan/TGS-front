// import { APIKey, API_key } from "../../app-config";

import {
  DirectionsRenderer,
  DirectionsService,
  GoogleMap,
  LoadScript,
  Marker,
} from "@react-google-maps/api";
import React from "react";
import Popup from "reactjs-popup";
import { APIKey } from "../../app-config";

import Geocode from "react-geocode";
Geocode.setApiKey(APIKey);

export default class DirectionPopup extends React.Component {
  state = {
    response: null,
    travelMode: "DRIVING",
  };

  directionsCallback = (response) => {
    console.log(response);

    if (response) {
      if (response.status === "OK") {
        this.setState({ response });
      } else {
        console.log("response: ", response);
      }
    }
  };

  render() {
    return (
      <Popup
        modal
        trigger={
          <button className="bg-green-600 rounded px-2">Show Traject</button>
        }
        arrow={false}
      >
        {(close) => (
          <div className="bg-gray-900 rounded flex flex-col items-center p-4 ">
            <div style={{ width: "800px", height: "600px" }}>
              <GoogleMap
                mapContainerStyle={{ width: "800px", height: "600px" }}
                center={this.state}
                zoom={10}
              >
                {this.state.destination !== "" && this.state.origin !== "" && (
                  <DirectionsService
                    options={{
                      destination: this.props.destination,
                      origin: this.props.origin,
                      travelMode: this.state.travelMode,
                    }}
                    callback={this.directionsCallback}
                  />
                )}

                {this.state.response !== null && (
                  <DirectionsRenderer
                    options={{
                      directions: this.state.response,
                    }}
                  />
                )}
              </GoogleMap>
            </div>
          </div>
        )}
      </Popup>
    );
  }
}
