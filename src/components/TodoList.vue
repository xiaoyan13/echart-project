<script setup lang="ts">
import { ref } from 'vue'
import { useTodosStore, type ListItem } from '@/stores/todo';
import { ElMessage } from 'element-plus'
import { storeToRefs } from 'pinia';

const todoStore = useTodosStore();
// const todoListRef = todoStore.todoListRef; 这样不行，拿到的不是 Ref 响应式数据...
const { todoListRef } = storeToRefs(todoStore)

// 处理相关操作：添加 todo，删除 todo
const inputVal = ref('')
const clickBtn = () => {
    if (inputVal.value.length === 0) {
        ElMessage.error('todo 事项不能为空~')
        return;
    }
    todoStore.addTodo(inputVal.value);
    ElMessage({
        message: 'success added.',
        type: 'success',
    })
    inputVal.value = ''
}

const delTodo = (item: ListItem) => {
    todoStore.delTodo(item.id);
    ElMessage({
        message: 'success deleted.',
        type: 'success',
    })
}

</script>


<template>
    <div class="todo-list">
        <div class="content">
            <div class="todoListDiv">
                <div class="inputDiv">
                    <input v-model="inputVal" placeholder="点击添加代办">
                    <button @click="clickBtn"></button>
                </div>
                <div class="listDiv">
                    <ul>
                        <li v-for="item in todoListRef" class="task-list-item" :key="item.id">
                            <label class="task-list-item-label">
                                <el-checkbox v-model="item.complete"></el-checkbox>
                                <span>{{ item.content }}</span>
                            </label>
                            <span class="delete-btn" @click="delTodo(item)"></span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang='less' scoped>
.content {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.todoListDiv {
    width: 500px;
}

.listDiv {
    height: 150px;
    overflow-y: scroll;
}

input {
    margin-right: 12px;
    width: 100%;
    padding: 0 4px;
    border: none;
    border-bottom: 1px solid black;
    margin-bottom: 10px;
    background-color: transparent;
}

.is-checked+span {
    color: rgba(255, 255, 255, 0.5);
    text-decoration: line-through rgba(255, 255, 255, 0.8);
}

button {
    border: none;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background-size: 44px;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url('../assets/add.svg');
    cursor: pointer;
}

.inputDiv {
    display: flex;
    margin: 10px 0px 6px;
}

ul {
    list-style: none;
    padding-right: 12px;
}

.task-list-item {
    color: #5470c6;
    font-size: 16px;
    height: 26px;
    background-color: rgba(180, 178, 208, 0.261);
    border-radius: 4px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    padding: 8px;
}

.el-checkbox {
    width: 16px;
    height: 16px;
    margin-right: 6px;
}

.delete-btn {
    margin-left: auto;
    display: block;
    width: 16px;
    height: 16px;
    background-repeat: no-repeat;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23ff3d46' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-trash-2'%3E%3Cpolyline points='3 6 5 6 21 6'/%3E%3Cpath d='M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2'/%3E%3Cline x1='10' y1='11' x2='10' y2='17'/%3E%3Cline x1='14' y1='11' x2='14' y2='17'/%3E%3C/svg%3E");
    background-size: 16px;
    background-position: center;
    cursor: pointer;
}
</style>