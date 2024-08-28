import { memo, useCallback, useState } from 'react'
import { Button, Cell, Checkbox, Input, Toast } from 'zarm'
import Captcha from 'react-captcha-code'

import s from './style.module.less'
import CustomIcon from '@/components/CustomIcon'
import { postUserLoginAPI, postUserRegisterAPI } from '@/apis/user'
import classNames from 'classnames'

const Login = memo(() => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [verify, setVerify] = useState('')
  const [captcha, setCaptcha] = useState('')
  const [checkbox, setCheckbox] = useState(false)
  const [type, setType] = useState('login')

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

    try {
      // 登录/注册
      if (type === 'login') {
        // 发生请求，获取token保存到本地
        const res = await postUserLoginAPI({ username, password })
        localStorage.setItem('token', res.data.token)
        Toast.show(res.msg)
      } else if (type === 'register') {
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
        // 发生请求
        const res = await postUserRegisterAPI({ username, password })
        Toast.show(res.msg)
        if (res.code === 500) {
          // 500操作
          return
        } else if (res.code === 200) {
          // 注册成功自动将type切换到login
          setType('login')
        }
      }
    } catch (error) {
      Toast.show('系统错误', error)
    }
  }


  return (
    <div className={s.auth}>
      <div className={s.head}></div>
      <div className={s.tab}>
        <span
          className={classNames({ [s.active]: type === 'login' })}
          onClick={() => setType('login')}
        >
          登录
        </span>
        <span
          className={classNames({ [s.active]: type === 'register' })}
          onClick={() => setType('register')}
        >
          注册
        </span>
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
        {type === 'register' && (
          <Cell icon={<CustomIcon type='mima' />}>
            <Input
              clearable
              type='text'
              placeholder='请输入验证码'
              value={verify}
              onChange={value => setVerify(value)} />
            <Captcha charNum={4} onChange={handleChange} />
          </Cell>
        )}
      </div>
      <div className={s.operation}>
        {type === 'register' && (
          <div className={s.agree}>
            <Checkbox id='agree' checked={checkbox} onChange={() => setCheckbox(!checkbox)} />
            <label htmlFor='agree' className='text-light'>
              阅读并同意<a>《BillTracker条款》</a>
            </label>
          </div>
        )}
        <Button block theme='primary' onClick={handleSubmit}>
          {type === 'login' ? '登录' : '注册'}
        </Button>
      </div>
    </div>
  )
})

export default Login
