<!--
 * @Author: MuYuCat
 * @Date: 2022-04-14 16:32:47
 * @LastEditors: MuYuCat
 * @LastEditTime: 2022-04-22 14:01:20
 * @Description: file content
-->
<template>
  <el-dialog
    :model-value="showLogIn"
    width="380px"
    custom-class="dialog-login"
    :before-close="closeDialog"
    modal
    lock-scroll
    :close-on-click-modal="false"
    close-on-press-escape
    draggable
    center
    destroy-on-close
  >
    <template #title>
      <div class="dialog-title">
        <a class="icons-muyucat-gary big" href="/"></a>
        <span class="dialog-name">MuYuCat</span>
      </div>
    </template>
    <div class="dialog-content">
      <el-form
        label-width="100px"
        :model="loginForm"
        style="max-width: 460px"
        size="large"
        :rules="rules"
        ref="loginForm"
      >
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            :prefix-icon="icon.user"
            placeholder="账号"
            :clearable="true"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            :prefix-icon="icon.password"
            placeholder="密码"
            show-password
            :clearable="true"
          />
        </el-form-item>
      </el-form>
      <span class="content-forgot" @click="forgotMsg">忘记密码</span>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" plain size="large" @click="confirmLogin()" class="footer-confirm">
          登陆
        </el-button>
        <div class="footer-agreement">
          登录即同意
          <el-popover
            placement="bottom-start"
            :width="200"
            trigger="hover"
            :show-arrow="true"
            content="1.请自觉遵守互联网相关的政策法规，严禁发布色情、暴力、反动的言论。"
          >
            <template #reference>
              <a>「软件许可及服务协议」</a>
            </template>
          </el-popover>
        </div>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { Avatar, Lock } from '@element-plus/icons-vue';
import { markRaw } from 'vue';
import login from '../api/login';

export default {
  name: 'LogIn',
  props: {
    showLogIn: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // Avatar,
      // Lock,
      loginForm: {
        username: '',
        password: ''
      },
      icon: {
        user: markRaw(Avatar),
        password: markRaw(Lock)
      },
      rules: {
        username: [{ required: true, message: 'Please input Account name', trigger: 'blur' }],
        password: [{ required: true, message: 'Please input Account password', trigger: 'blur' }]
      }
    };
  },
  methods: {
    closeDialog() {
      this.loginForm = {};
      this.$emit('update:showLogIn', false);
    },
    confirmLogin() {
      this.$refs.loginForm.validate(async (valid) => {
        if (!valid) {
          return false;
        }
        try {
          // 接口登陆校验逻辑
          const res = await login(this.loginForm);
          console.log('isToken', res);
          // 存储token
          localStorage.setItem('isToken', res?.data?.token);
          // 存储token校验
          if (res.msg) {
            this.$message({
              message: res.msg,
              type: 'success'
            });
          }
          this.closeDialog();
        } catch (error) {
          if (error.msg) {
            this.$message({
              message: error.msg,
              type: 'error'
            });
          }
        }
        return '';
      });
    },
    forgotMsg() {
      this.$message({
        message: '忘记就忘记了，功能太多写不过来，等待后续完善！',
        type: 'warning'
      });
    }
  }
};
</script>

<style lang="scss">
.dialog-login {
  .el-form-item__content {
    margin-left: 0 !important;
    padding: 0 30px;
  }
  .el-form-item__error {
    padding: 4px 30px;
  }
}
</style>

<style scoped lang="scss">
.dialog-login {
  .dialog-title {
    position: relative;
    .icons-muyucat-gary {
      margin-left: -54px;
    }
    .dialog-name {
      font-size: 16px;
      position: absolute;
      bottom: 8px;
      left: 162px;
      font-weight: 700;
      letter-spacing: 1px;
    }
  }
  .dialog-content {
    position: relative;
    .content-forgot {
      position: absolute;
      left: 30px;
      cursor: pointer;
      font-size: 12px;
    }
  }
  .dialog-footer {
    .footer-confirm {
      width: 130px;
    }
    .footer-agreement {
      cursor: pointer;
      text-align: center;
      font-size: 12px;
      margin-top: 20px;
    }
  }
}
</style>
