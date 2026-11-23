import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { useWard, WARDS } from "../context/WardContext";
import { useTickets } from "../context/TicketContext";
import {
  Recycle,
  Moon,
  Sun,
  ShieldCheck,
  User,
  PlusCircle,
  Menu,
  X,
  MapPin,
  Truck
} from "lucide-react";

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const { selectedWard, setSelectedWard, userRole, setUserRole } = useWard();
  const { setIsReporterOpen } = useTickets();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-cream-50/90 dark:bg-[#1E1A14]/90 border-b border-cream-200/80 dark:border-leaf-700/30 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand */}
        <a href="#hero" className="flex items-center gap-2.5 group">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-leaf-700 via-leaf-500 to-leaf-400 flex items-center justify-center text-white shadow-md shadow-leaf-500/20 group-hover:scale-105 transition-transform duration-200">
            <Recycle className="w-6 h-6 animate-spin-slow group-hover:rotate-180 transition-transform duration-700" />
          </div>
          <div>
            <span className="font-display font-extrabold text-2xl tracking-tight text-bark-900 dark:text-cream-50 flex items-center gap-1">
              Bin<span className="text-leaf-500">Buddy</span>
              <span className="text-[11px] font-hand text-leaf-700 dark:text-leaf-300 ml-1 px-1.5 py-0.5 rounded-md bg-leaf-300/40 dark:bg-leaf-700/40">
                Civic CleanStreet
              </span>
            </span>
            <p className="text-[10px] text-bark-600 dark:text-cream-200/70 tracking-wider uppercase font-medium">
              Community Waste Action
            </p>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-bark-600 dark:text-cream-200">
          <a href="#lookup" className="hover:text-leaf-500 dark:hover:text-leaf-400 transition-colors">
            Waste Lookup
          </a>
          <a href="#kanban" className="hover:text-leaf-500 dark:hover:text-leaf-400 transition-colors">
            Ward Board
          </a>
          <a href="#schedule" className="hover:text-leaf-500 dark:hover:text-leaf-400 transition-colors">
            Pickup & Truck
          </a>
          <a href="#manifest" className="hover:text-leaf-500 dark:hover:text-leaf-400 transition-colors flex items-center gap-1.5">
            Manifest
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-leaf-400/20 text-leaf-700 dark:text-leaf-300 font-bold">Crew</span>
          </a>
          <a href="#quiz" className="hover:text-leaf-500 dark:hover:text-leaf-400 transition-colors">
            Eco-Quiz
          </a>
          <a href="#ewaste" className="hover:text-leaf-500 dark:hover:text-leaf-400 transition-colors">
            E-Waste Drive
          </a>
        </nav>

        {/* Controls: Ward Selector, Role Toggle, Theme, CTA */}
        <div className="hidden md:flex items-center gap-3">
          {/* Ward Selector */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cream-100 dark:bg-[#2A241B] border border-cream-200 dark:border-leaf-700/40 text-xs font-semibold text-bark-900 dark:text-cream-100">
            <MapPin className="w-3.5 h-3.5 text-leaf-500" />
            <select
              value={selectedWard}
              onChange={(e) => setSelectedWard(e.target.value)}
              aria-label="Select Ward"
              className="bg-transparent border-none outline-none cursor-pointer pr-1 text-xs font-medium text-bark-900 dark:text-cream-100 focus:ring-0"
            >
              {WARDS.map(w => (
                <option key={w} value={w} className="dark:bg-[#2A241B] text-bark-900 dark:text-cream-100">
                  {w}
                </option>
              ))}
            </select>
          </div>

          {/* Role Toggle: Citizen vs Sanitation Worker */}
          <button
            onClick={() => setUserRole(userRole === "citizen" ? "worker" : "citizen")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
              userRole === "worker"
                ? "bg-bark-600 text-white shadow-sm ring-2 ring-bark-400"
                : "bg-cream-100 dark:bg-[#2A241B] text-bark-900 dark:text-cream-100 border border-cream-200 dark:border-leaf-700/40 hover:bg-cream-200"
            }`}
            title="Toggle between Citizen View and Sanitation Worker Manifest View"
          >
            {userRole === "worker" ? (
              <>
                <ShieldCheck className="w-3.5 h-3.5 text-leaf-300" />
                <span>Crew Mode</span>
              </>
            ) : (
              <>
                <User className="w-3.5 h-3.5 text-bark-400" />
                <span>Citizen</span>
              </>
            )}
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-full bg-cream-100 dark:bg-[#2A241B] border border-cream-200 dark:border-leaf-700/40 flex items-center justify-center text-bark-600 dark:text-cream-200 hover:text-leaf-500 transition-colors"
            aria-label="Toggle Dark Mode"
          >
            {isDark ? <Sun className="w-4 h-4 text-marker" /> : <Moon className="w-4 h-4 text-bark-600" />}
          </button>

          {/* Report CTA */}
          <button
            onClick={() => setIsReporterOpen(true)}
            className="btn-magnetic flex items-center gap-1.5 px-4 py-2 rounded-full bg-leaf-500 hover:bg-leaf-700 text-white font-bold text-xs tracking-wide shadow-md shadow-leaf-500/25 active:scale-95 transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Report Issue</span>
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-full bg-cream-100 dark:bg-[#2A241B] flex items-center justify-center text-bark-600 dark:text-cream-200"
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun className="w-4 h-4 text-marker" /> : <Moon className="w-4 h-4 text-bark-600" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-cream-100 dark:bg-[#2A241B] text-bark-900 dark:text-cream-100"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-cream-200 dark:border-leaf-700/30 bg-cream-50 dark:bg-[#1E1A14] px-4 py-6 space-y-4 shadow-2xl">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-bark-400 dark:text-cream-200/60 uppercase tracking-wider">
              Select Your Ward:
            </label>
            <select
              value={selectedWard}
              onChange={(e) => setSelectedWard(e.target.value)}
              aria-label="Select Ward"
              className="w-full mt-1 p-2.5 rounded-xl bg-cream-100 dark:bg-[#2A241B] border border-cream-200 dark:border-leaf-700/40 text-sm font-semibold text-bark-900 dark:text-cream-100"
            >
              {WARDS.map(w => (
                <option key={w} value={w}>
                  {w}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-cream-100 dark:bg-[#2A241B]">
            <span className="text-sm font-bold text-bark-900 dark:text-cream-50">Interface Role:</span>
            <button
              onClick={() => setUserRole(userRole === "citizen" ? "worker" : "citizen")}
              className="px-3 py-1.5 rounded-full text-xs font-bold bg-leaf-500 text-white"
            >
              {userRole === "worker" ? "Sanitation Crew" : "Citizen Mode"}
            </button>
          </div>

          <nav className="flex flex-col gap-2 pt-2 border-t border-cream-200 dark:border-leaf-700/20 text-sm font-semibold text-bark-900 dark:text-cream-100">
            <a
              href="#lookup"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-cream-100 dark:hover:bg-[#2A241B]"
            >
              🔍 Waste Segregation Lookup
            </a>
            <a
              href="#kanban"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-cream-100 dark:hover:bg-[#2A241B]"
            >
              📋 Public Ward Status Board
            </a>
            <a
              href="#schedule"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-cream-100 dark:hover:bg-[#2A241B]"
            >
              🚛 Pickup Schedule & Live Truck
            </a>
            <a
              href="#manifest"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-cream-100 dark:hover:bg-[#2A241B]"
            >
              👷 Worker Route Manifest
            </a>
            <a
              href="#quiz"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-cream-100 dark:hover:bg-[#2A241B]"
            >
              🎮 Segregation Eco-Quiz
            </a>
            <a
              href="#ewaste"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-cream-100 dark:hover:bg-[#2A241B]"
            >
              🔋 Apartment E-Waste Drive
            </a>
          </nav>

          <button
            onClick={() => {
              setIsReporterOpen(true);
              setMobileMenuOpen(false);
            }}
            className="w-full py-3 rounded-full bg-leaf-500 text-white font-bold text-center shadow-lg flex items-center justify-center gap-2"
          >
            <PlusCircle className="w-5 h-5" />
            <span>Report Civic Waste Issue</span>
          </button>
        </div>
      )}
    </header>
  );
}
