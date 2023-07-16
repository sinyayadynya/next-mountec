export function formatDate(input: string): string {
    const date = new Date(input);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }



export function formatDateTime(input: string): string {
  const dateTime = new Date(input);
  return dateTime.toLocaleDateString('en-US')
    + ' '
    + dateTime.toLocaleTimeString('en-US');
}
