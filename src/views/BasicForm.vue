<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { useFormRulesStore } from '@/stores/formRules';
import { useRouter } from 'vue-router';

const router = useRouter();
// do not use same name with ref
const form = reactive({
    name: '',
    region: '',
    date1: '',
    date2: '',
    delivery: false,
    type: [],
    resource: '',
    desc: '',
});

// 表单实例 和 相关联的规则
const ruleFormRef = ref<FormInstance>();
const formRules = reactive<FormRules>(useFormRulesStore());

// 提交操作
const onSubmit = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate((valid, fields) => {
        if (valid) {
            console.log('submit!');
        } else {
            console.log('error submit!', fields);
        }
    });
    router.go(0); // 刷新页面
};
</script>


<!-- 基础表单页面 -->
<template>
    <div class="basic-form-page">
        <h1>基础表单页面</h1>
        <el-form ref="ruleFormRef" :model="form" :rules="formRules" label-width="120px" status-icon>
            <el-form-item label="活动名称" prop="name">
                <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="活动地址" prop="region">
                <el-select v-model="form.region" placeholder="please select your zone">
                    <el-option label="Zone one" value="shanghai" />
                    <el-option label="Zone two" value="beijing" />
                </el-select>
            </el-form-item>
            <el-form-item label="活动时间" prop="date1">
                <el-col :span="11">
                    <el-date-picker v-model="form.date1" type="date" placeholder="Pick a date" style="width: 100%" />
                </el-col>
                <el-col :span="2" class="text-center">
                    <span class="text-gray-500">-</span>
                </el-col>
                <el-col :span="11">
                    <el-form-item prop="date2">
                        <el-time-picker v-model="form.date2" placeholder="Pick a time" style="width: 100%" />
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label="即时交付" prop="delivery">
                <el-switch v-model="form.delivery" />
            </el-form-item>
            <el-form-item label="活动类型" prop="type">
                <el-checkbox-group v-model="form.type">
                    <el-checkbox label="Online activities" name="type" />
                    <el-checkbox label="Promotion activities" name="type" />
                    <el-checkbox label="Offline activities" name="type" />
                    <el-checkbox label="Simple brand exposure" name="type" />
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="资源" prop="resource">
                <el-radio-group v-model="form.resource">
                    <el-radio label="Sponsor" />
                    <el-radio label="Venue" />
                </el-radio-group>
            </el-form-item>
            <el-form-item label="活动形式" prop="desc">
                <el-input v-model="form.desc" type="textarea" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit(ruleFormRef)">创建</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>


<style lang="less" scoped>
.basic-form-page {
    width: 600px;

    h1 {
        margin: 0px 52px 20px;
    }
}
</style>