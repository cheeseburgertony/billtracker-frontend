import { memo } from 'react'
import s from './style.module.less'
import { Icon } from 'zarm'

const MyIcon = Icon.createFromIconfont('//at.alicdn.com/t/c/font_4668023_je4xn29sh.js')

const Data = memo(() => {
  return (
    <div className={s.data}>
      <div className={s.total}>
        <div className={s.time}>
          <span>2024-08</span>
          <MyIcon className={s.date} type='icon-date' />
        </div>
        <div className={s.title}>共支出</div>
        <div className={s.expense}>¥1000.00</div>
        <div className={s.income}>共收入¥200.00</div>
      </div>
    </div>
  )
})

export default Data
