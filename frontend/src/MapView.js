import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

const getIcon = (status) => {
  let color = "green";
  if (status === "High Traffic") color = "red";
  else if (status === "Moderate Traffic") color = "orange";

  return new L.Icon({
    iconUrl: `https://maps.google.com/mapfiles/ms/icons/${color}-dot.png`,
    iconSize: [30, 30]
  });
};

function MapView({ data }) {
  return (
    <MapContainer
      center={[28.61, 77.23]}
      zoom={13}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {data.map((d, i) => (
        <Marker
          key={i}
          position={[d.lat, d.lng]}
          icon={getIcon(d.status)}
        >
          <Popup>
            <b>{d.zone}</b><br />
            {d.status}<br />
            Delay: {d.delay} min<br />
            {d.forecast}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default MapView;