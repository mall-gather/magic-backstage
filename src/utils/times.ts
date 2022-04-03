const time = new Date()

// 当前时间戳
const dayTimestamp = time.getTime()

// 一天的时间戳
const oneTimestamp = 60 * 60 * 24 * 1000

/**
 * 参数：days (天数)
 * 公式：
 *    当前时间戳 + 一天的时间戳 * 天数(正数为未来的时间，负数为过去的时间)
 *    dayTimestamp + oneTimestamp * day
 */

export function getTime(days: number):string {
  const date = new Date(dayTimestamp + oneTimestamp * days)
  const year = date.getFullYear()
  const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
  const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  return year + '-' + month + '-' + day
}

