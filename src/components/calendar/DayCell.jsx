import React from 'react';
import { calculateOccupancy, getHeatmapColor } from '../../utils/occupancyUtils';

export default function DayCell({
    date,
    currentMonth,
    bookings,
    onMouseDown,
    onMouseEnter,
    onMouseUp,
    isSelected
}) {
    const isCurrentMonth = date.getMonth() === currentMonth.getMonth();
    const occupancy = calculateOccupancy(date, bookings);

    const colorClass = getHeatmapColor(occupancy);

    return (
        <div
            onMouseDown={() => onMouseDown(date)}
            onMouseEnter={() => onMouseEnter(date)}
            onMouseUp={onMouseUp}
            className={`
                h-24 p-2 cursor-pointer rounded-lg
                flex flex-col justify-between
                transition-all duration-200
                hover:scale-[1.02] hover:shadow-md
                ${colorClass}
                ${isCurrentMonth ? 'opacity-100' : 'opacity-30'}
                ${isSelected ? 'ring-2 ring-black' : 'border border-gray-200'}
            `}
        >
            {/* Date */}
            <span className="text-sm font-semibold text-gray-800">
                {date.getDate()}
            </span>

            {/* Occupancy */}
            {occupancy > 0 && (
                <span className="text-xs font-medium text-gray-700 self-end bg-white/70 px-1.5 py-0.5 rounded">
                    {occupancy}/10
                </span>
            )}
        </div>
    );
}