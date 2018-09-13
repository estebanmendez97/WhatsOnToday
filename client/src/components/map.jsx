import React, {Component} from 'react';
import { compose, withProps } from "recompose";
import InfoWindowMarker from './infowindow.jsx';
import { withScriptjs, withGoogleMap, GoogleMap, Marker} from "react-google-maps";


const Map = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBtBJDNeeT8yIMC4KuemtEuDYMNN6f3Pmc&libraries=geometry",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap )((props) =>

            <GoogleMap
                defaultZoom={12}
                defaultCenter={{ lat:19.4222496, lng:-99.1740582}}
                options={{streetViewControl: false, mapTypeControl: false}}>

                {props.locationInfo.map(( marker, i ) =>

                  <InfoWindowMarker
                    key={i}
                    position={{lat: parseFloat(marker[0]), lng: parseFloat(marker[1]) }}
                    title={marker[2]}
                    name={marker[3]}
                    description={marker[4]}
                    />
                )}

            </GoogleMap>


)

export default Map;
