// src/components/PacketTable.jsx

// Helper — returns CSS class based on protocol
function getRowClass(protocol) {
  const map = {
    TCP:  "row-tcp",
    UDP:  "row-udp",
    ICMP: "row-icmp",
    ARP:  "row-arp"
  }
  return map[protocol] || ""
}

// Helper — returns badge class based on protocol
function getBadgeClass(protocol) {
  const map = {
    TCP:  "badge-tcp",
    UDP:  "badge-udp",
    ICMP: "badge-icmp",
    ARP:  "badge-arp"
  }
  return map[protocol] || "badge-other"
}

export default function PacketTable({ packets }) {
  return (
    <div className="dark-card p-3">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <p className="text-secondary mono mb-0" style={{ fontSize: "11px", letterSpacing: "1px" }}>
          PACKET CAPTURE
        </p>
        <span className="badge bg-secondary mono">
          {packets.length} packets
        </span>
      </div>

      {/* Table */}
      <div className="table-scroll">
        <table className="table table-sm table-dark-custom mb-0">
          <thead>
            <tr>
              <th>#</th>
              <th>Time</th>
              <th>Source IP</th>
              <th>Destination IP</th>
              <th>Protocol</th>
              <th>Src Port</th>
              <th>Dst Port</th>
              <th>Service</th>
              <th>Size</th>
              <th>TTL</th>
              <th>Flags</th>
            </tr>
          </thead>
          <tbody>
            {packets.length === 0 ? (
              <tr>
                <td colSpan="11" className="text-center text-secondary py-5 mono">
                  No packets captured yet. Press Start to begin.
                </td>
              </tr>
            ) : (
              packets.map((p) => (
                <tr key={p.id} className={getRowClass(p.protocol)}>
                  <td className="text-secondary mono">{p.id}</td>
                  <td className="mono">{p.time}</td>
                  <td className="mono">{p.src_ip}</td>
                  <td className="mono">{p.dst_ip}</td>
                  <td>
                    <span className={`badge mono ${getBadgeClass(p.protocol)}`}>
                      {p.protocol}
                    </span>
                  </td>
                  <td className="mono text-secondary">{p.src_port}</td>
                  <td className="mono text-secondary">{p.dst_port}</td>
                  <td className="mono text-info">{p.service}</td>
                  <td className="mono">{p.size}B</td>
                  <td className="mono text-secondary">{p.ttl}</td>
                  <td className="mono text-warning">{p.flags}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}