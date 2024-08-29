import { memo, useEffect, useRef, useState } from 'react'
import { Icon, Progress } from 'zarm'
import PopupDate from '@/components/PopupDate'
import dayjs from 'dayjs'
import classNames from 'classnames'

import s from './style.module.less'
import CustomIcon from '@/components/CustomIcon'
import { typeMap } from '@/utils'
import { getBillDataAPI } from '@/apis'

const MyIcon = Icon.createFromIconfont('//at.alicdn.com/t/c/font_4668023_je4xn29sh.js')
let proportionChart = null; // 用于存放 echart 初始化返回的实例

const Data = memo(() => {
  const [currentMonth, setCurrentMonth] = useState(dayjs().format('YYYY-MM'))
  const [payType, setPayType] = useState('expense')
  const [totalExpense, setTotalExpense] = useState(0)
  const [totalIncome, setTotalIncome] = useState(0)
  const [expenseData, setExpenseData] = useState([])
  const [incomeData, setIncomeData] = useState([])
  const [piePayType, setPiePayType] = useState('expense') // 饼图的收入和支出控制

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
      // 绘制饼图
      setPieChart(piePayType === 'expense' ? _expenseData : _incomeData)
    }
    getBillData()

    return () => {
      // 每次组件卸载的时候，需要释放图表实例。clear 只是将其清空不会释放。
      proportionChart.dispose()
    }
  }, [currentMonth, piePayType])

  // 绘制饼图方法
  const setPieChart = (data) => {
    if (window.echarts) {
      // 初始化饼图,返回实例
      // eslint-disable-next-line no-undef
      proportionChart = echarts.init(document.querySelector('#proportion'))
      proportionChart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        // 图例
        legend: {
          data: data.map(item => item.type_name)
        },
        series: [
          {
            name: '支出',
            type: 'pie',
            radius: '55%',
            data: data.map(item => {
              return {
                value: item.number,
                name: item.type_name
              }
            }),
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })
    }
  }

  return (
    <div className={s.data}>
      <div className={s.total}>
        <div className={s.time} onClick={() => monthRef.current && monthRef.current.show()}>
          <span>{currentMonth}</span>
          <MyIcon className={s.date} type='icon-date' />
        </div>
        <div className={s.title}>共支出</div>
        <div className={s.expense}>¥{totalExpense}</div>
        <div className={s.income}>共收入¥{totalIncome}</div>
      </div>
      <PopupDate ref={monthRef} mode='month' onSelect={(month) => setCurrentMonth(month)} />
      {/* 排行区域 */}
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
      {/* 饼图区域 */}
      <div className={s.structure}>
        <div className={s.proportion}>
          <div className={s.head}>
            <span className={s.title}>收支构成</span>
            <div className={s.tab}>
              <span
                className={classNames(s.expense, { [s.active]: piePayType === 'expense' })}
                onClick={() => setPiePayType('expense')}
              >
                支出
              </span>
              <span
                className={classNames(s.income, { [s.active]: piePayType === 'income' })}
                onClick={() => setPiePayType('income')}
              >
                收入
              </span>
            </div>
          </div>
          {/* 用于防止饼图的DOM节点 */}
          <div id='proportion'></div>
        </div>
      </div>
    </div>
  )
})

export default Data
