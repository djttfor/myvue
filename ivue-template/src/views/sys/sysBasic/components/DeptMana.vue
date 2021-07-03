<template>
  <div>
    <el-row>
      <el-col :offset="1">
        <el-button style="margin-bottom: 10px" type="primary" @click="handleAdd()">添加部门</el-button>
      </el-col>
      <el-col v-for="o in deptData" :key="o.id" :span="7" :offset="1">
        <el-card class="box-card" style="margin-bottom: 10px">
          <div slot="header" class="clearfix">
            <span style="line-height: 30px">
              {{ o.name }}
            </span>
            <el-tooltip content="删除部门" placement="top" effect="light">
              <el-button type="danger" size="mini" icon="el-icon-delete" circle style="float: right;margin-left: 5px" @click="handleDelete(o.id)" />
            </el-tooltip>
            <el-tooltip content="编辑部门" placement="top" effect="light">
              <el-button type="primary" size="mini" icon="el-icon-edit" circle style="float: right;margin-left: 5px" @click="handleEdit(o)" />
            </el-tooltip>
          </div>
          <div>
            <el-popover
              placement="right"
              width="300"
              trigger="click"
            >
              <el-tree
                v-if="showDeptTree"
                ref="tree"
                :check-strictly="checkStrictly"
                :data="filterDeptTree"
                :props="defaultProps"
                :default-expanded-keys="defaultExpandedKeys"
                node-key="id"
                class="permission-tree"
              >
                <span slot-scope="{ node, data }" class="custom-tree-node">
                  <span>{{ node.label }}</span>
                  <span style="margin-left: 50px">
                    <el-button
                      type="text"
                      size="mini"
                      @click="() => appendDept(data)"
                    >
                      Add
                    </el-button>
                    <el-button
                      type="text"
                      size="mini"
                      @click="() => remove(data)"
                    >
                      Delete
                    </el-button>
                  </span>
                </span>
              </el-tree>
              <p v-else>
                无下属部门
                <el-button
                  type="text"
                  size="mini"
                  @click="handleAdd(o.id)"
                >
                  添加部门
                </el-button>
              </p>
              <el-button slot="reference" type="text" @click="handleDeptTree(o.id,deptTree)">下属部门</el-button>
            </el-popover>
          </div>
          <hr>
          <div>部门创建时间: {{ formatLocalDate(o.createDate) }}</div>
        </el-card>
      </el-col>
    </el-row>

    <div>
      <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'编辑部门':'添加部门'">
        <el-form ref="dataForm" :model="temp" :rules="rules" label-width="80px" label-position="left">
          <el-form-item v-show="dialogType==='edit'" label="ID">
            <el-input v-model="temp.id" disabled />
          </el-form-item>
          <el-form-item label="部门名称" prop="name">
            <el-input v-model="temp.name" placeholder="请输入部门名称" />
          </el-form-item>
          <el-form-item label="上级部门" prop="parentId">
            <el-select v-model="temp.parentId" class="filter-item" placeholder="请选择">
              <el-option v-for="item in deptList" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item label="是否启用" prop="enabled">
            <el-select v-model="temp.enabled" class="filter-item" placeholder="请选择">
              <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="创建时间" prop="createDate">
            <el-date-picker v-model="temp.createDate" type="datetime" placeholder="请选择更新创建时间" />
          </el-form-item>
          <el-form-item label="部门描述" prop="remark">
            <el-input
              v-model="temp.remark"
              :autosize="{ minRows: 2, maxRows: 4}"
              type="textarea"
              placeholder="请输入角色描述"
            />
          </el-form-item>
        </el-form>
        <div style="text-align:right;">
          <el-button type="danger" @click="dialogVisible=false">取消</el-button>
          <el-button type="primary" @click="dialogType==='edit'?updateDept(temp):addDept(temp)">
            {{ this.dialogType==='edit' ? '更新部门' : '添加部门' }}
          </el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getAllDept, getDeptDetail, updateDept, deleteDept, addDept } from '@/api/dept'
import { formatLocalDate } from '@/utils/i-util'
import { deepClone } from '@/utils'
import { Message, MessageBox } from 'element-ui'

