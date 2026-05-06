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

    const monthYearString = currentMonth.toLocaleDateString('default', {
        month: 'long',
        year: 'numeric'
    });

    return (
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">

            {/* Title */}
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">
                {monthYearString}
            </h2>

            {/* Controls */}
            <div className="flex gap-2">
                <button
                    onClick={handlePrev}
                    className="px-4 py-1.5 text-sm rounded-lg border border-gray-300 hover:bg-gray-100 transition"
                >
                    ← Prev
                </button>

                <button
                    onClick={handleToday}
                    className="px-4 py-1.5 text-sm rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
                >
                    Today
                </button>

                <button
                    onClick={handleNext}
                    className="px-4 py-1.5 text-sm rounded-lg border border-gray-300 hover:bg-gray-100 transition"
                >
                    Next →
                </button>
            </div>
        </div>
    );
}