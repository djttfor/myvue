<template>
<div>
  <el-table
    :data="records"
    height="500"
    border
    style="width: 100%">
    <el-table-column
      prop="username"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="phone"
      label="手机电话"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址">
    </el-table-column>
  </el-table>

  <div class="block">
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="current"
      :page-sizes="[5, 6, 8, 10]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</div>
</template>

<script>
export default {
  name: "iv",
  data () {
    return {
      current :1,
      pageSize:5,
      total:5,
      records:[],
    }
  },
  //================分页=================
  methods: {
    handleSizeChange(val) {
      this.getUserData(0,val)
    },
    handleCurrentChange(val) {
      this.getUserData(val,0);
    },
    //获取分页数据
    getUserData(curr,pasi){
      if(!curr){
        curr = this.current;
      }
      if(!pasi){
        pasi = this.pageSize;
      }
      this.axios.get(`http://localhost:8086/ssx/user/home8/${curr}/${pasi}`)
        .then(res=>{
          //console.log(res.data);
          this.records = res.data.records;
          this.total = res.data.total;
        }).catch(err=>{
        alert(err);
      })
    }
  },
  //============================
  created() {
    this.getUserData();
  }
}
</script>

<style scoped>
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
}
</style>
