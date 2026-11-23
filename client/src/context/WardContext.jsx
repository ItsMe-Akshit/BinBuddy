import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchSchedule } from "../utils/api";
import { fallbackSchedule } from "../utils/fallbackData";

const WardContext = createContext();

export const WARDS = [
  "Ward 4 (Greenfield)",
  "Ward 7 (Riverside)",
  "Ward 12 (Central Market)",
  "Ward 15 (Heritage Colony)"
];

export function WardProvider({ children }) {
  const [selectedWard, setSelectedWard] = useState("Ward 4 (Greenfield)");
  const [scheduleData, setScheduleData] = useState(fallbackSchedule);
  const [loadingSchedule, setLoadingSchedule] = useState(true);
  const [userRole, setUserRole] = useState("citizen"); // "citizen" | "worker"

  // Truck live simulation countdown seconds
  const [truckSecondsRemaining, setTruckSecondsRemaining] = useState(14 * 60);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchSchedule();
        setScheduleData(data);
      } catch (err) {
        console.error("Schedule load error:", err);
      } finally {
        setLoadingSchedule(false);
      }
    }
    load();
  }, []);

  // Update truck seconds when ward changes
  useEffect(() => {
    const wardObj = scheduleData?.wards?.find(w => w.name === selectedWard) || scheduleData?.wards?.[0];
    const initialMinutes = wardObj ? wardObj.estimatedArrivalMinutes : 15;
    setTruckSecondsRemaining(initialMinutes * 60);
  }, [selectedWard, scheduleData]);

  // Live timer tick
  useEffect(() => {
    const timer = setInterval(() => {
      setTruckSecondsRemaining(prev => (prev > 0 ? prev - 1 : 1800));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const activeWardSchedule = scheduleData?.wards?.find(w => w.name === selectedWard) || scheduleData?.wards?.[0];

  return (
    <WardContext.Provider
      value={{
        selectedWard,
        setSelectedWard,
        wardsList: WARDS,
        scheduleData,
        loadingSchedule,
        activeWardSchedule,
        truckSecondsRemaining,
        userRole,
        setUserRole
      }}
    >
      {children}
    </WardContext.Provider>
  );
}

export function useWard() {
  return useContext(WardContext);
}
