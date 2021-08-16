<template>
    <div id="test">
        <p style="text-align: center; font-size: 72px; font-weight: bolder;">用户<br>欢迎你!!!</p>
        <button class="btn-back" @click="goTo()">返回登录</button>
    </div>
</template>
<script>
    export default {
        name: "test",
        methods: {
            goTo() {
                //直接跳转
                this.$router.push('/Login');
            }
        }
    }
</script>
<style>
    .btn-back {
        position: relative;
        left: 48%;
    }
</style>