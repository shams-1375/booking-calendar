// Gets a clean 42-day grid (6 weeks) to keep the calendar height consistent
export const getCalendarGrid = (year, month) => {
    const firstDayOfMonth = new Date(year, month, 1);

    // getDay() returns 0 for Sunday, 1 for Monday. 
    // We want the week to start on Monday, so we adjust the offset.
    let startOffset = firstDayOfMonth.getDay() - 1;
    if (startOffset === -1) startOffset = 6; // If it's Sunday, make it 6 days offset

    const grid = [];
    // Calculate the very first date on the top-left of the grid (often from the previous month)
    const startDate = new Date(year, month, 1 - startOffset);

    // 6 rows * 7 days = 42 cells
    for (let i = 0; i < 42; i++) {
        grid.push(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + i));
    }
    return grid;
};

// Formats a date to "YYYY-MM-DD" for easy comparison
export const formatDateString = (date) => {
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
};

// Normalizes a date range regardless of which way the user dragged
export const normalizeRange = (start, end) => {
    if (!start || !end) return null;
    const t1 = start.getTime();
    const t2 = end.getTime();
    return {
        start: t1 < t2 ? start : end,
        end: t1 > t2 ? start : end
    };
};