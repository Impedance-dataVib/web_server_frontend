export default function dateFormat(date) {
  const dateStringArray = date.toDateString().split(" ");
  return `${dateStringArray[2]} ${dateStringArray[1]} ${dateStringArray[3]}`;
}
