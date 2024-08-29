import { memo, useRef, useState } from 'react'
import { Icon } from 'zarm'
import PopupDate from '@/components/PopupDate'
import dayjs from 'dayjs'

import s from './style.module.less'
const MyIcon = Icon.createFromIconfont('//at.alicdn.com/t/c/font_4668023_je4xn29sh.js')

const Data = memo(() => {
  const [currentMonth, setCurrentMonth] = useState(dayjs().format('YYYY-MM'))

  const monthRef = useRef()

  // 选择月份操作
  const onSelectMonth = (month) => {
    setCurrentMonth(month)
  }

  return (
    <div className={s.data}>
      <div className={s.total}>
        <div className={s.time} onClick={() => monthRef.current && monthRef.current.show()}>
          <span>{currentMonth}</span>
          <MyIcon className={s.date} type='icon-date' />
        </div>
        <div className={s.title}>共支出</div>
        <div className={s.expense}>¥1000.00</div>
        <div className={s.income}>共收入¥200.00</div>
      </div>
      <PopupDate ref={monthRef} mode='month' onSelect={onSelectMonth} />
    </div>
  )
})

export default Data
