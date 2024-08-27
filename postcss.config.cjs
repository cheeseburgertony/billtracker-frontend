// 用 vite 创建项目，配置 postcss 需要使用 post.config.js，之前使用的 .postcssrc.js 已经被抛弃
// 具体配置可以去 postcss-pxtorem 仓库看看文档
module.exports = {
  "plugins": [
    require("postcss-pxtorem")({
      rootValue: 37.5, // 根元素字体大小，用于计算 rem 值
      propList: ['*'], // 需要进行转换的属性列表，'*' 表示所有属性
      selectorBlackList: ['.norem'] // 过滤掉.norem-开头的class，不进行rem转换
    })
  ]
}
