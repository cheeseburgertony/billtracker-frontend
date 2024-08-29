import { memo, useEffect, useState } from 'react'

import s from './style.module.less'
import { Button, FilePicker, Input, Toast } from 'zarm'
import Header from '@/components/Header'
import { getUserGetUserInfoAPI, postUploadAPI } from '@/apis'

const UserInfo = memo(() => {
  const [avatar, setAvatar] = useState('')
  const [signature, setSignature] = useState('')

  useEffect(() => {
    // 获取用户信息
    const getUserGetUserInfoData = async () => {
      const { data } = await getUserGetUserInfoAPI()
      setAvatar(data.avatar)
      setSignature(data.signature)
    }
    getUserGetUserInfoData()
  }, [])


  // 选择图片
  const handleSelect = async (file) => {
    console.log('file', file);
    // 限制图片上传大小不超过200KB
    if (file && file.file.size > 900 * 1024) {
      Toast.show('上传头像不得超过200KB!')
      return
    }
    // 设置FormData数据类型进行上传
    const formData = new FormData()
    formData.append('file', file.file)
    // 发送请求进行上传
    const { data } = await postUploadAPI(formData)
    setAvatar(data)
  }

  // 保存操作
  const onSave = () => {
    
  }

  return (
    <>
      <Header title='用户信息' />
      <div className={s.userinfo}>
        <h1>个人资料</h1>
        <div className={s.item}>
          <div className={s.title}>头像</div>
          <div className={s.avatar}>
            <img className={s.avatarUrl} src={avatar} alt="" />
            <div className={s.desc}>
              <span>支持 jpg,png,jpeg 格式大小 200KB 以内的图片</span>
              <FilePicker className={s.filePicker} accept='image/*' onChange={handleSelect}>
                <Button className={s.upload} theme='primary' size='xs'>点击上传</Button>
              </FilePicker>
            </div>
          </div>
        </div>
        <div className={s.item}>
          <div className={s.title}>个性签名</div>
          <div className={s.signature}>
            <Input
              clearable
              type='text'
              value={signature}
              placeholder='请输入个性签名'
              onChange={(value) => setSignature(value)}
            />
          </div>
        </div>
        <Button block theme='primary' style={{ marginTop: '50px' }} onClick={onSave} >保存</Button>
      </div>
    </>
  )
})

export default UserInfo
