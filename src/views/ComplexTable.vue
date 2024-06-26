<script lang="ts" setup>
import { ElMessage, ElMessageBox } from 'element-plus';
import { reactive, ref } from 'vue';
import type { VxeGridProps, VxeGridInstance } from 'vxe-table';
import { post } from '../api/index';
interface Filters {
    sex: string;
}

interface QueryParams {
    currentPage: number;
    name: string;
    order: string;
    pageSize: number;
    sortField: string;
    type: string;
    filters: Filters;
}

const xGrid = ref<VxeGridInstance>();
const queryParams: QueryParams = reactive({
    type: '',
    name: '',
    sortField: '',
    order: '',
    currentPage: 1,
    pageSize: 10,
    filters: {
        sex: '',
    },
});
const searchEvent = () => {
    const $grid = xGrid.value;
    $grid && $grid.commitProxy('query');
};
const resetEvent = () => {
    queryParams.type = '';
    queryParams.name = '';
    const $grid = xGrid.value;
    $grid && $grid.commitProxy('query');
};
const gridOptions = reactive<VxeGridProps>({
    border: true,
    keepSource: true,
    showOverflow: true,
    id: 'toolbar_demo_2',
    loading: false,
    showFooter: true,
    rowConfig: {
        keyField: 'id',
        isHover: true,
    },
    columnConfig: {
        resizable: true,
    },
    customConfig: {
        storage: true,
        checkMethod({ column }) {
            if (column.type == 'checkbox' || ['name'].includes(column.field)) {
                return false;
            }
            return true;
        },
    },
    editConfig: {
        trigger: 'click',
        mode: 'row',
        showStatus: true,
    },
    exportConfig: {},
    toolbarConfig: {
        custom: true,
        refresh: true,
        export: true,
        slots: {
            buttons: 'toolbar_buttons',
        },
    },
    checkboxConfig: {
        labelField: 'id',
    },
    editRules: {
        name: [
            { required: true, message: '必填项' },
            { min: 3, max: 50, message: '名称长度在 3 到 50 个字符' },
        ],
    },
    columns: [
        { type: 'checkbox', title: 'ID', width: 80, fixed: 'left' },
        {
            minWidth: 160,
            field: 'name',
            title: '商品名',
            fixed: 'left',
            titlePrefix: { message: '名称必须填写！' },
            slots: { edit: 'name_edit' },
            editRender: { name: 'input', attrs: { placeholder: '请输入名称' } },
        },
        {
            title: '分类',
            children: [
                {
                    field: 'nickname',
                    title: 'A级',
                    width: 120,
                    editRender: {},
                    slots: { edit: 'nickname_edit' },
                },
                {
                    field: 'role',
                    title: 'B级',
                    minWidth: 120,
                    editRender: {},
                    slots: { edit: 'role_edit' },
                },
            ],
        },
        {
            field: 'address',
            title: '发货地址',
            minWidth: 160,
            showOverflow: true,
            editRender: {},
            slots: { edit: 'address_edit' },
        },
        {
            field: 'sex',
            title: '性别',
            minWidth: 80,
            showOverflow: true,
            filters: [
                { label: '男', value: 'man', checked: false },
                { label: '女', value: 'woman', checked: false },
            ],
        },
        { field: 'age', title: '年龄', minWidth: 60, showOverflow: true },
        {
            field: 'date',
            title: '下单时间',
            minWidth: 120,
            showOverflow: true,
            sortable: true,
        },
        { field: 'price', title: '金额', minWidth: 60, showOverflow: true },
        { field: 'remark', title: '评论', showOverflow: true, minWidth: 160 },
    ],
    pagerConfig: {
        pageSize: 10,
        pageSizes: [5, 10, 15, 20, 50, 100],
    },
    sortConfig: {
        trigger: 'cell',
        remote: true,
    },
    filterConfig: {
        remote: true,
    },
    proxyConfig: {
        seq: true, // 启用动态序号代理，每一页的序号会根据当前页数变化
        sort: true, // 启用排序代理，当点击排序时会自动触发 query 行为
        filter: true, // 启用筛选代理，当点击筛选时会自动触发 query 行为
        props: {
            result: 'result', // 配置响应结果列表字段
            total: 'page.total', // 配置响应结果总页数字段
        },
        // 接收 Promise
        ajax: {
            query: ({ page, sorts, filters, form }, records) => {
                // 处理排序条件
                const firstSort = sorts[0];
                if (firstSort) {
                    queryParams.sortField = firstSort.field;
                    queryParams.order = firstSort.order;
                }
                // 处理筛选条件
                filters.forEach(({ field, values }) => {
                    if (field == 'sex') queryParams.filters.sex = values.join(',');
                });
                // 分页
                queryParams.currentPage = page.currentPage;
                queryParams.pageSize = page.pageSize;

                console.log('搜索参数：', queryParams);
                console.log('表格其它参数：', page, sorts, filters, form, records);
                return getData();
            },
        },
    },
    footerMethod({ columns, data }) {
        return [
            columns.map((column, columnIndex) => {
                if (columnIndex === 0) {
                    return '合计';
                }
                if (['age', 'price'].includes(column.field)) {
                    return sumNum(data, column.field);
                }
                return '';
            }),
        ];
    },
});

