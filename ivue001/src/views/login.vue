<template>
  <div>
    <el-card class="box-card" shadow="always">
      <h2>欢迎登录</h2>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" >
      <el-form-item label="姓名" prop="username">
        <el-input v-model="ruleForm.username" placeholder="请输入姓名" autocomplete="off" class="eli"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password" placeholder="请输入姓名" class="eli" autocomplete="off" ></el-input>
      </el-form-item>
      <div style="text-align: center">
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </div>
    </el-form>
    </el-card>
  </div>

</template>
<script>
import Vue from "vue";

export default {
  data() {
    return {
      ruleForm: {
        username:'',
        password: '',
      },
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
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios.post(
            'http://localhost:8086/ssx/user/home11',this.ruleForm
          ).then(response=>{
            let data = response.data;
            if(data.code===1){
              this.$router.push("/goMain");
            }else{
              this.open1(data.message);
            }
            //alert(Object.values(response.data));
          }).catch(error=>{
            alert(error);
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },


  },
  // beforeRouteEnter(to,from,next){//进入路由前
  //   next(vm => {
  //     vm.open1();//必须要通过vm对象去调用methods的方法
  //   });
  // },
  created() {
    this.open1("请登录");
  }

}
</script>
<style scoped>

h2{
  text-align: center;
}
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 480px;
  margin: 0 auto;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
.eli{
  width: 333px;
}

</style>
