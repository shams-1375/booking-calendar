import React from 'react';
import { calculateOccupancy, getHeatmapColor } from '../../utils/occupancyUtils';
import { formatDateString } from '../../utils/dateUtils';

export default function DayCell({
    date,
    currentMonth,
    bookings,
    onMouseDown,
    onMouseEnter,
    onMouseUp,
    isSelected
}) {
    // Check if the date belongs to the currently viewed month
    const isCurrentMonth = date.getMonth() === currentMonth.getMonth();
    const occupancy = calculateOccupancy(date, bookings);

    // Visual styling
    const colorClass = getHeatmapColor(occupancy);
    const opacityClass = isCurrentMonth ? 'opacity-100' : 'opacity-40'; // De-emphasize other months
    const borderClass = isSelected ? 'border-4 border-black' : 'border border-gray-200';

    return (
        <div
            // mouse events for drag selection
            onMouseDown={() => onMouseDown(date)}
            onMouseEnter={() => onMouseEnter(date)}
            onMouseUp={onMouseUp}
            className={`h-24 p-2 cursor-pointer transition-all duration-100 flex flex-col justify-between ${colorClass} ${opacityClass} ${borderClass}`}
        >
            <span className="font-semibold text-sm">{date.getDate()}</span>
            {occupancy > 0 && (
                <span className="text-xs font-bold self-end">{occupancy}/10 Rms</span>
            )}
        </div>
    );
}