function addRow() {
    const $grid = xGrid.value;
    if (!$grid) return;
    $grid.insert({
        name: 'xxx',
    });
}

async function save() {
    const $grid = xGrid.value;
    if (!$grid) return;
    const { insertRecords, removeRecords, updateRecords } = $grid.getRecordset();
    console.log(
        'insertRecords, removeRecords, updateRecords',
        insertRecords,
        removeRecords,
        updateRecords
    );
    const validErr = await $grid.validate();
    if (validErr) {
        ElMessage({ message: '注意校验~', type: 'error' });
        return;
    }
    if (!updateRecords.length && !insertRecords.length) {
        ElMessage({ message: '数据没有更改~', type: 'warning' });
        return;
    }
    const records = { insertRecords, updateRecords };
    $grid.commitProxy('query', records);
    ElMessage({
        message: `新增 ${insertRecords.length} 条，更新 ${updateRecords.length} 条`,
        type: 'success',
    });
}

async function del() {
    const $grid = xGrid.value;
    if (!$grid) return;
    const selectRecords = $grid.getCheckboxRecords();
    if (!selectRecords.length) {
        ElMessage({ message: '没有选择删除数据~', type: 'warning' });
        return;
    }
    const name = selectRecords.map((i) => i.name).join(',');
    ElMessageBox.confirm(
        `你确定删除：【${name}】 这${selectRecords.length}条数据吗？`,
        '删除操作',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    ).then(() => {
        const records = { delRecords: selectRecords };
        // 调保存接口后重新请求表格数据
        $grid.commitProxy('query', records);
        ElMessage({
            type: 'success',
            message: '删除成功',
        });
    });
}

function getData() {
    return post<any>('/api/goodList', queryParams).then((res) => {
        const { code, data, msg } = res;
        if (code == 200) {
            const list = data as Array<any>;
            // 模拟分页
            return {
                page: {
                    total: list.length,
                },
                result: list.slice(
                    (queryParams.currentPage - 1) * queryParams.pageSize,
                    queryParams.currentPage * queryParams.pageSize
                ),
            };
        } else {
            ElMessage(msg);
        }
    });
}
const sumNum = (list: any[], field: string) => {
    let count = 0;
    list.forEach((item) => {
        count += Number(item[field]);
    });
    return count;
};
</script>

<template>
    <div>
        <vxe-grid ref="xGrid" v-bind="gridOptions">
            <!--将表单放在工具栏中-->
            <template #toolbar_buttons>
                <vxe-form :data="queryParams" @submit="searchEvent" @reset="resetEvent">
                    <vxe-form-item>
                        <template #default>
                            <el-select placeholder="选择商品" v-model="queryParams.type" style="width: 200px;">
                                <el-option value="1" label="A级商品" />
                                <el-option value="2" label="B级商品" />
                            </el-select>
                        </template>
                    </vxe-form-item>
                    <vxe-form-item>
                        <template #default>
                            <vxe-input v-model="queryParams.name" type="text" placeholder="请输入名称" />
                        </template>
                    </vxe-form-item>
                    <vxe-form-item>
                        <template #default>
                            <!-- 用from表单方法 -->
                            <vxe-button type="submit" status="primary" content="搜索" />
                            <vxe-button type="reset" content="重置" />
                            <!-- 自定义方法  -->
                            <vxe-button type="insert" content="新增" @click="addRow" />
                            <vxe-button type="save" content="保存" @click="save" />
                            <vxe-button type="del" content="删除" @click="del" />
                        </template>
                    </vxe-form-item>
                </vxe-form>
            </template>

            <template #name_edit="{ row }">
                <vxe-input v-model="row.name" />
            </template>
            <template #nickname_edit="{ row }">
                <vxe-input v-model="row.nickname" />
            </template>
            <template #role_edit="{ row }">
                <vxe-input v-model="row.role" />
            </template>
            <template #address_edit="{ row }">
                <vxe-input v-model="row.address" />
            </template>
        </vxe-grid>
    </div>
</template>
