import { memo } from 'react'
import PropTypes from 'prop-types'

import s from './style.module.less'

const Empty = memo((props) => {
  const { desc } = props

  return (
    <div className={s.empty}>
      <img src="https://s.yezgea02.com/1619144597039/empty.png" alt="暂无数据" />
      <div>{desc || '暂无数据'}</div>
    </div>
  )
})

Empty.propTypes = {
  desc: PropTypes.string
}

export default Empty
