export const getDayNumber = (date: any) => {
  let otherDate: any = new Date(date.getFullYear(), 0, 0);
  otherDate = otherDate / 1000 / 60 / 60 / 24;
  return Math.floor(date - otherDate);
};

export function getWeekNumber(dt: any) {
  var tdt: any = new Date(dt.valueOf());
  var dayn = (dt.getDay() + 6) % 7;
  tdt.setDate(tdt.getDate() - dayn + 3);
  var firstThursday = tdt.valueOf();
  tdt.setMonth(0, 1);
  if (tdt.getDay() !== 4) {
    tdt.setMonth(0, 1 + ((4 - tdt.getDay() + 7) % 7));
  }
  return 1 + Math.ceil((firstThursday - tdt) / 604800000);
}
