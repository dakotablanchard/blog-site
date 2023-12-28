module.exports = {
  format_date: (date) => {
    // Get time components
    const timeOptions = {
      hour: '2-digit',
      minute: '2-digit',
    };
    const timeString = date.toLocaleTimeString(undefined, timeOptions);

    // Get date components
    const dateOptions = {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    };
    const dateString = date.toLocaleDateString(undefined, dateOptions);

    // Concatenate time and date
    return `${timeString} ${dateString}`;
  },
};