import GoogleMaps from "simple-react-google-maps";
import "./Map.css";

const Map = ({ lat, lng }) => {
  return (
    <div className="google-maps-container">
      <GoogleMaps
        apiKey={process.env.REACT_APP_API_KEY_GOOGLE_MAPS}
        style={{ minHeight: "100%", width: "100%", borderRadius: "10px" }}
        zoom={12}
        center={{ lat, lng }}
        markers={{ lat, lng }}
      />
    </div>
  );
};

export default Map;
