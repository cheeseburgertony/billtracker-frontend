import { forwardRef, memo, useEffect, useImperativeHandle, useState } from 'react'
import classNames from 'classnames'
import { Popup } from 'zarm'
import PropTypes from 'prop-types'

import s from './style.module.less'
import { getTypeListAPI } from '@/apis'

const PopupType = memo(forwardRef((props, ref) => {
  const { onSelect } = props
  const [show, setShow] = useState(false)
  const [activeType, setActiveType] = useState('all')
  const [expense, setExpense] = useState([])
  const [income, setIncome] = useState([])

  useEffect(() => {
    // 获取标签列表
    const getTypeListData = async () => {
      const { list } = await getTypeListAPI()
      setExpense(list.filter(item => item.type === 1))
      setIncome(list.filter(item => item.type === 2))
      // console.log(list);
    }
    getTypeListData()
  }, [])

  // 暴露给父组件使用的方法
  useImperativeHandle(ref, () => {
    return {
      show: () => setShow(true),
      close: () => setShow(false)
    }
  })

  // 选择类型后触发
  const handleChoose = (item) => {
    setActiveType(item.id)
    setShow(false)
    onSelect(item)
  }

  return (
    <Popup
      visible={show}
      direction='bottom'
      onMaskClick={() => setShow(false)}
      destroy={false}
      mountContainer={() => document.body}
    >
      <div className={s.popupType}>
        <div className={s.header}>
          请选择类型
        </div>
        <div className={s.content}>
          <div
            className={classNames([s.all], { [s.active]: activeType === 'all' })}
            onClick={() => handleChoose({ id: 'all' })}
          >
            全部类型
          </div>
          <div className={s.title}>支出</div>
          <div className={s.expenseWrap}>
            {expense.map(item => (
              <p
                key={item.id}
                className={classNames({ [s.active]: +activeType === item.id })}
                onClick={() => handleChoose(item)}
              >
                {item.name}
              </p>
            ))}
          </div>
          <div className={s.title}>收入</div>
          <div className={s.incomeWrap}>
            {income.map(item => (
              <p
                key={item.id}
                className={classNames({ [s.active]: +activeType === item.id })}
                onClick={() => handleChoose(item)}
              >
                {item.name}
              </p>
            ))}
          </div>
        </div>

      </div>
    </Popup>
  )
}))

PopupType.propTypes = {
  onSelect: PropTypes.func
}

export default PopupType
