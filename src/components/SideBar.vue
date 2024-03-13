<script setup lang="ts">
import { computed } from 'vue'
import {
    useRoute,
    useRouter,
    type RouteRecordRaw,
    type RouteRecordName,
} from 'vue-router';

// 要求路由必须含有 name 作为将要显示的菜单的名字。
interface SideBar {
    index: RouteRecordName;
    name: string;
    icon: string | undefined;
    subs: SideBar[];
}

const route = useRoute();
const router = useRouter();
const defaultActive = computed(() => {
    return route.path;
});

// 从路由为 name 的路由项开始构建子路由
const rootRoute: RouteRecordRaw = router.options.routes.find(
    (item) => item.name == 'home'
);

// console.log(rootRoute)

let root: SideBar = {}

// 根据当前的路由节点 node 生成当前的 SideBar 对象, 当前路由节点的路由前缀是 prePath
// 其实不需要 prePath 来构建出完整路由，直接用 route.fullPath 就可以了，但是我当时忘了有这个东西了。。
const dfs = (node: RouteRecordRaw, now: SideBar, prePath: string = '') => {
    now.index = prePath + node.path; // 将 prePath + path 作为 index
    // 使用 unknown 类型的时候，把它当做对象获取属性，要使用 `?.`，因为它可能不是对象
    now.icon = node.meta?.icon; // 将 meta.icon 作为将会显示的图标的组件名。 
    now.name = node.meta?.name; // 将 meta.name 作为将会显示的图标旁汉字
    now.subs = []; // 将子路由变为一个数组
    // 如果有子路由
    if (node.children) {
        for (let item of node.children) { // 每一个 child 都是一个 RouteRecordRaw，对应的 now 是将要新 push 进去的 SideBar 类型的节点
            let tmpSideBar = {}
            dfs(item, tmpSideBar, now.index);
            now.subs.push(tmpSideBar);
        }
    }
    // console.log(node)
    // console.log(now)
}

dfs(rootRoute, root);

</script>


<template>
    <!-- 实现三层嵌套路由的侧边栏导航 -->
    <el-menu :default-active="defaultActive" style="min-height: 100%" theme="dark" router>
        <!-- 第一层含有的 item -->
        <template v-for="item in root.subs" :key="item.index">
            <!-- 第一层的 item，没有子路由，就直接放图标和文字 -->
            <template v-if="item.subs.length === 0">
                <el-menu-item :index="item.index">
                    <el-icon v-if="item.icon">
                        <component :is="item.icon" />
                    </el-icon>
                    <template #title>{{ item.name }}</template>
                </el-menu-item>
            </template>
            <!-- 如果该 item 有 子路由数组 subs，即有子（第二层）的话： -->
            <template v-else>
                <el-sub-menu :index="item.index">
                    <!-- 先放上第一层图标和文字 -->
                    <template #title>
                        <el-icon v-if="item.icon">
                            <component :is="item.icon" />
                        </el-icon>
                        <span>{{ item.name }}</span>
                    </template>
                    <!-- 再展开第二层的元素 -->
                    <template v-for="ss in item.subs" :key="ss.index">
                        <!-- 同样，对于第二层的元素，如果没有子（第三层），就直接放图标 -->
                        <el-menu-item v-if="ss.subs.length === 0" :index="ss.index">{{ ss.name }}</el-menu-item>
                        <!-- 否则有子（第三层） -->
                        <el-sub-menu :index="ss.index" v-else>
                            <!-- 就先放当前层（第二层）的图标 -->
                            <template #title><span>{{ ss.index }}</span></template>
                            <!-- 再遍历第三层 -->
                            <template v-for="s in ss.subs" :key="s.index">
                                <!-- 第三层肯定没有子路由了，直接放图标和文字 -->
                                <el-menu-item :index="s.index">{{ s.index }}</el-menu-item>
                            </template>
                        </el-sub-menu>

                    </template>
                </el-sub-menu>
            </template>
        </template>
    </el-menu>
</template>