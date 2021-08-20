<template>
  <div class="account-box">
    <div class="toggle">
      <a href="javascript:;" v-if="isMsg" @click="isMsg = !isMsg">
        <i class="iconfont icon-user"></i>使用账号登录
      </a>
      <a href="javascript:;" v-else @click="isMsg = !isMsg">
        <i class="iconfont icon-msg"></i>使用短信登录
      </a>
    </div>
    <vee-form class="form" :validation-schema="veeValidateSchema" v-slot="{ errors }" ref="formCom">
      <template v-if="!isMsg">
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <vee-field
              v-model="form.account"
              name="account"
              type="text"
              placeholder="请输入用户名或手机号"
              :class="{ error: errors.account }"></vee-field>
          </div>
          <div class="error" v-if="errors.account">
            <i class="iconfont icon-warning"></i>{{ errors.account }}
          </div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-lock"></i>
            <vee-field
              v-model="form.password"
              name="password"
              type="password"
              placeholder="请输入密码"
              :class="{ error: errors.password }"></vee-field>
          </div>
          <div class="error" v-if="errors.password">
            <i class="iconfont icon-warning"></i>{{ errors.password }}
          </div>
        </div>
      </template>
      <template v-else>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <vee-field
              v-model="form.mobile"
              name="mobile"
              type="text"
              placeholder="请输入手机号"
              :class="{ error: errors.mobile }"></vee-field>
          </div>
          <div class="error" v-if="errors.mobile">
            <i class="iconfont icon-warning"></i>{{ errors.mobile }}
          </div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-code"></i>
            <vee-field
              v-model="form.code"
              name="code"
              type="text"
              placeholder="请输入验证码"
              :class="{ error: errors.code }"></vee-field>
            <span class="code">发送验证码</span>
          </div>
          <div class="error" v-if="errors.code">
            <i class="iconfont icon-warning"></i>{{ errors.code }}
          </div>
        </div>
      </template>
      <div class="form-item">
        <div class="agree">
          <vee-field as="XtxCheckbox" name="isAgree" v-model="form.isAgree"></vee-field>
          <span>我已同意</span>
          <a href="javascript:;">《隐私条款》</a>
          <span>和</span>
          <a href="javascript:;">《服务条款》</a>
        </div>
        <div class="error" v-if="errors.isAgree">
          <i class="iconfont icon-warning"></i>{{ errors.isAgree }}
        </div>
      </div>
      <a href="javascript:;" class="btn" @click="login">登录</a>
    </vee-form>
    <div class="action">
      <a href="javascript:;" class="icon">
        <i class="iconfont icon-qq"></i>
        <span>QQ</span>
      </a>
      <div class="url">
        <a href="javascript:;">忘记密码</a>
        <a href="javascript:;">免费注册</a>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, watch, onUnmounted } from 'vue'
import { Form, Field } from 'vee-validate'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { useIntervalFn } from '@vueuse/core'
import { userAccountLogin, userMobileLogin, userMobileLoginMsg } from '@/api/user'
import veeValidateSchema from '@/utils/vee-validate-schema'
import Message from '@/components/library/Message'

export default {
  name: 'LoginForm',
  components: {
    VeeForm: Form,
    VeeField: Field
  },
  setup () {
    // 是否短信登录
    const isMsg = ref(false)
    // 表单信息对象 - 用于后续表单校验的对象
    const form = reactive({
      isAgree: true,
      account: null,
      password: null,
      mobile: null,
      code: null
    })
    // 切换表单元素，还原数据和清除校验效果
    const formCom = ref(null)
    watch(isMsg, () => {
      // 还原数据
      form.isAgree = true
      form.account = null
      form.password = null
      form.mobile = null
      form.code = null
      formCom.value.resetForm()
    })
    // 校验规则
    const mySchema = {
      account: veeValidateSchema.account,
      password: veeValidateSchema.password,
      mobile: veeValidateSchema.mobile,
      code: veeValidateSchema.code
    }
    // pause 暂停 resume 开始
    // useIntervalFn(回调函数,执行间隔,是否立即开启)
    const time = ref(0)
    const { pause, resume } = useIntervalFn(() => {
      time.value--
      if (time.value <= 0) {
        pause()
      }
    }, 1000, { immediate: false })
    // 组件销毁时暂停
    onUnmounted(() => {
      pause()
    })
    // 发送验证码
    const send = async () => {
      const valid = mySchema.mobile(form.mobile)
      if (valid) {
        // 当 time.value = 0 时才发送验证码
        if (time.value === 0) {
          await userMobileLoginMsg(form.mobile)
          Message({ type: 'success', text: '发送成功' })
          time.value = 60
          // 开始计时
          resume()
        }
      } else {
        // 失败，使用vee的错误函数显示错误信息 setFieldError(字段,错误信息)
        formCom.value.setFieldError('mobile', valid)
      }
    }
    // 使用store
    const store = useStore()
    // 使用router
    const router = useRouter()
    // 使用route
    const route = useRoute()
    // 登录提交
    const login = async () => {
      const valid = formCom.value.validate()
      if (valid) {
        if (!isMsg.value) {
          userAccountLogin(form).then(data => {
            // 存储信息
            // console.log(data.result)
            const { id, account, nickname, avatar, token, mobile } = data.result
            store.commit('user/setUser', { id, account, nickname, avatar, token, mobile })
            // 提示信息
            Message({ type: 'success', text: '登录成功' })
            // 跳转
            router.push(route.query.redirectUrl || '/')
          }).catch(e => {
            console.log(e.response.data)
            if (e.response.data) {
              Message({ type: 'error', text: e.response.data.message || '登录失败' })
            }
          })
        } else {
          // 短信登录
          userMobileLogin(form).then(data => {
            const { id, account, nickname, avatar, token, mobile } = data.result
            store.commit('user/setUser', { id, account, nickname, avatar, token, mobile })
            Message({ type: 'success', text: '登录成功' })
            router.push(route.query.redirectUrl || '/')
          })
        }
      }
    }
    return { isMsg, form, veeValidateSchema, formCom, mySchema, login, send }
  }
}
</script>

<style scoped lang="less">
.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;
    a {
      color: @xtxColor;
      i {
        font-size: 14px;
      }
    }
  }
  .form {
    padding: 0 40px;
    &-item {
      margin-bottom: 28px;
      .input {
        position: relative;
        height: 36px;
        > i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }
        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;
          &.error {
            border-color: @priceColor;
          }
          &.active,&:focus {
            border-color: @xtxColor;
          }
        }
        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
        }
      }
      > .error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: @priceColor;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }
    .agree {
      a {
        color: #069;
      }
    }
    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: @xtxColor;
      &.disabled {
        background: #cfcdcd;
      }
    }
  }
  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .icon {
      display: inline-block;
      position: relative;
      padding-left: 24px;
      i {
        display: block;
        font-size: 20px;
        position: absolute;
        top: -3px;
        left: 0;
        color: #10A8FF;
      }
      span {
        font-size: 10px;
        color: #999;
      }
      &:hover span {
        color: @xtxColor;
        text-decoration: underline;
      }
    }
    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}
</style>
