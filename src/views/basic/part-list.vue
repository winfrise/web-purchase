
<template>
  <div>
    <div class="card">
      高正产品
    </div>
    <div class="card" style="margin-top: 10px;">

      <el-table border
        :data="partList"
        style="width: 100%; margin-bottom: 20px; height: 1000px;"
      >
        <el-table-column type="index" label="序号" width="60" />
        <el-table-column prop="name" label="产品名称" />
        <el-table-column prop="UDID" label="产品型号" />
        <el-table-column prop="supplier" label="供应商" />
      </el-table>
    </div>


  </div>
</template>

<script setup>
import {ref} from "vue"

const rawPartList = [
    {
        "supplier": "高正自加工",
        "name": "支架1",
        "UDID": "ES3E-11221-01",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "支架2",
        "UDID": "ES3E-11221-02",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "安装支架",
        "UDID": "ES3M1-13100-03",
        "cate": "冲压件"
    },
    {
        "supplier": "孝中",
        "name": "上盖支架",
        "UDID": "ES3L-13100-04",
        "cate": "冲压件"
    },
    {
        "supplier": "泓川",
        "name": "输入端支架",
        "UDID": "ES3L-13100-02",
        "cate": "冲压件"
    },
    {
        "supplier": "泓川",
        "name": "上盖支架",
        "UDID": "ES4K1-13100-04",
        "cate": "冲压件"
    },
    {
        "supplier": "泓川",
        "name": "焊接支架",
        "UDID": "ES4K4-13100-05",
        "cate": "冲压件"
    },
    {
        "supplier": "泓川",
        "name": "安装支架",
        "UDID": "ES4K4-13100-03",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "管柱筒安装支架",
        "UDID": "ES4Q-11110-02",
        "cate": "冲压件"
    },
    {
        "supplier": "泓川",
        "name": "线束支架",
        "UDID": "ES4Q-11110-03",
        "cate": "冲压件"
    },
    {
        "supplier": "泓川",
        "name": "护罩支架",
        "UDID": "ES4Q-11110-04",
        "cate": "冲压件"
    },
    {
        "supplier": "王亚磊",
        "name": "输入端支架",
        "UDID": "ES8B-130000-02",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "角度调节支撑",
        "UDID": "ES4T-11100-02",
        "cate": "冲压件"
    },
    {
        "supplier": "泓川",
        "name": "线束支架",
        "UDID": "ES4S-11110-03",
        "cate": "冲压件"
    },
    {
        "supplier": "泓川",
        "name": "角度调节支撑",
        "UDID": "ES4S-11110-02",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "组合开关支架",
        "UDID": "ES4S-11110-02",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "角度调节支撑",
        "UDID": "ES6NA4-13120-02",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "上盖支架",
        "UDID": "ES6NA4-13110-02",
        "cate": "冲压件"
    },
    {
        "supplier": "泓川",
        "name": "控制器安装板",
        "UDID": "ES6F-32000-02",
        "cate": "冲压件"
    },
    {
        "supplier": "泓川",
        "name": "线束焊接支架",
        "UDID": "ES4L-32000-02",
        "cate": "冲压件"
    },
    {
        "supplier": "泓川",
        "name": "管柱筒安装支架",
        "UDID": "ES4F-13120-03",
        "cate": "冲压件"
    },
    {
        "supplier": "泓川",
        "name": "上盖支架",
        "UDID": "ES4K-13110-02",
        "cate": "冲压件"
    },
    {
        "supplier": "泓川",
        "name": "上支架",
        "UDID": "ES4F-13120-02",
        "cate": "冲压件"
    },
    {
        "supplier": "泓川",
        "name": "前支架",
        "UDID": "ES4F-13120-04",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "管柱筒安装支架",
        "UDID": "ES4K-13120-03",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "压溃片",
        "UDID": "ES6D-11320-03",
        "cate": "冲压件"
    },
    {
        "supplier": "泓川",
        "name": "上盖支架",
        "UDID": "ES4FA-13000-02",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "管柱筒安装支架",
        "UDID": "ES6F5-13100-01",
        "cate": "冲压件"
    },
    {
        "supplier": "孝中",
        "name": "上盖支架",
        "UDID": "ES5B-13100-02",
        "cate": "冲压件"
    },
    {
        "supplier": "泓川",
        "name": "安装支架",
        "UDID": "ES5B-13120-04",
        "cate": "冲压件"
    },
    {
        "supplier": "泓川",
        "name": "输入端支架",
        "UDID": "ES5B-13120-02",
        "cate": "冲压件"
    },
    {
        "supplier": "泓川",
        "name": "小支架",
        "UDID": "ES5B-13120-03",
        "cate": "冲压件"
    },
    {
        "supplier": "泓川",
        "name": "小支架",
        "UDID": "ES5B-13120-03",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "上盖支架",
        "UDID": "ES6TD-13120-05",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "线束支架",
        "UDID": "ES6TD-13120-02",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "管柱筒安装支架",
        "UDID": "ES6TD-13120-02",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "护罩支架",
        "UDID": "ES6TD-13120-03",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "管柱筒安装支架",
        "UDID": "ES6FA3-13100-02",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "线束焊接支架",
        "UDID": "ES6FA3-13100-03",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "上盖支架",
        "UDID": "ES6FA3-13100-04",
        "cate": "冲压件"
    },
    {
        "supplier": "豫北转向",
        "name": "组合安装块",
        "UDID": "ES6FA3-13000-01",
        "cate": "冲压件"
    },
    {
        "supplier": "泓川",
        "name": "输入端支架",
        "UDID": "ES5B4-13120-02",
        "cate": "冲压件"
    },
    {
        "supplier": "高正",
        "name": "传感器安装支架",
        "UDID": "ES6ZRB-13120-02",
        "cate": "冲压件"
    },
    {
        "supplier": "泓川",
        "name": "防翻转支架",
        "UDID": "ES11ZDL1-12110-02",
        "cate": "冲压件"
    },
    {
        "supplier": "庚利",
        "name": "上盖支架",
        "UDID": "ES6TC-13100-03",
        "cate": "冲压件"
    },
    {
        "supplier": "泓川",
        "name": "安装支架",
        "UDID": "ES6TC-13100-02",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "管柱筒安装支架",
        "UDID": "ES7WKA-13120-03",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "上盖支架",
        "UDID": "ES4F-13110-02",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "上盖支架",
        "UDID": "ES5D-11300-02",
        "cate": "冲压件"
    },
    {
        "supplier": "泓川/沃森",
        "name": "组合开关支架",
        "UDID": "ES3E1-13120-02",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "角度调节支撑",
        "UDID": "ES5D-13120-03",
        "cate": "冲压件"
    },
    {
        "supplier": "泓川",
        "name": "护罩焊接支架",
        "UDID": "ES5D4-13110-02",
        "cate": "冲压件"
    },
    {
        "supplier": "亨阳/泓川",
        "name": "上支架",
        "UDID": "ES4N-13120-03",
        "cate": "冲压件"
    },
    {
        "supplier": "亨阳/泓川",
        "name": "输入端支架",
        "UDID": "ES4N-13120-02",
        "cate": "冲压件"
    },
    {
        "supplier": "亨阳",
        "name": "管柱筒安装支架",
        "UDID": "ESZ6RA-13120-04",
        "cate": "冲压件"
    },
    {
        "supplier": "泓川",
        "name": "护罩焊接支架",
        "UDID": "ES6ZTB-13110-02",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "角度调节支撑",
        "UDID": "ES8ZTA1-11110-02",
        "cate": "冲压件"
    },
    {
        "supplier": "泓川",
        "name": "上盖支架",
        "UDID": "ES6L2-11300-02",
        "cate": "冲压件"
    },
    {
        "supplier": "泓川",
        "name": "上盖支架",
        "UDID": "ES6L3-11300-02",
        "cate": "冲压件"
    },
    {
        "supplier": "孝中",
        "name": "上盖支架",
        "UDID": "ES6F-13100-02",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "压溃支架",
        "UDID": "ES6F-13200-02",
        "cate": "冲压件"
    },
    {
        "supplier": "泓川",
        "name": "上盖支架",
        "UDID": "ES6F4-13100-02",
        "cate": "冲压件"
    },
    {
        "supplier": "泓川",
        "name": "线束焊接支架",
        "UDID": "ES6E7-11110-02",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "角度调节支撑",
        "UDID": "ES6E7-11110-03",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "组合开关支架",
        "UDID": "ES6E7-13110-04",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "上盖支架",
        "UDID": "ES6E7-13100-02-J901",
        "cate": "冲压件"
    },
    {
        "supplier": "泓川",
        "name": "上盖支架",
        "UDID": "ES6N1-11310-01",
        "cate": "冲压件"
    },
    {
        "supplier": "泓川",
        "name": "线束支架",
        "UDID": "ES4A-13110-03GY2",
        "cate": "冲压件"
    },
    {
        "supplier": "泓川",
        "name": "控制器安装板",
        "UDID": "ES6F-32000-02",
        "cate": "冲压件"
    },
    {
        "supplier": "泓川",
        "name": "角度调节支撑",
        "UDID": "ES4E1-13120-01",
        "cate": "冲压件"
    },
    {
        "supplier": "泓川",
        "name": "护罩焊接支架",
        "UDID": "ES4E1-13120-02",
        "cate": "冲压件"
    },
    {
        "supplier": "泓川",
        "name": "护罩焊接支架",
        "UDID": "ES4E-13120-03",
        "cate": "冲压件"
    },
    {
        "supplier": "泓川",
        "name": "安装支架",
        "UDID": "ES4E-13120-02",
        "cate": "冲压件"
    },
    {
        "supplier": "泓川",
        "name": "线束支架3",
        "UDID": "ES4E-13120-04",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "组合开关支架",
        "UDID": "ESZ6HA-13110-02",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "角度调节支撑",
        "UDID": "ESZ6HA-13110-03",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "护罩焊接支架1",
        "UDID": "ESZ6HA-13110-04",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "护罩焊接支架2",
        "UDID": "ESZ6HA-13110-05",
        "cate": "冲压件"
    },
    {
        "supplier": "泓川",
        "name": "上盖支架",
        "UDID": "ES6E6-13120-02",
        "cate": "冲压件"
    },
    {
        "supplier": "玮鑫",
        "name": "垫块",
        "UDID": "ES6E5-13110-05",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "管柱筒安装支架",
        "UDID": "ES6E5-13110-02",
        "cate": "冲压件"
    },
    {
        "supplier": "亨阳",
        "name": "角度调节支撑",
        "UDID": "ES11ZYB-11110-02",
        "cate": "冲压件"
    },
    {
        "supplier": "亨阳",
        "name": "护罩支架",
        "UDID": "ES11ZYB-11110-04",
        "cate": "冲压件"
    },
    {
        "supplier": "亨阳",
        "name": "锁筒",
        "UDID": "ES11ZYB-11110-05",
        "cate": "冲压件"
    },
    {
        "supplier": "亨阳",
        "name": "加厚板",
        "UDID": "ES11ZYB-11110-06",
        "cate": "冲压件"
    },
    {
        "supplier": "亨阳",
        "name": "整车线束支架",
        "UDID": "ES11ZYB-11110-03",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "冲压上盖",
        "UDID": "ES10ZY-11110-04-J403",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "角度调节支撑",
        "UDID": "ES10ZY-11110-02-J403",
        "cate": "冲压件"
    },
    {
        "name": "锁筒",
        "UDID": "ES10ZY-11110-03-J403",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "管柱筒安装支架",
        "UDID": "ES10ZLE-13110-02",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "组合开关支架",
        "UDID": "ES10ZLE-13110-03",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "管柱筒安装支架",
        "UDID": "ES10ZLC-13110-02",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "组合开关支架",
        "UDID": "ES10ZLC-13110-03",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "管柱锁支架",
        "UDID": "ES10ZLC-13110-04",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "护罩支架",
        "UDID": "ES10ZLC-13110-05",
        "cate": "冲压件"
    },
    {
        "supplier": "泓川",
        "name": "线束支架",
        "UDID": "ERB3L-00000-09-J402",
        "cate": "冲压件"
    },
    {
        "supplier": "亨阳/沃森",
        "name": "角度调节支撑",
        "UDID": "ES6ZX-11110-04",
        "cate": "冲压件"
    },
    {
        "supplier": "亨阳/沃森",
        "name": "护罩焊接支架",
        "UDID": "ES6ZX-11110-02",
        "cate": "冲压件"
    },
    {
        "supplier": "亨阳/沃森",
        "name": "溃缩支架",
        "UDID": "ES6ZX-11110-03",
        "cate": "冲压件"
    },
    {
        "supplier": "亨阳/泓川",
        "name": "组合开关支架",
        "UDID": "ES10ZMA-13120-03",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "护罩焊接支架",
        "UDID": "ES10ZMA-11110-02",
        "cate": "冲压件"
    },
    {
        "supplier": "泓川",
        "name": "上盖支架",
        "UDID": "ES6B-13100-05",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "组合开关支架",
        "UDID": "ES6V-13110-02",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "角度调节支撑",
        "UDID": "ES6V-13110-03",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "车锁支架",
        "UDID": "ES6V-13110-04",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "角度调节支撑",
        "UDID": "ES8ZV-11110-03",
        "cate": "冲压件"
    },
    {
        "supplier": "泓川",
        "name": "组合开关支架",
        "UDID": "ES10ZVA-11110-01",
        "cate": "冲压件"
    },
    {
        "supplier": "泓川",
        "name": "护罩焊接支架",
        "UDID": "ES8ZV-11110-04",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "角度调节支撑",
        "UDID": "ES6ZTC-11110-02",
        "cate": "冲压件"
    },
    {
        "supplier": "泓川/沃森",
        "name": "线束固定支架",
        "UDID": "ES6ZYA-13110-02",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "角度调节支撑",
        "UDID": "ES6ZYA-13110-03",
        "cate": "冲压件"
    },
    {
        "supplier": "泓川/沃森",
        "name": "护罩焊接支架",
        "UDID": "ES6ZYA-13110-04",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "上盖支架",
        "UDID": "ES6TB-13100-03",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "护罩焊接支架1",
        "UDID": "ES6TB-13100-05",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "护罩卡片",
        "UDID": "ES6TB-13000-01",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "角度调节支撑",
        "UDID": "ES6TB-13100-02",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "护罩焊接支架2",
        "UDID": "ES6TB-13100-06",
        "cate": "冲压件"
    },
    {
        "supplier": "泓川",
        "name": "护罩焊接支架3",
        "UDID": "ES6TB-13100-07",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "组合开关支架",
        "UDID": "ES6TB-13100-04",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "组合开关支架",
        "UDID": "ES6PA-11110-02",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "护罩安装支架",
        "UDID": "ES6PA-11110-03",
        "cate": "冲压件"
    },
    {
        "supplier": "泓川",
        "name": "线束支架1",
        "UDID": "ES6PA-11110-04",
        "cate": "冲压件"
    },
    {
        "supplier": "泓川",
        "name": "线束支架2",
        "UDID": "ES6PA-11110-05",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "弹簧安装支架",
        "UDID": "ES6PA-11110-06",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "角度调节支撑",
        "UDID": "ES6PA-11110-07",
        "cate": "冲压件"
    },
    {
        "supplier": "自加工",
        "name": "点火锁套筒",
        "UDID": "ES6FA1-12100-02-J011",
        "cate": "冲压件"
    },
    {
        "supplier": "孝中",
        "name": "组合开关支架",
        "UDID": "ES6FA1-12100-01-J003",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "管柱筒安装支架",
        "UDID": "ES6FA1-12100-02-J003",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "护罩安装支架",
        "UDID": "ES6FA1-12100-03-J003",
        "cate": "冲压件"
    },
    {
        "supplier": "孝中",
        "name": "上盖支架",
        "UDID": "ES6FA1-12100-04-J003",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "组合开关支架",
        "UDID": "ES6CA-13120-03",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "管柱筒安装支架",
        "UDID": "ES6CA-13120-02",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "线束支架",
        "UDID": "ES6CA-13120-04",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "前安装支架",
        "UDID": "ES6CA-13111-01",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "护罩焊接支架",
        "UDID": "ES6ZCB-13120-02",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "护罩焊接支架",
        "UDID": "ES8ZTA1-11110-03",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "组合开关支架",
        "UDID": "ES8ZTA1-11110-04",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "组合开关支架",
        "UDID": "ES8D-11110-01",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "管柱筒安装支架",
        "UDID": "ES7A1-11100-01",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "护罩支架",
        "UDID": "ES7A1-11100-02",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "线束焊接支架",
        "UDID": "ES8H-14200-03",
        "cate": "冲压件"
    },
    {
        "supplier": "泓川",
        "name": "组合开关支架",
        "UDID": "ES4L-13120-02",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "弹簧安装支架",
        "UDID": "ES4L(JL)-13120-04",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "角度调节支撑",
        "UDID": "ES4L-13120-03",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "护罩支架",
        "UDID": "ES4LB1-11110-05",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "左仪表支架",
        "UDID": "ES4LB1-11110-03",
        "cate": "冲压件"
    },
    {
        "supplier": "泓川",
        "name": "中仪表支架",
        "UDID": "ES4LB1-11110-02",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "右仪表支架",
        "UDID": "ES4LB1-11110-04",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "护罩焊接支架",
        "UDID": "ES8ZBE-13110-02",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "角度调节支撑",
        "UDID": "ES8ZBE-13110-03",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "角度调节支撑",
        "UDID": "ES8ZPA-11100-02",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "整车线束支架2",
        "UDID": "ES8ZPA-11100-03",
        "cate": "冲压件"
    },
    {
        "supplier": "泓川",
        "name": "整车线束支架3",
        "UDID": "ES8ZPA-11100-04",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "角度调节支撑",
        "UDID": "ES8ZAE-11110-02-J904",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "组合开关支架",
        "UDID": "ES8ZAE-11110-03-J904",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "护罩焊接支架",
        "UDID": "ES8ZAE-11110-04-J904",
        "cate": "冲压件"
    },
    {
        "supplier": "黄亚祥",
        "name": "时钟弹簧安装座套",
        "UDID": "ES8ZV1-13100-02",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "组合开关安装支架",
        "UDID": "ES8ZV1-13100-03",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "管柱筒安装支架",
        "UDID": "ES8ZV1-13100-01",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "前安装支架",
        "UDID": "ES8ZV1-10000-01",
        "cate": "冲压件"
    },
    {
        "supplier": "高正自加工",
        "name": "联轴器",
        "UDID": "ES8ZV1-00000-01",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "上支架",
        "UDID": "ES8N-13120-04",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "上盖支架",
        "UDID": "ES8N-13110-02",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "角度调节支撑",
        "UDID": "ES8N-13120-03",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "组合开关支架",
        "UDID": "ES8WN-13120-02",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "线束焊接支架",
        "UDID": "ES8WN-13120-05",
        "cate": "冲压件"
    },
    {
        "supplier": "亨阳/沃森",
        "name": "角度调节支撑",
        "UDID": "ES6D-11220-04",
        "cate": "冲压件"
    },
    {
        "supplier": "泓川",
        "name": "上支架",
        "UDID": "ES6D1-13200-03",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "角度调节支撑",
        "UDID": "ES8ZHC-12110-02",
        "cate": "冲压件"
    },
    {
        "supplier": "泓川",
        "name": "线束支架",
        "UDID": "ES8ZHC-12110-03",
        "cate": "冲压件"
    },
    {
        "supplier": "孝中",
        "name": "组合开关支架固定板",
        "UDID": "ES8ZXA-13110-04",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "角度调节支撑",
        "UDID": "ES8ZXA-13110-03",
        "cate": "冲压件"
    },
    {
        "supplier": "泓川",
        "name": "护罩焊接支架",
        "UDID": "ES8ZXA-13110-02",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "护罩焊接支架",
        "UDID": "ES8ZXB-12110-04",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "角度调节支撑",
        "UDID": "ES8ZXB-12110-03",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "组合开关支架",
        "UDID": "ES8ZXB-12110-02",
        "cate": "冲压件"
    },
    {
        "supplier": "泓川",
        "name": "上盖支架",
        "UDID": "ES8M-13000-02",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "组合开关支架",
        "UDID": "ESZ8MA-12110-02",
        "cate": "冲压件"
    },
    {
        "supplier": "泓川",
        "name": "护罩焊接支架",
        "UDID": "ESZ8MA-12110-03",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "角度调节支撑",
        "UDID": "ES8H-12100-03",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "组合开关支架",
        "UDID": "ES8H-12100-02",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "护罩焊接支架",
        "UDID": "ES8H-12100-04",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "小支架",
        "UDID": "ES8H-12100-05",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "角度调节支撑",
        "UDID": "ES11ZC-12110-02",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "线束固定支架",
        "UDID": "ES11ZC-12110-03",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "溃缩支架",
        "UDID": "ES11ZC-12110-04",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "护罩固定支架",
        "UDID": "ES11ZC-12110-05",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "角度调节支撑",
        "UDID": "ES11ZTA-11110-02",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "限位焊接支架",
        "UDID": "ES6L1-13120-06",
        "cate": "冲压件"
    },
    {
        "supplier": "泓川",
        "name": "防翻转支架",
        "UDID": "ES11ZTB-13110-03",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "冲压上盖",
        "UDID": "ES11WB-12300-01",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "冲压上盖",
        "UDID": "ES10ZXE-12300-01",
        "cate": "冲压件"
    },
    {
        "supplier": "亨阳",
        "name": "转线束支架",
        "UDID": "ES10ZXP1-12300-03",
        "cate": "冲压件"
    },
    {
        "supplier": "泓川",
        "name": "线束支架",
        "UDID": "ES10ZXB3-12300-03",
        "cate": "冲压件"
    },
    {
        "supplier": "亨阳",
        "name": "转接线束支架",
        "UDID": "ES10ZXB4-12300-03-J501",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "管柱筒安装支架",
        "UDID": "ES11ZFD-11110-02-J201",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "护罩支架",
        "UDID": "ES11ZFD-11110-03-J201",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "管柱筒安装支架",
        "UDID": "ES11ZYA-14100-01",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "角度调节支架",
        "UDID": "ES11ZYA-14100-02",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "线卡固定支架",
        "UDID": "IRB120-00000-01",
        "cate": "冲压件"
    },
    {
        "supplier": "沃森",
        "name": "角度调节支撑",
        "UDID": "ES11ZFA-12110-02",
        "cate": "冲压件"
    },
    {
        "supplier": "泓川",
        "name": "线束焊接支架",
        "UDID": "ES11ZFA-12110-03",
        "cate": "冲压件"
    },
    {
        "supplier": "泓川",
        "name": "护罩焊接支架",
        "UDID": "ES11ZFA-12110-04",
        "cate": "冲压件"
    },
    {
        "supplier": "阿尔泰/余姚",
        "name": "内管柱筒工艺件",
        "UDID": "ES6F-13100-01GY1",
        "cate": "管子"
    },
    {
        "supplier": "阿尔泰",
        "name": "内管柱筒工艺件",
        "UDID": "ES6ZRC-11600-01GY1",
        "cate": "管子"
    },
    {
        "supplier": "阿尔泰",
        "name": "内管柱筒工艺件",
        "UDID": "ES10ZKA-13110-01",
        "cate": "管子"
    },
    {
        "supplier": "阿尔泰",
        "name": "内管柱筒工艺件",
        "UDID": "ES6ZLA-11600",
        "cate": "管子"
    },
    {
        "supplier": "阿尔泰",
        "name": "内管柱筒工艺件",
        "UDID": "ES6E7-13100-01GY1",
        "cate": "管子"
    },
    {
        "supplier": "阿尔泰",
        "name": "内管柱筒工艺件",
        "UDID": "ES5B-13110-01GY1",
        "cate": "管子"
    },
    {
        "supplier": "阿尔泰",
        "name": "内管柱筒工艺件",
        "UDID": "ES4K-13110-01GY1",
        "cate": "管子"
    },
    {
        "supplier": "阿尔泰",
        "name": "管柱筒工艺件",
        "UDID": "ES10ZKB-11600-02GY1",
        "cate": "管子"
    },
    {
        "supplier": "阿尔泰",
        "name": "管柱筒工艺件",
        "UDID": "ES6FA1-12100-01-J011",
        "cate": "管子"
    },
    {
        "supplier": "阿尔泰",
        "name": "管柱筒工艺件",
        "UDID": "ES4FA-13000-01",
        "cate": "管子"
    },
    {
        "supplier": "阿尔泰",
        "name": "内管柱筒工艺件",
        "UDID": "ES7WKA-13110-01GY1",
        "cate": "管子"
    },
    {
        "supplier": "阿尔泰",
        "name": "管柱筒工艺件",
        "UDID": "ES6FA3-13100-01GY1",
        "cate": "管子"
    },
    {
        "supplier": "阿尔泰/余姚",
        "name": "外管柱筒工艺件",
        "UDID": "ES6F-13200-01GY1",
        "cate": "管子"
    },
    {
        "supplier": "阿尔泰",
        "name": "管柱筒工艺件",
        "UDID": "ES4K1-13100-01GY1",
        "cate": "管子"
    },
    {
        "supplier": "阿尔泰",
        "name": "外管柱筒工艺件",
        "UDID": "ES6ZRC-12110-01GY1",
        "cate": "管子"
    },
    {
        "supplier": "阿尔泰",
        "name": "管柱筒工艺件",
        "UDID": "ES3L-13100-01GY1",
        "cate": "管子"
    },
    {
        "supplier": "阿尔泰",
        "name": "外管柱筒工艺件",
        "UDID": "ES4N-13120-01GY1",
        "cate": "管子"
    },
    {
        "name": "外管柱筒工艺件",
        "UDID": "ES4N-13120-01",
        "cate": "管子"
    },
    {
        "supplier": "阿尔泰",
        "name": "外管柱筒工艺件",
        "UDID": "ES6ZRB-13120-01",
        "cate": "管子"
    },
    {
        "supplier": "阿尔泰",
        "name": "外管柱筒工艺件",
        "UDID": "ES6E7-11110-01GY1",
        "cate": "管子"
    },
    {
        "supplier": "阿尔泰",
        "name": "外管柱筒工艺件",
        "UDID": "ES6E6-13110-01GY1",
        "cate": "管子"
    },
    {
        "supplier": "阿尔泰",
        "name": "外管柱筒工艺件",
        "UDID": "ES4KA-13120-01GY1",
        "cate": "管子"
    },
    {
        "supplier": "阿尔泰",
        "name": "外管柱筒工艺件",
        "UDID": "ES4K-13120-01GY1",
        "cate": "管子"
    },
    {
        "supplier": "阿尔泰",
        "name": "外管柱筒工艺件",
        "UDID": "ES5B-13120-01GY1",
        "cate": "管子"
    },
    {
        "supplier": "阿尔泰",
        "name": "内管柱筒工艺件",
        "UDID": "ES5D-11300-01GY1",
        "cate": "管子"
    },
    {
        "supplier": "阿尔泰",
        "name": "内管柱筒工艺件",
        "UDID": "ES6L2-13110-01GY1",
        "cate": "管子"
    },
    {
        "supplier": "阿尔泰",
        "name": "外管柱筒工艺件",
        "UDID": "ES6K-13110-01GY1",
        "cate": "管子"
    },
    {
        "supplier": "阿尔泰",
        "name": "内管柱筒工艺件",
        "UDID": "ES8ZV1-11300-02J801",
        "cate": "管子"
    },
    {
        "supplier": "阿尔泰/山东",
        "name": "内管柱筒工艺件",
        "UDID": "ES11ZD-11600-02",
        "cate": "管子"
    },
    {
        "supplier": "阿尔泰/山东",
        "name": "内管柱筒工艺件",
        "UDID": "ES11ZTC-12300-01GY1",
        "cate": "管子"
    },
    {
        "supplier": "阿尔泰/山东",
        "name": "内管柱筒工艺件",
        "UDID": "ES11ZG-J904",
        "cate": "管子"
    },
    {
        "supplier": "阿尔泰/山东",
        "name": "内管柱筒工艺件",
        "UDID": "ES11ZE-11600-02",
        "cate": "管子"
    },
    {
        "supplier": "阿尔泰/山东",
        "name": "内管柱筒工艺件",
        "UDID": "ES8ZXK-11600-01",
        "cate": "管子"
    },
    {
        "supplier": "阿尔泰/山东",
        "name": "内管柱筒工艺件",
        "UDID": "ES10ZL-12300-02",
        "cate": "管子"
    },
    {
        "supplier": "山东聊城",
        "name": "内管柱筒工艺件",
        "UDID": "ES10ZLD-12300-01",
        "cate": "管子"
    },
    {
        "supplier": "山东聊城",
        "name": "内管柱筒工艺件",
        "UDID": "ES11ZVA-12300-01",
        "cate": "管子"
    },
    {
        "supplier": "阿尔泰/山东",
        "name": "内管柱筒工艺件",
        "UDID": "ES11ZXA-11600-02",
        "cate": "管子"
    },
    {
        "supplier": "阿尔泰/山东",
        "name": "内管柱筒工艺件",
        "UDID": "ES8ZXD-11600-02",
        "cate": "管子"
    },
    {
        "supplier": "阿尔泰",
        "name": "内管柱筒工艺件",
        "UDID": "ES8ZAG-11600-02",
        "cate": "管子"
    },
    {
        "supplier": "阿尔泰",
        "name": "内管柱筒工艺件",
        "UDID": "ES8ZGA-11600-02GY1",
        "cate": "管子"
    },
    {
        "supplier": "山东聊城",
        "name": "内管柱筒工艺件",
        "UDID": "ES10ZR-12300-01",
        "cate": "管子"
    },
    {
        "supplier": "阿尔泰/山东聊城",
        "name": "内管柱筒工艺件",
        "UDID": "ES8F-11110-01",
        "cate": "管子"
    },
    {
        "supplier": "阿尔泰",
        "name": "内管柱筒工艺件",
        "UDID": "ES8M-13000-01GY1",
        "cate": "管子"
    },
    {
        "supplier": "阿尔泰",
        "name": "内管柱筒工艺件",
        "UDID": "ES6W-13000-02GY1",
        "cate": "管子"
    },
    {
        "supplier": "阿尔泰",
        "name": "内管柱筒工艺件",
        "UDID": "ES6MB-11210-01",
        "cate": "管子"
    },
    {
        "supplier": "阿尔泰",
        "name": "内管柱筒工艺件",
        "UDID": "ES4T-13000-02",
        "cate": "管子"
    },
    {
        "supplier": "阿尔泰",
        "name": "内管柱筒工艺件 ",
        "UDID": "ES4E3-13110-01GY1",
        "cate": "管子"
    },
    {
        "supplier": "阿尔泰",
        "name": "内管柱筒工艺件",
        "UDID": "ES11ZB-11600-02",
        "cate": "管子"
    },
    {
        "supplier": "阿尔泰",
        "name": "内管柱筒工艺件",
        "UDID": "ES10WTA-13000-01",
        "cate": "管子"
    },
    {
        "supplier": "阿尔泰",
        "name": "内管柱筒工艺件",
        "UDID": "ES8ZTA1-13000-02GY1",
        "cate": "管子"
    },
    {
        "supplier": "阿尔泰",
        "name": "内管柱筒工艺件",
        "UDID": "ES6PA-12300-01",
        "cate": "管子"
    },
    {
        "supplier": "阿尔泰",
        "name": "内管柱筒工艺件",
        "UDID": "ES6ZGA-11600-02GY1",
        "cate": "管子"
    },
    {
        "supplier": "阿尔泰",
        "name": "内管柱筒工艺件",
        "UDID": "ESZ6S-13000-02GY1",
        "cate": "管子"
    },
    {
        "supplier": "阿尔泰",
        "name": "内管柱筒工艺件",
        "UDID": "ES6V-11300-01GY1",
        "cate": "管子"
    },
    {
        "supplier": "阿尔泰",
        "name": "内管柱筒工艺件",
        "UDID": "ES11ZTD-11300-01",
        "cate": "管子"
    },
    {
        "supplier": "阿尔泰",
        "name": "内管柱筒工艺件",
        "UDID": "ES11ZTB-11300-01GY1",
        "cate": "管子"
    },
    {
        "supplier": "阿尔泰",
        "name": "内管柱筒工艺件",
        "UDID": "ES4E3-13110-01GY1",
        "cate": "管子"
    },
    {
        "supplier": "阿尔泰",
        "name": "内管柱筒工艺件",
        "UDID": "ES6CA-13110-01GY1",
        "cate": "管子"
    },
    {
        "supplier": "山东聊城",
        "name": "内管柱筒工艺件",
        "UDID": "ES10ZXD-11600-02GY2",
        "cate": "管子"
    },
    {
        "supplier": "山东聊城",
        "name": "内管柱筒工艺件",
        "UDID": "ES10ZPA-12300",
        "cate": "管子"
    },
    {
        "supplier": "山东聊城",
        "name": "内管柱筒工艺件",
        "UDID": "ES10ZXS-12300-02",
        "cate": "管子"
    },
    {
        "name": "内管柱筒工艺件",
        "UDID": "ES10ZXQ-12300-01",
        "cate": "管子"
    },
    {
        "supplier": "阿尔泰",
        "name": "内管柱筒工艺件",
        "UDID": "ES4Q-12300-01GY1",
        "cate": "管子"
    },
    {
        "supplier": "阿尔泰",
        "name": "内管柱筒工艺件",
        "UDID": "ES6ZYA-11600-02",
        "cate": "管子"
    },
    {
        "supplier": "阿尔泰",
        "name": "内管柱筒工艺件",
        "UDID": "ES7A-12300-02",
        "cate": "管子"
    },
    {
        "supplier": "阿尔泰",
        "name": "内管柱筒工艺件",
        "UDID": "ES11ZDL1-11600-01",
        "cate": "管子"
    },
    {
        "supplier": "阿尔泰/山东聊城",
        "name": "内管柱筒工艺件",
        "UDID": "ES8H-11400-02GY1",
        "cate": "管子"
    },
    {
        "supplier": "阿尔泰",
        "name": "内管柱筒工艺件",
        "UDID": "ES8C-11400-02GY1",
        "cate": "管子"
    },
    {
        "supplier": "阿尔泰",
        "name": "内管柱筒工艺件",
        "UDID": "ES8ZPA-13000-02GY1",
        "cate": "管子"
    },
    {
        "supplier": "阿尔泰",
        "name": "内管柱筒工艺件",
        "UDID": "ES8WN-11100-01GY1",
        "cate": "管子"
    },
    {
        "supplier": "阿尔泰",
        "name": "管柱筒工艺件",
        "UDID": "ES6TC-13100-01",
        "cate": "管子"
    },
    {
        "name": "内管柱筒工艺件",
        "UDID": "ES10ZLC-11600-02",
        "cate": "管子"
    },
    {
        "supplier": "阿尔泰",
        "name": "内管柱筒工艺件",
        "UDID": "ES6L4-11600-02GY1",
        "cate": "管子"
    },
    {
        "supplier": "阿尔泰",
        "name": "内管柱筒工艺件",
        "UDID": "ES11ZFE-11300-01",
        "cate": "管子"
    },
    {
        "name": "外管柱筒工艺件",
        "UDID": "ES10ZY-11110-01-J403",
        "cate": "管子"
    },
    {
        "supplier": "阿尔泰",
        "name": "内管柱筒工艺件",
        "UDID": "ES11WG2-11600-02GY2",
        "cate": "管子"
    },
    {
        "supplier": "阿尔泰",
        "name": "内管柱筒工艺件",
        "UDID": "ES11ZCD-11600-02GY",
        "cate": "管子"
    },
    {
        "supplier": "阿尔泰",
        "name": "内管柱筒工艺件",
        "UDID": "ES11ZC-11600-02GY1",
        "cate": "管子"
    },
    {
        "supplier": "阿尔泰",
        "name": "外管柱筒工艺件",
        "UDID": "ES5D-13110-01GY1",
        "cate": "管子"
    },
    {
        "supplier": "阿尔泰",
        "name": "外管柱筒工艺件",
        "UDID": "ES10ZTA-13110-01GY1",
        "cate": "管子"
    },
    {
        "supplier": "阿尔泰",
        "name": "外管柱筒工艺件",
        "UDID": "ES11ZFD-11110-01-J201",
        "cate": "管子"
    },
    {
        "supplier": "阿尔泰",
        "name": "外管柱筒工艺件",
        "UDID": "ES6L3-13110-01GY1",
        "cate": "管子"
    },
    {
        "supplier": "阿尔泰",
        "name": "外管柱筒工艺件",
        "UDID": "ES6ZTB-13110-01GY1",
        "cate": "管子"
    },
    {
        "supplier": "阿尔泰",
        "name": "外管柱筒工艺件",
        "UDID": "ES8ZTA1-11110-01GY1",
        "cate": "管子"
    },
    {
        "supplier": "阿尔泰",
        "name": "外管柱筒工艺件",
        "UDID": "ES6ZTC-11110-01GY1",
        "cate": "管子"
    },
    {
        "supplier": "阿尔泰",
        "name": "外管柱筒工艺件",
        "UDID": "ES11ZTA-11110-01GY1",
        "cate": "管子"
    },
    {
        "supplier": "阿尔泰",
        "name": "外管柱筒工艺件",
        "UDID": "ES6CA-13120-01-J201-GY1",
        "cate": "管子"
    },
    {
        "supplier": "阿尔泰",
        "name": "外管柱筒工艺件",
        "UDID": "ES6TB-13100-01GY1",
        "cate": "管子"
    },
    {
        "supplier": "阿尔泰",
        "name": "外管柱筒工艺件",
        "UDID": "ES8H-12100-01GY1",
        "cate": "管子"
    },
    {
        "supplier": "阿尔泰",
        "name": "外管柱筒工艺件",
        "UDID": "ES8ZBE-13110-01GY1",
        "cate": "管子"
    },
    {
        "supplier": "阿尔泰",
        "name": "外管柱筒工艺件",
        "UDID": "ES4Q-11110-01GY1",
        "cate": "管子"
    },
    {
        "supplier": "阿尔泰",
        "name": "外管柱筒工艺件",
        "UDID": "ES4E3-13120-01GY1",
        "cate": "管子"
    },
    {
        "supplier": "阿尔泰",
        "name": "外管柱筒工艺件",
        "UDID": "ES6ZX-11110-01",
        "cate": "管子"
    },
    {
        "supplier": "阿尔泰",
        "name": "外管柱筒工艺件",
        "UDID": "ESZ6HA-13110-01GY1",
        "cate": "管子"
    },
    {
        "supplier": "阿尔泰",
        "name": "外管柱筒工艺件",
        "UDID": "ES6V-13110-01GY1",
        "cate": "管子"
    },
    {
        "supplier": "阿尔泰",
        "name": "外管柱筒工艺件",
        "UDID": "ES8ZPA-11100-01GY1",
        "cate": "管子"
    },
    {
        "supplier": "阿尔泰",
        "name": "外管柱筒工艺件",
        "UDID": "ES6ZYA-13110-01",
        "cate": "管子"
    },
    {
        "supplier": "阿尔泰",
        "name": "外管柱筒工艺件",
        "UDID": "ES8ZXA-13110-01GY1",
        "cate": "管子"
    },
    {
        "supplier": "阿尔泰",
        "name": "外管柱筒工艺件",
        "UDID": "ES4LB1-11110-01",
        "cate": "管子"
    },
    {
        "supplier": "阿尔泰",
        "name": "外管柱筒工艺件",
        "UDID": "ES11ZFA-12110-01GY1",
        "cate": "管子"
    },
    {
        "supplier": "阿尔泰",
        "name": "外管柱筒工艺件",
        "UDID": "ES8ZXB-12110-01GY1",
        "cate": "管子"
    },
    {
        "supplier": "阿尔泰",
        "name": "外管柱筒工艺件",
        "UDID": "ES6TD-13120-01GY1",
        "cate": "管子"
    },
    {
        "supplier": "阿尔泰",
        "name": "外管柱筒工艺件",
        "UDID": "ES8ZHC-12110-01GY1",
        "cate": "管子"
    },
    {
        "supplier": "阿尔泰",
        "name": "外管柱筒工艺件",
        "UDID": "ES4T-11100-01",
        "cate": "管子"
    },
    {
        "supplier": "阿尔泰",
        "name": "外管柱筒工艺件",
        "UDID": "ES10ZMA-11110-01",
        "cate": "管子"
    },
    {
        "supplier": "山东聊城",
        "name": "外管柱筒工艺件",
        "UDID": "ES10ZMD-11110-01",
        "cate": "管子"
    },
    {
        "supplier": "山东聊城",
        "name": "外管柱筒工艺件",
        "UDID": "ES11ZYB-11110-01",
        "cate": "管子"
    },
    {
        "supplier": "山东聊城",
        "name": "外管柱筒工艺件",
        "UDID": "ES10ZLC-13110-01",
        "cate": "管子"
    },
    {
        "supplier": "阿尔泰",
        "name": "外管柱筒工艺件",
        "UDID": "ES4E-13120-01GY1",
        "cate": "管子"
    },
    {
        "supplier": "阿尔泰",
        "name": "外管柱筒工艺件",
        "UDID": "ES4S-11110-01GY1",
        "cate": "管子"
    },
    {
        "supplier": "阿尔泰",
        "name": "外管柱筒工艺件",
        "UDID": "ES6H-13120-01GY1",
        "cate": "管子"
    },
    {
        "supplier": "阿尔泰",
        "name": "外管柱筒工艺件",
        "UDID": "ES8WH-13120-01GY1",
        "cate": "管子"
    },
    {
        "supplier": "阿尔泰",
        "name": "外管柱筒工艺件",
        "UDID": "ES11ZC-12110-01GY1",
        "cate": "管子"
    },
    {
        "supplier": "山东聊城",
        "name": "外管柱筒工艺件",
        "UDID": "ES10ZLE-13110-01",
        "cate": "管子"
    },
    {
        "supplier": "鑫鸿五金",
        "name": "六角焊接螺母",
        "UDID": "M4/GB13681",
        "cate": "其他"
    },
    {
        "supplier": "温州益力标准件",
        "name": "四方焊接螺母",
        "UDID": "M6-4.8级",
        "cate": "其他"
    },
    {
        "name": "六角焊接螺母",
        "UDID": "M6/GBT13681",
        "cate": "其他"
    },
    {
        "supplier": "温州益力标准件",
        "name": "四方焊接螺母",
        "UDID": "M8 /GB/T13680",
        "cate": "其他"
    },
    {
        "supplier": "林郁浩",
        "name": "四方焊接螺母",
        "UDID": "M5/GB13680",
        "cate": "其他"
    },
    {
        "supplier": "温州益力标准件",
        "name": "螺钉组合件",
        "UDID": "M4 * 10",
        "cate": "其他"
    },
    {
        "supplier": "固安金生",
        "name": "垫块",
        "UDID": "ES3A-11200-01",
        "cate": "其他"
    },
    {
        "supplier": "固安金生",
        "name": "垫块",
        "UDID": "ES5D-14200-03",
        "cate": "其他"
    },
    {
        "supplier": "平湖吉辰",
        "name": "注塑垫块",
        "UDID": "ES10ZLE-13110-04",
        "cate": "其他"
    },
    {
        "supplier": "平湖吉辰",
        "name": "右注塑垫块",
        "UDID": "ES10ZLE-13110-06",
        "cate": "其他"
    },
    {
        "name": "深沟球轴承",
        "UDID": "ES3E-11220-01",
        "cate": "其他"
    },
    {
        "supplier": "豫北转向",
        "name": "深沟球轴承",
        "UDID": "ES2A-11220-01",
        "cate": "其他"
    },
    {
        "supplier": "环驰",
        "name": "深沟球轴承",
        "UDID": "6903-2Z   C2级",
        "cate": "其他"
    },
    {
        "supplier": "豫北转向",
        "name": "深沟球轴承",
        "UDID": "16004   GB-2Z",
        "cate": "其他"
    },
    {
        "supplier": "环驰",
        "name": "深沟球轴承",
        "UDID": "61804-2Z   C2级",
        "cate": "其他"
    },
    {
        "supplier": "环驰",
        "name": "深沟球轴承",
        "UDID": "61905-2Z   C2级",
        "cate": "其他"
    },
    {
        "supplier": "豫北转向/人本",
        "name": "深沟球轴承",
        "UDID": "ES6U-12100-01",
        "cate": "其他"
    },
    {
        "supplier": "豫北转向",
        "name": "深沟球轴承",
        "UDID": "ESZ8L-11100-01",
        "cate": "其他"
    },
    {
        "supplier": "环驰",
        "name": "深沟球轴承",
        "UDID": "61904-2Z   C2级",
        "cate": "其他"
    },
    {
        "supplier": "豫北转向/人本",
        "name": "深沟球轴承",
        "UDID": "61904-2RS   ",
        "cate": "其他"
    },
    {
        "supplier": "环驰",
        "name": "深沟球轴承",
        "UDID": "6004-2Z",
        "cate": "其他"
    },
    {
        "supplier": "无锡华洋",
        "name": "深沟球轴承",
        "UDID": "MCMB03-11000-02",
        "cate": "其他"
    },
    {
        "supplier": "宇盛",
        "name": "轴承",
        "UDID": "ES8D-11100-01",
        "cate": "其他"
    },
    {
        "supplier": "豫北转向/人本",
        "name": "深沟球轴承",
        "UDID": "ES6E-13000-01",
        "cate": "其他"
    },
    {
        "name": "深沟球轴承",
        "UDID": "ES8H-13100-02",
        "cate": "其他"
    },
    {
        "supplier": "环驰",
        "name": "深沟球轴承",
        "UDID": "61904-2Z   C2级导电",
        "cate": "其他"
    }
]

if (!localStorage.getItem('partList')) {
  localStorage.setItem('partList', JSON.stringify(rawPartList))
}

const partList = ref([])

// 本地读取零件列表
const localPartList = localStorage.getItem('partList')
if (localPartList) {
  partList.value = JSON.parse(localPartList)
}


</script>



<style scoped>
.item {
  width: 200px;
}
</style>