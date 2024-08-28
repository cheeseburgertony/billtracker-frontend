import { memo, useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { Pull } from 'zarm'

import s from './style.module.less'
import BillItem from '@/components/BillItem'
import { LOAD_STATE, REFRESH_STATE } from '@/utils'
import { getBillListAPI } from '@/apis'

const Home = memo(() => {
  const [list, setList] = useState([])
  const [currentTime, setCurrentTime] = useState(dayjs().format('YYYY-MM'))
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(0)
  const [refresh, setRefresh] = useState(REFRESH_STATE.normal) // 刷新状态
  const [load, setLoad] = useState(LOAD_STATE.normal)  // 加载状态

  // 获取账单列表
  const getBillListData = async () => {
    const { data } = await getBillListAPI(currentTime, page)
    console.log(data);
    if (page === 1) {
      setList(data.list)
    } else {
      setList([...list, ...data.list])
    }
    setTotalPage(data.totalPage)
    setLoad(LOAD_STATE.success)
    setRefresh(REFRESH_STATE.success)
  }

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

  useEffect(() => {
    getBillListData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])


  return (
    <div className={s.home}>
      <div className={s.header}>
        <div className={s.dataWrap}>
          <span className={s.expense}>总支出：<b>¥ 200.00</b></span>
          <span className={s.income}>总收入：<b>¥ 500.00</b></span>
        </div>
        <div className={s.typeWrap}>
          <div className={s.left}>
            <span className={s.title}>类型</span>
          </div>
          <div className={s.right}>
            <span className={s.time}>2024-08</span>
          </div>
        </div>
      </div>
      <div className={s.contentWrap}>
        {list.length && (
          <Pull
            animationDuration={200}
            stayTime={400}
            refresh={{ state: refresh, handler: refreshData }}
            load={{ state: load, distance: 200, handler: loadData }}
          >
            {list.map((item, index) => <BillItem key={index} bill={item} />)}
          </Pull>
        )}
      </div>
    </div>
  )
})

export default Home
