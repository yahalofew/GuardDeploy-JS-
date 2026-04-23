// global state Zustand จะแจ้งเตือนไปยังทุกคอมโพเนนต์ที่เรียกใช้ข้อมูลนั้นอยู่

import { create } from "zustand";
import { api } from "../lib/api";
import AddLocationModal from "../components/locations/AddLocationModal";
// fn body = () => {return }
// แบ่งแต่ละข้อมุลออกมาเป็น array 
// มี คน สถานที่ การมอบหมายงาน เลือกสถานที่ idเมื่อมีการเลือกโลเคชั่นส่งมาเก้บด้วยเอาไปต่อยอดแบบไว้อัพเดทmap
const dutyStore = (set, get) => ({
    // หน้าต่างๆก็จะดึงออกมาใช้ได้จากตัวพวกนี้
    personnel: [],
    locations: [],
    assignments: [],
    selectedLocationId: null,
    // api globel เพื่อให้คนอื่นเรียกได้
    fetchAll: async () => {
        try {
            // const personnel = await api.get('/personnel');
            // const locations = await api.get('/locations');
            // const assignments = await api.get('/locationPersonnel'); 

            const [personnel, locations, assignments] = await Promise.all([
                api.get('/personnel'),
                api.get('/locations'),
                api.get('/locationPersonnel')
            ])
            // getข้อมูลออกมาแล้วนำไปเก็บในตัวแปรแล้วก็เอาไปใส่ [] ที่สร้างไว้
            set({
                // เราเข้าถึงkey personnel ข้างบน เพื่อset เข้าไปข้างใน
                personnel: personnel,
                locations: locations,
                assignments: assignments
            });
        } catch (error) {
            console.log(error);
        }
    },
    AddLocation: async (lat, lng, name) => {
        try {
            // ส่งไปข้อมูลใหม่ไป 2 อย่าง /locations  กับ body
            const res = await api.post('/locations', {
                name: name,
                // แปลงเป็น number เอาชัวร์
                lat: Number(lat),
                lng: Number(lng),
                maxCapacity: 5
            });
            // บันทึกเสร็จ เรียกดึงข้อมูลใหม่ให้แสดง
            // get ดึงข้อมูลจาก storeเดียวกันออกมา
            await get().fetchAll();
        } catch (error) {
            console.log(error);
        }
    },
    assignPerson: async (personId, LocationId) => {
        try {
            // console.log(personId, LocationId);
            const res = await api.post('/locationPersonnel',{
                personId: personId,
                locationId: LocationId,
                personName: get().personnel.find(p => p.id === personId)?.name || 'Unknown' // เอาชื่อคนที่ถูกมอบหมายไปเก็บด้วย เผื่อจะได้แสดงชื่อในหน้าต่อไป
            })
            // บันทึกข้อมูล "พนักงานคนนี้ (A) ถูกมอบหมายให้ไปเข้าเวรที่จุดนี้ (B) นะ
        } catch (error) {
            console.log(error);
        }
    },
    deleteLocation: async (LocationId) => {
        try {
            await api.delete('/locations/'+LocationId);
        }catch (error) {
            console.log(error);
        }
    },
    deleteAssignment: async (id) => {
        try {
            await api.delete('/locationPersonnel/'+id);
        }catch (error) {
            console.log(error);
        }
    },
    AddPersonnel: async (name, position, avatar) => {
        try {
            await api.post('/personnel', {
                name: name,
                position: position,
                avatar: avatar
            });
            await get().fetchAll();
        } catch (error) {
            console.log(error);
        }
    },
    })
    // สร้าง store useDutyStore ใส่storeเข้าไป หรือไม่ก็สร้างข้างในเลยแต่เราแยก
    const useDutyStore = create(dutyStore);

    // ออกไปใช้ไฟลเดียว
    export default useDutyStore;

