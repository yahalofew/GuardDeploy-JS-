// API Back-end
import axios from "axios";

const API_URL = "http://localhost:3000";

// สร้าง client axios ที่ตั้งค่า baseUR ใส่ option อื่นๆได้เช่น headers, timeou
const client = axios.create({
    baseURL: API_URL,
});

export const api = {
    async get(path){
        // เข้าถึง data จาก response เลย
        // รอรับจาก client.get ที่ส่ง /path มาเก็บไว้ใน data และส่งออกทันที
        const {data} = await client.get(path)
        return data;
        // fn body
    },
    async post(path, body){  
        // /path = /locations
        // body = {name: name, lat: lat, lng: lng, maxCapacity: 5}
        const {data} = await client.post(path,body)
        return data;
    },
    async delete(path){
        const {data} = await client.delete(path)
        return data;
},

}


// const fetchAll = async ()=>{
//     try {
//     const res = await axios.get('http://localhost:3000/personnel')

//     console.log(res.data)
//     }catch (error) {
//       // เราต้องจุดเข้าไปทีละตัวเช็ค error
//       console.log(error.response.data)
//     }
//   }