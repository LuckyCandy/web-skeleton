<template>
    <div class="background">
        <div class="loginBox" v-loading="isLoading">
            <h2>Welcome</h2>

                <div class="item">
                    <input ref="teleRef" type="text" v-model="credentials.telephone" @input="telephoneInput">
                    <span v-show="!canSubmit.teleCorrect" class="err-tips">Type correct telephone number.</span>
                    <label :style="{color: canSubmit.teleCorrect ? '#03e9f4' : '#7bc3c5'}" for="">Telephone</label>
                </div>
                <div class="item">
                    <input ref="passRef" type="password" v-model="credentials.password" @input="passwordInput">
                    <span v-show="!canSubmit.passCorrect" class="err-tips">Password length: 6-15 characters.</span>
                    <label :style="{color: canSubmit.passCorrect ? '#03e9f4' : '#7bc3c5'}" for="">Password</label>
                </div>
                <button class="btn" @click="startLogin">Login
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import { useUserStore } from "~/store/user"
import { debounce } from 'lodash'
import { useRouter } from "vue-router";

const userStore = useUserStore()
const credentials = ref({ telephone: "", password: "" })
const reg = /^1[3-9]\d{9}$/;
const canSubmit = ref({ teleCorrect: false, passCorrect: false })
const teleRef = ref<any>(null)
const passRef = ref<any>(null)
const isLoading = ref(false)
const router = useRouter()

const telephoneInput = debounce(() => {
    if (credentials.value.telephone.length > 11) {
        credentials.value.telephone = credentials.value.telephone.substring(0, 11)
    }
    if (reg.test(credentials.value.telephone)) {
        canSubmit.value.teleCorrect = true
    } else {
        canSubmit.value.teleCorrect = false
    }
})

const passwordInput = debounce(() => {
    let passLength = credentials.value.password.length
    if (passLength <= 15 && passLength >= 6) {
        canSubmit.value.passCorrect = true
    } else {
        canSubmit.value.passCorrect = false
    }
})

const startLogin = () => {
    if (!canSubmit.value.teleCorrect) {
        teleRef.value.focus()
        return false
    }
    if (!canSubmit.value.passCorrect) {
        passRef.value.focus()
        return false
    }
    isLoading.value = true
    // userStore.login(credentials.value).then(() => {
    //     console.log("Login Ok!")
    // }).finally(() => isLoading.value = false)

    userStore.login(credentials.value)
    setTimeout(() => {
        isLoading.value = false
        router.push({path: '/'})
    }, 2500);
    
}
</script>

<style scoped>
input,
button {
    background: transparent;
    border: 0;
    outline: none;
}

.background {
    height: 100vh;
    background: linear-gradient(#141e30, #243b55);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    color: #7bc3c5;
}
.err-tips {
    text-align: right;
    display: block;
    height: 30px;
    color: rgb(90, 145, 158);
    margin-top: 10px;
}

.loginBox {
    width: 500px;
    height: 400px;
    background-color: #0c1622;
    margin: 100px auto;
    border-radius: 10px;
    box-shadow: 0 15px 25px 0 rgba(0, 0, 0, .6);
    padding: 40px;
    box-sizing: border-box;
}

h2 {
    text-align: center;
    color: aliceblue;
    margin-bottom: 30px;
    font-family: 'Courier New', Courier, monospace;
}

.item {
    height: 45px;
    border-bottom: 1px solid #fff;
    margin-bottom: 40px;
    position: relative;
}

.item input {
    width: 100%;
    height: 100%;
    color: #fff;
    padding-top: 20px;
    box-sizing: border-box;
    letter-spacing: 4px;
    font-size: 26px;
    text-align: center;
}

.item input:focus+label,
.item input:valid+label {
    top: 0px;
    font-size: 12px;
}

.item label {
    position: absolute;
    left: 0;
    top: 12px;
    transition: all 0.4s linear;
}

.btn {
    padding: 10px 20px;
    margin-top: 40px;
    color: #03e9f4;
    position: relative;
    overflow: hidden;
    text-transform: uppercase;
    letter-spacing: 2px;
    width: 150px;
}

.btn:hover {
    border-radius: 5px;
    color: #fff;
    background: #03e9f4;
    box-shadow: 0 0 5px 0 #03e9f4,
        0 0 25px 0 #03e9f4,
        0 0 50px 0 #03e9f4,
        0 0 100px 0 #03e9f4;
    transition: all 1s linear;
}

.btn>span {
    position: absolute;
}

.btn>span:nth-child(1) {
    width: 100%;
    height: 2px;
    background: -webkit-linear-gradient(left, transparent, #03e9f4);
    left: -100%;
    top: 0px;
    animation: line1 1s linear infinite;
}

@keyframes line1 {

    50%,
    100% {
        left: 100%;
    }
}

.btn>span:nth-child(2) {
    width: 2px;
    height: 100%;
    background: -webkit-linear-gradient(top, transparent, #03e9f4);
    right: 0px;
    top: -100%;
    animation: line2 1s 0.25s linear infinite;
}

@keyframes line2 {

    50%,
    100% {
        top: 100%;
    }
}

.btn>span:nth-child(3) {
    width: 100%;
    height: 2px;
    background: -webkit-linear-gradient(left, #03e9f4, transparent);
    left: 100%;
    bottom: 0px;
    animation: line3 1s 0.75s linear infinite;
}

@keyframes line3 {

    50%,
    100% {
        left: -100%;
    }
}

.btn>span:nth-child(4) {
    width: 2px;
    height: 100%;
    background: -webkit-linear-gradient(top, transparent, #03e9f4);
    left: 0px;
    top: 100%;
    animation: line4 1s 1s linear infinite;
}

@keyframes line4 {

    50%,
    100% {
        top: -100%;
    }
}
</style>
