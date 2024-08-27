import { memo } from 'react'
import { Button } from 'zarm'

import s from './style.module.less'

const Index = memo(() => {
  return (
    <div className={s.index}>
      <span>样式</span>
      Index
      <Button theme='primary'>按钮</Button>
    </div>
  )
})

export default Index
