# 数据可视化的后台系统 UI

see [here](https://echarts-project.netlify.app)

使用到的语言 & 框架：ts, less, vue3, vite

组件库：element-plus, element-icon

图表：echarts, vxetable

其他库 & 工具：pinia, axios, apifox

## 项目流程

- 搭建环境，安装必要的依赖：element-plus，'@element-plus/icons-vue',echarts，vxe-chart，axios

- 复习 vue-router
- 完成登录页面：
  - 表单的使用
  - axios 的 ts 封装

- 制作主页：
  - echarts的使用

### echarts 数据映射

`xAxis` 和 `yAxis` 两个项绘制 x 轴和 y 轴。 `xAxis.data` 是指的刻度，而不是数据。

而数据一般放在 `options.series.data` ,一个数据是一个数组，每个数组元素被称为一个数据项，数据项一般为一个值，但也可以写成一个对象，用于定制一个数据项的绘制：

```js
  data: [
    {
      // 这里每一个项就是数据项（dataItem）
      value: 2323, // 这是数据项的数据值（value）
      itemStyle: {}
    },
    1212, // 也可以直接是 dataItem 的 value，这更常见。
    2323, // 这里每个 value 都是“一维“的。
    4343,
    3434
  ];
```

- echarts 报警告：鼠标滚动事件被 chrome 要求必须显示的声明 passive 的行为，即明确自己是否会调用 preventDefault() 
- piniaStore 的使用

- apifox 的使用： token 鉴权



- 根据 router 配置文件信息创建出三层深度的侧边导航栏
- 表单

- 完成 tabs 切换

- vxe-table 绘制



- npm run build 构建和修复类型错误
- 在 netlify 上自动构建





















question

- npm install  @.. 
- echart 本身并不是响应式布局