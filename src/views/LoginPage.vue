<template>
  <div class="login">
    <loading :active.sync="isLoading"></loading>
    <bus/>
    <div class="container">
      <form class="form" @submit.prevent="signin">
        <div class="logo-wrapper">
          <img class="logo" :src="foodPocketLogo" />
        </div>
        <h2 @click="back">FoodPocket</h2>
        <div class="group">
          <label for="user_id">帳號</label>
          <input type="text" id="user_id" placeholder="請輸入帳號" v-model="username" required/>
        </div>
        <div class="group">
          <label for="user_password">密碼</label>
          <input type="password" id="user_password" placeholder="請輸入密碼" v-model="password" required/>
        </div>
        <button type="submit" class="btn login-btn">登入</button>
        <div class="button-group">
          <a class="btn register-btn" @click.prevent="RegisterPage">還沒有帳號？去註冊</a>
          <a class="btn forget-btn" @click.prevent="forget">忘記密碼</a>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import bus from '@/components/bus.vue';
import foodPocketLogo from '@/assets/foodpocket_logo.svg';

export default {
  data() {
    return {
      foodPocketLogo,
      isLoading: false,
      username: '',
      password: '',
    };
  },
  computed: {
    infobus() {
      return this.$store.state.infobus;
    },
    dangerbus() {
      return this.$store.state.dangerbus;
    },
  },
  components: {
    bus,
  },
  methods: {
    back() {
      this.$router.push('/landingpage');
    },
    RegisterPage() {
      this.$router.push('/registerpage');
    },
    clear() {
      this.username = '';
      this.password = '';
    },
    forget() {
      this.$router.push('/forgetpasswordpage');
    },
    signin() {
      this.isLoading = true;
      const loadingMsgId = Math.floor(new Date() / 1000);
      this.$bus.$emit('message:show', '登入中...', loadingMsgId, this.infobus);
      const api = `${process.env.VUE_APP_APIPATH}api/rest/loginAccount/`;
      const formdata = new FormData();
      formdata.append('username', this.username);
      formdata.append('password', this.password);
      this.$http.post(api, formdata).then((response) => {
        // console.log(response.data)
        // this.isLoading = false
        if (response.data.result === 'successful') {
          const { token } = response.data.data;
          this.$cookies.set('token', token); // 放到cookies
          const pocket = response.data.data.last_pocket;
          const pocketid = pocket.pocket_uid;
          const pocketname = pocket.name;
          this.$cookies.set('getpocketid', pocketid); // 放到cookies
          this.$cookies.set('getpocketname', pocketname); // 放到cookies
          this.$cookies.set('username', this.username);
          this.$bus.$emit('message:remove', loadingMsgId);
          this.$router.push('/foodpocket');
          this.isLoading = false;
        } else {
          this.isLoading = false;
          this.$bus.$emit('message:remove', loadingMsgId);
          this.$bus.$emit('message:push', '帳號或密碼輸入錯誤，請再試一次', this.dangerbus);
          this.password = '';
        }
      }).catch((err) => {
        console.log(err);
        this.$bus.$emit('message:remove', loadingMsgId);
        this.$bus.$emit('message:push', '網路異常，請稍候再試', this.dangerbus);
      });
    },
  },
};
</script>

<style lang="scss" scoped>

* {
  margin: 0;
}

.login {
  min-height: 100vh;
  height: 100%;
  background-color: $outside-background;
  .container {
    margin: auto;
    padding-top: 50px;
    width: 90%;
    .form {
      width: 100%;
      color: #555;
      .logo-wrapper {
        width: 100%;
        height: 7rem;
        margin-bottom: 0vw;
        object-fit: contain;
        display: flex;
        align-items: center;
        justify-content: center;

        .logo {
          height: 100%;
        }
      }
      h2 {
        margin-bottom: 20px;
        padding-bottom: 20px;
        border-bottom: 1px solid #000;
        font-family: 'Monda', sans-serif;
      }
      h2:hover{
        cursor: pointer;
      }
      .group {
        margin-bottom: 20px;
        label {
          line-height: 3;
        }
        input {
          background-color: $word-background-dark;
          -webkit-appearance: none;
          font-size: 16px;
          width: 100%;
          border-radius: 25px;
          line-height: 2;
          outline: none;
          border: none;
          padding: 5px 15px;
        }
        input:focus {
          outline: none;
        }
        input::placeholder{
          color: $milk-white;
        }
      }
      .login-btn{
        background-color: $point-btn;
        color: $milk-white;
        width: 100%;
        margin-top: 50px;
        outline: none;
      }
      .btn:focus {
          outline: none;
      }.button-group {
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        .register-btn {
          margin-top: 20px;
          outline: none;
        }
        .forget-btn {
          margin-top: 20px;
          outline: none;
        }
      }
    }
  }
}
</style>
