// src/components/Controls.jsx
import { useState } from "react";
import { startCapture, stopCapture, clearPackets } from "../Services/api";
export default function Controls({ isCapturing, setIsCapturing, onClear }) {
  const [loading, setLoading] = useState(false);
  const handleStart = async () => {
    setLoading(true);
    const res = await startCapture();
    if (res?.success) setIsCapturing(true);
    setLoading(false);
  };
  const handleStop = async () => {
    setLoading(true);
    const res = await stopCapture();
    if (res?.success) setIsCapturing(false);
    setLoading(false);
  };

  const handleClear = async () => {
    await clearPackets();
    onClear();
  };

  return (
    <div className="dark-card p-3 d-flex align-items-center gap-3 flex-wrap">
      {/* Status */}
      <div className="d-flex align-items-center gap-2">
        <span className={`status-dot ${isCapturing ? "active" : "idle"}`} />
        <span
          className={`mono ${isCapturing ? "text-success" : "text-secondary"}`}
        >
          {isCapturing ? "CAPTURING" : "Not Capturing"}
        </span>
      </div>
      <div className="vr" style={{ borderColor: "#334155" }} />

      {/* Buttons */}
      <button
        className="btn btn-outline-success btn-sm px-4"
        onClick={handleStart}
        disabled={isCapturing || loading}
      >
        ▶ Start
      </button>

      <button
        className="btn btn-outline-danger btn-sm px-4"
        onClick={handleStop}
        disabled={!isCapturing || loading}
      >
        ■ Stop
      </button>

      <button
        className="btn btn-outline-secondary btn-sm px-4"
        onClick={handleClear}
        disabled={loading}
      >
        Clear
      </button>

      {loading && (
        <div className="spinner-border spinner-border-sm text-secondary" />
      )}
    </div>
  );
}
