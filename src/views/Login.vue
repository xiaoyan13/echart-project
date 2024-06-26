<script setup lang="ts">
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { useRouter } from 'vue-router'
import { ref, reactive } from 'vue'
import { get, type ResultData } from '@/api/index'

/* 页面交互逻辑相关 */
enum ShowCase {
  'login',
  'register',
}

const router = useRouter();
const show = ref<ShowCase>(ShowCase.login);
const resetForm = (form: FormInstance | undefined) => form!.resetFields();


/* 登录提交表单的事务逻辑 */
// ref: 表单实例
const loginFormRef = ref<FormInstance>();
// 表单数据
const loginFormData = reactive({
  name: '', passwd: ''
})

// 表单提交的结果
type Result = {
  code: number,
  token: string
  msg: string
}
const getLoginResult = () => {
  let LoginResult: Result = {
    code: 200,
    token: 'IrARveFpnY7IXu8YAv0XQdowc7i1lPtO',
    msg: 'success'
  };
  // todo: 获取 LoginResult
  // get('api/login').then((res: ResultData) => { // res 为 resultData 类型
  //   const { code, data, msg } = res;
  //   const token = data.token as string;
  //   console.log(token)
  //   LoginResult = { code, token, msg }
  // })
  return LoginResult
}

// 登陆表单的字段校验规则
const loginRules = reactive<FormRules>({
  name: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    { max: 11, message: '账号长度不超过11位', trigger: 'blur' },
  ],
  passwd: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ]
})

// function: 提交表单
const submit = (form: FormInstance | undefined) => { // ref 在模板中使用的时候会被自动.value，.value 的类型是 FormInstance | undefined
  form!.validate((valid) => {
    if (valid) {
      // 合法的提交表单。 
      let loginResult = getLoginResult();
      if (loginResult.code === 200) {
        ElMessage({
          message: '登录成功~',
          type: 'success'
        })
        // 存储登录数据
        localStorage.setItem('token', loginResult.token);
        localStorage.setItem('username', loginFormData.name);
        router.push('/')
      } else {
        ElMessage({
          message: loginResult.msg || '登录失败',
          type: 'error'
        })
      }
    } else {
      console.log('表单不合法');
      return false;
    }
  })
}

/*  注册表单的事务逻辑  */
const registerFormRef = ref<FormInstance>()
const registerForm = reactive({
  name: '',
  email: '',
  passwd: '',
  checkPass: '',
})

// 此处 rule 是 InternalRuleItem 类型，它并没有让我们用，所以直接写成 any 即可
const validatePasswd = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password'));
  } else {
    if (registerForm.checkPass !== '') {
      if (!registerFormRef.value) return;
      registerFormRef.value.validateField('checkPass', () => null);
    }
    callback();
  }
}
const validateComfirmPasswd = (rule: any, value: any, callback: any) => {
  console.log(rule);
  if (value === '') {
    callback(new Error('Please input the password again'));
  } else if (value !== registerForm.passwd) {
    callback(new Error("Two inputs don't match!"));
  } else {
    callback();
  }
}

const registerRules = reactive<FormRules>({
  // 多个字段，每个字段可以多个规则，每个规则为一个对象
  name: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    { max: 11, message: '账号长度不超11位', trigger: 'blur' },
  ],
  email: [
    {
      required: true,
      message: '请输入邮箱',
      trigger: 'blur',
    },
    {
      type: 'email',
      message: '请输入正确的邮箱',
      trigger: ['blur', 'change'],
    },
  ],
  passwd: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { validator: validatePasswd, trigger: 'blur' },
  ],
  checkPass: [
    { required: true, message: '请输入确认密码', trigger: 'blur' },
    { max: 11, message: '账号长度不超11位', trigger: 'blur' },
    { validator: validateComfirmPasswd, trigger: 'blur' },
  ],
})



</script>


