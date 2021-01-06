<template>
    <div>

    </div>
</template>
<script>
export default {
    data() {
        return {
            BasicInfo:{},
            TSamplingReport:{},
            twoList:[],
        }
    },
    created() {
        
        this.getData()
    },
    methods: {
        async getData(){
            let form=sessionStorage.getItem("samplinginspection")
            const { data: res } = await this.$http.post('templatesController/getTemplatesByChooseIds' ,JSON.parse(form) )
            if (res.code !== "0010") return this.$message.error(res.msg)
            this.BasicInfo=res.data.BasicInfo
            this.TSamplingReport=res.data.TSamplingReport
            this.twoList=res.data.twoList
        }
    },
}
</script>
<style lang="less" scoped>

</style>
