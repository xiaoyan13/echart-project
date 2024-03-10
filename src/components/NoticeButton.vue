<script setup lang="ts">
import { computed, ref } from 'vue';
import { useNoticeStore } from '@/stores/notice';
import { storeToRefs } from 'pinia';
import { ElMessage } from 'element-plus'

const {
    notices,
    messages,
    todos
} = storeToRefs(useNoticeStore());

const tabName = ref('通知');

const isReadNum = computed(() => {
    let res: number = 0;
    notices.value.forEach((item) => { res += (!item.read) });
    messages.value.forEach((item) => { res += (!item.read) });
    todos.value.forEach((item) => { res += (!item.read) });
    return res;
})

const handleClickItem = (item: any) => {
    item.read = true;
};

const handleClear = () => {
    switch (tabName.value) {
        case '通知':
            notices.value.forEach((item) => (item.read = true));
            break;
        case '消息':
            messages.value.forEach((item) => (item.read = true));
            break;
        case '待办':
            todos.value.forEach((item) => (item.read = true));
            break;
    }
};

const handleMore = () => {
    ElMessage('尚未实现更多功能~');
};
</script>


<template>
    <el-dropdown trigger="click">
        <!-- 改进：利用传递 props 为 undeined 且没有定义 default 让此角标不显示 -->
        <el-badge :value="isReadNum === 0 ? undefined : isReadNum" :max="10" class="item message">
            <el-icon size="20px">
                <Bell />
            </el-icon>
        </el-badge>
        <template #dropdown>
            <el-dropdown-menu>
                <el-tabs style="width: 300px" v-model="tabName" class="demo-tabs" stretch>
                    <el-tab-pane label="通知" name="通知" />
                    <el-tab-pane label="消息" name="消息" />
                    <el-tab-pane label="待办" name="待办" />
                </el-tabs>
                <div class="dropdown-wrapper" v-if="tabName === '通知'">
                    <div class="notice-container" @click="handleClickItem(notice)" v-for="(notice, index) in notices"
                        :class="notice.read ? 'read' : ''" :key="index">
                        <div class="notice-logo">
                            <img :src="notice.logo" alt="" />
                        </div>
                        <div class="notice-text">
                            <div class="notice-content">{{ notice.content }}</div>
                            <div class="notice-time">{{ notice.time }}</div>
                        </div>
                    </div>
                </div>
                <div class="dropdown-wrapper" v-else-if="tabName === '消息'">
                    <div class="message-container" v-for="(message, index) in messages"
                        :class="message.read ? 'read' : ''" @click="handleClickItem(message)" :key="index">
                        <div class="message-logo">
                            <img :src="message.avatar" alt="" />
                        </div>
                        <div class="message-text">
                            <div>
                                {{ message.username }}
                                {{ message.type === 'comment' ? '评论了你' : '回复了你' }}
                            </div>
                            <div class="message-content">{{ message.content }}</div>
                            <div class="message-time">{{ message.time }}</div>
                        </div>
                    </div>
                </div>
                <div class="dropdown-wrapper" v-else>
                    <div class="todo-container" v-for="(todo, index) in todos" :key="index"
                        :class="todo.read ? 'read' : ''" @click="handleClickItem(todo)">
                        <div class="todo-title">{{ todo.title }}</div>
                        <el-tag class="todo-status">{{ todo.status }}</el-tag>
                        <div class="todo-descript">{{ todo.descript }}</div>
                    </div>
                </div>

                <el-button-group style="inline-size: 100%">
                    <el-button type="primary" style="inline-size: 50%" @click="handleClear">清空{{ tabName }}</el-button>
                    <el-button type="primary" style="inline-size: 50%" @click="handleMore">查看更多</el-button>
                </el-button-group>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<style scoped lang="scss">
.message {
    margin: 0px 15px;
    cursor: pointer;
}

.notice-container {
    display: flex;
    align-items: center;
    padding: 8px 12px;
    cursor: pointer;

    &:hover {
        background-color: #f5f7fa;
    }

    .notice-logo {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #f5f7fa;

        img {
            height: 100%;
            width: 100%;
        }
    }

    .notice-text {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-left: 8px;

        .notice-content {
            font-size: 14px;
            color: #606266;
        }

        .notice-time {
            font-size: 12px;
            color: #909399;
        }
    }
}

.message-container {
    display: flex;
    align-items: center;
    padding: 8px 12px;
    cursor: pointer;

    &:hover {
        background-color: #f5f7fa;
    }

    .message-logo {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #f5f7fa;

        img {
            height: 100%;
            width: 100%;
        }
    }

    .message-text {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-left: 8px;

        .message-content {
            font-size: 14px;
            color: #606266;
        }

        .message-time {
            font-size: 12px;
            color: #909399;
        }
    }
}

.todo-container {
    display: grid;
    grid-template:
        'title status'
        'descript descript';

    padding: 8px 12px;
    cursor: pointer;

    &:hover {
        background-color: #f5f7fa;
    }

    .todo-title {
        grid-area: title;
        font-size: 14px;
        color: #606266;
    }

    .todo-status {
        grid-area: status;
        font-size: 14px;
        color: #606266;
        justify-self: end;
    }

    .todo-descript {
        grid-area: descript;
        font-size: 14px;
        color: #606266;
    }
}

.dropdown-wrapper {
    padding-block-end: 12px;
}

.read {
    opacity: 0.5;
}
</style>