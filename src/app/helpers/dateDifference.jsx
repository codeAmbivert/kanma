function formatDateDifference(startDate, endDate) {
  // Calculate the difference in milliseconds
  const differenceInMilliseconds = endDate - startDate;

  // Convert milliseconds to days
  const differenceInDays = Math.ceil(
    differenceInMilliseconds / (1000 * 60 * 60 * 24)
  );

  return differenceInDays;
}

export default formatDateDifference;
