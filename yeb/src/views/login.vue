<template>
  <div>
    <el-card class="box-card"
             v-loading="loading"
             element-loading-text="拼命加载中"
             element-loading-spinner="el-icon-loading"
             element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <h2 style="text-align: center">欢迎登录</h2>
      <el-form
        :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px"
      >
        <el-form-item label="姓名" prop="username">
          <el-input v-model="ruleForm.username" placeholder="请输入姓名" autocomplete="off" class="eli"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" placeholder="请输入姓名" class="eli" autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <div>
          <div style="float: left"><el-input type="text"  v-model="ruleForm.code" placeholder="请输入验证码" autocomplete="off" class="code" ></el-input></div>
          <div style="float: left"><img :src="captchaUrl" alt="加载失败" style="margin-left: 5px" @click="changeImage"></div>
          <div style="font-size: 5px;height: 40px;float:left;"><span style="position: relative;bottom:-13px;display: block">看不清?点击图片更换</span></div>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {getRequest, postRequest} from "../utils/api";
import {Message} from "element-ui";
import Vue from "vue";
import Cookies from 'js-cookie'

export default {
  name: "login",
  data() {
    return {
      captchaUrl: this.iConstant.iServer+'/captcha?time='+new Date(),//需要增加时间参数，当你再次点击时是不同的url
      ruleForm: {
        username:'',
        password: '',
        code:'',
        codeToken:''
      },
      loading:false,
      rules: {
        username: [
          { required: true, message: '你tm的输入姓名啊', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' },
          {
            required: true,
            pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9.·-]+$/,
            message: '姓名不支持特殊字符',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '你tm的输入密码啊', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' },
          {
            required: true,
            pattern: /^[_a-zA-Z0-9.·-]+$/,
            message: '密码格式不正确',
            trigger: 'blur'
          }
        ],
        code:[
          {required: true,message: '请输入验证码', trigger: 'blur'}
        ]
      }
    };
  },
  methods: {
    changeImage(){
      this.captchaUrl = this.iConstant.iServer+'/captcha?time='+new Date();
    },
    getCodeToken(){
      //this.ruleForm.codeToken = this.$cookieStore.getCookie(this.$vCodeCookieName.vCodeCookieName);
      this.ruleForm.codeToken = Cookies.get(this.iConstant.vCodeCookieName)
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true;
          //获取验证码令牌
          this.getCodeToken();
          //登录
          postRequest(`/login`,this.ruleForm).then(resp=>{
            if(resp.code===200){
              this.loading = false;
              //获取响应头及令牌
              let tokenStr = resp.object.tokenHead+resp.object.token;
              window.sessionStorage.setItem('tokenStr',tokenStr);
              //跳转页面
              this.$router.replace('/home')
            }else{
              this.loading = false;
              //刷新令牌与验证码图片
              this.changeImage();
              this.getCodeToken();
            }
          });
        } else {
          this.loading = false;
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      const user={
        name:'jimmy',password:'123'
      }
      alert()
    },

  },
  created() {

  }
}
</script>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 480px;
  margin: 0 auto;
}
.eli{
  width: 333px;
}
.code{
  width: 120px;
}
#codeInput{
  position: relative;
  top: -14px;
}

</style>
