"use client";
import { useState, useEffect } from "react";
import { MapPin, Calendar, Clock, Star, UserX, AlertCircle, RefreshCw, ChevronRight, ChevronDown, X, CheckCircle2, Bot } from "lucide-react";

const TODAY = new Date();
const DATE_LABEL = TODAY.toLocaleDateString("en-CA", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

const SCHEDULE = [
  { time: "9:00 AM",  duration: "30 min", type: "booked", patient: "O.C.", service: "Eye Exam",           optometrist: "Dr. Patel"  },
  { time: "9:30 AM",  duration: "30 min", type: "booked", patient: "N.B.", service: "Contact Lens Fit",   optometrist: "Dr. Patel"  },
  { time: "10:00 AM", duration: "30 min", type: "free",   patient: null,   service: null,                 optometrist: null         },
  { time: "10:30 AM", duration: "30 min", type: "booked", patient: "E.C.", service: "Frame Dispensing",   optometrist: "Dr. Nguyen" },
  { time: "11:00 AM", duration: "30 min", type: "booked", patient: "J.D.", service: "Eye Exam",           optometrist: "Dr. Nguyen" },
  { time: "11:30 AM", duration: "30 min", type: "free",   patient: null,   service: null,                 optometrist: null         },
  { time: "12:00 PM", duration: "30 min", type: "free",   patient: null,   service: null,                 optometrist: null         },
  { time: "12:30 PM", duration: "30 min", type: "booked", patient: "S.P.", service: "Pre-Test",           optometrist: "Dr. Patel"  },
  { time: "1:00 PM",  duration: "30 min", type: "booked", patient: "A.M.", service: "Eye Exam",           optometrist: "Dr. Patel"  },
  { time: "1:30 PM",  duration: "30 min", type: "free",   patient: null,   service: null,                 optometrist: null         },
  { time: "2:00 PM",  duration: "30 min", type: "booked", patient: "R.L.", service: "Contact Lens Check", optometrist: "Dr. Nguyen" },
  { time: "2:30 PM",  duration: "30 min", type: "booked", patient: "K.T.", service: "Frame Dispensing",   optometrist: "Dr. Nguyen" },
];

export function RightSidebar() {
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState<string | null>(null);
  const [weatherSlide, setWeatherSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setWeatherSlide(prev => (prev === 0 ? 1 : 0));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const forecasts = [
    { day: "TUE", icon: "🌦️", tempH: "18°", tempL: "10°" },
    { day: "WED", icon: "🌤️", tempH: "20°", tempL: "12°" },
    { day: "THU", icon: "🌤️", tempH: "21°", tempL: "13°" },
    { day: "FRI", icon: "🌦️", tempH: "18°", tempL: "11°" },
    { day: "SAT", icon: "🌤️", tempH: "18°", tempL: "10°" },
  ];

  const bookedCount = SCHEDULE.filter(s => s.type === "booked").length;
  const freeCount   = SCHEDULE.filter(s => s.type === "free").length;

  return (
    <>
      {/* ── Calendar Modal ─────────────────────────────────────── */}
      {calendarOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setCalendarOpen(false)}
          />

          {/* Modal */}
          <div className="relative z-10 w-full max-w-lg mx-4 bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-specsavers-green/5">
              <div>
                <h2 className="font-bold text-foreground text-lg">Today's Schedule</h2>
                <p className="text-xs text-muted-foreground mt-0.5">{DATE_LABEL}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-xs">
                  <span className="w-2.5 h-2.5 rounded-full bg-specsavers-green inline-block" />
                  <span className="text-muted-foreground">{bookedCount} Booked</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-muted border border-border inline-block ml-2" />
                  <span className="text-muted-foreground">{freeCount} Free</span>
                </div>
                <button
                  onClick={() => setCalendarOpen(false)}
                  className="w-8 h-8 rounded-full hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Slots list */}
            <div className="overflow-y-auto max-h-[70vh] divide-y divide-border/50">
              {SCHEDULE.map((slot, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-4 px-6 py-3.5 transition-colors ${
                    slot.type === "free"
                      ? "hover:bg-muted/30"
                      : "hover:bg-specsavers-green/5"
                  }`}
                >
                  {/* Time */}
                  <div className="w-20 shrink-0">
                    <span className="text-sm font-semibold text-foreground">{slot.time}</span>
                    <p className="text-[10px] text-muted-foreground">{slot.duration}</p>
                  </div>

                  {/* Status bar */}
                  <div className={`w-1 self-stretch rounded-full shrink-0 ${
                    slot.type === "booked" ? "bg-specsavers-green" : "bg-border"
                  }`} />

                  {/* Content */}
                  {slot.type === "booked" ? (
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-specsavers-green/15 text-specsavers-green flex items-center justify-center text-xs font-bold shrink-0">
                          {slot.patient?.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-foreground truncate">{slot.patient}</p>
                          <p className="text-xs text-muted-foreground truncate">{slot.service} · {slot.optometrist}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1 flex items-center gap-2">
                      <CheckCircle2 size={15} className="text-muted-foreground/50" />
                      <span className="text-sm text-muted-foreground italic">Available slot</span>
                    </div>
                  )}

                  {/* Badge */}
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${
                    slot.type === "booked"
                      ? "bg-specsavers-green/15 text-specsavers-green"
                      : "bg-muted text-muted-foreground"
                  }`}>
                    {slot.type === "booked" ? "Booked" : "Free"}
                  </span>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="px-6 py-3 border-t border-border bg-muted/30 flex justify-between items-center">
              <p className="text-xs text-muted-foreground">Showing full day schedule</p>
              <button
                onClick={() => setCalendarOpen(false)}
                className="text-xs font-medium text-specsavers-green hover:underline"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Sidebar ─────────────────────────────────────────────── */}
      <aside className="hidden lg:flex w-[320px] h-full flex-col gap-6 p-6 overflow-y-auto bg-background">

        {/* Weather Tile */}
        <div className="bg-card rounded-xl border border-border/50 relative overflow-hidden min-h-[300px]">
          
          {/* Slide 1: Weather */}
          <div className={`transition-transform duration-500 ease-in-out absolute inset-0 p-5 pb-8 ${weatherSlide === 0 ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-foreground">Weather</h3>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <MapPin size={12} className="text-specsavers-green" />
                  Burnaby, BC, Canada
                </p>
              </div>
              <span className="text-[10px] font-medium text-specsavers-green bg-specsavers-green/10 px-2 py-1 rounded-full">
                5-day forecast
              </span>
            </div>

            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Today</p>
                <div className="flex items-start">
                  <span className="text-4xl font-bold text-foreground">14</span>
                  <span className="text-xl font-medium text-foreground mt-1">°C</span>
                </div>
                <p className="text-sm font-medium text-foreground mt-1">Rain</p>
                <p className="text-xs text-muted-foreground">H: 14°  L: 9°</p>
              </div>
              <div className="text-6xl filter drop-shadow-md">🌧️</div>
            </div>

            <div className="flex justify-between border-t border-border/50 pt-4">
              {forecasts.map((day) => (
                <div key={day.day} className="flex flex-col items-center gap-1.5">
                  <span className="text-[10px] font-medium text-muted-foreground">{day.day}</span>
                  <span className="text-lg">{day.icon}</span>
                  <span className="text-xs font-medium text-foreground">{day.tempH}</span>
                  <span className="text-[10px] text-muted-foreground">{day.tempL}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Slide 2: AI Insight */}
          <div className={`transition-transform duration-500 ease-in-out absolute inset-0 p-5 pb-8 ${weatherSlide === 1 ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-foreground flex items-center gap-1.5">
                   <Bot size={16} className="text-specsavers-green" /> 
                   AI Insight
                </h3>
              </div>
              <span className="text-[10px] font-medium text-yellow-600 bg-yellow-500/10 px-2 py-1 rounded-full flex items-center gap-1">
                <AlertCircle size={10} /> Prediction
              </span>
            </div>
            
            <div className="space-y-3 mt-4">
              <p className="text-sm font-medium text-foreground">Elevated "No-Show" Risk Today</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Based on historical data for heavy rainfall (14°C) in Burnaby, expect up to <strong className="text-foreground">15% higher no-shows</strong> and late arrivals for afternoon appointments.
              </p>
              
              <div className="bg-specsavers-green/5 border border-specsavers-green/20 rounded-md p-2 mt-4">
                 <p className="text-xs text-specsavers-green font-semibold">Recommendation:</p>
                 <p className="text-xs text-foreground mt-1">Send SMS reminders or open waitlist to walk-ins to offset gaps.</p>
              </div>
            </div>
          </div>

          {/* Indicators */}
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
            <button onClick={() => setWeatherSlide(0)} className={`w-1.5 h-1.5 rounded-full transition-colors ${weatherSlide === 0 ? 'bg-specsavers-green' : 'bg-border'}`} />
            <button onClick={() => setWeatherSlide(1)} className={`w-1.5 h-1.5 rounded-full transition-colors ${weatherSlide === 1 ? 'bg-specsavers-green' : 'bg-border'}`} />
          </div>
        </div>

        {/* Store Insights */}
        <div className="bg-card rounded-xl p-4 border border-border/50">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-foreground">Store Insights</h3>
            <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
              This Week <ChevronDown size={12} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Today's appointments — clickable */}
            <button
              onClick={() => setCalendarOpen(true)}
              className="bg-background rounded-lg p-2.5 border border-border/30 text-left hover:border-specsavers-green/40 hover:bg-specsavers-green/5 transition-all group cursor-pointer"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <Calendar size={14} className="text-specsavers-green" />
                <span className="text-xs font-medium text-muted-foreground">Today's appointments</span>
              </div>
              <p className="text-2xl font-bold text-foreground group-hover:text-specsavers-green transition-colors">{bookedCount}</p>
              <p className="text-[10px] text-specsavers-green opacity-0 group-hover:opacity-100 transition-opacity mt-0.5">View calendar →</p>
            </button>

            {/* Available Slots — clickable */}
            <button
              onClick={() => setCalendarOpen(true)}
              className="bg-background rounded-lg p-2.5 border border-border/30 text-left hover:border-yellow-400/40 hover:bg-yellow-400/5 transition-all group cursor-pointer"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <Clock size={14} className="text-yellow-500" />
                <span className="text-xs font-medium text-muted-foreground">Available Slots</span>
              </div>
              <p className="text-2xl font-bold text-foreground group-hover:text-yellow-500 transition-colors">{freeCount}</p>
              <p className="text-[10px] text-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity mt-0.5">View calendar →</p>
            </button>

            <div className="bg-background rounded-lg p-2.5 border border-border/30">
              <div className="flex items-center gap-2 mb-1.5">
                <Star size={14} className="text-yellow-400 fill-yellow-400" />
                <span className="text-xs font-medium text-muted-foreground">CSAT Score</span>
              </div>
              <p className="text-2xl font-bold text-foreground">94%</p>
            </div>

            <div className="bg-background rounded-lg p-2.5 border border-border/30">
              <div className="flex items-center gap-2 mb-1.5">
                <UserX size={14} className="text-red-400" />
                <span className="text-xs font-medium text-muted-foreground">No shows</span>
              </div>
              <p className="text-2xl font-bold text-foreground">1</p>
            </div>
          </div>
        </div>

        {/* Operational Alerts */}
        <div className="bg-card rounded-xl p-4 border border-border/50">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-foreground">Operational Alerts</h3>
            <button className="text-xs text-specsavers-green hover:underline">View all</button>
          </div>

          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-yellow-500/10 flex items-center justify-center flex-shrink-0">
                  <AlertCircle size={16} className="text-yellow-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">WINK is slow today</p>
                  <p className="text-xs text-muted-foreground mt-0.5">We are fixing it</p>
                </div>
              </div>
              <button onClick={() => setAlertOpen("wink")} className="text-xs font-medium text-specsavers-green flex items-center gap-0.5 mt-1 shrink-0 ml-2">
                View the issue <ChevronRight size={14} />
              </button>
            </div>

            <div className="flex items-start justify-between">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-specsavers-green/10 flex items-center justify-center flex-shrink-0">
                  <RefreshCw size={16} className="text-specsavers-green" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Greenpoint has new update about offers</p>
                </div>
              </div>
              <button onClick={() => setAlertOpen("greenpoint")} className="text-xs font-medium text-specsavers-green flex items-center gap-0.5 mt-1 shrink-0 ml-2">
                View <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>

      </aside>

      {/* ── Alert Modal ─────────────────────────────────────── */}
      {alertOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setAlertOpen(null)}
          />
          <div className="relative z-10 w-full max-w-md mx-4 bg-card border border-border rounded-2xl shadow-2xl overflow-hidden p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="font-bold text-foreground text-lg">
                {alertOpen === "wink" ? "WINK System Outage" : "Greenpoint Offers Update"}
              </h2>
              <button onClick={() => setAlertOpen(null)} className="text-muted-foreground hover:text-foreground">
                <X size={16} />
              </button>
            </div>
            <div className="text-sm text-foreground space-y-3">
              {alertOpen === "wink" ? (
                <>
                  <p><strong>Posted:</strong> {new Date().toLocaleDateString()} 9:00 AM</p>
                  <p>The core database cluster is currently experiencing high load, causing slowness in the WINK system.</p>
                  <p>Our Database Reliability Team is actively working on re-indexing and scaling resources. The ETA for full recovery is <strong>end of the day</strong>.</p>
                  <p>We apologize for the inconvenience.</p>
                </>
              ) : (
                <>
                  <p><strong>Posted:</strong> {new Date().toLocaleDateString()} 10:15 AM</p>
                  <p>Please note that the <strong>Student Offer</strong> will be changing starting tomorrow.</p>
                  <p>The discount will increase from <strong>40% off</strong> to <strong>65% off</strong> on all complete pairs (frame + lenses).</p>
                  <p>Ensure all store signage is updated and staff are briefed before opening tomorrow.</p>
                </>
              )}
            </div>
            <div className="mt-6 flex justify-end">
              <button onClick={() => setAlertOpen(null)} className="bg-specsavers-green text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-emerald-700 transition-colors">
                Acknowledge
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
