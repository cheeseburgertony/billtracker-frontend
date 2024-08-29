import { memo, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Cell } from 'zarm'
import { useNavigate } from 'react-router-dom'

import s from './style.module.less'
import { typeMap } from '@/utils'
import CustomIcon from '../CustomIcon'
import dayjs from 'dayjs'

const BillItem = memo((props) => {
  const { bill } = props
  const [expense, setExpense] = useState(0)
  const [income, setIncome] = useState(0)

  const navigate = useNavigate()

  // 当日账单如果发生变化时触发该副作用，重新计算当日的总收入和总支出
  useEffect(() => {
    // pay_type 1 为支出 2为收入
    // 当天支出
    const _expense = bill.bills.filter(item => item.pay_type === 1).
      reduce((prev, current) => prev + Number(current.amount), 0)
    setExpense(_expense)
    // 当天收入
    const _income = bill.bills.filter(item => item.pay_type === 2).
      reduce((prev, current) => prev + Number(current.amount), 0)
    setIncome(_income)
  }, [bill.bills])

  // 点击账单触发的事件
  const goToDetail = (id) => {
    navigate(`/detail?id=${id}`)
  }

  return (
    <div className={s.item}>
      <div className={s.headerData}>
        <div className={s.date}>{bill.date}</div>
        <div className={s.money}>
          <span>
            <img src="https://s.yezgea02.com/1615953405599/zhi%402x.png" alt="支" />
            <span>¥{expense.toFixed(2)}</span>
          </span>
          <span>
            <img src="https://s.yezgea02.com/1615953405599/shou%402x.png" alt="收" />
            <span>¥{income.toFixed(2)}</span>
          </span>
        </div>
      </div>
      {bill && bill.bills.map(item => (
        <Cell
          className={s.bill}
          key={item.id}
          onClick={() => goToDetail(item.id)}
          title={(
            <>
              <CustomIcon
                className={s.itemIcon}
                type={item.type_id ? typeMap[item.type_id].icon : 1}
              />
              <span>{item.type_name}</span>
            </>
          )}
          description={(
            <span style={{ color: item.pay_type === 1 ? '#39be77' : 'red' }}>
              {`${item.pay_type === 1 ? '-' : '+'}${item.amount}`}
            </span>
          )}
          help={(
            <div>
              {dayjs(Number(item.date)).format('HH:mm')} {item.remark ? `| ${item.remark}` : ''}
            </div>
          )}
        >
        </Cell>
      ))}
    </div>
  )
})

BillItem.propTypes = {
  bill: PropTypes.object
}

export default BillItem
