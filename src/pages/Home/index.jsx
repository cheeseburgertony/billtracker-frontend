import { memo, useState } from 'react'
import s from './style.module.less'

const Home = memo(() => {
  // const [list, setList] = useState([
  //   {
  //     bills: [
  //       {
  //         amount: "25.00",
  //         date: "1623390740000",
  //         id: 911,
  //         pay_type: 1,
  //         remark: "",
  //         type_id: 1,
  //         type_name: "餐饮"
  //       }
  //     ],
  //     date: '2024-06-11'
  //   }
  // ])

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
        {/* <div className={s.contentWrap}>
          {list.map(item => <BillItem />)}
        </div> */}
      </div>
    </div>
  )
})

export default Home
