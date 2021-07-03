<template>
  <div class="app-container">
    <el-button type="primary" @click="handleAddRole">添加新角色</el-button>
    <div>
      <el-table
        v-loading="listLoading"
        :data="tableData"
        border
        style="width: 100% ;margin-top: 30px"
      >
        <el-table-column label="角色key" width="220" align="center">
          <template slot-scope="{row}">
            <span>{{ row.code.substring(5,row.code.length) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="角色名称" width="220" align="center" />
        <el-table-column prop="remark" label="角色描述" align="header-center" />
        <el-table-column label="操作" align="center">
          <template slot-scope="{row}">
            <el-button type="primary" size="mini" @click="handleEdit(row)">
              编辑权限
            </el-button>
            <el-button type="danger" size="mini" @click="handleDelete(row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div>
      <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'编辑角色':'添加角色'">
        <el-form ref="dataForm" :model="role" :rules="rules" label-width="80px" label-position="left">
          <el-form-item label="角色key" prop="code">
            <el-input v-model="role.code" placeholder="请输入角色Key" />
          </el-form-item>
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="role.name" placeholder="请输入角色名称" />
          </el-form-item>
          <el-form-item label="角色描述" prop="remark">
            <el-input
              v-model="role.remark"
              :autosize="{ minRows: 2, maxRows: 4}"
              type="textarea"
              placeholder="请输入角色描述"
            />
          </el-form-item>
          <el-form-item label="Menus">
            <el-tree
              ref="tree"
              :check-strictly="checkStrictly"
              :data="routes"
              :props="defaultProps"
              :default-expanded-keys="defaultExpandedKeys"
              :default-checked-keys="defaultCheckedKeys"
              show-checkbox
              node-key="id"
              class="permission-tree"
            />
          </el-form-item>
        </el-form>
        <div style="text-align:right;">
          <el-button type="danger" @click="dialogVisible=false">取消</el-button>
          <el-button type="primary" @click="dialogType==='edit'?confirmRole(role):addRole(role)">
            {{ this.dialogType==='edit' ? '权限变更' : '添加角色' }}
          </el-button>
        </div>
      </el-dialog>
    </div>

  </div>
</template>

<script>
import { getAllRole, getMenuIdByRoleId, deleteRole, updatePermission, addRole } from '@/api/role'
import { deepClone } from '@/utils'
import { getMenu } from '@/api/menu'

export default {
  name: 'PermissionGroup',
  data() {
    return {
      role: {},
      roleCodeName: '',
      tableData: [],
      routes: [],
      listLoading: false,
      dialogVisible: false,
      checkStrictly: false,
      dialogType: 'new',
      defaultExpandedKeys: [1],
      defaultCheckedKeys: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      rules: {
        code: [{ required: true, message: '需要输入角色key', trigger: 'blur' }],
        name: [{ required: true, message: '需要输入角色名称', trigger: 'blur' }],
        remark: [{ required: true, message: '请输入角色描述', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getAllRole()
    this.getMenu()
  },
  methods: {
    getAllRole() {
      getAllRole().then(resp => {
        this.listLoading = true
        this.tableData = resp.result
        this.listLoading = false
      }).catch(error => {
        this.listLoading = false
      })
    },
    getMenu() {
      getMenu().then(resp => {
        const menu = resp.result
        const routes = this.generateRoutes(menu)
        this.routes.push(routes)
      })
    },
    generateRoutes(menu) {
      const route = {}
      route.id = menu.id
      route.label = menu.name
      route.children = []
      if (menu.children && menu.children.length > 0) {
        const menuChildren = menu.children
        menuChildren.forEach(value => {
          route.children.push(this.generateRoutes(value))
        })
      }
      return route
    },
    handleAddRole() {
      this.dialogType = 'add'
      this.dialogVisible = true
    },
    addRole(role) {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          const checkedKeys = this.$refs.tree.getCheckedKeys()
          const roleMenu = {
            rid: undefined,
            code: 'ROLE_' + role.code,
            name: role.name,
            remark: role.remark,
            addArr: checkedKeys,
            deleteArr: []
          }
          addRole(roleMenu).then(resp => {
            this.dialogVisible = false
            this.getAllRole()
            this.$message({
              type: 'success',
              message: resp.message
            })
          })
        }
      })
    },
    handleEdit(row) {
      this.dialogType = 'edit'
      this.dialogVisible = true
      this.role = deepClone(row)
      this.role.code = this.role.code.substring(5, this.role.code.length)
      this.$nextTick(() => {
        // 清空树的勾选
        this.$refs.tree.setCheckedKeys([])
        getMenuIdByRoleId(this.role.id).then(resp => {
          this.defaultCheckedKeys = resp.result
        })
      })
    },
    handleDelete(row) {
      this.$confirm('确定要删除这个角色吗?', 'Warning', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          await deleteRole(row.id)
          this.getAllRole()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(err => { console.error(err) })
    },
    confirmRole(role) {
      const checkedKeys = this.$refs.tree.getCheckedKeys()
      // 增加
      const addArr = this.getDiffArr(checkedKeys, this.defaultCheckedKeys)
      // 删除
      const deleteArr = this.getDiffArr(this.defaultCheckedKeys, checkedKeys)

      const roleMenu = {
        rid: role.id,
        code: 'ROLE_' + role.code,
        name: role.name,
        remark: role.remark,
        addArr: addArr,
        deleteArr: deleteArr
      }
      updatePermission(roleMenu).then(resp => {
        this.dialogVisible = false
        this.getAllRole()
        this.$message({
          type: 'success',
          message: resp.message
        })
      })
    },
    getDiffArr(arr1, arr2) {
      const arr = []
      let flag = true
      for (let i = 0; i < arr1.length; i++) {
        for (let j = 0; j < arr2.length; j++) {
          if (arr1[i] === arr2[j]) {
            flag = false
            break
          }
        }
        if (flag) {
          arr.push(arr1[i])
        }
        flag = true
      }
      return arr
    }

  }
}
</script>

<style scoped>

</style>
