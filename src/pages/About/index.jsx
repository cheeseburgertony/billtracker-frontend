import Header from '@/components/Header'
import { memo } from 'react'

import s from './style.module.less'

const About = memo(() => {
  return (
    <>
      <Header title='关于我们' />
      <div className={s.about}>
        <h2>关于项目</h2>
        <article>
          BillTracker记账本是一个全栈项目，旨在为用户提供一个简洁高效的财务管理工具，帮助用户记录日常开销、收入和财务状况。该项目的服务端采用了 Egg.js 框架，前端使用 React 框架结合 Zarm 移动端组件库，提供优质的用户体验。项目从数据库设计、接口编写、前端页面制作到线上环境部署，均由全栈技术实现，确保系统的稳定性和高效性。
        </article>
        <h2>技术栈</h2>
        <article>
          该项目前端使用 React 和 Zarm 组件库构建用户界面，使用 Less 和 CSS Modules 进行样式编写，确保样式的模块化和可维护性。后端采用 Node.js 和 Egg.js 搭建，数据存储在 MySQL 中，前后端通过 Axios 进行通信。
        </article>
      </div>
    </>
  )
})

export default About
