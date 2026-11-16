import {
  addDays,
  formatDistanceToNow, isToday, isYesterday, format, compareAsc, differenceInMilliseconds,
  intervalToDuration,
  formatDuration,
  parse,
  parseISO,
  startOfDay,
  endOfDay,
  subDays,
  subMonths,
  isAfter,
  isWithinInterval,
  getWeekOfMonth,
  startOfMonth,
  eachWeekOfInterval,
} from 'date-fns'
import { zhCN } from 'date-fns/locale/zh-CN'

export const useUseDatefns = () => {
  const relativeTime = (date: Date | number) => {
    return formatDistanceToNow(date, {
      addSuffix: true,
      locale: zhCN,
    })
  }

  const formatDate = (time: any, formatter = 'yyyy-MM-dd HH:mm:ss') => {
    if (!time) return null

    return format(time, formatter, {
      locale: zhCN,
    })
  }

  function toReadableDuration(ms: number) {
  // 1. 将毫秒差值转换为 Duration 对象 (包含 hours, minutes, seconds 等)
    const duration = intervalToDuration({ start: 0, end: ms })

    // 2. 使用 formatDuration 转换为直观文本
    return formatDuration(duration, {
      locale: zhCN,
      format: ['hours', 'minutes', 'seconds'], // 指定你想显示的单位（按需调整）
    })
  }

  return {
    relativeTime,
    isToday,
    isYesterday,
    formatDate,
    compareAsc,
    differenceInMilliseconds,
    toReadableDuration,
    parse,
    parseISO,
    addDays,
    startOfDay,
    endOfDay,
    subDays,
    subMonths,
    isAfter,
    isWithinInterval,
    getWeekOfMonth,
    startOfMonth,
    eachWeekOfInterval,
  }
}
