<script setup lang="ts">
import { reactive, ref, watch, watchEffect } from 'vue';
import type { TabPaneName, TabsPaneContext } from 'element-plus';
import { useRoute, useRouter } from 'vue-router';
import { nextTick } from 'process';

const route = useRoute();
const router = useRouter();

// 传递给组件的响应式数据，值为 route.name
const editableTabsValue = ref();

// tabs 实例 list 及其相关基本操作
interface ListItem {
    name: string; // route.name
    path: string; // route.fullpath
    title: string; // route.meta.name
    fixed: boolean; // fixed/unfixed
}

let list = ref<ListItem[]>([])


const delTabItem = (index: number) => list.value.splice(index, 1);
const setTabItem = (data: ListItem) => list.value.push(data);
const delAllTabs = () => list.value.length = 0;
const delExcept = (index: number) => list.value = list.value[list.value[index]];
const cancelFixedTabs = (index: number) => list.value[index].fixed = false;
const fixedTabsItem = (index: number) => {
    list.value[index].fixed = true;
    const item = list.value[index];
    delTabItem(index);
    list.value.unshift(item);
}


// 路由发生变化的时候被调用，检查并更改选中的 tab
let setTabs = (route: any) => {
    // 如果当前已经选中该 tab 了就不用操作了
    if (editableTabsValue.value === route.name) return;
    // 标签是否存在，不存在就加进去
    const isExist = list.value.some((item) => {
        return item.path === route.fullPath;
    })
    if (!isExist) {
        setTabItem({
            name: route.name,
            path: route.fullPath,
            title: route.meta.name,
            fixed: false
        })
    }
    // 更新 editableTabsValue，选中 tab
    editableTabsValue.value = route.name;
}

// 点击 tab，切换路由
let clickTab = (pane: TabsPaneContext) => {
    router.replace({ name: pane.paneName });
}
// 点击删除按钮，删除单个 tab
let removeTab = (name: TabPaneName) => {
    // 找到要删除的那个 tab
    const tabIndex = list.value.findIndex(item => item.name === name);
    const tab = list.value[tabIndex];
    // 判断删除的是不是当前所在的路由
    if (tab.path === route.fullPath) {
        delTabItem(tabIndex);
        // 如果删除时，恰好为 1 个 tab，并且该 tab 就是主页，就直接加进来，不用更新路由
        if (list.value.length === 0 && tab.path === '/dashboard') {
            nextTick(() => setTimeout(() => {
                setTabItem(tab);
            }, 50));
        } else {
            // 剩下的情况，判断删除后是否还剩下 tab，如果有就切换到其他，如果没有就切换到首页
            router.replace(list.value.length === 0 ? '/' : list.value[list.value.length - 1].path);
        }
    } else {
        // 不是当前所在路由
        delTabItem(tabIndex);
    }
}
// 右键操作相关
let closeOther = (name: string) => {
    const index = list.value.findIndex((item) => item.name === name);
    delExcept(index);
}
// 关闭全部
function closeAll() {
    delAllTabs();
    router.push('/');
}
// 固定/取消固定
function fixedChange(name: string, fixed: boolean) {
    const index = list.value.findIndex((item) => item.name === name);
    fixed ? cancelFixedTabs(index) : fixedTabsItem(index);
}

// 当前路由发生变化时就更改 tabs 的 数据, 使选中的 tab 变更
watch(
    route,
    () => {
        // 更改 tabs 数据
        setTabs(route);
    },
    {
        immediate: true,
    }
);


</script>


<template>
    <div>
        <el-tabs v-model="editableTabsValue" type="card" class="demo-tabs" @tab-click="clickTab"
            @tab-remove="removeTab">
            <el-tab-pane v-for="(item, key) in list" :key="key" :name="item.name" :closable="!item.fixed">
                <template #label>
                    <el-dropdown trigger="contextmenu" popper-class="dropdown">
                        <span :class="{ 'is-active': item.name == editableTabsValue }">
                            {{ item.title }}
                        </span>
                        <template #dropdown v-if="item.name == editableTabsValue">
                            <el-dropdown-menu>
                                <el-dropdown-item @click="fixedChange(item.name, item.fixed)">{{
            item.fixed ? '取消固定' : '固定'
        }}</el-dropdown-item>
                                <el-dropdown-item @click="closeOther(item.name)">关闭其它</el-dropdown-item>
                                <el-dropdown-item @click="closeAll">全部关闭</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </template>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>


<style scoped lang="less">
.el-tabs {
    transition: none;
    position: absolute;
    top: 8px;
    margin-left: -21px;
}

.el-dropdown {
    padding-top: 12px;

    .is-active {
        color: var(--el-color-primary);
    }
}
</style>