<template>
  <div class="app">
    <el-row>
      <el-col :span="24" :offset="10">
        <div style="margin-top: 30px">
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
            <el-button style="margin-left: 10px;margin-bottom: 20px" type="primary"  icon="el-icon-search" @click="handleSearch">
              搜索
            </el-button>
          </div>
        </div>
      </el-col>

      <el-col v-if="data.length===0">
        <div style="text-align: center">找不到该用户</div>
      </el-col>
      <el-col v-for="o in data" :key="o.id" :span="6">
        <el-card class="box-card" style="margin-bottom: 10px">
          <div slot="header" class="clearfix">
            <div style="float: left;">
              <el-avatar :size="50" :src="o.userFace" />
            </div>
            <div style="float: left;margin-left: 10px">
              <span>{{ o.name }}</span> <span>{{ o.age }}</span>
              <i v-if="o.gender===1" class="el-icon-female" style="color: green" />
              <i v-else class="el-icon-male" style="color: pink" />
            </div>
            <div>
              <el-tooltip content="删除" placement="top" effect="light">
                <el-button type="danger" size="mini" icon="el-icon-delete" circle style="float: right;margin-left: 5px" @click="handleDelete(o.id)" />
              </el-tooltip>
              <el-tooltip content="编辑" placement="top" effect="light">
                <el-button type="primary" size="mini" icon="el-icon-edit" circle style="float: right;margin-left: 5px" @click="handleEdit(o)" />
              </el-tooltip>
            </div>
          </div>
          <div style="font-size: 14px">
            <div style="margin-bottom: 10px">
              <el-row>
                <el-col :span="8" class="title">地址</el-col>
                <el-col :span="16">{{ o.address }}</el-col>
              </el-row>
            </div>
            <div style="margin-bottom: 10px">
              <el-row>
                <el-col :span="8" class="title">电话号码</el-col>
                <el-col :span="16">{{ o.telephone }}</el-col>
              </el-row>
            </div>
            <div style="margin-bottom: 10px">
              <el-row>
                <el-col :span="8" class="title">账户状态</el-col>
                <el-col :span="16">
                  <el-switch
                    v-model="o.enabled"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    @change="switchStatus(o.id,o.enabled)"
                  />
                  <span v-if="o.enabled" style="color: green;margin-left: 5px">启用</span>
                  <span v-else style="color: red;margin-left: 5px">已禁用</span>
                </el-col>
              </el-row>
            </div>
            <div style="margin-bottom: 10px">
              <el-row>
                <el-col :span="8" class="title">创建时间</el-col>
                <el-col :span="16"><div>{{ formatLocalDate(o.gmtCreate) }}</div></el-col>
              </el-row>
            </div>
            <div style="margin-bottom: 10px">
              <el-row>
                <el-col :span="8" class="title">更新时间</el-col>
                <el-col :span="16"><div>{{ formatLocalDate(o.gmtModified) }}</div></el-col>
              </el-row>
            </div>
            <div style="margin-bottom: 10px">
              <el-row>
                <el-col :span="8" class="title">用户角色</el-col>
                <el-col :span="16">
                  <el-popover
                    placement="top"
                    width="300"
                    trigger="click"
                  >
                    <p v-if="!showRole(o.roles)">
                      无角色
                    </p>
                    <el-tag
                      v-for="tag in o.roles"
                      v-else
                      :key="tag.name"
                      style="margin-left: 10px;margin-bottom: 10px"
                      closable
                      type=""
                      @close="handleCloseTag(tag,o.roles,o.id)"
                    >
                      {{ tag.name }}
                    </el-tag>
                    <el-button slot="reference" type="text" size="medium" style="padding: 0">
                      查看角色
                    </el-button>
                  </el-popover>
                  <el-popover
                    ref="popover4"
                    placement="top"
                    width="350"
                    trigger="click"
                  >
                    <div>
                      <el-select v-model="addedRoles" multiple placeholder="请选择" style="width: 250px">
                        <el-option
                          v-for="item in filterRoleList"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id"
                        />
                      </el-select>
                      <el-button type="text" size="mini" @click="handleAddRole(o.id,o.roles)">确定</el-button>
                      <el-button type="text" size="mini" @click="closePopover">取消</el-button>
                    </div>
                    <el-button slot="reference" type="text" size="medium" style="padding: 0;margin-left: 10px" @click="filterRole(o.roles)">
                      添加角色
                    </el-button>
                  </el-popover>
                </el-col>
              </el-row>
            </div>
            <div style="margin-bottom: 10px">
              <el-row>
                <el-col :span="8" class="title">备注</el-col>
                <el-col :span="16">{{ o.remark }}</el-col>
              </el-row>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getAll, deleteById, addRelation, switchStatus } from '@/api/admin'
