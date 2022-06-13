<template>
    <div>
        <h1>数据统计</h1>
        <div id="man" style="width: 1000px; height:600px"></div>
    </div>
</template>


<script>
    export default {
        data() {
            return {
                options: {}
            }
        },
        methods: {
            render() {
                this.$axios.get("reports/type/1").then(res => {
                    console.log(res);
                    this.options = res.data.data
                })
            },
            getLine() {
                let myChart = this.$echarts.init(document.getElementById("man"));
                myChart.setOption(this.options);
            }
        },
        created() {
            this.render()
        },
        watch: {
            options: {
                handler() {
                    this.getLine();
                },
                deep: true,
            }
        },
    }
</script>