<script lang="ts" setup>
import { Postcard, House, Guide } from '@element-plus/icons-vue';
import { nextTick, ref } from 'vue';
import { ElInput } from 'element-plus';

const config = {
    AVATAR: {
        img: 'https://github.com/xiaoyan13.png',
        name: 'xiaoyan13',
        motto: 'Hello, world.',
    },
    DETAIL: [
        {
            icon: Postcard,
            describe: '萌新前端',
        },
        {
            icon: Guide,
            describe: '学习搬砖中',
        },
        {
            icon: House,
            describe: 'Henan, China',
        },
    ],
    TAGS: ['灵光一现', '专注设计', '佛系萌新', '大佬求带'],
};

const inputVisible = ref(false);
const inputValue = ref('');
const dynamicTags = ref(config.TAGS);
const InputRef = ref<InstanceType<typeof ElInput>>();

const handleInputConfirm = () => {
    if (inputValue.value) {
        dynamicTags.value.push(inputValue.value);
    }
    inputVisible.value = false;
    inputValue.value = '';
};

const showInput = () => {
    inputVisible.value = true;
    nextTick(() => {
        InputRef.value!.input!.focus();
    });
};
</script>


<template>
    <el-card shadow="never">
        <div class="avatar">
            <img :src="config.AVATAR.img" alt="avatar" />
            <div class="name">{{ config.AVATAR.name }}</div>
            <div>{{ config.AVATAR.motto }}</div>
        </div>

        <div class="detail">
            <p v-for="item in config.DETAIL" :key="item.describe">
                <span>
                    <component class="xxx" :is="item.icon" />
                    {{ item.describe }}
                </span>
            </p>
        </div>

        <el-divider border-style="dotted" />

        <div class="tags">
            <div class="tags-title">标签</div>
            <el-tag v-for="tag in dynamicTags" :key="tag">
                {{ tag }}
            </el-tag>
            <el-input v-if="inputVisible" v-model="inputValue" ref="InputRef" size="small"
                @keyup.enter="handleInputConfirm" @blur="handleInputConfirm" class="tags-input" />
            <el-tag v-else class="tags-add" @click="showInput">+</el-tag>
        </div>

        <el-divider border-style="dotted" />
    </el-card>
</template>

<style lang="less" scoped>
.el-row {
    flex-flow: row wrap;
}

.avatar {
    text-align: center;
    margin-bottom: 24px;

    img {
        width: 104px;
        height: 104px;
        border-radius: 50%;
        margin-bottom: 20px;
    }

    .name {
        color: rgba(0, 0, 0, 0.85);
        font-weight: 500;
        font-size: 20px;
        line-height: 28px;
        margin-bottom: 4px;
    }
}

.detail {
    p {
        position: relative;
        margin-bottom: 8px;
        padding-left: 26px;
    }

    svg {
        display: inline-block;
        width: 14px;
        height: 14px;
        vertical-align: -0.125rem;
    }
}

.tags {
    .tags-title {
        margin-bottom: 12px;
        color: rgba(0, 0, 0, 0.85);
        font-weight: 500;
    }

    .el-tag {
        margin-right: 8px;
        margin-bottom: 8px;
    }

    .tags-add {
        border-style: dashed;
    }

    .tags-input {
        margin-left: 5px;
        width: 78px;
    }
}
</style>