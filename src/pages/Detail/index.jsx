import Header from '@/components/Header'
import { memo } from 'react'

import s from './style.module.less'

const Detail = memo(() => {
  return (
    <div className={s.detail}>
      <Header title='账单详情' />
    </div>
  )
})

export default Detail
