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

    const isDateSelected = (date) => {
        if (!selectionRange) return false;
        const time = date.getTime();
        return time >= selectionRange.start.getTime() && time <= selectionRange.end.getTime();
    };

    return (
        <div className="w-full bg-white rounded-xl shadow-md p-5 border border-gray-100">

            {/* Week Labels */}
            <div className="grid grid-cols-7 mb-3 text-center text-sm font-semibold text-gray-500">
                {daysOfWeek.map(day => (
                    <div key={day} className="py-1">
                        {day}
                    </div>
                ))}
            </div>

            {/* Calendar Grid */}
            <div
                className="grid grid-cols-7 gap-2"
                onMouseLeave={handleMouseUp}
            >
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