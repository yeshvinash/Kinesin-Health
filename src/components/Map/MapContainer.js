import { useState, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  MarkerF,
  InfoBox,
} from "@react-google-maps/api";

const MapContainer = ({
  google,
  eircode,
  onEircodeChange,
  onLocationChange,
}) => {
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
  const [locationName, setLocationName] = useState("");
  const Apikey = "AIzaSyAa3Et--Rjr1Ut1l-D4Vj_aD1CAt9zLoXk";
  useEffect(() => {
    if ("geolocation" in navigator) {
      // Request the user's location
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoordinates({ lat: latitude, lng: longitude });
          onLocationChange({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.log(error.message);
        }
      );
    } else {
      console.log("Geolocation is not supported by your browser.");
    }
  }, []);
  useEffect(() => {

    if(eircode === undefined || eircode == '') {
      eircode = 'D01 F5P2'
    }

    const geocodingAPI = `https://maps.googleapis.com/maps/api/geocode/json?address=${eircode}&key=${Apikey}`;

    fetch(geocodingAPI)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.results[0] && data.results[0].geometry) {
          console.log("Data", data);
          console.log(
            "Data for logtitude and latitutde",
            data.results[0].geometry.location
          );
          setCoordinates(data.results[0].geometry.location);
          setLocationName(data.results[0].formatted_address);
          onLocationChange(data.results[0].geometry.location);
        }
      })
      .catch((error) => {
        console.error("Error fetching geocoding data:", error);
      });
  }, [eircode]);

  console.log("eircode", eircode);
  const mapStyles = {
    height: "400px",
    width: "100%",
  };
  const handleMarkerDragEnd = (e) => {
    const newCoordinates = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };
    setCoordinates(newCoordinates);
    onLocationChange(newCoordinates);
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: newCoordinates }, (results, status) => {
      if (status === "OK" && results[0]) {
        const postalCodeComponent = results[0].address_components.find(
          (component) => component.types.includes("postal_code")
        );
        if (postalCodeComponent) {
          const newEircode = postalCodeComponent.short_name;
          onEircodeChange(newEircode);
          console.log("new code", newEircode);
        } else {
          console.error("No postal_code ");

          onEircodeChange("");
        }
      } else {
        console.error("Geocoding error:", status);

        onEircodeChange("Error");
      }
    });
  };

  return (
    <>
      <LoadScript googleMapsApiKey="AIzaSyAUsP5e2f5akojs80tqGKxXrzVEFPl2wDE">
        <GoogleMap mapContainerStyle={mapStyles} zoom={15} center={coordinates}>
          <MarkerF
            position={coordinates}
            onDragEnd={handleMarkerDragEnd}
            draggable={true}
          />
          ;
        </GoogleMap>
      </LoadScript>
    </>
  );
};

export default MapContainer;
