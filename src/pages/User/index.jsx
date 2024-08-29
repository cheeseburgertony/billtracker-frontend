import { memo, useEffect, useState } from 'react'
import { Cell } from 'zarm'
import { useNavigate } from 'react-router-dom'

import s from './style.module.less'
import { getUserGetUserInfoAPI } from '@/apis'

const User = memo(() => {
  const [user, setUser] = useState({})

  const navigate = useNavigate()

  useEffect(() => {
    const getUserGetUserInfoData = async () => {
      const { data } = await getUserGetUserInfoAPI()
      setUser(data)
    }
    getUserGetUserInfoData()
  }, [])


  return (
    <div className={s.user}>
      <div className={s.head}>
        <div className={s.info}>
          <span>昵称：{user.username}</span>
          <span>
            <img src="//s.yezgea02.com/1615973630132/geqian.png" style={{ width: '30px', height: '30px', verticalAlign: '-10px' }} alt="" />
            <b>{user.signature || '暂无个签'}</b>
          </span>
        </div>
        <img className={s.avatar} style={{ width: '60px', height: '60px', borderRadius: '8px' }} src={user.avatar || ''} alt="" />
      </div>
      <div className={s.content}>
        <Cell
          hasArrow
          title='用户信息修改'
          onClick={() => navigate('/userinfo')}
          icon={<img src='//s.yezgea02.com/1615974766264/gxqm.png' style={{ width: '20px', verticalAlign: '-7px' }} />}
        />
        <Cell
          hasArrow
          title='重置密码'
          onClick={() => navigate('/account')}
          icon={<img src='//s.yezgea02.com/1615974766264/zhaq.png' style={{ width: '20px', verticalAlign: '-7px' }} />}
        />
        <Cell
          hasArrow
          title='关于我们'
          onClick={() => navigate('/about')}
          icon={<img src='//s.yezgea02.com/1615975178434/lianxi.png' style={{ width: '20px', verticalAlign: '-7px' }} />}
        />
      </div>
    </div>
  )
})

export default User
