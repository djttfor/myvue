<template>
  <div style="margin-left: 20px;margin-right: 20px">

   <div  style="margin-bottom: 20px;">
     <el-row>
       <el-col :span="12">
         <div style="margin-top: 30px;margin-bottom: 30px">
           <div style="width: 360px;float: left">
             <el-autocomplete
               class="inline-input"
               v-model="searchName"
               :fetch-suggestions="querySearch"
               placeholder="请输入姓名"
               @select="handleSelect"
               @input="handleChange"
               clearable
             ></el-autocomplete>
             <el-button style="margin-left: 10px;" type="primary"  icon="el-icon-search" @click="handleSearch">
               搜索
             </el-button>
           </div>
           <el-button style="margin-left: 10px;" type="primary"  @click="handleAddEmp">
             添加员工
           </el-button>
         </div>
       </el-col>
       <el-col :span="12">
         <div style="margin-top: 30px;text-align: right" >
          <div style="float: right;margin-left: 30px">
            <el-button
              type="primary"
              @click="downloadExcel"
              icon="el-icon-download"
              :disabled="exportDisable"
              :loading="exportLoading"
            >
              {{exportBtnText}}
            </el-button>
          </div>
          <div style="float: right">
            <el-upload
              :action="importUrl"
              :before-upload="beforeUpload"
              :on-success="uploadSuccessHandle"
              :on-error="uploadErrorHandle"
              :headers="importHeaders"
              :show-file-list="false"
            >
              <el-button style="margin-left: 10px;" type="success" icon="el-icon-upload2" >
                导入数据
              </el-button>
            </el-upload>
          </div>
         </div>
       </el-col>
     </el-row>
   </div>

        <div>
          <el-table
            v-loading="listLoading"
            :data="list"
            border
            style="width: 100%;"
            @selection-change="handleSelectionChange"
            :cell-style="{borderRightWidth: 2+'px'}"
            :header-cell-style="{borderRightWidth: 2+'px'}"
            class="my-table"
          >
            <el-table-column fixed type="selection" width="55" />
            <el-table-column fixed prop="id" label="id" width="80" align="center" />
            <el-table-column fixed prop="name" label="姓名" width="80" align="center" />
            <el-table-column prop="gender" label="性别" width="80" align="center" />
            <el-table-column label="生日" width="200" align="center">
              <template slot-scope="{row}">
                {{ formatLocalDate(row.birthday) }}
              </template>
            </el-table-column>
            <el-table-column prop="idCard" label="身份证号" width="200" align="center" />
            <el-table-column prop="wedlock" label="婚姻状况" width="80" align="center" />
            <el-table-column prop="nationId" label="民族" width="55" align="center" />
            <el-table-column prop="nationPlace" label="籍贯" width="55" align="center" />
            <el-table-column prop="politicId" label="政治面貌" width="55" align="center" />
            <el-table-column prop="email" label="邮箱" width="180" align="center" />
            <el-table-column prop="phone" label="手机号码" width="150" align="center" />
            <el-table-column prop="address" label="地址" width="150" align="center" />
            <el-table-column prop="departmentId" label="部门编号" width="55" align="center" />
            <el-table-column prop="jobLevelId" label="职称id" width="65" align="center" />
            <el-table-column prop="posId" label="职位id" width="65" align="center" />
            <el-table-column prop="engageForm" label="聘用方式" width="100" align="center" />
            <el-table-column prop="tiptopDegree" label="文化水平" width="55" align="center" />
            <el-table-column prop="specialty" label="所属专业" width="120" align="center" />
            <el-table-column prop="school" label="毕业院校" width="120" align="center" />
            <el-table-column label="入职日期" width="200" align="center">
              <template slot-scope="{row}">
                {{ formatLocalDate(row.beginDate) }}
              </template>
            </el-table-column>
            <el-table-column prop="workState" label="在职状态" width="55" align="center" />
            <el-table-column prop="workId" label="工号" width="200" align="center" />
            <el-table-column prop="contractTerm" label="合同期限(天)" width="100" align="center" />
            <el-table-column label="转正日期" width="200" align="center">
              <template slot-scope="{row}">
                {{ formatLocalDate(row.conversionTime) }}
              </template>
            </el-table-column>
            <el-table-column label="离职日期" width="200" align="center">
              <template slot-scope="{row}">
                {{ formatLocalDate(row.notWorkTract) }}
              </template>
            </el-table-column>
            <el-table-column label="合同起始日期" width="200" align="center">
              <template slot-scope="{row}">
                {{ formatLocalDate(row.beginContract) }}
              </template>
            </el-table-column>
              <el-table-column class="aaa" label="合同终止日期" width="200" align="center" style="border-right-width: 2px">
                <template slot-scope="{row}">
                  {{ formatLocalDate(row.endContract) }}
                </template>
              </el-table-column>
