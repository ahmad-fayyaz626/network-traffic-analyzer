// src/components/FilterBar.jsx
import { useState } from "react"

export default function FilterBar({ onFilter, onReset }) {
  const [protocol, setProtocol] = useState("")
  const [srcIp,    setSrcIp]    = useState("")
  const [dstIp,    setDstIp]    = useState("")

  const handleFilter = () => {
    onFilter({ protocol, src_ip: srcIp, dst_ip: dstIp })
  }

  const handleReset = () => {
    setProtocol("")
    setSrcIp("")
    setDstIp("")
    onReset()
  }

  return (
    <div className="dark-card p-3">
      <p className="text-secondary mono mb-2" style={{ fontSize: "11px", letterSpacing: "1px" }}>
        FILTERS
      </p>

      <div className="row g-2 align-items-end">

        {/* Protocol Dropdown */}
        <div className="col-12 col-md-3">
          <label className="form-label text-secondary" style={{ fontSize: "12px" }}>
            Protocol
          </label>
          <select
            className="form-select form-select-sm"
            value={protocol}
            onChange={e => setProtocol(e.target.value)}
            style={inputStyle}
          >
            <option value="">All</option>
            <option value="TCP">TCP</option>
            <option value="UDP">UDP</option>
            <option value="ICMP">ICMP</option>
            <option value="ARP">ARP</option>
          </select>
        </div>

        {/* Source IP */}
        <div className="col-12 col-md-3">
          <label className="form-label text-secondary" style={{ fontSize: "12px" }}>
            Source IP
          </label>
          <input
            type="text"
            className="form-control form-control-sm mono"
            placeholder="e.g. 192.168.1.5"
            value={srcIp}
            onChange={e => setSrcIp(e.target.value)}
            style={inputStyle}
          />
        </div>

        {/* Destination IP */}
        <div className="col-12 col-md-3">
          <label className="form-label text-secondary" style={{ fontSize: "12px" }}>
            Destination IP
          </label>
          <input
            type="text"
            className="form-control form-control-sm mono"
            placeholder="e.g. 8.8.8.8"
            value={dstIp}
            onChange={e => setDstIp(e.target.value)}
            style={inputStyle}
          />
        </div>

        {/* Buttons */}
        <div className="col-12 col-md-3 d-flex gap-2">
          <button
            className="btn btn-outline-info btn-sm w-100"
            onClick={handleFilter}
          >
            Apply Filter
          </button>
          <button
            className="btn btn-outline-secondary btn-sm w-100"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>

      </div>
    </div>
  )
}

const inputStyle = {
  backgroundColor: "#0f172a",
  border:          "1px solid #334155",
  color:           "#e2e8f0"
}