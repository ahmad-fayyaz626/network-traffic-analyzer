from flask import Flask, jsonify, request
from flask_cors import CORS

from sniffer import (
    start_capture,
    stop_capture,
    get_packets,
    get_status
)
from stats import calculate_stats

app = Flask(__name__)
CORS(app, resources={
    r"/*": {
        "origins": "*",
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type"]
    }
})        
#to check if Flask server is running or not
@app.route("/")
def home():
    return jsonify({
        "status":  "running",
        "message": "Network Analyzer API is live"
    })


# ── Start Capture ─────────────────────────────────────────────
# React calls this when user clicks Start button

@app.route("/start", methods=["GET", "POST", "OPTIONS"])
def start():
    start_capture()
    return jsonify({"success": True, "message": "Capture started"})

@app.route("/stop", methods=["GET", "POST", "OPTIONS"])
def stop():
    stop_capture()
    return jsonify({"success": True, "message": "Capture stopped"})

# React calls this to know if capturing is running
@app.route("/status", methods=["GET", "POST", "OPTIONS"])
def status():
    return jsonify(get_status())

@app.route("/packets", methods=["GET"])
def packets():
    all_packets = get_packets()

    #  Filtering Logic
    # React sends filter values as query parameters like:
    # /packets?protocol=TCP&src_ip=192.168.1.5
    # We read them here and filter the list accordingly

    protocol = request.args.get("protocol", "").strip().upper()
    src_ip   = request.args.get("src_ip",   "").strip()
    dst_ip   = request.args.get("dst_ip",   "").strip()

    filtered = all_packets

    # Apply protocol filter if provided
    if protocol:
        filtered = [
            p for p in filtered
            if p["protocol"] == protocol
        ]

    # Apply source IP filter if provided
    if src_ip:
        filtered = [
            p for p in filtered
            if src_ip in p["src_ip"]
        ]

    # Apply destination IP filter if provided
    if dst_ip:
        filtered = [
            p for p in filtered
            if dst_ip in p["dst_ip"]
        ]

    return jsonify(filtered)



# React calls this to display the statistics section
@app.route("/stats", methods=["GET"])
def stats():
    return jsonify(calculate_stats())



# React calls this when user wants to clear the table
@app.route("/clear", methods=["POST"])
def clear():
    from sniffer import captured_packets
    captured_packets.clear()
    return jsonify({
        "success": True,
        "message": "Packets cleared"
    })

if __name__ == "__main__":
    print("=" * 55)
    print("   Network Analyzer API starting on port 5000")
    print("   Run React frontend separately on port 3000")
    print("=" * 55)
    app.run (debug=True , port=5000)