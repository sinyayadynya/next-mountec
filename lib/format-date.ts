export function formatDate(input: string): string {
  const date = new Date(input);
  return date.toLocaleDateString('en-US');
}

export function formatDateTime(input: string): string {
  const dateTime = new Date(input);
  return dateTime.toLocaleDateString('en-US')
    + ' '
    + dateTime.toLocaleTimeString('en-US');
}
