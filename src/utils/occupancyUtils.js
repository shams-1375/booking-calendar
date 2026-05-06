export const calculateOccupancy = (date, bookings) => {
    const currentTimestamp = new Date(date).setHours(0, 0, 0, 0);

    let occupiedRooms = 0;

    bookings.forEach(booking => {
        if (booking.status === 'cancelled') return;

        const start = new Date(booking.checkIn).setHours(0, 0, 0, 0);
        const end = new Date(booking.checkOut).setHours(0, 0, 0, 0);

        // CORE LOGIC: current date must be >= checkIn AND STRICTLY LESS THAN checkOut.
        // This ensures the checkout day is NOT counted as occupied.
        if (currentTimestamp >= start && currentTimestamp < end) {
            occupiedRooms += 1;
        }
    });

    return occupiedRooms;
};

// Returns Tailwind classes based on occupancy count (max 10)
export const getHeatmapColor = (occupancy) => {
    if (occupancy === 0) return 'bg-gray-50';

    if (occupancy <= 2) return 'bg-blue-100 text-blue-900';
    if (occupancy <= 4) return 'bg-blue-300 text-white';
    if (occupancy <= 6) return 'bg-orange-300 text-white';
    if (occupancy <= 8) return 'bg-orange-500 text-white';

    return 'bg-red-600 text-white';
};