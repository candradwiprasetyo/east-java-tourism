export function calculateDayDifference(
  fromDate: Date,
  toDate: Date,
  withoutLabel: boolean = false
): string | number {
  const utcFrom = Date.UTC(
    fromDate.getFullYear(),
    fromDate.getMonth(),
    fromDate.getDate()
  );
  const utcTo = Date.UTC(
    toDate.getFullYear(),
    toDate.getMonth(),
    toDate.getDate()
  );
  const diffTime = Math.abs(utcTo - utcFrom);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

  if (withoutLabel) {
    return diffDays === 0 ? 1 : diffDays;
  } else {
    return `${diffDays === 0 ? 1 : diffDays} day${diffDays === 1 ? "" : "s"}`;
  }
}
