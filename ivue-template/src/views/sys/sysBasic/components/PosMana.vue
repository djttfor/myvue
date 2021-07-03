<template>
  <div>
    <div>
      <div style="width: 240px;float: left">
        <el-input
          v-model="name"
          placeholder="请输入职位名称"
          suffix-icon="el-icon-plus"
        />
      </div>
      <div style="float: left;margin-left: 20px;margin-bottom: 20px">
        <el-button type="primary" @click="addPosition">添加职位</el-button>
        <el-button type="danger" @click="delSelected">删除选中的职位</el-button>
      </div>
    </div>
    <!--表格-->
    <div>
      <el-table
        v-loading="listLoading"
        :data="tableData"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="id" label="id" width="100" align="center" />
        <el-table-column prop="name" label="职位名称" width="300" align="center" />
        <el-table-column label="创建时间" width="300" align="center">
          <template slot-scope="{row}">
            {{ formatLocalDate(row.createDate) }}
          </template>
        </el-table-column>
        <el-table-column label="是否启用" width="300" align="center">
          <template slot-scope="{row}">
            <el-tag :type="row.enabled ? 'success' : 'danger'" effect="dark">
              {{ row.enabled ? '已启用' : '未启用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="{row}">
            <el-button type="primary" size="mini" @click="handleUpdate(row)">
              更新
            </el-button>
            <el-button type="danger" size="mini" @click="handleDelete(row.id)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--更新弹窗-->
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="80px" style="width: 400px; margin-left:50px;">
        <el-form-item label="ID">
          <el-input v-model="temp.id" type="text" disabled />
        </el-form-item>
        <el-form-item label="职位名称" prop="name">
          <el-input v-model="temp.name" type="text" />
        </el-form-item>
        <el-form-item label="创建时间" prop="createDate">
          <el-date-picker v-model="temp.createDate" type="datetime" placeholder="请选择更新创建时间" />
        </el-form-item>
        <el-form-item label="是否启用" prop="enabled">
          <el-select v-model="temp.enabled" class="filter-item" placeholder="请选择">
            <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          关闭
        </el-button>
        <el-button type="primary" @click="updatePosition">
          确定更新
        </el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { getAllPosition, addPosition, updatePosition, delPosition, delSelected } from '@/api/position'
import { MessageBox, Message } from 'element-ui'
import { formatLocalDate } from '@/utils/i-util'

export default {
  name: 'PosMana',
  data() {
    return {
      name: '',
      tableData: [],
      listLoading: false,
      dialogTitle: '更新',
      dialogFormVisible: false,
      temp: {
        id: undefined,
        name: '',
        createDate: '',
        enabled: true
      },
      rules: {
        name: [{ required: true, message: '必须要输入职称', trigger: 'blur' }],
        createDate: [{ required: true, message: '需要输入创建时间', trigger: 'blur' }],
        enabled: [{ required: true, message: '需要设定是否启用', trigger: 'blur' }]
      },
      multipleSelection: [],
      selectedIds: [],
      statusOptions: [
        { value: true, label: '已启用' },
        { value: false, label: '未启用' }
      ]
    }
  },
  created() {
    this.getAllPosition()
  },
  methods: {
    getAllPosition() {
      getAllPosition().then(resp => {
        this.listLoading = true
        this.tableData = resp.result
        this.listLoading = false
      }).catch(error => {
        this.listLoading = false
      })
    },
    addPosition() {
      if (this.name) {
        const position = {
          id: '',
          name: this.name,
          createDate: '',
          enabled: true
        }
        addPosition(position).then(resp => {
          this.getAllPosition()
          this.name = ''
          Message({
            message: resp.message,
            type: 'success',
            duration: 2 * 1000
          })
        })
      } else {
        Message({
          message: '请输入职位名称',
          type: 'warning',
          duration: 2 * 1000
        })
      }
    },
    handleUpdate(row) {
      this.dialogFormVisible = true
      this.temp.id = row.id
      this.temp.name = row.name
      this.temp.createDate = row.createDate
      this.temp.enabled = row.enabled
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updatePosition() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          updatePosition(this.temp).then(resp => {
            this.dialogFormVisible = false
            this.getAllPosition()
            this.$notify({
              title: 'Success',
              message: resp.message,
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(id) {
      MessageBox.confirm('确定要删除该职位吗', 'warning', {
        confirmButtonText: '确认删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delPosition(id).then(resp => {
          this.getAllPosition()
          Message({
            message: resp.message,
            type: 'success',
            duration: 2 * 1000
          })
        })
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
    delSelected() {
      if (!this.selectedIds.length > 0) {
        Message({
          message: '请勾选要删除的职位',
          type: 'info',
          duration: 2 * 1000
        })
        return
      }
      MessageBox.confirm('确定要删除选中的职位吗', 'warning', {
        confirmButtonText: '确认删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delSelected(this.selectedIds).then(resp => {
          this.selectedIds = []
          this.getAllPosition()
          Message({
            message: resp.message,
            type: 'success',
            duration: 2 * 1000
          })
        })
      })
    },
    formatLocalDate(date) {
      return formatLocalDate(date)
    }
  }
}
</script>

<style scoped>

</style>
