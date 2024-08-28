import { forwardRef, memo, useImperativeHandle, useRef, useState } from 'react'

import s from './style.module.less'
import { Icon, Popup } from 'zarm'
import classNames from 'classnames'
import PopupDate from '../PopupDate'
import dayjs from 'dayjs'

const PopupAddBill = memo(forwardRef((props, ref) => {
  const [show, setShow] = useState(false)
  const [payType, setPayType] = useState('expense')
  const [date, setDate] = useState(new Date())

  const dateRef = useRef()

  useImperativeHandle(ref, () => ({
    show: () => setShow(true),
    close: () => setShow(false)
  }))



  return (
    <Popup
      visible={show}
      direction='bottom'
      onMaskClick={() => setShow(false)}
      destroy={false}
      mountContainer={() => document.body}
    >
      <div className={s.addWrap}>
        <div className={s.filter}>
          <div className={s.type}>
            <span
              className={classNames([s.expense], { [s.active]: payType === 'expense' })}
              onClick={() => setPayType('expense')}
            >
              支出
            </span>
            <span
              className={classNames([s.income], { [s.active]: payType === 'income' })}
              onClick={() => setPayType('income')}
            >
              收入
            </span>
          </div>
          <div className={s.time} onClick={() => dateRef.current && dateRef.current.show()}>
            {dayjs(date).format('MM-DD')}
          </div>
        </div>
        <PopupDate ref={dateRef} onSelect={(value) => setDate(value)} />
      </div>
    </Popup>
  )
}))

export default PopupAddBill
