import React from 'react';
import { formatDateString } from '../../utils/dateUtils';

export default function BookingPanel({ selectionRange, bookings }) {
    if (!selectionRange) {
        return (
            <div className="w-80 bg-gray-50 p-6 border-l min-h-screen flex items-center justify-center text-gray-400 text-sm">
                Select a date or drag to view bookings
            </div>
        );
    }

    const isSingleDay =
        selectionRange.start.getTime() === selectionRange.end.getTime();

    const title = isSingleDay
        ? formatDateString(selectionRange.start)
        : `${formatDateString(selectionRange.start)}  to  ${formatDateString(selectionRange.end)}`;

    // filter bookings
    const filteredBookings = bookings.filter(b => {
        if (b.status === 'cancelled') return false;

        const bStart = new Date(b.checkIn).setHours(0, 0, 0, 0);
        const bEnd = new Date(b.checkOut).setHours(0, 0, 0, 0);
        const selStart = new Date(selectionRange.start).setHours(0, 0, 0, 0);
        const selEnd = new Date(selectionRange.end).setHours(0, 0, 0, 0);

        return bStart <= selEnd && bEnd > selStart;
    });

    const statusStyles = {
        confirmed: {
            card: 'bg-blue-50 border-blue-200',
            badge: 'bg-blue-100 text-blue-700',
        },
        checked_in: {
            card: 'bg-green-100 border-green-300',
            badge: 'bg-green-200 text-green-700',
        },
        checked_out: {
            card: 'bg-red-50 border-red-200',
            badge: 'bg-red-100 text-red-600',
        },
    };

    return (
        <div className="w-80 bg-white p-5 border-l min-h-screen overflow-y-auto">

            {/* HEADER */}
            <div className="mb-5 border-b pb-3">
                <h3 className="text-xl font-bold text-gray-800">Bookings as of</h3>
                <p className="text-md text-gray-600 mt-1">{title}</p>
            </div>

            {/* EMPTY */}
            {filteredBookings.length === 0 ? (
                <div className="text-center text-gray-400 text-sm mt-10">
                    No bookings found
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredBookings.map(b => {
                        const nights =
                            (new Date(b.checkOut) - new Date(b.checkIn)) / 86400000;

                        const styles = statusStyles[b.status] ?? {
                            card: 'bg-gray-50 border-gray-200',
                            badge: 'bg-gray-100 text-gray-600',
                        };

                        return (
                            <div
                                key={b.id}
                                className={`border rounded-xl p-4 shadow-sm hover:shadow-md transition ${styles.card}`}
                            >
                                {/* TOP ROW */}
                                <div className="flex justify-between items-center">
                                    <p className="font-semibold text-gray-800">
                                        {b.guestName}
                                    </p>

                                    <span className={`text-xs px-2 py-1 rounded-full ${styles.badge}`}>
                                        {b.status}
                                    </span>
                                </div>

                                {/* ROOM + SOURCE */}
                                <div className="flex justify-between text-sm text-gray-600 mt-2">
                                    <span>Room {b.roomNumber} • {b.roomType}</span>
                                    <span className="text-xs bg-white/60 px-2 py-0.5 rounded">
                                        {b.source}
                                    </span>
                                </div>

                                {/* DATES */}
                                <p className="text-xs text-gray-500 mt-2">
                                    {formatDateString(new Date(b.checkIn))} → {formatDateString(new Date(b.checkOut))}
                                </p>

                                {/* DETAILS */}
                                <div className="flex justify-between mt-2 text-xs text-gray-600">
                                    <span>{nights} nights</span>
                                    <span>{b.guests} guests</span>
                                </div>

                                {/* AMOUNT */}
                                <p className="text-sm font-semibold text-blue-700 mt-2">
                                    {b.currency} {b.totalAmount.toLocaleString()}
                                </p>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}