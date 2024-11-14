export const formatDate = (endDate: Date | undefined, isChart?: boolean) => {
  if (!endDate) return;
  const date = new Date(endDate);
  const currentYear = new Date().getFullYear();
  const year = date.getFullYear();
  const month = date.toLocaleString("default", { month: "long" });
  const day = date.getDate();
  const time = date.toTimeString();
  if (isChart) {
    return time;
  }
  if (year === currentYear) {
    return `${month} ${day}`;
  } else {
    return `${month} ${day}, ${year}`;
  }
};

export function getTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();

  const seconds = Math.floor((Number(now) - Number(date)) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (seconds < 60) {
    return `${seconds}s ago`;
  } else if (minutes < 60) {
    return `${minutes}m ago`;
  } else if (hours < 24) {
    return `${hours}h ago`;
  } else if (days < 30) {
    return `${days}d ago`;
  } else if (months < 12) {
    return `${months}m ago`;
  } else {
    return `${years}y ago`;
  }
}
