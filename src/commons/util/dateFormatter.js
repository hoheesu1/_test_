export default function dateFormatter(newDate) {
  const today = new Date(newDate);
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  const hours = today.getHours();
  const minutes = today.getMinutes();

  return `${year}.${month >= 10 ? month : '0' + month}.${date
    .toString()
    .padStart(2, '0')}. ${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}`;
}