import { getAllRole } from '@/api/role'
import { formatLocalDate } from '@/utils/i-util'
import { deepClone } from '@/utils'
import {showLoading,hideLoading} from '@/utils/loading'
import { Message, MessageBox } from 'element-ui'

export default {
  name: 'SysAdmin',
  data() {
    return {
      searchName: '',
      cardData: [],
      data: [],
      listLoading: false,
      roleTag: [],
      roleList: [],
      filterRoleList: [],
      addedRoles: [],
      searchList: [],
      searchEntity: {}
    }
  },
  created() {
    this.getAll()
    this.getAllRole()
  },
  mounted() {

  },
  methods: {
    getAll() {
      getAll().then(resp => {
        showLoading()
        this.cardData = resp.result
        this.buildSearchList(this.cardData)
        this.data = this.cardData
        hideLoading()
      }).catch(error => {
        hideLoading()
      })
    },
    buildSearchList(data){
      this.searchList = []
      data.forEach(v=>{
        let temp ={}
        temp.value = v.name
        temp.id = v.id
        this.searchList.push(temp)
      })
    },
    getAllRole() {
      getAllRole().then(resp => {
        const roles = resp.result
        roles.forEach(v => {
          const role = {}
          role.id = v.id
          role.name = v.name
          this.roleList.push(role)
        })
      })
    },
    formatLocalDate(date) {
      return formatLocalDate(date)
    },
    showRole(roles) {
      return roles.length > 0
    },
    handleCloseTag(role, roles, aid) {
      MessageBox.confirm('确定要删除该角色吗', 'warning', {
        confirmButtonText: '确认删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteById(aid, role.id).then(resp => {
          roles.splice(roles.indexOf(role), 1)
          Message({
            message: resp.message,
            type: 'success',
            duration: 2 * 1000
          })
        })
      })
    },
    closePopover() {
      document.body.click()
    },
    filterRole(roles) {
      this.addedRoles = []
      this.filterRoleList = []
      const tempList = deepClone(this.roleList)
      roles.forEach(v => {
        tempList.forEach((v2, i) => {
          if (v.id === v2.id) {
            tempList.splice(i, 1)
            return
          }
        })
      })
      this.filterRoleList = tempList
    },
    handleAddRole(id, roles) {
      if (this.addedRoles.length < 0) {
        Message({
          message: '请选择要添加的角色',
          type: 'warning',
          duration: 2 * 1000
        })
        return
      }
      const adminRole = {}
      adminRole.aid = id
      adminRole.roleIds = []
      this.addedRoles.forEach(v => {
        adminRole.roleIds.push(v)
        const role = {}
        role.id = v
        role.name = this.getRoleNameById(role.id)
        roles.push(role)
      })
      addRelation(adminRole).then(resp => {
        Message({
          message: resp.message,
          type: 'success',
          duration: 2 * 1000
        })
      })
      document.body.click()
    },
    getRoleNameById(rid) {
      let name = ''
      this.roleList.forEach(v => {
        if (v.id === rid) {
          name = v.name
          return
        }
      })
      return name
    },
    switchStatus(id, enabled) {
      const status = {
        id: id,
        enabled: enabled
      }
      switchStatus(status).then(resp => {
        Message({
          message: resp.message,
          type: 'success',
          duration: 2 * 1000
        })
      })
    },
    querySearch(queryString, cb) {
      var searchList = this.searchList;
      var results = queryString ? searchList.filter(this.createFilter(queryString)) : searchList;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (s) => {
        return (s.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleSelect(item) {
      //可以选择使用搜索实体
      this.searchEntity = item
    },
    handleChange(){
     // alert('aaa')
      if(!this.searchName || this.searchName === ''){
        this.data = this.cardData
      }
    },
    handleSearch(){
      //alert(this.searchEntity.id +","+this.searchEntity.value)
      if(!this.searchName || this.searchName === ''){
        this.data = this.cardData
        return;
      }
      let searchData = []
      this.cardData.forEach(v=>{
        if(v.name.toLowerCase().indexOf(this.searchName.toLowerCase()) === 0){
          searchData.push(v)
        }
      })
     // console.log(searchData)
      this.data = searchData
    }

  }

}
</script>

<style scoped>
.app{
  margin-left: 20px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.box-card {
  width: 300px;
}
.title{
  color: #A3A3A3;
}
</style>
