
export const formatDate = (dateString) => {
    const date = new Date(dateString);

    const getDayWithSuffix = (day) => {
        const j = day % 10,
              k = day % 100;
        if (j === 1 && k !== 11) {
            return day + "st";
        }
        if (j === 2 && k !== 12) {
            return day + "nd";
        }
        if (j === 3 && k !== 13) {
            return day + "rd";
        }
        return day + "th";
    };

    const day = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);
    const dayWithSuffix = getDayWithSuffix(date.getDate());
    const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);
    const year = date.getFullYear();

    return `${day} ${dayWithSuffix} ${month}, ${year}`;
};
