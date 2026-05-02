// src/components/Statistics.jsx

// Single stat card component
function StatCard({ label, value, color = "#e2e8f0" }) {
  return (
    <div className="dark-card p-3 text-center">
      <div className="mono mb-1" style={{ fontSize: "22px", color, fontWeight: "600" }}>
        {value}
      </div>
      <div className="text-secondary" style={{ fontSize: "11px", letterSpacing: "1px" }}>
        {label}
      </div>
    </div>
  )
}

export default function Statistics({ stats }) {
  if (!stats || stats.total_packets === 0) {
    return (
      <div className="dark-card p-3 text-center text-secondary mono">
        No statistics yet.
      </div>
    )
  }

  return (
    <div>
      <p className="text-secondary mono mb-2" style={{ fontSize: "11px", letterSpacing: "1px" }}>
        STATISTICS
      </p>

      {/* Top Stats Row */}
      <div className="row g-3 mb-3">
        <div className="col-6 col-md-2">
          <StatCard
            label="TOTAL PACKETS"
            value={stats.total_packets}
            color="#00d4ff"
          />
        </div>
        <div className="col-6 col-md-2">
          <StatCard
            label="AVG SIZE"
            value={`${stats.average_size}B`}
            color="#e2e8f0"
          />
        </div>
        <div className="col-6 col-md-2">
          <StatCard
            label="LARGEST"
            value={`${stats.largest_packet}B`}
            color="#ffaa00"
          />
        </div>
        <div className="col-6 col-md-2">
          <StatCard
            label="SMALLEST"
            value={`${stats.smallest_packet}B`}
            color="#64748b"
          />
        </div>
        <div className="col-6 col-md-2">
          <StatCard
            label="TOP SERVICE"
            value={stats.top_service}
            color="#00ff88"
          />
        </div>
        <div className="col-6 col-md-2">
          <StatCard
            label="TOP SOURCE"
            value={stats.top_src_ip}
            color="#a855f7"
          />
        </div>
      </div>

      {/* Protocol Breakdown */}
      <div className="dark-card p-3">
        <p className="text-secondary mb-2" style={{ fontSize: "11px", letterSpacing: "1px" }}>
          PROTOCOL BREAKDOWN
        </p>
        <div className="d-flex flex-wrap gap-3">
          {Object.entries(stats.protocol_counts).map(([proto, count]) => (
            <div key={proto} className="d-flex align-items-center gap-2">
              <span className={`badge mono badge-${proto.toLowerCase()}`}>
                {proto}
              </span>
              <span className="mono text-secondary">{count} packets</span>
              <span className="text-secondary" style={{ fontSize: "11px" }}>
                ({((count / stats.total_packets) * 100).toFixed(1)}%)
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}