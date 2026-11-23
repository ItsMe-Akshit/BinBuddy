import React from "react";
import { Recycle, Heart, Phone, Shield, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-cream-100 dark:bg-[#18140F] border-t border-cream-200 dark:border-leaf-700/30 transition-colors pt-16 pb-12 text-xs text-bark-600 dark:text-cream-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-leaf-500 flex items-center justify-center text-white">
                <Recycle className="w-5 h-5" />
              </div>
              <span className="font-display font-extrabold text-xl text-bark-900 dark:text-cream-50">
                Bin<span className="text-leaf-500">Buddy</span>
              </span>
            </div>
            <p className="text-xs leading-relaxed text-bark-600 dark:text-cream-200/80">
              CleanStreet Challenge: Citizen reporting, 50-item segregation dictionary, and live municipal waste dispatch.
            </p>
            <span className="inline-block px-2.5 py-1 rounded-md bg-leaf-300/30 dark:bg-leaf-900/40 font-mono text-[11px] font-bold text-leaf-700 dark:text-leaf-300">
              Fresh Earth Design System
            </span>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="font-bold text-bark-900 dark:text-cream-50 uppercase tracking-wider text-[11px] mb-3">
              Platform Modules
            </h4>
            <ul className="space-y-2">
              <li><a href="#lookup" className="hover:text-leaf-500 transition-colors">50-Item Waste Lookup</a></li>
              <li><a href="#kanban" className="hover:text-leaf-500 transition-colors">Public Ward Status Board</a></li>
              <li><a href="#schedule" className="hover:text-leaf-500 transition-colors">Doorstep Pickup Calendar</a></li>
              <li><a href="#truck-tracker" className="hover:text-leaf-500 transition-colors">Tipper Truck GPS Simulator</a></li>
              <li><a href="#manifest" className="hover:text-leaf-500 transition-colors">Worker Field Manifest</a></li>
            </ul>
          </div>

          {/* Interactive Tools */}
          <div>
            <h4 className="font-bold text-bark-900 dark:text-cream-50 uppercase tracking-wider text-[11px] mb-3">
              Community Engagement
            </h4>
            <ul className="space-y-2">
              <li><a href="#quiz" className="hover:text-leaf-500 transition-colors">Segregation Eco-Quiz</a></li>
              <li><a href="#ewaste" className="hover:text-leaf-500 transition-colors">Apartment E-Waste Pooling</a></li>
              <li><a href="#hero" className="hover:text-leaf-500 transition-colors">Citizen Priority Escalator</a></li>
              <li><a href="#kanban" className="hover:text-leaf-500 transition-colors">Proximity Duplicate Detector</a></li>
            </ul>
          </div>

          {/* Civic Emergency Helpline */}
          <div className="space-y-2">
            <h4 className="font-bold text-bark-900 dark:text-cream-50 uppercase tracking-wider text-[11px] mb-3">
              Civic Helpline Support
            </h4>
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-leaf-500" />
              <span>Waste Helpline: <strong>1800-425-0012</strong></span>
            </p>
            <p className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-amber-500" />
              <span>Biohazard / Chemical Hotline: <strong>112</strong></span>
            </p>
            <p className="text-[11px] text-bark-400 dark:text-cream-200/50 mt-2">
              Operating shifts: 6:00 AM to 10:00 PM across all 4 ward zones.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-cream-200 dark:border-leaf-700/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="flex items-center gap-1.5 text-center sm:text-left">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>for the CleanStreet Civic Challenge Hackathon</span>
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cream-50 dark:bg-[#1E1A14] border border-cream-200 dark:border-leaf-700/40 hover:bg-cream-200 text-xs font-bold transition-all"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
