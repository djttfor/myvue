<template>
  <div>
    <div style="margin-bottom:20px">
      文件类型:
      <a-select default-value="横幅图片" style="width: 120px" @change="handleSelectChange">
      <a-select-option :value="item.value" v-for="(item,index) in fileTypeList" :key="index">
        {{item.typeName}}
      </a-select-option>
    </a-select>
    </div>
    <image-list v-if="imgType<3" :imgType="imgType" :file-list="fileList" @handleChange="handleChange" @handleRemove="handleRemove"/>
    <file-list v-else :imgType="imgType" :file-list="fileList" @handleChange="handleChange" @handleRemove="handleRemove"/>
    <div style="margin-top: 30px">
      <div style="float: left">
        <a-pagination
          v-model="current"
          show-size-changer
          :page-size.sync="pageSize"
          :total="total"
          :showQuickJumper="true"
          :showSizeChanger="true"
          :pageSizeOptions="pageSizeOptions"
          @showSizeChange="onShowSizeChange"
          @change="onChange"
        />
      </div>
      <div style="float: left; line-height: 32px; margin-left: 20px">共{{ total }}条</div>
    </div>
  </div>
</template>

<script>
import fileList from './fileList.vue'
import imageList from './ImageList.vue'
import { selectPage , removeImg } from '@/api/upload'
export default {
  components: {
    imageList,
    fileList
  },

  data() {
    return {
      current: 1,
      pageSize: 5,
      total: 0,
      pageSizeOptions: ['5','10','20','50'],
      fileTypeList: [
        {typeName: '背景图片', value: 0},
        {typeName: '横幅图片', value: 1},
        {typeName: '其他图片', value: 2},
        {typeName: '非图片文件', value: 3},
      ],
      imgType: 1,
      fileList: [],
    }
  },
  created() {
    this.getList(this.current,this.pageSize);
  },
  methods: {
    onShowSizeChange(current, pageSize) {
      this.getList(current,pageSize)
      console.log(current, pageSize);
    },
    onChange(current, pageSize) {
      this.getList(current,pageSize)
       console.log(current, pageSize);
    },
    handleChange(fileList) {
      //this.getList(this.current,this.pageSize)
      this.fileList = fileList    
    },
    handleRemove(id){
      removeImg({id:id}).then(()=>{
        this.$message.success('删除成功')
      }).catch((error)=>{
        this.$message.error('删除失败')
      })
    },
    handleSelectChange(value) {
      this.imgType = value
      this.getList(this.current,this.pageSize)
      console.log(this.imgType);
    },
    getList(current,pageSize) {
      selectPage({ current: current, pageSize: pageSize, imgType: this.imgType})
        .then((resp) => {
          if(resp.success!=='1'){
            var models = resp.models
            this.fileList = []
            models.forEach(item =>{
              let image = {uid:item.id,name:item.imgName,status:'done',url:item.imgUrl}
              this.fileList.push(image)
            })
            this.total = resp.pageInfo.total
          }else{
            console.log("查询出错了")
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
}
</script>

<style lang="less" scoped>
.avatar-upload-wrapper {
  height: 200px;
  width: 100%;
}

.ant-upload-preview {
  position: relative;
  margin: 0 auto;
  width: 100%;
  max-width: 180px;
  border-radius: 50%;
  box-shadow: 0 0 4px #ccc;

  .upload-icon {
    position: absolute;
    top: 0;
    right: 10px;
    font-size: 1.4rem;
    padding: 0.5rem;
    background: rgba(222, 221, 221, 0.7);
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, 0.2);
  }

  .mask {
    opacity: 0;
    position: absolute;
    background: rgba(0, 0, 0, 0.4);
    cursor: pointer;
    transition: opacity 0.4s;

    &:hover {
      opacity: 1;
    }

    i {
      font-size: 2rem;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -1rem;
      margin-top: -1rem;
      color: #d6d6d6;
    }
  }

  img,
  .mask {
    width: 100%;
    max-width: 180px;
    height: 100%;
    border-radius: 50%;
    overflow: hidden;
  }
}
</style>
