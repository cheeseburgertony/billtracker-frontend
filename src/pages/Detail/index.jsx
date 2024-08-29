import Header from '@/components/Header'
import { memo, useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { getBillDetailAPI, postBillDeleteAPI } from '@/apis'
import CustomIcon from '@/components/CustomIcon'
import classNames from 'classnames'
import dayjs from 'dayjs'
import { Modal, Toast } from 'zarm'

import s from './style.module.less'
import { typeMap } from '@/utils'
import PopupAddBill from '@/components/PopUpAddBill'

const Detail = memo(() => {
  const [detail, setDetail] = useState({})

  const editRef = useRef()

  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const id = searchParams.get('id')

  const getBillDetailData = async () => {
    const res = await getBillDetailAPI(id)
    setDetail(res.data)
  }

  useEffect(() => {
    getBillDetailData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 删除订单
  const deleteBill = () => {
    Modal.confirm({
      title: '删除',
      content: '确认删除订单',
      onOk: async () => {
        await postBillDeleteAPI(id)
        Toast.show('删除成功')
        navigate(-1)
      }
    })
  }

  return (
    <>
      <Header title='账单详情' />
      <div className={s.detail}>
        <div className={s.card}>
          <div className={s.type}>
            <span className={classNames({ [s.expense]: detail.pay_type === 1, [s.income]: detail.pay_type === 2 })}>
              <CustomIcon className={s.iconfont} type={detail.type_id ? typeMap[detail.type_id].icon : 1} />
            </span>
            <span>{detail.type_name || ''}</span>
          </div>
          {detail.pay_type === 1 ? (
            <div className={classNames(s.amount, s.expense)}>-{detail.amount}</div>
          ) : (
            <div className={classNames(s.amount, s.income)}>+{detail.amount}</div>
          )}
          <div className={s.info}>
            <div className={s.time}>
              <span>记录时间</span>
              <span>{dayjs(Number(detail.date)).format('YYYY-MM-DD HH:mm')}</span>
            </div>
            <div className={s.remark}>
              <span>备注</span>
              <span>{detail.remark || ''}</span>
            </div>
          </div>
          <div className={s.operation}>
            <span onClick={deleteBill}><CustomIcon type='shanchu' />删除</span>
            <span onClick={() => editRef.current && editRef.current.show()}><CustomIcon type='tianjia' />编辑</span>
          </div>
        </div>
        <PopupAddBill ref={editRef} detail={detail} onReload={getBillDetailData} />
      </div>
    </>
  )
})

export default Detail
