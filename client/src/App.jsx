import React from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { ToastProvider } from "./context/ToastContext";
import { WardProvider } from "./context/WardContext";
import { TicketProvider } from "./context/TicketContext";

import Navbar from "./components/Navbar";
import ToastContainer from "./components/ToastContainer";
import HeroSection from "./sections/HeroSection";
import TruckCountdown from "./sections/TruckCountdown";
import ScheduleTracker from "./sections/ScheduleTracker";
import WasteLookup from "./sections/WasteLookup";
import IncidentReporterModal from "./sections/IncidentReporterModal";
import WardKanbanBoard from "./sections/WardKanbanBoard";
import SanitationManifest from "./sections/SanitationManifest";
import SegregationQuiz from "./sections/SegregationQuiz";
import EWasteDriveScheduler from "./sections/EWasteDriveScheduler";
import Footer from "./components/Footer";

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <WardProvider>
          <TicketProvider>
            <div className="min-h-screen flex flex-col bg-cream-50 dark:bg-[#1E1A14] text-bark-900 dark:text-cream-50 transition-colors duration-200">
              <Navbar />
              <ToastContainer />
              <IncidentReporterModal />

              <main className="flex-1">
                <HeroSection />
                <TruckCountdown />
                <ScheduleTracker />
                <WasteLookup />
                <WardKanbanBoard />
                <SanitationManifest />
                <SegregationQuiz />
                <EWasteDriveScheduler />
              </main>

              <Footer />
            </div>
          </TicketProvider>
        </WardProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
