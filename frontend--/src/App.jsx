// src/App.jsx
import { useState, useEffect } from "react";
import { getPackets, getStats } from "./Services/api";
import Controls from "./Components/Controls";
import FilterBar from "./Components/FilterBar";
import PacketTable from "./Components/PacketTable";
import Statistics from "./Components/Statistics";

export default function App() {
  const [isCapturing, setIsCapturing] = useState(false);
  const [packets, setPackets] = useState([]);
  const [stats, setStats] = useState(null);
  const [filters, setFilters] = useState({});

  const refreshData = async (activeFilters = filters) => {
    const data = await getPackets(activeFilters);
    const statsData = await getStats();

    if (data) {
      setPackets(data);
    }

    if (statsData) {
      setStats(statsData);
    }
  };
  useEffect(() => {
    if (!isCapturing) return;

    refreshData();

    const interval = setInterval(() => {
      refreshData();
    }, 2000);

    return () => clearInterval(interval);
  }, [isCapturing, filters]);

  const handleFilter = async (newFilters) => {
    setFilters(newFilters);
    await refreshData(newFilters);
  };

  const handleReset = async () => {
    setFilters({});
    await refreshData({});
  };

  const handleClear = () => {
    setPackets([]);
    setStats(null);
  };

  return (
    <div className="container-fluid py-4 px-4">
      <div className="mb-4">
        <h4 className="mono text-info mb-0">Network Traffic Analyzer</h4>
        <p className="text-secondary mb-0" style={{ fontSize: "13px" }}>
          Real-time packet capture and analysis
        </p>
      </div>

      
      <div className="mb-3">
        <Controls
          isCapturing={isCapturing}
          setIsCapturing={setIsCapturing}
          onClear={handleClear}
        />
      </div>

      {/* Filter Bar */}
      <div className="mb-3">
        <FilterBar onFilter={handleFilter} onReset={handleReset} />
      </div>

      {/* Packet Table */}
      <div className="mb-3">
        <PacketTable packets={packets} />
      </div>

      {/* Statistics */}
      <div className="mb-3">
        <Statistics stats={stats} />
      </div>
    </div>
  );
}
