export function formatDate(input: string): string {
    const date = new Date(input);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }


export function formatDateTime(input: string): string {
  const dateTime = new Date(input);
  return dateTime.toLocaleDateString('en-US')
    + ' '
    + dateTime.toLocaleTimeString('en-US');
}

export function formatDateMonth(input: string): string {
    const date = new Date(input);
    const options = { year: 'numeric', month: 'long' };
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}
