<template>
  <div>
    <el-row>
      <el-col :span="16" :offset="4">
        <div style="text-align: center">
          <el-button type="" :disabled="curPageNum == 1" @click="prePage" size="small" icon="el-icon-arrow-left" >上一页</el-button>
          <el-button type="" :disabled="curPageNum === 2 ? true : false" @click="nextPage" size="small" >下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
        </div>
        <div class="pdf">
          <pdf
            ref="pdf"
            :src="pdfUrl"
            :page="pageNum"
            :rotate="pageRotate"
            @progress="loadedRatio = $event"
            @page-loaded="pageLoaded($event)"
            @num-pages="pageTotalNum=$event"
            @error="pdfError($event)"
            @link-clicked="page = $event">
          </pdf>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import pdf from 'vue-pdf'
  export default {
    name: "AboutMe",
    components:{
      pdf
    },
    data(){
      return {
        pdfUrl:"http://localhost:9999/siji/ly.pdf",
        pageNum:1,
        pageTotalNum:1,
        pageRotate:0,
        // 加载进度
        loadedRatio:0,
        curPageNum:0,
      }
    },
    methods:{
      prePage(){
        var p = this.pageNum
        p = p>1?p-1:this.pageTotalNum
        this.pageNum = p
      },
      nextPage(){
        var p = this.pageNum
        p = p<this.pageTotalNum?p+1:1
        this.pageNum = p
      },
      pageLoaded(e){
        this.curPageNum = e
      },
      pdfError(error){
        console.error(error)
      },
      pdfPrintAll(){
        this.$refs.pdf.print()
      },
      pdfPrint(){
        this.$refs.pdf.print(100,[1,2])
      },
    }
  }
</script>

<style scoped>

</style>
