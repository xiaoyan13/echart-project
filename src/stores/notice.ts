import {defineStore} from 'pinia'
import { reactive } from 'vue';
// vite 引入静态资源的方式
import imgUrl0 from '../assets/user2.svg'
import imgUrl1 from '../assets/user.jpg'

const notices = reactive([
    {
      read: false,
      logo: imgUrl0,
      content: '你收到了 1 份新周报',
      time: '6年前',
    },
    {
      read: false,
      logo: imgUrl0,
      content: '你收到了 3 份新周报',
      time: '6年前',
    },
    {
      read: true,
      logo: imgUrl0,
      content: '你收到了 2 份新周报',
      time: '6年前',
    },
  ]);
  
  const messages = reactive([
    {
      read: false,
      type: 'comment',
      username: 'Tom',
      content: '这是一条评论',
      avatar: imgUrl1,
      time: '6年前',
    },
    {
      read: false,
      type: 'reply',
      username: 'Alice',
      content: '这是一条回复',
      avatar: imgUrl1,
      time: '6年前',
    },
  ]);

  const todos = reactive([
  {
    read: false,
    title: '任务一',
    status: '未开始',
    descript: '这是一条任务描述',
  },
  {
    read: false,
    title: '任务二',
    status: '进行中',
    descript: '这是一条任务描述',
  },
  {
    read: false,
    title: '任务三',
    status: '已完成',
    descript: '这是一条任务描述',
  },
]);

export const useNoticeStore = defineStore('notices', () => {
    return {
        notices,
        messages,
        todos
    }
})