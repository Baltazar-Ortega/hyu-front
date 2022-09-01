import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

import { locationCoordinates } from "./../../lib/helpers"

class Mapa extends Component {
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={15}
        initialCenter={locationCoordinates}
      >
        <Marker position={locationCoordinates} />
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.NEXT_PUBLIC_API_KEY_MAPS,
})(Mapa);
