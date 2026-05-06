import React from 'react';

export default function CalendarHeader({ currentMonth, setCurrentMonth }) {
    const handlePrev = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    };

    const handleNext = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    };

    const handleToday = () => {
        setCurrentMonth(new Date());
    };

    const monthYearString = currentMonth.toLocaleDateString('default', { month: 'long', year: 'numeric' });

    return (
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">{monthYearString}</h2>
            <div className="space-x-2">
                <button onClick={handlePrev} className="px-3 py-1 border rounded hover:bg-gray-100">Prev</button>
                <button onClick={handleToday} className="px-3 py-1 border rounded hover:bg-gray-100">Today</button>
                <button onClick={handleNext} className="px-3 py-1 border rounded hover:bg-gray-100">Next</button>
            </div>
        </div>
    );
}