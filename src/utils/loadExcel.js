import * as XLSX from 'xlsx';

export default (rawFile) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0]; // 获取第一个工作表的名称
            const worksheet = workbook.Sheets[sheetName]; // 获取工作表对象
            const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 }); // 转换为JSON，header: 1 表示第一行作为标题行
            
        
            resolve(json)
        };
        reader.readAsArrayBuffer(rawFile);
    })
}
