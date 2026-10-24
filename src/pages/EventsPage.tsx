import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CommunityEvent } from '../types';
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  CheckCircle2,
  X,
  ArrowRight,
  Share2
} from 'lucide-react';

export const EventsPage: React.FC = () => {
  const { events, toggleJoinEvent, showToast } = useApp();
  const [rsvpModalEvent, setRsvpModalEvent] = useState<CommunityEvent | null>(null);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-[#2E7D32] uppercase tracking-wider">
          <Calendar className="w-4 h-4" />
          <span>Live Gatherings</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1A2E1A] tracking-tight">
          Workshops, Outdoor Meetups & Retreats
        </h1>
        <p className="text-base text-[#5A6B5A] max-w-2xl">
          Gather with fellow practitioners in physical nature reserves and virtual symposiums to deepen mindful habits.
        </p>
      </div>

      {/* Featured Big Event Banner */}
      {events[0] && (
        <div className="bg-white rounded-3xl overflow-hidden shadow-xl shadow-black/5 border border-[#EAE6DF]">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            <div className="lg:col-span-7 relative min-h-[300px] lg:min-h-full">
              <img
                src={events[0].image}
                alt={events[0].title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-4 left-4 px-3 py-1 bg-white/95 backdrop-blur-md text-xs font-bold text-[#2E7D32] rounded-full shadow-xs">
                Featured Live Symposium
              </span>
            </div>

            <div className="lg:col-span-5 p-8 sm:p-10 space-y-6 flex flex-col justify-center">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#2E7D32]">
                  <Calendar className="w-4 h-4" />
                  <span>{events[0].date}</span>
                </div>
                <h2 className="text-2xl font-bold text-[#1A2E1A] leading-tight">
                  {events[0].title}
                </h2>
                <p className="text-xs sm:text-sm text-[#5A6B5A] leading-relaxed">
                  {events[0].description}
                </p>
              </div>

              <div className="space-y-2 text-xs text-[#5A6B5A]">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#2E7D32]" />
                  <span>{events[0].time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#2E7D32]" />
                  <span>{events[0].location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#2E7D32]" />
                  <span>{events[0].attendees} Registered Attendees</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => toggleJoinEvent(events[0].id)}
                  className={`w-full py-3 rounded-full text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all ${
                    events[0].isJoined
                      ? 'bg-[#E8F5E9] text-[#1B5E20] border border-[#2E7D32]'
                      : 'bg-[#2E7D32] hover:bg-[#1B5E20] text-white'
                  }`}
                >
                  {events[0].isJoined ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-[#2E7D32]" />
                      <span>You Are Registered (Cancel RSVP)</span>
                    </>
                  ) : (
                    <>
                      <span>RSVP Free Seat</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grid of Other Upcoming Events */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-[#1A2E1A]">All Upcoming Sessions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {events.slice(1).map(evt => (
            <div
              key={evt.id}
              className="bg-white rounded-3xl overflow-hidden shadow-xl shadow-black/5 border border-[#EAE6DF] flex flex-col justify-between"
            >
              <div>
                <div className="h-52 overflow-hidden relative">
                  <img
                    src={evt.image}
                    alt={evt.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-xs font-bold text-[#2E7D32]">
                    {evt.type}
                  </span>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <div className="text-xs font-semibold text-[#2E7D32]">{evt.date} · {evt.time}</div>
                    <h4 className="text-lg font-bold text-[#1A2E1A] mt-1">{evt.title}</h4>
                    <p className="text-xs text-[#5A6B5A] mt-2 leading-relaxed">{evt.description}</p>
                  </div>

                  <div className="space-y-1.5 text-xs text-[#5A6B5A]">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#2E7D32]" />
                      <span className="truncate">{evt.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-3.5 h-3.5 text-[#2E7D32]" />
                      <span>{evt.attendees} Members Going</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-[#EAE6DF] pt-4 flex items-center justify-between">
                <span className="text-xs text-[#5A6B5A]">Host: {evt.host}</span>
                <button
                  onClick={() => toggleJoinEvent(evt.id)}
                  className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    evt.isJoined
                      ? 'bg-[#E8F5E9] text-[#1B5E20] border border-[#2E7D32]'
                      : 'bg-[#2E7D32] hover:bg-[#1B5E20] text-white shadow-xs'
                  }`}
                >
                  {evt.isJoined ? 'Registered ✓' : 'Join Event'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
