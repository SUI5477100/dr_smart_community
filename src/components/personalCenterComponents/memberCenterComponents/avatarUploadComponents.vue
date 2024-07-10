<template>
    <div class="clearfix">
      <a-upload
        action="https://smart-community.vnuo.com.cn:9926/file/cos/upload"
        list-type="picture-card"
        :file-list="fileList"
        :before-upload="beforeUpload"
        @preview="handlePreview"
        @change="handleChange"
      >
        <div v-if="fileList.length == 0">
          <a-icon type="plus" />
          <div class="ant-upload-text">
            上传
            <p class="img-size-tips">
                <slot></slot>
            </p>
          </div>
        </div>
      </a-upload>
      <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
        <img alt="example" style="width: 100%" :src="previewImage" />
      </a-modal>
    </div>
  </template>
  <script>
  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
  export default {
    props: {
      imgUrl: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        previewVisible: false,
        previewImage: '',
        fileList: [],
        file:{}
      };
    },
    watch: {
      imgUrl: {
        immediate: true,
        handler(newVal) {
          this.fileList = newVal ? [{
            uid: '-1',
            name: 'avatar.png',
            status: 'done',
            url: newVal,
          }] : [];
          console.log('fileList updated:', this.fileList);
        }
      }
    },
    methods: {
      handleCancel() {
        this.previewVisible = false;
      },
      async handlePreview(file) {
        if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj);
        }
        this.previewImage = file.url || file.preview;
        this.previewVisible = true;
      },
      handleChange(info) {
        this.fileList = info.fileList;
        console.log('this is uploadImg,this.fileList:',this.fileList)
        console.log('this is uploadImg,info.file:',info.file)
        if(info.file.status == 'done'){
          this.file = info.file
          console.log('-----------200------ info.file:',info.file)
          console.log('-------------------------',this.file)
        }
      },
      beforeUpload(file) {
        // const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        // if (!isJpgOrPng) {
        //     this.$message.error('You can only upload JPG file!');
        // }
        const isLt3M = file.size / 1024 / 1024 < 3;
        if (!isLt3M) {
            this.$message.error('Image must smaller than 3MB!');
        }
        // return isJpgOrPng && isLt2M;
        return isLt3M;
        }
    },
  };
  </script>
  <style>
  /* you can make up upload button and sample style by using stylesheets */
  .ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
  }
  
  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }
  .img-size-tips {
    font-size: 10px;
  }
  </style>
  