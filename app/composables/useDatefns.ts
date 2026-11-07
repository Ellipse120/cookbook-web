import { formatDistanceToNow } from 'date-fns'
import { zhCN } from 'date-fns/locale/zh-CN'

export const useUseDatefns = () => {
  const relativeTime = (date: Date | number) => {
    return formatDistanceToNow(date, {
      addSuffix: true,
      locale: zhCN,
    })
  }

  return {
    relativeTime,
  }
}
