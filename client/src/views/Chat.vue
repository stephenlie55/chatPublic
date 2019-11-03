<template>
  <div class="chatroom">
    <div v-if="isSignIn">
      <chatroom @logout="logout"/>
    </div>
    <div v-else>
      <div class="container">
        <div class="row" style="text-align: center; padding: 75px">
          <form @submit.prevent="signin" id="formLogin" style="margin-left: auto; margin-right: auto; margin-top: auto; margin-bottom: auto;">
              <h5><strong>CHIT</strong><i>Chat</i></h5>
              <br>
              <div class="form-group" style="width: 400px;">
                  <label for="name">Who are you?</label>
                  <input v-model="user" type="text" class="form-control" id="name" aria-describedby="nameHelp" placeholder="Evan You">
                  <small class="form-text text-muted" style="margin-top: 5px">Your name will be displayed on chatroom</small>
              </div>
              <button type="submit" class="btn btn-primary" style="margin-left: auto; margin-right: auto; background: #E9ECEF; color: black; border: #E9ECEF; left: 22px">Submit</button><br>
              <br>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import chatroom from '../components/chatroom.vue'
export default {
  components: {
    chatroom
  },
  data() {
    return {
      isSignIn: false,
      user: '',
    }
  },
  methods: {
    signin() {
      if (this.user == '') {
        localStorage.setItem('name', 'Anonymous')
        this.user = localStorage.getItem('name')
        this.isSignIn = true
        this.user = ''
      } else {
        localStorage.setItem('name', this.user)
        this.isSignIn = true
        this.user = ''
      }
    },
    logout() {
      localStorage.removeItem('name')
      this.isSignIn = false
      this.user = ''
    }
  },
  created() {
    if (localStorage.getItem('name')) {
      this.user = localStorage.getItem('name')
      this.isSignIn = true
    }
  }
}
</script>