export default {
  name: 'DeptMana',
  data() {
    return {
      deptData: [],
      deptDetail: {},
      deptTree: [],
      deptList: [],
      filterDeptTree: [],
      showDeptTree: true,
      listLoading: false,
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      defaultExpandedKeys: [],
      checkStrictly: false,
      dialogVisible: false,
      dialogType: 'edit',
      deleteIds: [],
      temp: {},
      rules: {
        name: [{ required: true, message: '必须要输入职称', trigger: 'blur' }],
        parentId: [{ required: true, message: '请选择上级部门', trigger: 'blur' }],
        createDate: [{ required: true, message: '需要输入创建时间', trigger: 'blur' }],
        enabled: [{ required: true, message: '需要设定是否启用', trigger: 'blur' }]
      },
      statusOptions: [
        { value: true, label: '启用' },
        { value: false, label: '未启用' }
      ]
    }
  },
  created() {
    this.getAllDept()
    this.getDeptDetail()
  },
  methods: {
    handleDelete(id) {
      MessageBox.confirm('确定要删除该部门吗', 'warning', {
        confirmButtonText: '确认删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteIds = []
        this.deleteIds.push(id)
        this.findChildId(this.deptData, id)
        deleteDept(this.deleteIds).then(resp => {
          this.deleteIds = []
          this.updatePage()
          Message({
            message: resp.message,
            type: 'success',
            duration: 2 * 1000
          })
        })
      })
    },
    findChildId(ids, id) {
      ids.forEach(v => {
        if (v.parentId === id) {
          this.deleteIds.push(v.id)
          this.findChildId(ids, v.id)
        }
      })
    },
    getAllDept() {
      getAllDept().then(resp => {
        this.listLoading = true
        this.deptData = resp.result
        this.generateDeptList()
        this.listLoading = false
      }).catch(error => {
        this.listLoading = false
      })
    },
    getDeptDetail() {
      getDeptDetail().then(resp => {
        const dept = resp.result
        const treeData = this.generateDeptTreeData(dept)
        this.deptTree.push(treeData)
      })
    },
    generateDeptTreeData(dept) {
      const deptData = {}
      deptData.id = dept.id
      deptData.label = dept.name
      deptData.children = []
      if (dept.children && dept.children.length > 0) {
        const deptChild = dept.children
        deptChild.forEach(value => {
          deptData.children.push(this.generateDeptTreeData(value))
        })
      }
      return deptData
    },
    formatLocalDate(date) {
      return formatLocalDate(date)
    },
    handleDeptTree(id, deptTree) {
      // 初始化
      this.showDeptTree = true
      this.filterDeptTree = []
      this.defaultExpandedKeys = []
      // 开始查找
      const dt = deptTree[0]
      if (dt.id === id) {
        // 最上层的部门
        this.filterDeptTree = dt.children
      } else {
        // 子部门查找
        const deptTree1 = this.handleChildDeptTree(id, dt.children)
        if (deptTree1.children && deptTree1.children.length > 0) {
          this.filterDeptTree = deptTree1.children
        } else {
          // 没找到
          this.showDeptTree = false
        }
      }
      if (this.filterDeptTree.length > 0) {
        this.defaultExpandedKeys.push(this.filterDeptTree[0].id)
      }
    },
    handleChildDeptTree(id, childTree) {
      let dt = {}
      // 判断有没有子节点
      if (childTree && childTree.length > 0) {
        // 遍历子节点
        for (let i = 0; i < childTree.length; i++) {
          const t = childTree[i]
          // id匹配则返回
          if (t.id === id) {
            dt = t
            break
          } else {
            // id不匹配，先往自己的子节点里面递归查找
            dt = this.handleChildDeptTree(id, t.children)
            // 如果找到则结束循环
            if (dt && dt.id) {
              break
            }
          }
        }
      }
      return dt
    },
    generateDeptList() {
      this.deptList = []
      const dept = { id: -1, name: '无' }
      this.deptList.push(dept)
      this.deptData.forEach(v => {
        const dept = {}
        dept.id = v.id
        dept.name = v.name
        this.deptList.push(dept)
      })
    },
    handleEdit(row) {
      this.dialogType = 'edit'
      this.dialogVisible = true
      this.temp = deepClone(row)
    },
    updateDept(data) {
      this.$refs['dataForm'].validate(vaild => {
        if (vaild) {
          updateDept(data).then(resp => {
            this.updatePage()
            this.dialogVisible = false
            Message({
              message: resp.message,
              type: 'success',
              duration: 2 * 1000
            })
          })
        }
      })
    },
    updatePage() {
      this.deptTree = []
      this.getAllDept()
      this.getDeptDetail()
    },
    handleAdd(pid) {
      this.temp = {
        id: '',
        name: '',
        parentId: pid,
        enabled: '',
        createDate: '',
        remark: ''
      }
      this.dialogType = 'add'
      this.dialogVisible = true
      this.temp.parentId = pid
    },
    addDept(row) {
      this.$refs['dataForm'].validate(vaild => {
        if (vaild) {
          addDept(row).then(resp => {
            this.updatePage()
            this.dialogVisible = false
            Message({
              message: resp.message,
              type: 'success',
              duration: 2 * 1000
            })
          })
        }
      })
    },
    remove(data) {
      this.handleDelete(data.id)
    },
    appendDept(data) {
      this.temp = {
        id: '',
        name: '',
        parentId: data.id,
        enabled: '',
        createDate: '',
        remark: ''
      }
      this.dialogType = 'add'
      this.dialogVisible = true
    }
  }
}
</script>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
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
</style>
