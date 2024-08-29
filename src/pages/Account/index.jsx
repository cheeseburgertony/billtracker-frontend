import { memo } from 'react'
import Header from '@/components/Header'
import { Button, Cell, Input, Toast } from 'zarm'
import { useNavigate } from 'react-router-dom'
import { createForm } from 'rc-form'

import s from './style.module.less'
import { postUserModifyPassAPI } from '@/apis'

// eslint-disable-next-line react-refresh/only-export-components
const Account = memo((props) => {
  // Account在通过createForm包裹之后可以在props中获取form属性
  // eslint-disable-next-line react/prop-types
  const { getFieldProps, validateFields } = props.form

  const navigate = useNavigate()

  // 重置密码后进行校验并提交
  const onSubmit = () => {
    // validateFields获取表单属性元素传入回调函数
    // 回调函数接收error和value,通过这两个参数判断校验是否成功和获取对象表单的值
    validateFields(async (error, value) => {
      // error表单验证全通过为false,不通过为true
      if (error) {
        Toast.show('输入不能为空')
      }
      else {
        console.log(value);
        if (value.newpass !== value.newpass2) {
          Toast.show('新密码输入不一致')
          return
        }
        // 发送请求修改密码
        const res = await postUserModifyPassAPI({
          old_pass: value.oldpass,
          new_pass: value.newpass,
          new_pass2: value.newpass2
        })
        if (res.code === 200) {
          Toast.show('修改成功')
          navigate(-1)
        }
      }
    })

  }

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
              {...getFieldProps('oldpass', { rules: [{ required: true }] })}
            />
          </Cell>
          <Cell title='新密码'>
            <Input
              clearable
              type='text'
              placeholder='请输入新密码'
              {...getFieldProps('newpass', { rules: [{ required: true }] })}
            />
          </Cell>
          <Cell title='确认密码'>
            <Input
              clearable
              type='text'
              placeholder='请再次输入新密码确认'
              {...getFieldProps('newpass2', { rules: [{ required: true }] })}
            />
          </Cell>
        </div>
        <Button block className={s.btn} theme='primary' onClick={onSubmit}>提交</Button>
      </div>
    </>
  )
})

// eslint-disable-next-line react-refresh/only-export-components
export default createForm()(Account)
