import { useEffect, useState } from "react";
import MapView from "./MapView";
import "./App.css";

function App() {
  const [traffic, setTraffic] = useState([]);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const loadData = () => {
      fetch("http://127.0.0.1:5000/traffic")
        .then(res => res.json())
        .then(data => {
          setTraffic(data);

          const alertList = data
            .filter(d => d.status !== "Smooth")
            .map(d => ({
              text: `${d.zone} - ${d.status}`,
              type: d.status === "High Traffic" ? "high" : "moderate"
            }));

          setAlerts(alertList);
        })
        .catch(err => console.error(err));
    };

    // first load
    loadData();

    // auto refresh every 5 seconds
    const interval = setInterval(loadData, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="layout">

      {/* Sidebar */}
      <aside className="sidebar">
        <h2>🚦 STM</h2>
        <p>Overview</p>
        <p>Live Map</p>
        <p>Alerts</p>
      </aside>

      {/* Main */}
      <div className="main">

        {/* Header */}
        <div className="header">
          <h1>Smart Traffic Monitoring System</h1>
        </div>

        {/* Alerts */}
        <div className="alerts">
          <h3>🚨 Alerts</h3>
          {alerts.length === 0 ? (
            <p>No Alerts</p>
          ) : (
            alerts.map((a, i) => (
              <div key={i} className={a.type}>
                {a.text}
              </div>
            ))
          )}
        </div>

        {/* Map */}
        <div className="map-box">
          <MapView data={traffic} />
        </div>

      </div>
    </div>
  );
}

export default App;