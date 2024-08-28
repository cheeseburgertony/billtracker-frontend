import { forwardRef, memo, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { Input, Keyboard, Popup, Toast } from 'zarm'
import classNames from 'classnames'
import dayjs from 'dayjs'
import PropTypes from 'prop-types'

import s from './style.module.less'
import PopupDate from '../PopupDate'
import CustomIcon from '../CustomIcon'
import { typeMap } from '@/utils'
import { getTypeListAPI, postBillAddAPI } from '@/apis'

const PopupAddBill = memo(forwardRef((props, ref) => {
  const { onReload } = props

  const [show, setShow] = useState(false)
  const [payType, setPayType] = useState('expense')
  const [date, setDate] = useState(new Date())
  const [amount, setAmount] = useState('')
  const [expense, setExpense] = useState([])
  const [income, setIncome] = useState([])
  const [currentType, setCurrentType] = useState({})
  const [remark, setRemark] = useState('')
  const [showRemark, setShowRemark] = useState(false)

  const dateRef = useRef()

  useImperativeHandle(ref, () => ({
    show: () => setShow(true),
    close: () => setShow(false)
  }))

  useEffect(() => {
    const getTypeListData = async () => {
      const { list } = await getTypeListAPI()
      const _expense = list.filter(item => item.type === 1)
      const _income = list.filter(item => item.type === 2)
      setExpense(_expense)
      setIncome(_income)
      setCurrentType(_expense[0])
    }
    getTypeListData()
  }, [])

  // 修改收入/支出
  const changePayType = (type) => {
    setPayType(type)
    setCurrentType(type === 'expense' ? expense[0] : income[0])
  }

  // 添加账单操作
  const addBill = async () => {
    if (!amount) {
      Toast.show('请输入具体金额')
    }
    // 参数准备
    const params = {
      amount: Number(amount).toFixed(2),
      type_id: currentType.id,
      type_name: currentType.name,
      date: dayjs(date).unix() * 1000,
      pay_type: payType === 'expense' ? 1 : 2,
      remark: remark || ''
    }
    // 发生请求进行修改
    const res = await postBillAddAPI(params)
    console.log(res);
    // 数据重置
    setAmount('')
    setPayType('expense')
    setCurrentType(expense[0])
    setDate(new Date())
    setRemark('')
    Toast.show('添加成功')
    setShow(false)
    // 调用父组件的方法进行刷新重新加载页面
    if (onReload) onReload()
  }

  // 数字键盘输入
  const onKeyClick = (value) => {
    if (value === 'delete') {
      const _amount = amount.slice(0, amount.length - 1)
      setAmount(_amount)
      return
    }

    if (value === 'ok') {
      addBill()
      return
    }

    if (value === 'close') {
      setShow(false)
    }

    // 当已经存在.时不允许继续加.
    if (value === '.' && amount.includes('.')) return
    // 小数点后保留两位，超过两位后不让其字符串继续相加
    if (value !== '.' && amount.includes('.') && amount && amount.split('.')[1].length >= 2) return
    // 进行拼接
    setAmount(amount + value)
  }


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
              onClick={() => changePayType('expense')}
            >
              支出
            </span>
            <span
              className={classNames([s.income], { [s.active]: payType === 'income' })}
              onClick={() => changePayType('income')}
            >
              收入
            </span>
          </div>
          <div className={s.time} onClick={() => dateRef.current && dateRef.current.show()}>
            {dayjs(date).format('MM-DD')}
          </div>
        </div>
        <div className={s.money}>
          <span className={s.sufix}>¥</span>
          <span className={classNames(s.amount, s.animation)}>{amount}</span>
        </div>
        <div className={s.typeWrap}>
          <div className={s.typeBody}>
            {(payType === 'expense' ? expense : income).map(item => (
              <div
                className={s.typeItem}
                key={item.id}
                onClick={() => setCurrentType(item)}
              >
                <span
                  className={classNames(s.iconfontWrap,
                    {
                      [s.expense]: payType === 'expense',
                      [s.income]: payType === 'income',
                      [s.active]: currentType.id === item.id
                    })}
                >
                  <CustomIcon className={s.iconfont} type={typeMap[item.id].icon} />
                </span>
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={s.remark}>
          {showRemark ? (
            <Input
              autoHeight
              showLength
              maxLength={50}
              type='text'
              rows={3}
              value={remark}
              placeholder='请输入备注信息'
              onChange={(value) => setRemark(value)}
              onBlur={() => setShowRemark(false)}
            />
          ) : (<span onClick={() => setShowRemark(true)}>{remark || '添加备注'}</span>)}
        </div>
        <Keyboard type='price' onKeyClick={onKeyClick} />
        <PopupDate ref={dateRef} onSelect={(value) => setDate(value)} />
      </div>
    </Popup>
  )
}))

PopupAddBill.propTypes = {
  onReload: PropTypes.func
}

export default PopupAddBill
