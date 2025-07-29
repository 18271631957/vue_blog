/*
  格式化ISO类型日期 如：2023-01-01T00:00:00.000Z
*/
export const formatISODate = (dateTimeString) => {
  const date = new Date(dateTimeString);
  const YY = date.getFullYear(); // 年
  const MM =
    date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1; // 月
  const DD = date.getDate() < 10 ? "0" + date.getDate() : date.getDate(); // 日
  const hh = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(); // 时
  const mm =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(); // 分
  const ss =
    date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds(); // 秒
  const formattedDateTime =
    YY + "-" + MM + "-" + DD + " " + hh + ":" + mm + ":" + ss;
  return formattedDateTime;
};