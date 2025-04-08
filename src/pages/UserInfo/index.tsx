import { memo, useEffect, useState } from "react";

import s from "./style.module.less";
import { Button, FilePicker, Input, Toast } from "zarm";
import Header from "@/components/Header";
import {
  getUserGetUserInfoAPI,
  postUploadAPI,
  postUserEditUserInfoAPI,
} from "@/apis";
import { useNavigate } from "react-router-dom";
import { imgUrlTrans } from "@/utils/imgUrlTrans";

// 定义 FilePickerFile 类型
interface FilePickerFile {
  file: File;
  name: string;
  type: string;
}

const UserInfo = memo(() => {
  const [avatar, setAvatar] = useState("");
  const [signature, setSignature] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // 获取用户信息
    const getUserGetUserInfoData = async () => {
      try {
        const { data } = await getUserGetUserInfoAPI();
        setAvatar(imgUrlTrans(data.avatar));
        setSignature(data.signature);
      } catch (error) {
        console.error("获取用户信息失败", error);
        Toast.show("获取用户信息失败");
      }
    };
    getUserGetUserInfoData();
  }, []);

  // 选择图片
  const handleSelect = async (file: FilePickerFile) => {
    // 限制图片上传大小不超过200KB
    if (file && file.file.size > 200 * 1024) {
      Toast.show("上传头像不得超过200KB!");
      return;
    }
    try {
      // 设置FormData数据类型进行上传
      const formData = new FormData();
      formData.append("file", file.file);
      // 发送请求进行上传
      const { data } = await postUploadAPI(formData);
      // 给图片地址添加上服务器地址
      setAvatar(imgUrlTrans(data));
    } catch (error) {
      console.error("上传头像失败", error);
      Toast.show("上传头像失败");
    }
  };

  // 保存操作
  const onSave = async () => {
    try {
      await postUserEditUserInfoAPI({
        signature,
        avatar,
      });
      Toast.show("修改成功");
      navigate(-1);
    } catch (error) {
      console.error("保存用户信息失败", error);
      Toast.show("保存用户信息失败");
    }
  };

  return (
    <>
      <Header title="用户信息" />
      <div className={s.userinfo}>
        <h1>个人资料</h1>
        <div className={s.item}>
          <div className={s.title}>头像</div>
          <div className={s.avatar}>
            <img className={s.avatarUrl} src={avatar} alt="" />
            <div className={s.desc}>
              <span>支持 jpg,png,jpeg 格式大小 200KB 以内的图片</span>
              <FilePicker
                className={s.filePicker}
                accept="image/*"
                onChange={(file) => handleSelect(file as FilePickerFile)}
              >
                <Button className={s.upload} theme="primary" size="xs">
                  点击上传
                </Button>
              </FilePicker>
            </div>
          </div>
        </div>
        <div className={s.item}>
          <div className={s.title}>个性签名</div>
          <div className={s.signature}>
            <Input
              clearable
              type="text"
              value={signature}
              placeholder="请输入个性签名"
              onChange={(value) => setSignature(value as string)}
            />
          </div>
        </div>
        <Button
          block
          theme="primary"
          style={{ marginTop: "50px" }}
          onClick={onSave}
        >
          保存
        </Button>
      </div>
    </>
  );
});

export default UserInfo;
