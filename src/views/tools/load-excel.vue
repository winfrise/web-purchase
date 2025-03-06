<template>
    <div>
        <div class="card">
            <h3>加载Excel文件</h3>
        </div>
        <div class="card">
            <el-form label-width="100px" style="padding-right:50px;">
                <el-form-item label="上传计划表">
                <el-upload
                    accept=".xlsx"
                    drag
                    action=""
                    multiple
                    :before-upload="beforeUpload"
                >
                    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                    <div class="el-upload__text">
                    Drop file here or <em>click to upload</em>
                    </div>
                    
                </el-upload>
                </el-form-item>
            </el-form>
        </div>
        <div class="card">
            <div style=" word-wrap: break-word; word-break: normal; line-height: 1.5;"> {{result}}</div>
        </div>
    </div>

</template>

<script setup>
import {reactive, ref, computed} from "vue"
import {ElMessage} from "element-plus";
import loadExcel from "@/utils/loadExcel";

const result = ref("")
const beforeUpload = (rawFile) => {
  loadExcel(rawFile)
    .then(excelArray => {
        console.log(excelArray)
        result.value = JSON.stringify(excelArray)


        // 临时使用，可随时删
        const temp = excelArray.slice(1).map(item =>{
            return {
                supplier: item[0],
                name: item[1],
                UDID: item[2],
                cate: item[3]
            }
        })
        console.log(temp)
    })

  return false
}

</script>