import React from 'react';
import DayCell from './DayCell';

export default function CalendarGrid({
    grid,
    currentMonth,
    bookings,
    selectionRange,
    handleMouseDown,
    handleMouseEnter,
    handleMouseUp
}) {
    const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    // Helper to check if a date falls within the selected range
    const isDateSelected = (date) => {
        if (!selectionRange) return false;
        const time = date.getTime();
        return time >= selectionRange.start.getTime() && time <= selectionRange.end.getTime();
    };

    return (
        <div className="w-full bg-white rounded shadow p-4">
            {/* Weekday Labels */}
            <div className="grid grid-cols-7 mb-2 text-center font-semibold text-gray-500">
                {daysOfWeek.map(day => <div key={day}>{day}</div>)}
            </div>

            {/* 42-Day Grid */}
            <div className="grid grid-cols-7" onMouseLeave={handleMouseUp}>
                {grid.map((date, index) => (
                    <DayCell
                        key={index}
                        date={date}
                        currentMonth={currentMonth}
                        bookings={bookings}
                        isSelected={isDateSelected(date)}
                        onMouseDown={handleMouseDown}
                        onMouseEnter={handleMouseEnter}
                        onMouseUp={handleMouseUp}
                    />
                ))}
            </div>
        </div>
    );
}