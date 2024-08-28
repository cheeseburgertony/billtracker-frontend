import { memo } from 'react'
import PropTypes from 'prop-types'
import { NavBar } from 'zarm'
import { ArrowLeft } from '@zarm-design/icons';
import { useNavigate } from 'react-router-dom';

import s from './style.module.less'

const Header = memo((props) => {
  const { title = '' } = props

  const navigate = useNavigate()

  return (
    <div className={s.headerWrap}>
      <div className={s.block}>
        <NavBar
          className={s.header}
          title={title}
          left={<ArrowLeft theme='primary' onClick={() => navigate(-1)} />}
        />
      </div>
    </div>
  )
})

Header.propTypes = {
  title: PropTypes.string
}

export default Header
