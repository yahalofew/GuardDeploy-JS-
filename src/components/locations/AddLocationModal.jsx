import React, { useState } from "react";
import useDutyStore from "../../store/useDutyStore";

const AddLocationModal = ({ lat, lng, setAdding, setPending }) => {
  const [name, setName] = useState("");
  // ดึงค่า addLocation จาก back-end มาใช้
  const addLocation = useDutyStore((state) => state.AddLocation);

  // บันทึกข้อมูลใหม่ที่กรอกไป แล้วปิด modal
  const hdlAddLocation = async () => {
    // ส่งไปback-end พิกัด ชื่อ บันทึกเสร็จ รีเซ็ตสถานะกลับเป็นปกติ
   await addLocation(lat, lng, name);
    setAdding(false);
    setPending(null);
  };
  // reset state
  const hdlCencel = () => {
    // ยกเลิกการเพิ่มสถานที่ใหม่ รีเซ็ตสถานะกลับเป็นปกติ
    setAdding(false);
    setPending(null);
  };
  return (
    //  top:0 left:0 bottom:0 right:0 ครอบเต็มจอ fixed จะลอยอยุ่เหนือหน้าจอ จะไม่เลื้อนตามเมาส์
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
      {/* ส่วนกล่องแสดงกรอกข้อมูล */}
      <div className="bg-white p-6 rounded-2xl shadow-2xl w-90">
        <h3 className="text-xl text-green-700 mb-2">เพิ่มจุดเข้าเวรใหม่</h3>
        <div className="text-xs my-2 text-gray-700">
          Lat: {lat.toFixed(6)}, lng: {lng.toFixed(6)}
        </div>
        {/* กรอกชื่อ */}
        <input
          className="w-full border px-2 py-2 border-gray-300 rounded-md mb-4 focus:outline-none 
        focus:ring-blue-500 focus:ring-2 text-xs"
          autoFocus
          onChange={(e) => setName(e.target.value)}
        />
        <div className="flex gap-3">
          <button
            className=" flex-1 bg-green-200 px-2 pb-1 rounded-md text-xm text-gray-600 disabled:cursor-not-allowed hover:bg-green-900"
            onClick={hdlAddLocation}
            disabled={!name.trim()}
          >
            Save
          </button>
          <button
            className="flex-1 bg-red-500 px-2 pb-1 rounded-md text-xm text-gray-100"
            onClick={hdlCencel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddLocationModal;
