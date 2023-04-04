<template>
  <div id="personalData">
    <van-nav-bar
      title="基本信息"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />

    <div class="form">
      <div class="formitem">
        <p>名字：</p>
        <div class="flex1">
          {{ name }}
        </div>
      </div>
      <div class="formitem">
        <p>目前职位：</p>
        <div class="flex1">
          {{ position }}
        </div>
      </div>

      <div class="formitem">
        <p>所属专业：</p>
        <div class="flex1">
          {{ rofessional }}
        </div>
      </div>
      <div class="formitem">
        <p>头像：</p>
        <div class="flex1">
          <img
            :src="image"
            alt="头像"
            style="height: 60px; width: 60px; border-radius: 50%"
          />
        </div>
        <van-uploader
          v-model="fileList"
          multiple
          accept="image/*"
          :after-read="afterRead"
        >
          <van-button type="info" size="mini">更新头像</van-button>
        </van-uploader>
      </div>
      <div class="formitem" v-show="new_img">
        <p>头像：</p>
        <div class="flex1">
          <img
            :src="image"
            alt="头像"
            style="height: 40px; width: 40px; border-radius: 50%"
          />
        </div>
      </div>

      <div class="formitem">
        <p>电话：</p>
        <div class="flex1">
          {{ phone }}
        </div>
        <van-button type="info" size="mini" @click="Phone" @blur="Np"
          >更换电话</van-button
        >
      </div>
      <div class="formitem" v-show="new_phone">
        <p>新电话：</p>
        <div class="flex1">
          <input type="text" v-model="NewPhone" placeholder="请输入新号码" />
        </div>
      </div>

      <div class="formitem">
        <p>邮箱：</p>
        <div class="flex1">
          {{ email }}
        </div>
        <van-button type="info" size="mini" @click="Email">更换邮箱</van-button>
      </div>
      <div class="formitem" v-show="new_email">
        <p>新邮箱：</p>
        <div class="flex1">
          <input type="email" v-model="NewEmail" placeholder="请输入新邮箱" />
        </div>
      </div>
      <div class="bottom">
        <van-button type="info" @click="submit">修改信息</van-button>
        <van-button @click="onClickLeft">返回</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import network from "@/network/index.js";
export default {
  data() {
    return {
      position: Cookies.get("position"),
      rofessional: Cookies.get("rofessional"),
      image: Cookies.get("image"),
      phone: Cookies.get("phone"),
      email: Cookies.get("email"),
      name: Cookies.get("name"),
      id: Cookies.get("id"),
      new_img: false,
      new_email: false,
      new_phone: false,
      fileList: [],
      files: [],
      NewEmail: "",
      NewPhone: "",
      Newimg: "",
      timer: 0,
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    Phone() {
      this.new_phone = true;
    },
    Email() {
      this.new_email = true;
    },
    Np() {
      let ZZ = /^[1]([3-9])[0-9]{9}$/;
      this.qweqe = "2131321"
      if (!ZZ.test(qweqe)) {
        this.$toast({
          message: "手机格式错误",
        });
      }
    },
    afterRead(fileObj) {
      // console.log(fileObj);
      // 上传状态
      fileObj.status = "uploading";
      // 状态提示
      fileObj.message = "上传中...";
      // 声明form表单数据
      const formData = new FormData();
      // 添加文件信息
      formData.append("files", fileObj.file);
      // 上传接口调用
      network
        .post("upload", formData)
        .then((res) => {
          // 上传成功
          fileObj.status = "done";
          // 存储返回数据
          fileObj.addInfo = res.data;
          this.files.push(fileObj.addInfo.data[0]);
          this.Newimg = this.files[0].path + "-" + this.files[0].originalname;
          console.log(this.Newimg);
          // console.log(fileObj.addInfo.data[0]);
          // console.log(fileObj.addInfo.data[0].path);
          // console.log(this.files[0].path);
        })
        .catch(() => {
          // 上传失败
          fileObj.status = "failed";
          // 失败状态提示
          fileObj.message = "上传失败";
        });
    },
    submit() {
      if (this.NewEmail == "") {
        this.NewEmail = Cookies.get("email");
      }
      if (this.NewPhone == "") {
        this.NewPhone = this.phone;
      }
      if (this.files == "") {
        this.Newimg = this.image;
      }
      console.log(this.NewEmail);
      console.log(this.NewPhone);
      console.log(this.Newimg);
      network
        .put(`updatedUser/${this.id}`, {
          phone: this.NewPhone,
          email: this.NewEmail,
          image: this.Newimg,
        })
        .then((data) => {
          console.log(data.data.status);
          if (data.data.status === 200) {
            this.$toast.success({
              message: "修改成功",
            });
            clearTimeout(this.timer); //清除延迟执行
            this.timer = setTimeout(() => {
              //设置延迟执行
              this.$router.go(0);
            }, 2000);
          }
        });
    },
  },
};
</script>

<style lang="less" scoped>
.form {
  width: 95%;
  margin: 20px auto;
  background: rgb(224, 224, 224);
  border-radius: 10px;
  overflow: hidden;
  .formitem {
    width: 90%;
    margin: 20px auto;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-items: center;
    .flex1 {
      flex: 1;
      input {
        width: 100%;
        padding: 10px;
      }
    }
  }
  .bottom {
    text-align: center;
    button {
      margin: 20px;
    }
  }
}
</style>
