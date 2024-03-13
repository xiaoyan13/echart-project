import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export interface ListItem {
    id: number,
    content: string,
    complete: boolean
}

const todoList: ListItem[] = [
    {
        id: 0,
        content: '学会 vue',
        complete: true,
    },
    {
        id: 1,
        content: '学会 react',
        complete: false,
    },
    {
        id: 2,
        content: '学会 angular',
        complete: false,
    },
]

// useTodosStore 是一个函数，可以被调用，返回一个 store 实例
// store 实例里面的响应式对象不可以直接"."出来，需要使用api storeToRef 来获取
export const useTodosStore = defineStore('todos', () => {

    const todoListRef = ref(todoList) // 变为响应式数据

    const nextId = computed(() => todoListRef.value.length + 1)
    const addTodo = (value: string) => {
        todoListRef.value.push({
            id: nextId.value,
            content: value,
            complete: false
        })
        console.log(todoListRef)
    }
    const delTodo = (id: number) => {
        todoListRef.value = todoListRef.value.filter(item => item.id !== id)
        console.log(todoListRef)
    }
    return { todoListRef, addTodo, delTodo }
})