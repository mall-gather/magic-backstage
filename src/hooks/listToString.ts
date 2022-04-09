// 对象转成指定字符串分隔
export default function listToString(list:object, separator?:string) {
  let strs = "";
  separator = separator || ",";
  for (let i in list) {
    strs += list[i].url + separator;
  }
  return strs != '' ? strs.substr(0, strs.length - 1) : '';
}