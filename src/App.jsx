import React, { useState, useEffect } from 'react'
import PersonList from './components/people/PersonList';
import LocationList from './components/locations/LocationList';
import MapView from './components/map/MapView';
import Header from './components/layout/Header';
import useDutyStore from './store/useDutyStore';
import AddLocationModal from './components/locations/AddLocationModal';
const App = () => {
  const [adding, setAdding] = useState(false);
  const [pending, setPending] = useState(null);
  // สร้างตัวแปรเก็บฟังก์ชัน fetchAll จาก store
  const fetchAll = useDutyStore((state)=>state.fetchAll);
  //  ดึงข้อมูลเริ่มต้นเมื่อโหลดแอพ
  useEffect( ()=>{
    fetchAll();
  },[]);

  // เมื่อมีการคลิกบนแผนที่ จะได้รับค่าพิกัด lat lng มา
  // เราส่งฟังชั่นไปให้ไปรับค่ามา เก็บไว้ในหน้า app.jsx เพื่อให้สามารถส่งต่อไปยัง modal ได้
  const onPick = (lat,lng)=>{
    // เมื่อมีการคลิกบนแผนที่ จะได้รับค่าพิกัด lat lng มา แล้วตั้งค่า pending เพื่อแสดง modal เพิ่มจุดเข้าเวร
    setPending({
      lat: lat,
      lng: lng,
    });
  };
  // console.log(onPick);
  return (
    // h-screen เต็มความสูงของจอ flex จัดเรียงแบบแถวนอน ฝังซ้าย
    <div className='flex h-screen bg-gray-100'>
      <PersonList /> 
      {/* flex (สร้างพื้นที่ยืดหยุ่น) เป็นแนวนอน ซ้ายไปขวา */}
      {/* ใส่flex-col ไปเปลี่ยนทิศเรียงต่อกันเป็นแนวตั้ง */}
      <div className='flex flex-col flex-1'>
        {/* ส่งadding เพื่อเช็คว่าาอยู่ในสถานะเพิ่มสถานที่หรือไม่*/}
        {/* true ปุ่มจะเป็นสีแดง เหมือนกำลังเปิดใช้งานให้คลิกบนแผนที่เพื่อเพิ่มจุดต่อไป */}
        {/* false ปุ่มเป็นสีเขียวและ */}
        <Header adding={adding} setAdding={setAdding} />
        {/* overflow ต้ดเนื้อหาส่วนเกินให้ย่อลง */}
        {/* ใส่flex ข้างในอีกที่เพื่อให้มันเรียงเป็นแนวนอนต่อกัน */}
        <div className='flex flex-1 overflow-hidden'>
          {/* */}
          {/* addingที่ส่งไปบอกว่ากดปุ่มเพิ่มจุด */}
          {/* onPick คือค่าจุดบนแผนทีที่กดไป lat lng */}
          <MapView adding={adding} onPick={onPick} />
          <LocationList />
        </div>
      </div>
      {
        // ส่วนแสดง modal เพิ่มจุดเข้าเวร
        // ถ้ามี pending lat lng  อยู่ให้แสดง modal ขึ้นมา
        pending && <AddLocationModal
        lat={pending.lat}
        lng={pending.lng}
        setAdding={setAdding}
        setPending={setPending}
        />
      }
    </div>
  )
}

export default App