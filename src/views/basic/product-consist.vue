
<template>
    <div>

      <div class="card" style="margin-top: 10px;">
        <el-table
            :data="tableData"
            :span-method="objectSpanMethod"
            border
            style="width: 100%; height: 800px; overflow: auto; margin-top: 20px"
        >
            <el-table-column label="序号" type="index" width="80" fixed />
            <el-table-column label="产品型号" prop="product" width="180" />
            <el-table-column label="名称" prop="name" width="180" />
            <el-table-column label="供应商" prop="supplier" />
            <el-table-column label="UDID" prop="UDID" />
            <el-table-column label="备注" prop="remark" />
        </el-table>
      </div>

    </div>
  </template>
  
  <script setup>
  import {reactive, ref} from "vue"



  const rawProductConsist = {
    ES6FA: [
        { supplier: "沃森", name: "压溃支架",	UDID: "ES6F-13200-02"},
        { supplier: "泓川", name: "上盖支架",	UDID:"ES6F4-13100-02"},
        { supplier: "环驰",	name: "深沟球轴承",	UDID:"61804-2Z   C2级" },
        { supplier: "阿尔泰",	name: "内管柱筒工艺件", UDID: "ES6F-13100-01GY1", remark: "32*1.8*130" },
        { supplier: "阿尔泰",	name: "外管柱筒工艺件",	UDID: "ES6F-13200-01GY1", remark: "36*1.5*205" }
    ],
    ES6FB: [
        { supplier: "沃森", name: "压溃支架",	UDID: "ES6F-13200-02"},
        { supplier: "泓川", name: "上盖支架",	UDID: "ES6F4-13100-02"},
        { supplier: "环驰", name: "深沟球轴承",	UDID: "61804-2Z   C2级"},
        { supplier: "阿尔泰", name: "内管柱筒工艺件",	UDID: "ES6F-13100-01GY1", remark: "32*1.8*130"},
        { supplier: "阿尔泰", name: "外管柱筒工艺件",	UDID: "ES6F-13200-01GY1", remark: "36*1.5*205"}
    ],
    ES6FA2: [
        { supplier: "沃森", name: "压溃支架",	UDID: "ES6F-13200-02", remark:""},
        { supplier: "泓川", name: "上盖支架",	UDID: "ES6F4-13100-02", remark:""},
        { supplier: "环驰", name: "深沟球轴承",	UDID: "61804-2Z   C2级", remark:""},
        { supplier: "阿尔泰", name: "内管柱筒工艺件",	UDID: "ES6F-13100-01GY1", remark:"32*1.8*130"},
        { supplier: "阿尔泰", name: "外管柱筒工艺件",	UDID: "ES6F-13200-01GY1", remark:"36*1.5*205"}
    ],
    ES6FA3: [
        { supplier: "沃森", name: "管柱筒安装支架",	UDID: "ES6FA3-13100-02", remark:""},
        { supplier: "沃森", name: "线束焊接支架",	UDID: "ES6FA3-13100-03", remark:""},
        { supplier: "沃森", name: "上盖支架",	UDID: "ES6FA3-13100-04", remark:""},
        { supplier: "豫北转向", name: "组合安装块",	UDID: "ES6FA3-13000-01", remark:""},
        { supplier: "泓川", name: "输入端支架",	UDID: "ES5B4-13120-02", remark:""},
        { supplier: "温州益力标准件", name: "螺钉组合件",	UDID: "M4 * 10", remark:"2个"},
        { supplier: "环驰", name: "深沟球轴承",	UDID: "61804-2Z   C2级", remark:""},
        { supplier: "阿尔泰", name: "管柱筒工艺件",	UDID: "ES6FA3-13100-01GY1", remark:"34*2*240.5"}
    ],
    ES6FA5: [
        { supplier: "沃森", name: "管柱筒安装支架",	UDID: "ES6FA3-13100-02", remark:""},
        { supplier: "沃森", name: "线束焊接支架",	UDID: "ES6FA3-13100-03", remark:""},
        { supplier: "沃森", name: "上盖支架",	UDID: "ES6FA3-13100-04", remark:""},
        { supplier: "豫北转向", name: "组合安装块",	UDID: "ES6FA3-13000-01", remark:""},
        { supplier: "泓川", name: "输入端支架",	UDID: "ES5B4-13120-02", remark:""},
        { supplier: "温州益力标准件", name: "螺钉组合件",	UDID: "M4 * 10", remark:"2个"},
        { supplier: "环驰", name: "深沟球轴承",	UDID: "61804-2Z   C2级", remark:""},
        { supplier: "阿尔泰", name: "管柱筒工艺件",	UDID: "ES6FA3-13100-01GY1", remark:"34*2*240.5"}
    ],
    ES6MB:[
        { supplier: "亨阳", name: "角度调节支撑",	UDID: "ES6ZX-11110-04", remark:""},
        { supplier: "亨阳", name: "溃缩支架",	UDID: "ES6ZX-11110-03", remark:""},
        { supplier: "亨阳", name: "组合开关支架",	UDID: "ES10ZMA-13120-03", remark:""},
        { supplier: "沃森", name: "护罩焊接支架",	UDID: "ES10ZMA-11110-02", remark:""},
        { supplier: "环驰", name: "深沟球轴承",	UDID: "6004-2Z", remark:""},
        { supplier: "阿尔泰", name: "内管柱筒工艺件",	UDID: "ES6MB-11210-01", remark:"39*2*131"},
        { supplier: "阿尔泰", name: "外管柱筒工艺件",	UDID: "ES10ZMA-11110-01", remark:"45*2.5*202"}
    ],
    ESZ8HB2: [
     { supplier: "沃森", name: "角度调节支撑",	UDID: "ES8H-12100-03"},
     { supplier: "沃森", name: "组合开关支架",	UDID: "ES8H-12100-02"},
     { supplier: "沃森", name: "护罩焊接支架",	UDID: "ES8H-12100-04"},
     { supplier: "沃森", name: "小支架",	UDID: "ES8H-12100-05"},
     { supplier: "环驰", name: "深沟球轴承",	UDID: "61904-2Z   C2级导电"}
    ],


    ESZ8HB1: [
        { supplier: "沃森", name: "角度调节支撑",	UDID: "ES8H-12100-03"},
        { supplier: "沃森", name: "组合开关支架",	UDID: "ES8H-12100-02"},
        { supplier: "沃森", name: "护罩焊接支架",	UDID: "ES8H-12100-04"},
        { supplier: "沃森", name: "小支架",	UDID: "ES8H-12100-05"},
        { supplier: "环驰", name: "深沟球轴承",	UDID: "61904-2Z   C2级导电"}
    ],

    ES6ZD: [
        { supplier: "沃森", name: "角度调节支撑",	UDID: "ES8ZHC-12110-02"},
        { supplier: "泓川", name: "线束支架",	UDID: "ES8ZHC-12110-03"},
        { supplier: "沃森", name: "小支架",	UDID: "ES8H-12100-05"},
        { supplier: "环驰", name: "深沟球轴承",	UDID: "61904-2Z   C2级"},
        { supplier: "阿尔泰/山东聊城", name: "内管柱筒工艺件",	UDID: "ES8H-11400-02GY1", remark:"39.7*2.45*140"},
        { supplier: "阿尔泰", name: "外管柱筒工艺件",	UDID: "ES8ZHC-12110-01GY1", remark:"45*2*245.8"},
    ],

    ES11ZDC1: [
        { supplier: "阿尔泰/山东", name: "内管柱筒工艺件",	UDID: "ES11ZD-11600-02", remark:"38.1*2.45*132"}
    ],

    ES11ZDC: [
        { supplier: "阿尔泰/山东", name: "内管柱筒工艺件",	UDID: "ES11ZD-11600-02", remark:"338.1*2.45*132"}
    ],
    ES11ZD: [
        { supplier: "阿尔泰/山东", name: "内管柱筒工艺件",	UDID: "ES11ZD-11600-02", remark:"38.1*2.45*132"}
    ],
    ES10WTB: [
        { supplier: "泓川/沃森", name: "组合开关支架",	UDID: "ES3E1-13120-02"},
        { supplier: "沃森", name: "角度调节支撑",	UDID: "ES11ZTA-11110-02"},
        { supplier: "沃森", name: "限位焊接支架",	UDID: "ES6L1-13120-06"},
        { supplier: "豫北转向/人本", name: "深沟球轴承",	UDID: "ES6U-12100-01"},
        { supplier: "阿尔泰", name: "内管柱筒工艺件",	UDID: "ES10WTA-13000-01", remark:"39.1*2.15*124"},
        { supplier: "阿尔泰", name: "外管柱筒工艺件",	UDID: "ES11ZTA-11110-01GY1", remark:"44*2*238"},
    ],
    ES10WTA: [
        { supplier: "泓川/沃森", name: "组合开关支架",	UDID: "ES3E1-13120-02"},
        { supplier: "沃森", name: "角度调节支撑",	UDID: "ES6ZTC-11110-02"},
        { supplier: "沃森", name: "限位焊接支架",	UDID: "ES6L1-13120-06"},
        { supplier: "豫北转向/人本", name: "深沟球轴承",	UDID: "ES6U-12100-01"},
        { supplier: "阿尔泰", name: "内管柱筒工艺件",	UDID: "ES10WTA-13000-01", remark:"39.1*2.15*124"},
        { supplier: "阿尔泰", name: "外管柱筒工艺件",	UDID: "ES6ZTC-11110-01GY1", remark:"44*2*238"},
    ],



    ES11ZXC1: [
        { supplier: "阿尔泰/山东", name: "内管柱筒工艺件",	UDID: "ES8ZXK-11600-01", remark:"38.1*2.45*142"},
    ],



    ES10ZDE: [
        { supplier: "沃森", name: "组合开关支架",	UDID: "ES8D-11110-01"},
        { supplier: "宇盛", name: "轴承",	UDID: "ES8D-11100-01"},
        { supplier: "阿尔泰/山东聊城", name: "内管柱筒工艺件",	UDID: "ES8F-11110-01", remark:"38.25*3.525*231.5"},
    ],




ES10ZXB: [
    { supplier: "阿尔泰/山东", name: "内管柱筒工艺件",	UDID: "ES10ZL-12300-02", remark:"38.1*2*164"},
],



ES8ZXL: [
    { supplier: "阿尔泰/山东", name: "内管柱筒工艺件",	UDID: "ES8ZXK-11600-01", remark:"38.1*2.45*142"},
],




ES8ZXK: [
 { supplier: "阿尔泰/山东", name: "内管柱筒工艺件",	UDID: "ES8ZXK-11600-01", remark:"38.1*2.45*142"},
],


ES8ZXD: [
 { supplier: "阿尔泰/山东", name: "内管柱筒工艺件",	UDID: "ES8ZXD-11600-02", remark:"38.1*2.45*182"},
],



ES11ZXA: [
 { supplier: "阿尔泰/山东", name: "内管柱筒工艺件",	UDID: "ES11ZXA-11600-02", remark:"38.1*2.45*171.5"},
],



ES8ZXC: [
 { supplier: "阿尔泰/山东", name: "内管柱筒工艺件",	UDID: "ES11ZE-11600-02", remark:"38.1*2.45*142"},
],


ES6ZYA: [
    { supplier: "泓川/沃森", name: "线束固定支架",UDID: "ES6ZYA-13110-02"},
    { supplier: "沃森", name: "角度调节支撑",UDID: "ES6ZYA-13110-03"},
    { supplier: "泓川/沃森", name: "护罩焊接支架",UDID: "ES6ZYA-13110-04"},
    { supplier: "环驰", name: "深沟球轴承",UDID: "61905-2Z   C2级"},
    { supplier: "阿尔泰", name: "内管柱筒工艺件",UDID: "ES6ZYA-11600-02", remark:"9.7*2.45*114"},
    { supplier: "阿尔泰", name: "外管柱筒工艺件",UDID: "ES6ZYA-13110-01", remark:" 45*2*175.9"},
],


ES8ZXB: [
{ supplier: "沃森", name: "护罩焊接支架",UDID: "ES8ZXB-12110-04"},
{ supplier: "沃森", name: "角度调节支撑",UDID: "ES8ZXB-12110-03"},
{ supplier: "沃森", name: "组合开关支架",UDID: "ES8ZXB-12110-02"},
{ supplier: "环驰", name: "深沟球轴承",UDID: "61905-2Z   C2级"},
{ supplier: "阿尔泰/山东聊城", name: "内管柱筒工艺件",UDID: "ES8H-11400-02GY1", remark:"39.7*2.45*140"},
{ supplier: "阿尔泰", name: "外管柱筒工艺件",UDID: "ES8ZXB-12110-01GY1", remark:"45*2*225.7"},
],




ES10WXB: [
    { supplier: "泓川", name: "防翻转支架",UDID: "ES11ZDL1-12110-02"},
    { supplier: "沃森", name: "护罩焊接支架",UDID: "ES8ZXB-12110-04"},
    { supplier: "沃森", name: "角度调节支撑",UDID: "ES8ZXB-12110-03"},
    { supplier: "沃森", name: "组合开关支架",UDID: "ES8ZXB-12110-02"},
    { supplier: "环驰", name: "深沟球轴承",UDID: "61905-2Z   C2级"},
    { supplier: "阿尔泰", name: "内管柱筒工艺件",UDID: "ES11ZDL1-11600-01", remark:"39.7*2.45*140"},
    { supplier: "阿尔泰", name: "外管柱筒工艺件",UDID: "ES8ZXB-12110-01GY1", remark:"45*2*225.7"}
],




ES11WA5: [
{ supplier: "阿尔泰/山东", name: "内管柱筒工艺件",UDID: "ES11ZTC-12300-01GY1", remark:"38.1*2.45*137"}
],



ES11WA1: [
    { supplier: "阿尔泰/山东", name: "内管柱筒工艺件",UDID: "ES11ZTC-12300-01GY1", remark:"38.1*2.45*137"},
],




ES8ZTC1: [
{ supplier: "泓川/沃森", name: "组合开关支架",UDID: "ES3E1-13120-02"},
{ supplier: "泓川", name: "护罩焊接支架",UDID: "ES6ZTB-13110-02"},
{ supplier: "沃森", name: "角度调节支撑",UDID: "ES8ZTA1-11110-02"},
{ supplier: "豫北转向", name: "深沟球轴承",UDID: "16004   GB-2Z"},
{ supplier: "阿尔泰", name: "内管柱筒工艺件",UDID: "ES6ZGA-11600-02GY1", remark:"39.1*2.15*134.7"},
{ supplier: "阿尔泰", name: "外管柱筒工艺件",UDID: "ES6ZTB-13110-01GY1", remark:"44×2×209"},
],




ES8ZTC: [
{ supplier: "泓川/沃森", name: "组合开关支架",UDID: "ES3E1-13120-02"},
{ supplier: "泓川", name: "护罩焊接支架",UDID: "ES6ZTB-13110-02"},
{ supplier: "沃森", name: "角度调节支撑",UDID: "ES8ZTA1-11110-02"},
{ supplier: "豫北转向", name: "深沟球轴承",UDID: "16004   GB-2Z"},
{ supplier: "阿尔泰", name: "内管柱筒工艺件",UDID: "ES6ZGA-11600-02GY1", remark:"39.1*2.15*134.7"},
{ supplier: "阿尔泰", name: "外管柱筒工艺件",UDID: "ES6ZTB-13110-01GY1", remark:"44*2*209"},
],



ES8ZTB: [
 { supplier: "泓川/沃森", name: "组合开关支架",UDID: "ES3E1-13120-02"},
 { supplier: "泓川", name: "护罩焊接支架",UDID: "ES6ZTB-13110-02"},
 { supplier: "沃森", name: "角度调节支撑",UDID: "ES8ZTA1-11110-02"},
 { supplier: "豫北转向", name: "深沟球轴承",UDID: "16004   GB-2Z"},
 { supplier: "阿尔泰", name: "内管柱筒工艺件",UDID: "ES6ZGA-11600-02GY1", remark:"39.1*2.15*134.7"},
 { supplier: "阿尔泰", name: "外管柱筒工艺件",UDID: "ES6ZTB-13110-01GY1", remark:"44*2*209"},
],



ES10ZKA: [
    { supplier: "亨阳/泓川", name: "上支架",UDID: "ES4N-13120-03"},
    { supplier: "亨阳/泓川", name: "输入端支架",UDID: "ES4N-13120-02"},
    { supplier: "亨阳", name: "管柱筒安装支架",UDID: "ESZ6RA-13120-04"},
    { supplier: "豫北转向", name: "深沟球轴承",UDID: "ES2A-11220-01"},
    { supplier: "阿尔泰", name: "内管柱筒工艺件",UDID: "ES10ZKA-13110-01", remark:"32.1*2.05*128"},
    { supplier: "", name: "外管柱筒工艺件",UDID: "ES4N-13120-01", remark:"38*2.5*192"},
],




ES10ZTB: [
    { supplier: "泓川/沃森", name: "组合开关支架",UDID: "ES3E1-13120-02"},
    { supplier: "泓川", name: "护罩焊接支架",UDID: "ES6ZTB-13110-02"},
    { supplier: "沃森", name: "角度调节支撑",UDID: "ES8ZTA1-11110-02"},
    { supplier: "泓川", name: "防翻转支架",UDID: "ES11ZTB-13110-03"},
    { supplier: "豫北转向/人本", name: "深沟球轴承",UDID: "ES6U-12100-01"},
    { supplier: "阿尔泰", name: "内管柱筒工艺件",UDID: "ES11ZTB-11300-01GY1", remark:"39.1*2.15*165"},
    { supplier: "阿尔泰", name: "外管柱筒工艺件",UDID: "ES6ZTB-13110-01GY1", remark:"44*2*209"},
],



        ES10WTC: [
            { supplier: "泓川/沃森", name: "组合开关支架",UDID: "ES3E1-13120-02"},
            { supplier: "泓川", name: "护罩焊接支架",UDID: "ES6ZTB-13110-02"},
            { supplier: "沃森", name: "角度调节支撑",UDID: "ES8ZTA1-11110-02"},
            { supplier: "泓川", name: "防翻转支架",UDID: "ES11ZTB-13110-03"},
            { supplier: "豫北转向/人本", name: "深沟球轴承",UDID: "ES6U-12100-01"},
            { supplier: "阿尔泰", name: "内管柱筒工艺件",UDID: "ES10WTA-13000-01", remark:"39.1*2.15*124"},
            { supplier: "阿尔泰", name: "外管柱筒工艺件",UDID: "ES6ZTB-13110-01GY1", remark:"44×2×209"},
        ],




        ES10ZLD: [
            { supplier: "沃森", name: "冲压上盖",UDID: "ES11WB-12300-01", remark:""},
            { supplier: "山东聊城", name: "内管柱筒工艺件",UDID: "ES10ZLD-12300-01", remark:"38.1*2*150"},
        ],

		
		  


        ES11ZG1: [
            { supplier: "阿尔泰/山东	", name: "内管柱筒工艺件",UDID: "ES11ZG-J904", remark:"38.1*2.45*140"}
        ],

		


        ES8ZAD: [
            { supplier: "阿尔泰", name: "内管柱筒工艺件",UDID: "ES8ZAG-11600-02", remark:"38.1*3.55*162"},
        ],

			


        'ES8ZAG-J501': [
            { supplier: "阿尔泰", name: "内管柱筒工艺件",UDID: "ES8ZAG-11600-02", remark:"38.1*3.55*162"}
        ],





        ES10ZMB: [
            { supplier: "亨阳/沃森", name: "角度调节支撑",UDID: "ES6ZX-11110-04", remark:""},
            { supplier: "亨阳/沃森", name: "溃缩支架",UDID: "ES6ZX-11110-03", remark:""},
            { supplier: "亨阳/泓川", name: "组合开关支架",UDID: "ES10ZMA-13120-03", remark:""},
            { supplier: "沃森", name: "护罩焊接支架",UDID: "ES10ZMA-11110-02", remark:""},
            { supplier: "沃森", name: "冲压上盖",UDID: "ES11WB-12300-01", remark:""},
            { supplier: "环驰", name: "深沟球轴承",UDID: "6004-2Z", remark:""},
            { supplier: "山东聊城", name: "内管柱筒工艺件",UDID: "ES10ZPA-12300", remark:"39.13*2.5*144.5"},
            { supplier: "阿尔泰", name: "外管柱筒工艺件",UDID: "ES10ZMA-11110-01", remark:"45*2.5*202"},
        ],





        ES10ZMA: [
            { supplier: "亨阳/沃森", name: "角度调节支撑",UDID: "ES6ZX-11110-04", remark:""},
            { supplier: "亨阳/沃森", name: "溃缩支架",UDID: "ES6ZX-11110-03", remark:""},
            { supplier: "亨阳/泓川", name: "组合开关支架",UDID: "ES10ZMA-13120-03", remark:""},
            { supplier: "沃森", name: "护罩焊接支架",UDID: "ES10ZMA-11110-02", remark:""},
            { supplier: "沃森", name: "冲压上盖",UDID: "ES11WB-12300-01", remark:""},
            { supplier: "环驰", name: "深沟球轴承",UDID: "6004-2Z", remark:""},
            { supplier: "山东聊城", name: "内管柱筒工艺件",UDID: "ES10ZPA-12300", remark:"39.13*2.5*144.5"},
            { supplier: "阿尔泰", name: "外管柱筒工艺件",UDID: "ES10ZMA-11110-01", remark:"45*2.5*202"},
        ],





        ES10ZRA: [
            { supplier: "亨阳/沃森", name: "角度调节支撑",UDID: "ES6ZX-11110-04", remark:""},
            { supplier: "亨阳/沃森", name: "护罩焊接支架",UDID: "ES6ZX-11110-02", remark:""},
            { supplier: "亨阳/沃森", name: "溃缩支架",UDID: "ES6ZX-11110-03", remark:""},
            { supplier: "环驰", name: "深沟球轴承",UDID: "61904-2Z   C2级", remark:""},
            { supplier: "阿尔泰", name: "内管柱筒工艺件",UDID: "ES11ZB-11600-02", remark:"39.1*2.15*116"},
            { supplier: "阿尔泰", name: "外管柱筒工艺件",UDID: "ES6ZX-11110-01", remark:"44.9*2.45*213.75"},
        ],



                
        'ES6ZX1-J402': [
            { supplier: "亨阳/沃森", name: "角度调节支撑",UDID: "ES6ZX-11110-04", remark:""},
            { supplier: "亨阳/沃森", name: "护罩焊接支架",UDID: "ES6ZX-11110-02", remark:""},
            { supplier: "亨阳/沃森", name: "溃缩支架",UDID: "ES6ZX-11110-03", remark:""},
            { supplier: "环驰", name: "深沟球轴承",UDID: "61904-2Z   C2级", remark:""},
            { supplier: "阿尔泰", name: "内管柱筒工艺件",UDID: "ES8ZTA1-13000-02GY1", remark:"39.1*2.15*129.7"},
            { supplier: "阿尔泰", name: "外管柱筒工艺件",UDID: "ES6ZX-11110-01", remark:"44.9*2.45*213.75"},
        ],




        ES11WMA: [
            { supplier: "沃森", name: "组合开关支架",UDID: "ES8WN-13120-02", remark:""},
            { supplier: "沃森", name: "线束焊接支架",UDID: "ES8WN-13120-05", remark:""},
            { supplier: "亨阳/沃森", name: "角度调节支撑",UDID: "ES6D-11220-04", remark:""},
            { supplier: "泓川", name: "上支架",UDID: "ES6D1-13200-03", remark:""},
            { supplier: "环驰", name: "深沟球轴承",UDID: "6004-2Z", remark:""},
            { supplier: "阿尔泰", name: "内管柱筒工艺件",UDID: "ES11ZFE-11300-01", remark:"40*2.6*122.8"},
            { supplier: "阿尔泰", name: "外管柱筒工艺件",UDID: "ES8WH-13120-01GY1", remark:"46*2*197"},
        ],

        ES6KA: [
            { supplier: "泓川", name: "上盖支架",UDID: "ES4K-13110-02", remark:""},
            { supplier: "泓川", name: "上支架",UDID: "ES4F-13120-02", remark:""},
            { supplier: "泓川", name: "前支架",UDID: "ES4F-13120-04", remark:""},
            { supplier: "沃森", name: "管柱筒安装支架",UDID: "ES4K-13120-03", remark:""},
            { supplier: "沃森", name: "压溃片",UDID: "ES6D-11320-03", remark:"2个"},          
            { supplier: "环驰", name: "深沟球轴承",UDID: "6903-2Z   C2级", remark:""},              
            { supplier: "阿尔泰", name: "内管柱筒工艺件",UDID: "ES4K-13110-01GY1", remark:"34*1.8*134"},  
            { supplier: "阿尔泰", name: "外管柱筒工艺件",UDID: "ES4K-13120-01GY1", remark:"38*1.5*209"},  
        ],
        ES6L4: [
            { supplier: "泓川", name: "组合开关支架",	UDID: "ES4L-13120-02", remark:""},    
            { supplier: "沃森", name: "弹簧安装支架",	UDID: "ES4L(JL)-13120-04", remark:""},
            { supplier: "沃森", name: "角度调节支撑",	UDID: "ES4L-13120-03", remark:""},
            { supplier: "沃森", name: "护罩支架",	UDID: "ES4LB1-11110-05", remark:""},
            { supplier: "沃森", name: "左仪表支架",	UDID: "ES4LB1-11110-03", remark:""},
            { supplier: "泓川", name: "中仪表支架",	UDID: "ES4LB1-11110-02", remark:""},
            { supplier: "沃森", name: "右仪表支架",	UDID: "ES4LB1-11110-04", remark:""},
            { supplier: "温州益力标准件", name: "四方焊接螺母",	UDID: "M6-4.8级", remark:"2个"},
            { supplier: "豫北转向", name: "深沟球轴承",	UDID: "ES6E-13000-01", remark:""},
            { supplier: "阿尔泰", name: "内管柱筒工艺件",	UDID: "ES6L4-11600-02GY1", remark:"40.2*1.75*117"},
            { supplier: "阿尔泰", name: "外管柱筒工艺件",	UDID: "ES4LB1-11110-01", remark:"45*2*212"},		                   
        ]

    }
  
    const localProductConsist = localStorage.getItem('product-consist')
    if (!localProductConsist) {
        localStorage.setItem('product-consist', JSON.stringify(rawProductConsist))
    }

   
    const tableData = ref([])
    const productConsist = JSON.parse(localStorage.getItem('product-consist'))
    tableData.value =Object.keys(productConsist).map(key=> {
        return productConsist[key].map((item, index) => {
            const rowspan = index === 0 ? productConsist[key].length : 0
            const colspan = index === 0 ? 1 : 0
            return {...item, product: key, rowspan , colspan}
        })
    }).flat()
     
    const objectSpanMethod = ({ row, column, rowIndex, columnIndex}) => {
        if ([0,1].includes(columnIndex)) {
            return {
                rowspan: row.rowspan,
                colspan: 1,

            }
        }
    }


  
  </script>
  
  
  
  <style scoped>
  
  </style>