<!--            <el-table-column prop="workAge" label="工龄" width="55" align="center" />-->
<!--            <el-table-column prop="工资账套id" label="工资账套id" width="100" align="center" />-->
            <el-table-column   fixed="right" label="操作" width="350" align="center" >
              <template slot-scope="{row}">
                <el-button type="primary" size="mini" @click="handleUpdate(row)">
                  更新
                </el-button>
                <el-button type="primary" size="mini" @click="handleUpdate(row)">
                  查看高级资料
                </el-button>
                <el-button type="danger" size="mini" @click="handleDelete(row.id)">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>


        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />



  </div>
</template>

<script>

import { formatLocalDate } from '@/utils/i-util'
import { addEmp, pageQuery } from '@/api/emp'
import Pagination from '@/components/Pagination'
import {exportExcel} from '@/api/download'
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth'

export default {
  components: { Pagination },
  name: 'Index',
  data(){
    return{
      list: null,
      total: 0,
      searchName: '',
      searchList: [
        {value: 'aaa',name:'bbb'}
      ],
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 10,
        importance: undefined,
        title: undefined,
        type: undefined,
      },
      multipleSelection: [],
      selectedIds: [],
      fileList: [],
      exportLoading: false,
      exportBtnText: '导出数据',
      exportDisable: false,
      importLoading: false,
      importBtnTitle: '导入数据',
      importDisable: false,
      importUrl: process.env.VUE_APP_BASE_API+'/emp/basic/import',
      importHeaders: {
        'Authorization' : 'Bearer' + getToken()
      }
    }
  },
  methods:{
    querySearch(queryString, cb) {
      var searchList = this.searchList;
      var results = queryString ? searchList.filter(this.createFilter(queryString)) : searchList;
      cb(results);
    },
    createFilter(queryString) {
      return (s) => {
        return (s.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleSelect(item) {
      //可以选择使用搜索实体
    },
    handleChange(){

    },
    handleSearch(){
    },
    formatLocalDate(date) {
      return formatLocalDate(date)
    },
    getList() {
      this.listLoading = true
      pageQuery(this.listQuery.page, this.listQuery.limit).then(response => {
        this.list = response.result.records
        this.total = response.result.total
        this.listLoading = false
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      this.selectedIds = []
      if (this.multipleSelection.length > 0) {
        this.multipleSelection.forEach(value => {
          this.selectedIds.push(value.id)
        })
      } else {
        this.selectedIds = []
      }
    },
    downloadExcel(){
      this.exportLoading = true
      this.exportDisable = true
      this.exportBtnText = '正在导出'
      exportExcel().then(()=>{
        this.exportLoading = false
        this.exportDisable = false
        this.exportBtnText = '导出数据'
        Message({
          message: '导出成功',
          type: 'success',
          duration: 2 * 1000
        })
      }).catch(()=>{
        this.exportLoading = false
        this.exportDisable = false
        Message({
          message: '导出失败',
          type: 'error',
          duration: 2 * 1000
        })
      })
    },
    uploadStatusUP(){
      this.importLoading = true
      this.importBtnTitle = "正在导入"
      this.importDisable = true
    },
    uploadStatusDown(){
      this.importLoading = false
      this.importBtnTitle = "导入数据"
      this.importDisable = false
    },
    beforeUpload(file){
      this.uploadStatusUP()
      let limitSize = 3*1024*1024
      if(file.size>limitSize){
        Message({
          message: '上传的文件不能大于3M',
          type: 'warning',
          duration: 2 * 1000
        })
        this.uploadStatusDown()
        return false;
      }
    },
    uploadSuccessHandle(){
      Message({
        message: '导入成功',
        type: 'success',
        duration: 2 * 1000
      })
      this.uploadStatusDown()
    },
    uploadErrorHandle(){
      Message({
        message: '导入失败',
        type: 'success',
        duration: 2 * 1000
      })
      this.uploadStatusDown()
    },
    handleAddEmp(){
      addEmp().then(()=>{
        Message({
          message: '添加成功',
          type: 'success',
          duration: 2 * 1000
        })
      })
    }
  },
  created() {
    this.getList()
  }
}
</script>

<style lang="scss" scoped>

.el-table--border td,
.el-table--border th {
  border-right: 2px solid #dfe6ec;
}

</style>
