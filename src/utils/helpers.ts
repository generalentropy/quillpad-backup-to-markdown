export function getFormattedDate(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Mois (01-12)
  const day = String(now.getDate()).padStart(2, "0"); // Jour (01-31)
  return `${year}-${month}-${day}`;
}
