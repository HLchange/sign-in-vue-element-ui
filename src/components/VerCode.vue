<template>

    <canvas id="canvas" :width="canvas_clientWidth" :height="canvas_clientHeight" @click="refresh"
        ref="canvas"></canvas>

</template>

<script>
    export default {
        name: "verCode",
        data() {
            return {
                show_num: [], //装验证码的数组
                canvas_clientWidth: 98,
                canvas_clientHeight: 40,
            }
        },
        methods: {
            //产生随机颜色
            randomColor() {
                var r = Math.floor(Math.random() * 256);
                var g = Math.floor(Math.random() * 256);
                var b = Math.floor(Math.random() * 256);
                return "rgb(" + r + "," + g + "," + b + ") "
            },

            //获取随机数
            ranNum(m, n) {
                if (m > n) {
                    return n + parseInt(Math.random() * (m - n))
                } else {
                    return m + parseInt(Math.random() * (n - m))
                }
            },

            //画布
            draw(show_num) {
                let canvas = this.$refs.canvas //画布对象
                this.canvas_clientWidth = canvas.clientWidth//画布长度
                this.canvas_clientHeight = canvas.clientHeight //画布长度

                let context = canvas.getContext("2d")//画布环境 创建 context 对象：

                canvas.width = this.canvas_clientWidth
                canvas.height = this.canvas_clientHeight

                this.drawVerCode(context, show_num)
                this.drawPoints(context)
                this.drawline(context)
            },

            //生成随机验证码
            drawVerCode(context, show_num) {
                let str = "A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0,q,w,e,r,t,y,u,i,o,p,a,s,d,f,g,h,j,k,l,z,x,c,v,b,n,m";
                let astr = str.split(',');//分割字符串形成数组
                let sLength = astr.length;//数组长度

                for (let i = 0; i <= 3; i++) {
                    let j = this.ranNum(0, sLength) //随机索引
                    let deg = (this.ranNum(0, 30) * Math.PI) / 180 //0-30随机弧度
                    let text = astr[j] //随机字符
                    show_num[i] = text//验证码字符数组
                    let x = 10 + i * 20//x坐标
                    let y = 20 + Math.random() * 8 //y坐标
                    //位移 旋转角度 颜色 文字 样式开始位置
                    context.font = 'bold 23px 微软雅黑'
                    context.translate(x, y);
                    context.rotate(deg);
                    context.fillStyle = this.randomColor();
                    context.fillText(text, 0, 0)
                    context.rotate(-deg)
                    context.translate(-x, -y)
                }
            },

            //绘制干扰点
            drawPoints(context) {
                //验证码显示小点
                for (let i = 0; i <= 50; i++) {
                    context.strokeStyle = this.randomColor()//设置随机色用小点的颜色
                    context.beginPath();//开始一条路径
                    let m = this.ranNum(0, this.canvas_clientWidth)
                    let n = this.ranNum(0, this.canvas_clientHeight)
                    context.moveTo(m, n)//移动
                    context.lineTo(m + 1, n + 1);//添加一个新点，然后在画布中创建从该点到最后指定点的线条
                    context.stroke();//画上面定义好的路径
                }
            },

            //绘制干扰线
            drawline(context) {
                //验证码显示线条
                for (let i = 0; i < 5; i++) {
                    context.strokeStyle = this.randomColor()
                    context.beginPath()
                    context.moveTo(
                        this.ranNum(0, this.canvas_clientWidth),
                        this.ranNum(0, this.canvas_clientHeight)
                    )
                    context.lineTo(
                        this.ranNum(0, this.canvas_clientWidth),
                        this.ranNum(0, this.canvas_clientHeight)
                    )
                    context.stroke()
                }
            },

            //点击刷新
            refresh() {
                this.draw(this.show_num)
                this.$emit('getcodehandler', this.show_num.join(''))
                console.log(this.show_num)
            },
        },
        mounted() {
            this.refresh()
        },
    }

</script>
<style scoped>
    #canvas {
        vertical-align: middle;
        box-sizing: border-box;
        border: 1px solid rgb(173, 168, 168);
        cursor: pointer;
        position: absolute;
        bottom: 0;
    }
</style>