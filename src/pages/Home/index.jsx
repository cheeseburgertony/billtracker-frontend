import { memo, useEffect, useRef, useState } from 'react'
import dayjs from 'dayjs'
import { Pull } from 'zarm'

import s from './style.module.less'
import BillItem from '@/components/BillItem'
import { LOAD_STATE, REFRESH_STATE } from '@/utils'
import { getBillListAPI } from '@/apis'
import PopupType from '@/components/PopupType'
import PopupDate from '@/components/PopupDate'
import CustomIcon from '@/components/CustomIcon'
import PopupAddBill from '@/components/PopUpAddBill'

const Home = memo(() => {
  const [list, setList] = useState([])
  const [currentTime, setCurrentTime] = useState(dayjs().format('YYYY-MM'))
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(0)
  const [totalExpense, setTotalExpense] = useState(0)
  const [totalIncome, setTotalIncome] = useState(0)
  const [currentType, setCurrentType] = useState({})  // 当前所选类型
  const [refresh, setRefresh] = useState(REFRESH_STATE.normal) // 刷新状态
  const [load, setLoad] = useState(LOAD_STATE.normal)  // 加载状态

  const typeRef = useRef()
  const monthRef = useRef()
  const addBillRef = useRef()

  // 获取账单列表
  const getBillListData = async () => {
    const { data } = await getBillListAPI(currentTime, page, currentType.id || 'all')
    if (page === 1) {
      setList(data.list)
    } else {
      setList([...list, ...data.list])
    }
    setTotalExpense(data.totalExpense.toFixed(2))
    setTotalIncome(data.totalIncome.toFixed(2))
    setTotalPage(data.totalPage)
    setLoad(LOAD_STATE.success)
    setRefresh(REFRESH_STATE.success)
  }

  useEffect(() => {
    getBillListData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, currentType, currentTime])

  // 下拉刷新
  const refreshData = () => {
    setRefresh(REFRESH_STATE.loading)
    if (page !== 1) {
      setPage(1)
    } else {
      getBillListData()
    }
  }

  // 滑动加载
  const loadData = () => {
    if (page < totalPage) {
      setLoad(LOAD_STATE.loading)
      setPage(page + 1)
    }
  }

  // 点击显示类型选择弹窗
  const showPopupType = () => {
    typeRef.current && typeRef.current.show()
  }

  // 点击显示月份选择弹窗
  const showPopupDate = () => {
    monthRef.current && monthRef.current.show()
  }

  // 选择类型后触发(子组件传递回来调用)
  const onSelectType = (item) => {
    // 触发刷新列表,将分页重置为1,将选中项更新
    setRefresh(REFRESH_STATE.loading)
    setPage(1)
    setCurrentType(item)
  }

  // 选择时间后触发
  const onSelectDate = (item) => {
    // 触发刷新列表,将分页重置为1,将选中项更新
    setRefresh(REFRESH_STATE.loading)
    setPage(1)
    setCurrentTime(item)
  }

  // 新增账单
  const addBill = () => {
    addBillRef.current && addBillRef.current.show()
  }


  return (
    <div className={s.home}>
      <div className={s.header}>
        <div className={s.dataWrap}>
          <span className={s.expense}>总支出：<b>¥ {totalExpense}</b></span>
          <span className={s.income}>总收入：<b>¥ {totalIncome}</b></span>
        </div>
        <div className={s.typeWrap}>
          <div className={s.left}>
            <span className={s.title} onClick={showPopupType}>{currentType.name || '全部类型'}</span>
          </div>
          <div className={s.right}>
            <span className={s.time} onClick={showPopupDate}>{currentTime}</span>
          </div>
        </div>
      </div>
      <div className={s.contentWrap}>
        <Pull
          animationDuration={200}
          stayTime={400}
          refresh={{ state: refresh, handler: refreshData }}
          load={{ state: load, distance: 200, handler: loadData }}
        >
          {list.length > 0 && list.map((item, index) => <BillItem key={index} bill={item} />)}
        </Pull>
      </div>
      <PopupType ref={typeRef} onSelect={onSelectType} />
      <PopupDate ref={monthRef} mode='month' onSelect={onSelectDate} />
      <div className={s.add} onClick={addBill}><CustomIcon type='tianjia' /></div>
      <PopupAddBill ref={addBillRef} />
    </div>
  )
})

export default Home
