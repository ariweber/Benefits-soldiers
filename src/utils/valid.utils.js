export function validMonth(value) {
  if (value.length !== 7 || value[4] !== "-") return false;
  const valueArr = value.split("-");
  const year = Number(valueArr[0]);
  const month = Number(valueArr[1]);
  if (Number.isNaN(year) || Number.isNaN(month)) return false;
  if (month < 1 || month > 12) return false;
  return true;
}

