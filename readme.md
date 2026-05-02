# Network Traffic Analyzer

A real-time network traffic monitoring platform built with Python and React. The system captures live packets from a network interface, analyzes their contents, identifies protocols and services, and presents the data through a web-based interface.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Packet Capture | Python, Scapy |
| Backend API | Flask |
| Frontend | React, Bootstrap |
| Communication | REST API over HTTP |

---

## Project Structure

```
network-traffic-analyzer/
│
├── backend/
│   ├── app.py            - Flask API server and route definitions
│   ├── sniffer.py        - Packet capture engine using Scapy
│   ├── protocols.py      - Protocol numbers and service port mappings
│   └── stats.py          - Statistics calculation logic
│
└── frontend/
    ├── src/
    │   ├── App.jsx
    │   ├── components/
    │   │   ├── Controls.jsx      - Start, Stop, Clear buttons
    │   │   ├── FilterBar.jsx     - Filter controls
    │   │   ├── PacketTable.jsx   - Live packet display table
    │   │   └── Statistics.jsx    - Statistics display
    │   └── services/
    │       └── api.js            - All Flask API calls
    └── package.json
```

---

## Requirements

- Python 3.x
- Node.js
- Npcap for Windows — https://npcap.com/#download
  - During installation, enable "WinPcap API-compatible Mode"

---

## Setup and Running

### Backend

```bash
cd backend
pip install flask flask-cors scapy
python app.py
```

On Windows, run the terminal as Administrator. Scapy requires elevated permissions to access raw network packets.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Access

Open a browser and go to:

```
http://localhost:5173
```

---

## Features

- Live packet capture from a selected network interface
- Protocol identification including TCP, UDP, ICMP, and ARP
- Service mapping from destination port numbers to service names
- Filter packets by protocol type, source IP, or destination IP
- Statistics including total packet count, per-protocol breakdown, and average packet size
- Extraction of MAC addresses, TTL values, and TCP flags
- Start and stop capture controls through the web interface

---

## Captured Packet Fields

| Field | Description |
|---|---|
| Time | Timestamp when packet was captured |
| Source IP | IP address the packet originated from |
| Destination IP | IP address the packet is going to |
| Protocol | TCP, UDP, ICMP, or ARP |
| Service | Mapped service name based on destination port |
| Source Port | Port on the sender side |
| Destination Port | Port on the receiver side |
| Size | Total packet size in bytes |
| TTL | Time to live field from IP header |
| Flags | TCP control flags such as SYN, ACK, FIN |
| MAC Source | Hardware address of sender |
| MAC Destination | Hardware address of receiver |

---

## Notes

- The interface used for capture is auto-detected by matching the local IP address
- The system uses AsyncSniffer from Scapy to run capture in a non-blocking background process
- Filtering is handled server-side through query parameters on the /packets endpoint

---

## Author

Ahmad Fayyaz  
Computer Networks Project  
```