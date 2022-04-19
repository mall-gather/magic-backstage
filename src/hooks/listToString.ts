// 对象转成指定字符串分隔
export default function listToString(list: object, attributes?: string, separator?: string) {
  let strs = "";
  separator = separator || ",";
  for (let i in list) {
    if (attributes) {
      strs += list[i][attributes] + separator;
    }
    else {
      strs += list[i] + separator;
    }
  }
  return strs != '' ? strs.substr(0, strs.length - 1) : '';
}