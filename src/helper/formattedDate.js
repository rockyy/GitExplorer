export function formattedDate(dateString) {
  let date = new Date(dateString);
  var options = {year: 'numeric', month: 'long', day: 'numeric'};
  return date.toLocaleDateString('en-US', options);
}

export function formattedDateTime(dateString) {
  let date = new Date(dateString);
  return date.toLocaleString();
}
