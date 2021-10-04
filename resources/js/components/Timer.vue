<template>
    <div>
    <div  dir="ltr" class="text-right mt-4">
            <span class="time_char">{{ days }}</span>
            <span class="time_seperator">:</span>
            <span class="time_char">{{ h }}</span>
            <span class="time_seperator">:</span>
            <span class="time_char">{{ m }}</span>
            <span class="time_seperator">:</span>
            <span class="time_char">{{ s }}</span>
    </div>
    <div>
        <span class="time_name">ثانیه</span>
        <span class="time_name">دقیقه</span>
        <span class="time_name">ساعت</span>
        <span class="time_name">روز</span>

    </div>
    </div>
</template>

<script>
    export default {
        name: "Timer",
        data() {
            return {
                days: '',
                h: '',
                m: '',
                s: '',
                show_seconds: 0,
                kos:1
            }
        },
        props: ['seconds'],
        mounted() {
            this.show_seconds = this.seconds;
            this.timer();
            setInterval(this.timer, 1000);
        },
        methods: {
            timer: function () {
                let seconds = this.show_seconds;
                let days = Math.floor(seconds / 86400);
                this.days = days.toString().length == 1 ? '0' + days : days;
                let remain = seconds - (days * 86400);
                let h = Math.floor(remain / 3600);
                this.h = h.toString().length == 1 ? '0' + h : h;
                remain = remain - (h * 3600);
                let m = Math.floor(remain / 60);
                this.m = m.toString().length == 1 ? '0' + m : m;
                let s = remain - (m * 60);
                this.s = s.toString().length == 1 ? '0' + s : s;
                this.show_seconds = this.show_seconds - 1;
            }
        }
    }
</script>

<style scoped>
    .time_seperator {
        font-size: 1.5rem;
        color: #888;
        font-weight: 500;
    }

    .time_char {
        font-size: 1.8rem;
        color: #515151;
        font-weight: 500;
        display: inline-block;
        min-width: 35px;
    }
    .time_name{
        min-width: 41px;
        display: inline-block;
        text-align: center;
        font-size: 0.7rem;
        color: #807f7f;
    }
</style>
