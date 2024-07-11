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
  import api from '../../../api/index';
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
        this.fileList = info.fileList
        console.log('this is uploadImg,this.fileList:',this.fileList)
        if(info.file.status == 'done'){
          this.fileUpload(info.file.originFileObj)
        }
      },
      beforeUpload(file) {
        const isLt3M = file.size / 1024 / 1024 < 3;
        if (!isLt3M) {
            this.$message.error('Image must smaller than 3MB!');
        }
        // return isJpgOrPng && isLt2M;
        return isLt3M;
      },
      async fileUpload(file) {
        let param = new FormData(); //创建form对象
        param.append('file', file); //通过append向form对象添加数据
        try {
          let res = await api.userInfo.fileUpload(param);
          console.log('this is upload file res', res)
          if(res.code == 200){
            let fileForm = {
              fileUrl: res.fileList[0].fileUrl,
              originalFilename: res.fileList[0].originalFilename
            }
            this.fileList = fileForm
            this.$emit('fileUploadSuccess', fileForm.fileUrl);
            // this.imgUrl = fileForm.fileUrl
            // console.log('-------------this is fileForm',fileForm)
            // console.log('this is fileList',this.fileList)
            this.$message.success(res.msg)
          }else{
            this.$message.error('图片上传失败')
          }
        } catch (error) {
          console.error('Upload failed:', error);
        }
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
  