<template>
  <div class="login-page">
    <div class="ball" />
    <div class="shadow" />

    <div class="login-card">
      <div class="change-btn">
        <img src="../assets/管理者.svg" width="355" />
        <p>已经有账号了？</p>
        <el-button link size="large" @click="show = ShowCase.login">登 录</el-button>
      </div>

      <div class="change-btn">
        <img src="../assets/管理者(2).svg" width="355" />
        <p>还没有账号?</p>
        <el-button link size="large" @click="show = ShowCase.register">注 册</el-button>
      </div>

      <div class="wrapper" :class="{ move: show === ShowCase.register }">
        <el-form v-show="show === ShowCase.login" ref="loginFormRef" :model="loginFormData" :rules="loginRules"
          label-width="80px" class="ruleForm" status-icon>
          <h3 class="header">登 录</h3>
          <el-form-item label="账号" prop="name">
            <el-input placeholder="输入账号/姓名/电话" v-model="loginFormData.name" />
          </el-form-item>
          <el-form-item label="密码" prop="passworld">
            <el-input type="password" placeholder="输入密码" v-model="loginFormData.passwd" />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submit(loginFormRef)">登 录</el-button>
            <el-button @click="resetForm(loginFormRef)">重 置</el-button>
          </el-form-item>
        </el-form>
        <el-form v-show="show === ShowCase.register" ref="registerFormRef" :model="registerForm" :rules="registerRules"
          label-width="100px" class="ruleForm">
          <h3 class="header">注册</h3>
          <el-form-item label="账号" prop="name">
            <el-input placeholder="输入账号/姓名/电话" v-model="registerForm.name" />
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input placeholder="输入邮箱" v-model="registerForm.email" />
          </el-form-item>
          <el-form-item label="密码" prop="passworld">
            <el-input type="password" placeholder="输入密码" v-model="registerForm.passwd" />
          </el-form-item>
          <el-form-item label="再次确认" prop="checkPass">
            <el-input type="password" placeholder="再次输入密码" v-model="registerForm.checkPass" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submit(registerFormRef)">注 册</el-button>
            <el-button @click="resetForm(registerFormRef)">重 置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style>
.el-button--large {
  margin: 10px;
}

.login-card {
  position: absolute;
  left: 25%;
  top: 25%;
  width: 60%;
  background: rgba(255, 255, 255, 0.5);
  min-height: 400px;
  display: table;
  box-shadow: 0 0 4px rgb(0 0 0 / 14%), 0 4px 8px rgb(0 0 0 / 28%);

  .change-btn {
    display: table-cell;
    vertical-align: middle;
    text-align: center;
  }

  .wrapper {
    border-radius: 2%;
    position: absolute;
    width: 50%;
    height: 120%;
    top: -10%;
    left: 5%;
    background: #fff;
    box-shadow: 0 0 4px rgb(0 0 0 / 14%), 0 4px 8px rgb(0 0 0 / 28%);
    transition: all 0.5s;
    color: #303030;
    overflow: hidden;

    .el-input {
      width: 90%;
    }
  }

  h3 {
    padding: 90px 20px 20px 32px;
    margin-bottom: 30px;
    background-image: linear-gradient(#fff3f3, #fff);
    color: #606266;
  }

  .move {
    left: 45%;

    .header {
      background-image: linear-gradient(#daddf5, #fff);
    }
  }
}

.login-page {
  width: 100vw;
  height: 200vh;
  padding: 1rem;
  font-family: Avenir, sans-serif;
  font-size: 112.5%;
  color: #124;
  background-image: radial-gradient(rgba(255, 0, 0, 0.3),
      rgba(255, 0, 0, 0) 40vw),
    radial-gradient(rgb(64 158 255 / 43%), rgba(0, 128, 0, 0) 40vw),
    radial-gradient(rgba(0, 0, 255, 0.3), rgba(0, 0, 255, 0) 40vw),
    radial-gradient(rgba(255, 255, 0, 0.3), rgba(255, 255, 0, 0) 40vw),
    radial-gradient(rgba(255, 0, 0, 0.3), rgba(255, 0, 0, 0) 40vw);
  background-position: -40vw 14rem, 50% 10rem, 60vw 14rem,
    -10vw calc(14rem + 20vw), 30vw calc(14rem + 20vw);
  background-size: 80vw 80vw;
  background-repeat: no-repeat;
}

.ball {
  position: absolute;
  right: 0;
  bottom: 50px;
  animation: float 4s ease-in-out infinite;
  height: 200px;
  width: 200px;
  border-radius: 50%;
  background: radial-gradient(circle at 75% 30%,
      white 5px,
      aqua 8%,
      darkblue 60%,
      aqua 100%);
  box-shadow: inset 0 0 20px #fff, inset 10px 0 46px #eaf5fc,
    inset 88px 0px 60px #c2d8fe, inset -20px -60px 100px #fde9ea,
    inset 0 50px 140px #fde9ea, 0 0 90px #fff;
}

.shadow {
  position: absolute;
  right: 20px;
  bottom: 0px;
  background: #b490b2;
  width: 150px;
  height: 40px;
  animation: expand 4.1s infinite;
  border-radius: 50%;
}

@keyframes float {
  0% {
    transform: translatey(0px);
  }

  50% {
    transform: translatey(-80px);
  }

  100% {
    transform: translatey(0px);
  }
}

@keyframes expand {

  0%,
  100% {
    transform: scale(0.5);
  }

  50% {
    transform: scale(1);
  }
}
</style>
