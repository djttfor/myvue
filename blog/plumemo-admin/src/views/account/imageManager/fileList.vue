<template>
  <div>
    <div class="clearfix">
      <a-upload
        :action="uploadAction"
        :file-list="fileList"
        @preview="handlePreview"
        @change="handleChange"
        :remove="remove"
        :beforeUpload="handleBeforeUpload"
      >
        <div>     
          <a-button> <a-icon type="upload" /> Upload </a-button>
        </div>
      </a-upload>
      <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
        <img alt="example" style="width: 100%" :src="previewImage" />
      </a-modal>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    fileList: {
      type: Array,
      default() {
        return []
      },
    },
    imgType: {
        type: Number,
        default: 0
    },
  },
  data() {
    return {
      previewVisible: false,
      previewImage: '',
      uploadAction: '', 
    }
  },
  created() {
  },
  methods: {
    remove(file){
        this.$emit("handleRemove",file.uid);
    },
    handleCancel() {
      this.previewVisible = false
    },
    handlePreview (file) {
      this.previewImage = file.url || file.thumbUrl
      this.previewVisible = true
    },
    handleChange ({ fileList}) {
      this.$emit("handleChange",fileList);
    },
     onShowSizeChange(current, pageSize) {
      console.log(current, pageSize);
    },
    handleBeforeUpload(file) {
        this.uploadAction = '/api/blog/myImg/upload?imgType='+this.imgType
        const _3m = 1024*1024*3;
        let fileSize = file.size
        if(fileSize>_3m){
            this.$message.error('上传的文件大小不能超过3M')
            return false
        }
    }
  },
}
</script>

<style lang="less" scoped>
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
