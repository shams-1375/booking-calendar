import React from 'react';

export default function StatsHeader({ bookings, currentMonth }) {
    const month = currentMonth.getMonth();
    const year = currentMonth.getFullYear();

    const monthStart = new Date(year, month, 1).setHours(0, 0, 0, 0);
    const monthEnd = new Date(year, month + 1, 0).setHours(0, 0, 0, 0);

    const activeBookings = bookings.filter(b => {
        if (b.status === 'cancelled') return false;

        const start = new Date(b.checkIn).setHours(0, 0, 0, 0);
        const end = new Date(b.checkOut).setHours(0, 0, 0, 0);

        // overlap logic
        return start <= monthEnd && end > monthStart;
    });

    const totalBookings = activeBookings.length;

    const avgStay =
        totalBookings > 0
            ? (
                activeBookings.reduce((acc, b) => {
                    const nights =
                        (new Date(b.checkOut) - new Date(b.checkIn)) / 86400000;
                    return acc + nights;
                }, 0) / totalBookings
            ).toFixed(1)
            : 0;

    return (
        <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-4 rounded shadow">
                <p className="text-gray-500 text-sm">Bookings in Month</p>
                <p className="text-2xl font-bold">{totalBookings}</p>
            </div>

            <div className="bg-white p-4 rounded shadow">
                <p className="text-gray-500 text-sm">Avg. Stay</p>
                <p className="text-2xl font-bold">{avgStay} Nights</p>
            </div>

            <div className="bg-white p-4 rounded shadow">
                <p className="text-gray-500 text-sm">Max Capacity</p>
                <p className="text-2xl font-bold">10 Rooms</p>
            </div>
        </div>
    );
}