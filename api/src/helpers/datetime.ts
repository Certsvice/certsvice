import dayjs from 'dayjs'
import th from 'dayjs/locale/th'
import buddhistEra from 'dayjs/plugin/buddhistEra'
import isBetween from 'dayjs/plugin/isBetween'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

dayjs.extend(isBetween)
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(buddhistEra)
dayjs.tz.setDefault('Asia/Bangkok')
dayjs.locale(th)

export { dayjs }
