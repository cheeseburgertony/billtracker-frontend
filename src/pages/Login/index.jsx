import { memo } from 'react'
import { Button, Cell, Checkbox, Input } from 'zarm'
import Captcha from 'react-captcha-code'

import s from './style.module.less'
import CustomIcon from '@/components/CustomIcon'

const Login = memo(() => {
  return (
    <div className={s.auth}>
      <div className={s.head}></div>
      <div className={s.tab}>
        <span className={s.active}>注册</span>
      </div>
      <div className={s.form}>
        <Cell icon={<CustomIcon type='zhanghao' />}>
          <Input clearable type='text' placeholder='请输入账号' />
        </Cell>
        <Cell icon={<CustomIcon type='mima' />}>
          <Input clearable type='password' placeholder='请输入密码' />
        </Cell>
        <Cell icon={<CustomIcon type='mima' />}>
          <Input clearable type='text' placeholder='请输入验证码' />
          <Captcha charNum={4} />
        </Cell>
      </div>
      <div className={s.operation}>
        <div className={s.agree}>
          <Checkbox id='agree' />
          <label htmlFor='agree' className='text-light'>
            阅读并同意<a>《BillTracker条款》</a>
          </label>
        </div>
        <Button block theme='primary'>注册</Button>
      </div>
    </div>
  )
})

export default Login
