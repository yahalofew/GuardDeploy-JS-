import { MapPin, Trash2 } from "lucide-react";
import useDutyStore from "../../store/useDutyStore";
import { useState } from "react";
import { ChevronDown, ChevronUp, User } from "lucide-react"; // เพิ่ม Icon สวยๆ
const LocationList = () => { 
  // ข้อมูลตำแหน่ง
  const locations = useDutyStore((state) => state.locations);
  // ไว้บันทึกตำแหน่ง
  const assignPerson = useDutyStore((state) => state.assignPerson);
  // ข้อมูล พนักงานตำแหน่งนั้น
  const assignments = useDutyStore((state) => state.assignments);
  const fetchAll = useDutyStore((state) => state.fetchAll);
  const deleteLocation = useDutyStore((state) => state.deleteLocation);
  const deleteAssignment = useDutyStore((state) => state.deleteAssignment);
  const [expandedId, setExpandedId] = useState(null);
  // เอาไว้เปิดปิด รายชื่อพนักงานที่ทำงานอยู่จุดนั้นๆ ถ้ามีการเปลี่ยนแปลงหน้าจะรีเซ็ตและแสดงใหม่
  const toggleExpand = (id) => {
    // ตอนแรกเป็น null พอคลิกแล้วจะเป็น id ของจุดนั้นๆ ถ้าคลิกอีกครั้งจะเป็น null เพราะถ้า id ที่คลิกตรงกับ id ที่เปิดอยู่แล้วก็ให้ปิด ถ้าไม่ตรงก็ให้เปิดจุดที่คลิก
    setExpandedId(expandedId === id ? null : id);
    console.log(expandedId);
  };
  
  // ลบจุดถ้าลบจุดต้องลบการมอบหมายที่เกี่ยวข้องด้วย
  const onDeleteLocation = async (locationId)=>{
    if(window.confirm('คุณต้องการลบจุดนี้ใช่ไหม?')){
      const assignmentDelete = assignments.filter(e => e.locationId === locationId);
      console.log('การมอบหมายที่ต้องลบ',assignmentDelete);
      // เอาเฉพาะเลขidของสถานที่ที่ลบตรงกับพนักงานที่ทำงานอยู่จุดนั้นเอาออกมา
      assignmentDelete.forEach(async (item)=>{
        console.log('ลบการมอบหมายของพนักงานคนนี้ที่จุดนี้',item);
        await deleteAssignment(item.id);
      })
      await deleteLocation(locationId);
      fetchAll();
    }
  }
  const onDropToLocation = async (e,LocationId,maxCapacity)=>{
    // เบราว์เซอร์จะยื่นกระเป๋าใบเดิมนั้นมาให้เรา ข้อมูลid ที่ฝากไว้ยังอยู่ 
    // มาเก็บไว้ในpersonidแล้ว
    const personId = e.dataTransfer.getData('text/plain');
    // LocationId คือ locationsที่ลูปออกมาแล้วแล้วส่ง ไอดีของจุดนี้มาให้ใส่เข้าไปพร้อม id คน
    // ก่อนบันทึกตรวจสอบว่ามีมากกว่า5คนยัง

    const assignPersonCoust = assignments.filter(e => e.locationId === LocationId).length;
    const personAssigned = assignments.filter(e => e.personId === personId);
    if(assignPersonCoust >= maxCapacity){
      alert('จุดนี้รับคนได้ไม่เกิน '+maxCapacity+' คน');
      return;
    }else if(personAssigned.length > 0){
      alert('พนักงานคนนี้ถูกมอบหมายอยู่แล้ว');
      return;
    }
    console.log('personId ที่ลากมา',personId);
    await assignPerson (personId,LocationId)
    // ส่งเก็บไปที่back-end idพนักงาน idตำแหน่ง
    fetchAll();
    
  }
  
  return (
    <div className="w-80 bg-white border-1 shadow-lg border-gray-200 overflow-y-auto">
      {/* ส่วนหัว */}
      <div className="p-6 border-b border-gray-200 bg-amber-100">
        <div className="flex gap-4 items-center">
          <MapPin className="text-blue-500" size={32} />
          <h2 className="text-2xl font-semibold">จุดเข้าเวร</h2>
        </div>
      </div>
      <div className="p-4 space-y-3.5">
        {/* loop เราจะลูปออกมาก่อนได้ข้อมูลมาแล้วค่อยมาแบ่งใส่*/}
        {locations.map((item) => {
          // กรองหาพนักงานที่ทำงานอยู่จุดนี้ออกมา ตำแหน่งนี้ === ไอดีของจุดนี้
          const activeAssignments = assignments.filter(a => a.locationId === item.id);
          const isFull = activeAssignments.length  >= item.maxCapacity;
          // ตรวจสอบว่ารายชื่อจุดนี้เปิดอยู่หรือปิดอยู่
          const isExpanded = expandedId === item.id;
          return (
            <div
            // เปิดประตูรอรับของที่ลากมา e.preventDefault() คือการบอกเบราว์เซอร์ว่า
            onDragOver={(e)=>e.preventDefault()}
            // เมื่อปล่อยของที่ลากมาไว้ตรงนี้จะ dropลง
            onDrop={(e)=>onDropToLocation(e, item.id,item.maxCapacity)}
            // เต็มจะเป้นสีแดง ไม่เต็มสีเขียว ทำให้โค้งมนเป็นสัดส่วน ทำให้กางรายชื่ออกมาดูนุ่มนวล
            key={item.id} className={`border-2 border-dashed rounded-md transiton-all
            ${isFull? 'bg-red-100 border-red-200' : 'bg-green-50 border-green-200'} p-3`}>
              {/* จัดให้ทุกอย่างอยู่แถวนอน โดนเรียงจากซ้ายไปขวา จัดให้แต่ละชิ้นดูห่างกันที่สุด ทำให้ชิดขอบบน ตอนเรากดมันจะขยับถ้าไม่ใส่ */}
              <div className="flex justify-between items-start">
                {/* คลิกที่ชื่อหรือพื้นที่ว่างเพื่อ เปิด/ปิด รายชื่อ */}
                <div className="flex-1 cursor-pointer" 
                // เมื่อคลิกส่งไอดีไป
                onClick={()=> toggleExpand(item.id)}>
                  <div className="flex items-center gap-1">
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    {/* สัญลักษณ์ > < ขึ้น ลง ถ้าจริง */}
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                  <p className="text-sm text-gray-500"> 
                    {activeAssignments.length} / {item.maxCapacity}
                  </p>
                </div>
                
                <button className="text-red-500 hover:text-red-700 p-1" onClick={()=>onDeleteLocation(item.id)}>
                  <Trash2 size={20} />
                </button>
              </div>
              {/* ถ้า isExpanded มี id อยู่ให้ทำงานใน()*/}
              {isExpanded && (
                <div className="mt-3 pt-3 border-t border-gray-200 space-y-2">
                  {activeAssignments.length > 0 
                  // ถ้ามีคนทำงานอยู่จุดนี้ก็ให้แสดงรายชื่อออกมา ถ้าไม่มีให้แสดงข้อความว่าไม่มีคนเข้าเวร
                  ? (activeAssignments.map((person) => (
                      // ลูปคนที่ทำงานจุดนี้ออกมา เป้นกล่องๆ แสดงชื้่อและไอดีของคนที่มาท
                      <div key={person.id} className="flex items-center gap-2 text-sm bg-white p-2 rounded shadow-sm">
                        <User size={14} className="text-gray-400"/>
                        <span className="font-medium text-gray-700">
                          { `${person.personName} ID: ${person.personId}`}
                        </span>
                      </div>
                    ))
                  ) : 
                  // ถ้าไม่มีคนอยู่กให้แสดงว่าไม่มีคนอยู่
                  (
                    <p className="text-xs text-gray-400 italic text-center">ยังไม่มีคนเข้าเวร</p>
                  )
                  }
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LocationList;
