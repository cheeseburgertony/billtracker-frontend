import { memo, useEffect, useState } from 'react'

import s from './style.module.less'
import { getUserGetUserInfoAPI } from '@/apis'

const User = memo(() => {
  const [user, setUser] = useState({})

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
            <img src="//s.yezgea02.com/1615973630132/geqian.png" style={{ width: 30, height: 30, verticalAlign: '-10px' }} alt="" />
            <b>{user.signature || '暂无个签'}</b>
          </span>
        </div>
        <img className={s.avatar} style={{ width: 60, height: 60, borderRadius: 8 }} src={user.avatar || ''} alt="" />
      </div>
    </div>
  )
})

export default User
