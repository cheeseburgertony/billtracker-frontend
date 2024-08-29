import { memo, useEffect, useRef, useState } from 'react'
import { Icon, Progress } from 'zarm'
import PopupDate from '@/components/PopupDate'
import dayjs from 'dayjs'

import s from './style.module.less'
import classNames from 'classnames'
import CustomIcon from '@/components/CustomIcon'
import { typeMap } from '@/utils'
import { getBillDataAPI } from '@/apis'
const MyIcon = Icon.createFromIconfont('//at.alicdn.com/t/c/font_4668023_je4xn29sh.js')

const Data = memo(() => {
  const [currentMonth, setCurrentMonth] = useState(dayjs().format('YYYY-MM'))
  const [payType, setPayType] = useState('expense')
  const [totalExpense, setTotalExpense] = useState(0)
  const [totalIncome, setTotalIncome] = useState(0)
  const [expenseData, setExpenseData] = useState([])
  const [incomeData, setIncomeData] = useState([])

  const monthRef = useRef()

  useEffect(() => {
    const getBillData = async () => {
      // 获取整理后的数据
      const { data } = await getBillDataAPI(currentMonth)
      setTotalExpense(data.total_expense)
      setTotalIncome(data.total_income)
      // 过滤出支出/收入
      const _expenseData = data.total_data.filter(item => item.pay_type === 1).sort((a, b) => b.number - a.number)
      const _incomeData = data.total_data.filter(item => item.pay_type === 2).sort((a, b) => b.number - a.number)
      setExpenseData(_expenseData)
      setIncomeData(_incomeData)
    }
    getBillData()
  }, [currentMonth])

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
      <PopupDate ref={monthRef} mode='month' onSelect={(month) => setCurrentMonth(month)} />

      <div className={s.structure}>
        <div className={s.head}>
          <span className={s.title}>收支构成</span>
          <div className={s.tab}>
            <span
              onClick={() => setPayType('expense')}
              className={classNames(s.expense, { [s.active]: payType === 'expense' })}
            >
              支出
            </span>
            <span
              onClick={() => setPayType('income')}
              className={classNames(s.income, { [s.active]: payType === 'income' })}
            >
              收入
            </span>
          </div>
        </div>
        <div className={s.content}>
          {(payType === 'expense' ? expenseData : incomeData).map(item => (
            <div className={s.item} key={item.type_id}>
              <div className={s.left}>
                <div className={s.type}>
                  <span className={classNames({ [s.expense]: payType === 'expense', [s.income]: payType === 'income' })}>
                    <CustomIcon type={item.type_id ? typeMap[item.type_id].icon : 1} />
                  </span>
                  <span className={s.name}>{item.type_name}</span>
                </div>
                <div className={s.progress}>¥{Number(item.number).toFixed(2) || 0.00}</div>
              </div>
              <div className={s.right}>
                <div className={s.percent}>
                  <Progress
                    shape='line'
                    strokeShape={'round'}
                    percent={Number((item.number / Number(payType === 'expense' ? totalExpense : totalIncome)) * 100).toFixed(2)}
                    theme='primary'
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
})

export default Data
