import { memo } from 'react'
import Header from '@/components/Header'
import { Button, Cell, Input } from 'zarm'

import s from './style.module.less'

const Account = memo(() => {
  return (
    <>
      <Header title='重置密码' />
      <div className={s.account}>
        <div className={s.form}>
          <Cell title='原密码'>
            <Input
              clearable
              type='text'
              placeholder='请输入原密码'
            />
          </Cell>
          <Cell title='新密码'>
            <Input
              clearable
              type='text'
              placeholder='请输入新密码'
            />
          </Cell>
          <Cell title='确认密码'>
            <Input
              clearable
              type='text'
              placeholder='请再次输入新密码确认'
            />
          </Cell>
        </div>
        <Button block className={s.btn} theme='primary'>提交</Button>
      </div>
    </>
  )
})

export default Account
