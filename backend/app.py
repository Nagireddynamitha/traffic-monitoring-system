from flask import Flask, jsonify
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)

zones = [
    {"name": "Central Junction", "lat": 28.61, "lng": 77.23},
    {"name": "Market Road", "lat": 28.62, "lng": 77.21},
    {"name": "Highway Exit", "lat": 28.60, "lng": 77.25}
]

def generate():
    data = []
    for z in zones:
        delay = random.randint(5, 30)

        if delay > 20:
            status = "High Traffic"
        elif delay > 10:
            status = "Moderate Traffic"
        else:
            status = "Smooth"

        if delay > 22:
            forecast = "Heavy congestion expected"
        elif delay > 12:
            forecast = "Traffic may increase"
        else:
            forecast = "Stable flow"

        data.append({
            "zone": z["name"],
            "lat": z["lat"],
            "lng": z["lng"],
            "status": status,
            "delay": delay,
            "forecast": forecast
        })

    return data

@app.route("/traffic")
def traffic():
    return jsonify(generate())

if __name__ == "__main__":
    app.run(debug=True)