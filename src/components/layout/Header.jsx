import { Plus, XIcon } from "lucide-react";
import React from "react";

const Header = ({ adding, setAdding }) => {
  return (
    // x ซ้ายขวา y บนล่าง
    <div className="p-4 bg-white shadow-sm border-b border-gray-200 ">
      {/* ที่แยกออกมาเพราะจะตอนกดเพื่อให้หน้ายกเลิกขึ้นไว้แสดงข้อความแจ้งเตือน เพื่อไม่ให้รวมกัน*/}
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold text-gray-700">
          การจัดการการเข้าเวร
        </h2>
        {/* ถ้าadding เป็นture เป็นสีแดง*/}
        {/* เป็นfalse เป็นเขียว */}
        <button
          className={`flex items-center gap-2 p-2 rounded-md
        ${
          adding
            ? "bg-red-400 text-white hover:bg-red-800"
            : "bg-green-400 text-white hover:bg-green-800"
        }
        `}
        // เมื่อมีการคลิกbutton จะเปลี่ยนค่าtrueจะเป็นfalse ถ้าเป็นfalseจะเป็นtrue
        // เพื่อตั้งค่าสถานะการเพิ่มจุดเข้าเวร ว่ากำลังเปิดใช้งานหรือไม่
          onClick={() => setAdding((prev) => !prev)}
        >
          {/* เมื่อเป็น ture แสดงยกเลิก */}
          {/* เมื่อเป็นfalse แสดงเพิ่มจุดเข้าเวร */}
          {adding ? (
            <>
              <XIcon size={18} /> ยกเลิก{" "}
            </>
          ) : (
            <>
              <Plus size={18} /> เพิ่มจุดเข้าเวร
            </>
          )}
        </button>
      </div>
      {
        //เป็นfalseไม่ทำอะไร เพราะเจอfalseแล้วแต่ไม่เจอก็จะหาจนเจอ adding เป็นturn ก้จะไล่หาจนกว่ ให้แสดงข้อความนี้
        adding && (
          // แสดงเมื่อ add เป็น true เท่านั้น
          <div className="mt-2 text-sm text-amber-600 bg-amber-100 p-2 rounded-md border">
            คลิกบนแผนที่เพื่อเพิ่มจุดเข้าเวร
          </div>
        )
      }
    </div>
  );
};

export default Header;
