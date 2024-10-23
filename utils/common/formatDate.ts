export const formatDate = (endDate: Date | undefined) => {
  if (!endDate) return;
  const date = new Date(endDate);
  const currentYear = new Date().getFullYear();
  const year = date.getFullYear();
  const month = date.toLocaleString("default", { month: "long" });
  const day = date.getDate();
  if (year === currentYear) {
    return `${month} ${day}`;
  } else {
    return `${month} ${day}, ${year}`;
  }
};
