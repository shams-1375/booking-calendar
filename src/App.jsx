import React, { useState, useEffect } from 'react';
import { getCalendarGrid, normalizeRange } from './utils/dateUtils';
import CalendarHeader from './components/calendar/CalendarHeader';
import CalendarGrid from './components/calendar/CalendarGrid';
import BookingPanel from './components/sidebar/BookingPanel';
import StatsHeader from './components/calendar/StatsHeader';

export default function App() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Calendar State
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 1, 1)); // Defaulting to Feb 2026 for mock data
  const [grid, setGrid] = useState([]);

  // Drag Selection State
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const [selectionRange, setSelectionRange] = useState(null);

  // Fetch data on mount
  useEffect(() => {
    fetch('/bookings.json')
      .then(res => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then(data => {
        setBookings(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Update grid when month changes
  useEffect(() => {
    setGrid(getCalendarGrid(currentMonth.getFullYear(), currentMonth.getMonth()));
  }, [currentMonth]);

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
  }, []);

  // --- Mouse Event Handlers for Drag Selection ---
  const handleMouseDown = (date) => {
    setIsDragging(true);
    setDragStart(date);
    setSelectionRange({ start: date, end: date });
  };

  const handleMouseEnter = (date) => {
    if (isDragging && dragStart) {
      setSelectionRange(normalizeRange(dragStart, date));
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  if (loading) return <div className="p-10 text-center text-xl">Loading Guestara Data...</div>;
  if (error) return <div className="p-10 text-center text-red-500">Error: {error}</div>;

  return (
    <div className="flex bg-gray-100 min-h-screen font-sans">
      <div className="flex-1 p-8 max-w-5xl mx-auto">
        <h1 className="text-3xl font-extrabold text-blue-900 mb-6">Guestara Front Desk</h1>
        <StatsHeader bookings={bookings} currentMonth={currentMonth} />

        <CalendarHeader
          currentMonth={currentMonth}
          setCurrentMonth={setCurrentMonth}
        />

        <CalendarGrid
          grid={grid}
          currentMonth={currentMonth}
          bookings={bookings}
          selectionRange={selectionRange}
          handleMouseDown={handleMouseDown}
          handleMouseEnter={handleMouseEnter}
          handleMouseUp={handleMouseUp}
        />
      </div>

      {/* Side Panel for Booking Details */}
      <BookingPanel
        selectionRange={selectionRange}
        bookings={bookings}
      />
    </div>
  );
}