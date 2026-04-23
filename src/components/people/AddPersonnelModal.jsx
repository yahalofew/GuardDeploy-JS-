import React, { useState } from "react";
import useDutyStore from "../../store/useDutyStore";

const AVATAR_OPTIONS = [
  { emoji: "👨‍✈️", label: "ชายหัวหน้า" },
  { emoji: "👩‍✈️", label: "หญิงหัวหน้า" },
  { emoji: "👨‍💼", label: "ชายเจ้าหน้าที่" },
  { emoji: "👩‍💼", label: "หญิงเจ้าหน้าที่" },
  { emoji: "👨‍🔧", label: "ชายช่าง" },
  { emoji: "👩‍🔧", label: "หญิงช่าง" },
  { emoji: "👮‍♂️", label: "ตำรวจชาย" },
  { emoji: "👮‍♀️", label: "ตำรวจหญิง" },
  { emoji: "🕵️‍♂️", label: "สืบสวนชาย" },
  { emoji: "🕵️‍♀️", label: "สืบสวนหญิง" },
];

const POSITION_OPTIONS = [
  "หัวหน้าเวร",
  "รองหัวหน้า",
  "เจ้าหน้าที่",
  "ผู้ช่วยเจ้าหน้าที่",
  "เจ้าหน้าที่รักษาความปลอดภัย",
];

const AddPersonnelModal = ({ onClose }) => {
  const [name, setName] = useState("");
  const [position, setPosition] = useState(POSITION_OPTIONS[2]);
  const [avatar, setAvatar] = useState(AVATAR_OPTIONS[2].emoji);
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  
  const addPersonnel = useDutyStore((state) => state.AddPersonnel);

  const hdlSave = async () => {
    await addPersonnel(name, position, avatar);
    onClose();
  };

  const hdlCancel = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
      <div className="bg-white p-6 rounded-2xl shadow-2xl w-96">
        <h3 className="text-xl text-green-700 mb-4">เพิ่มเจ้าหน้าที่ใหม่</h3>
        
        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-2">เลือกรูปประจำตัว</label>
          <div className="flex items-center gap-3">
            <div className="text-4xl">{avatar}</div>
            <button
              onClick={() => setShowAvatarPicker(!showAvatarPicker)}
              className="px-3 py-1 bg-gray-200 rounded-md text-sm text-gray-700 hover:bg-gray-300"
            >
              {showAvatarPicker ? "ซ่อน" : "เลือก"}
            </button>
          </div>
          {showAvatarPicker && (
            <div className="mt-2 p-2 bg-gray-50 rounded-md grid grid-cols-5 gap-2">
              {AVATAR_OPTIONS.map((opt) => (
                <button
                  key={opt.emoji}
                  onClick={() => {
                    setAvatar(opt.emoji);
                    setShowAvatarPicker(false);
                  }}
                  className={`p-2 rounded-md text-2xl hover:bg-gray-200 ${
                    avatar === opt.emoji ? "bg-green-200 ring-2 ring-green-500" : ""
                  }`}
                  title={opt.label}
                >
                  {opt.emoji}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">ชื่อ-นามสกุล</label>
          <input
            className="w-full border px-3 py-2 border-gray-300 rounded-md focus:outline-none 
            focus:ring-green-500 focus:ring-2 text-sm"
            placeholder="กรอกชื่อเจ้าหน้าที่"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">ตำแหน่ง</label>
          <select
            className="w-full border px-3 py-2 border-gray-300 rounded-md focus:outline-none 
            focus:ring-green-500 focus:ring-2 text-sm"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          >
            {POSITION_OPTIONS.map((pos) => (
              <option key={pos} value={pos}>
                {pos}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-3">
          <button
            className="flex-1 bg-green-500 px-4 py-2 rounded-md text-sm text-white font-medium
            disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-green-600"
            onClick={hdlSave}
            disabled={!name.trim()}
          >
            บันทึก
          </button>
          <button
            className="flex-1 bg-red-500 px-4 py-2 rounded-md text-sm text-white font-medium hover:bg-red-600"
            onClick={hdlCancel}
          >
            ยกเลิก
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPersonnelModal;
