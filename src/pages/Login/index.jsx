import { memo, useCallback, useState } from 'react'
import { Button, Cell, Checkbox, Input, Toast } from 'zarm'
import Captcha from 'react-captcha-code'

import s from './style.module.less'
import CustomIcon from '@/components/CustomIcon'
import { postUserRegisterAPI } from '@/apis/user'

const Login = memo(() => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [verify, setVerify] = useState('')
  const [captcha, setCaptcha] = useState('')
  const [checkbox, setCheckbox] = useState(false)

  // 验证码发生变化
  const handleChange = useCallback((captcha) => {
    console.log('caotcha', captcha);
    setCaptcha(captcha)
  }, [])

  // 注册按钮触发
  const handleSubmit = async () => {
    if (!username) {
      Toast.show('请输入账号')
      return
    }
    if (!password) {
      Toast.show('请输入密码')
      return
    }
    if (!verify) {
      Toast.show('请输入验证码')
      return
    }
    if (verify !== captcha) {
      Toast.show('验证码错误')
      return
    }
    if (!checkbox) {
      Toast.show('请勾选同意协议')
      return
    }
    try {
      const res = await postUserRegisterAPI({ username, password })
      Toast.show(res.msg)
      if (res.code === 500) {
        // 500操作
        return
      } else if (res.code === 200) {
        // 跳转到登录页面
        
      }
    } catch (error) {
      Toast.show('系统错误', error)
    }
  }


  return (
    <div className={s.auth}>
      <div className={s.head}></div>
      <div className={s.tab}>
        <span className={s.active}>注册</span>
      </div>
      <div className={s.form}>
        <Cell icon={<CustomIcon type='zhanghao' />}>
          <Input
            clearable
            type='text'
            placeholder='请输入账号'
            value={username}
            onChange={value => setUsername(value)}
          />
        </Cell>
        <Cell icon={<CustomIcon type='mima' />}>
          <Input
            clearable
            type='password'
            placeholder='请输入密码'
            value={password}
            onChange={value => setPassword(value)} />
        </Cell>
        <Cell icon={<CustomIcon type='mima' />}>
          <Input
            clearable
            type='text'
            placeholder='请输入验证码'
            value={verify}
            onChange={value => setVerify(value)} />
          <Captcha charNum={4} onChange={handleChange} />
        </Cell>
      </div>
      <div className={s.operation}>
        <div className={s.agree}>
          <Checkbox id='agree' checked={checkbox} onChange={() => setCheckbox(!checkbox)} />
          <label htmlFor='agree' className='text-light'>
            阅读并同意<a>《BillTracker条款》</a>
          </label>
        </div>
        <Button block theme='primary' onClick={handleSubmit}>注册</Button>
      </div>
    </div>
  )
})

export default Login
