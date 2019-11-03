<template>
    <div>
        <div style="margin: 5px auto; margin-left: auto; margin-right: auto">
                <h5>Welcome back! <strong>{{user}}</strong></h5>
        </div>
        <div id="chatbox" style="border: solid black 2px; padding: 10px; border-radius: 5px; width: 400px; height: 400px; margin-left: auto; margin-right: auto; overflow-y: scroll;">
            <div class="card" style="width: 100%; margin-bottom: 10px" v-for="(message, index) in messages" :key="index">
                <div class="card-body d-flex justify-content-between">
                    <div style="text-align: left; width: 70%">
                        <h6 class="card-subtitle mb-2 text-muted">{{message.sender}}: </h6>
                        <p class="card-text" style="width: 100%">{{message.content}}</p>
                        <small class="card-text text-muted">{{message.date}}</small>
                    </div>
                    <div class="d-flex align-items-center">
                        <img :src="'https://api.adorable.io/avatars/70/'+message.sender+'.png'" style="border-radius: 50px">
                    </div>
                </div>
            </div>   
        </div>
        <form class="col d-flex" style="position: relative; margin: 0 auto; margin-top: 2px; bottom: 0px; width: 430px">
            <input type="text" class="form-control" v-model="message" placeholder="Your message. . .">
            <input type="submit" value="send" style="border-radius: 5px" @click.prevent="sendMessage">
        </form><br>
        <input type="button" value="Logout" style="border-radius: 5px" @click.prevent="logout">
    </div>
</template>

<script>
export default {
    data() {
        return {
            socket: io.connect('http://localhost:3000'),
            user: '',
            message: '',
            messages : [],
        }
    },
    methods: {
        sendMessage() {
            const d = new Date()
            var hr = d.getHours();
            var min = d.getMinutes();
            if (min < 10) {
                min = "0" + min;
            }
            var ampm = "am";
            if( hr > 12 ) {
                hr -= 12;
                ampm = "pm";
            }
            this.socket.emit('sendMessage', {
                content: this.message,
                sender: this.user,
                date: `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}, ${hr}:${min} ${ampm}`
            })
            this.message = ''
        },
        logout() {
            this.$emit('logout')
            this.socket.emit('logout', navigator.userAgent, this.user)
        }
    },
    created() {
        if (localStorage.getItem('name')) {
            this.user = localStorage.getItem('name')
            this.socket.on('info', (info) => {
                console.log(info)     
                this.socket.emit('newClient', navigator.userAgent, this.user);   
            })
            this.socket.on('getMessages', (messages) => {
                this.messages = messages
            })
        }
    }
}
</script>

<style>

</style>
