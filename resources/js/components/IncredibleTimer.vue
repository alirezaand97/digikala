<template>
    <div class="timer_box" dir="ltr">
        <span class="fa fa-clock-o time_char"></span>
        <span class="time_char">{{ days }}</span>
        <span class="time_seperator">:</span>
        <span class="time_char">{{ h }}</span>
        <span class="time_seperator">:</span>
        <span class="time_char">{{ m }}</span>
        <span class="time_seperator">:</span>
        <span class="time_char">{{ s }}</span>

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
    .timer_box {
        width: 100%;
        text-align: left;
        padding-left: 14px;
    }

    .time_seperator {
        font-size: .7rem;
        line-height: 2;
        color: #737373;
    }

    .time_char {
        font-size: .7rem;
        line-height: 2;
        color: #737373;
    }
</style>
