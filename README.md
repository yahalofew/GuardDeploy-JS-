# 🛡️ GuardDeploy-JS
 
ระบบบริหารจัดการการเข้าเวรเจ้าหน้าที่แบบเรียลไทม์ พัฒนาด้วย React ช่วยให้การมอบหมายงานง่ายเพียงแค่ "ลากและวาง" พร้อมแสดงจุดเข้าเวรบนแผนที่แบบ Interactive

---
 
## ✨ ฟีเจอร์เด่น
 
- **Interactive Map** — แสดงจุดเข้าเวรบนแผนที่จริงด้วย Leaflet พร้อม Popup และ Tooltip
- **Drag & Drop Assignment** — ลากรายชื่อเจ้าหน้าที่ไปวางในจุดที่ต้องการได้อย่างรวดเร็ว
- **Capacity Validation** — ระบบตรวจสอบความจุอัตโนมัติ ป้องกันการจัดคนเกินจำนวนที่กำหนด
- **Duplicate Prevention** — ป้องกันการมอบหมายเจ้าหน้าที่คนเดิมซ้ำในหลายจุด
- **Dynamic UI** — ระบบ Accordion เปิด-ปิดรายชื่อเจ้าหน้าที่ในแต่ละจุดเพื่อความเป็นระเบียบ
- **Add Location on Map** — เพิ่มจุดเข้าเวรใหม่ได้โดยตรงจากการคลิกบนแผนที่
- **Add Personnel** — เพิ่มเจ้าหน้าที่ใหม่ได้โดยตรงจากปุ่มเพิ่มในรายชื่อ
  
---

## 🚀 เทคโนโลยีที่ใช้
 
| ฝั่ง | เทคโนโลยี |
|------|-----------|
| Frontend | React 19, Vite |
| State Management | Zustand |
| Mapping | React-Leaflet, Leaflet |
| Styling | Tailwind CSS v4 |
| Icons | Lucide React |
| API Client | Axios |
| Mock Backend | JSON Server |

---
 
## 📂 โครงสร้างโปรเจกต์
 
```
GuardDeploy-JS/
├── src/
│   ├── components/
│   │   ├── layout/         # Header, ปุ่มเพิ่มจุด
│   │   ├── locations/      # LocationList, AddLocationModal
│   │   ├── map/            # MapView, Layers (Leaflet)
│   │   └── people/         # PersonList, AddPersonnelModal (Drag source)
│   ├── store/
│   │   └── useDutyStore.js # Global state ด้วย Zustand
│   ├── lib/
│   │   └── api.js          # Axios client
│   └── main.jsx
├── db.json                 # Mock database (JSON Server)
├── vite.config.js
└── package.json
```
 
---

## 🗄️ Data Schema
 
ข้อมูลเก็บใน `db.json` ประกอบด้วย 3 collections:
 
**`personnel`** — รายชื่อเจ้าหน้าที่
 
| Field | Type | Description |
|-------|------|-------------|
| id | string | รหัสเจ้าหน้าที่ |
| name | string | ชื่อ-นามสกุล |
| position | string | ตำแหน่ง |
| avatar | string | Emoji แทนรูปโปรไฟล์ |
 
**`locations`** — จุดเข้าเวร
 
| Field | Type | Description |
|-------|------|-------------|
| id | string | รหัสจุดเข้าเวร |
| name | string | ชื่อจุด |
| lat | number | ละติจูด |
| lng | number | ลองจิจูด |
| maxCapacity | number | จำนวนคนสูงสุดที่รับได้ |
 
**`locationPersonnel`** — การมอบหมายงาน (Relation Table)
 
| Field | Type | Description |
|-------|------|-------------|
| id | string | รหัสการมอบหมาย |
| personId | string | อ้างอิง personnel.id |
| locationId | string | อ้างอิง locations.id |
| personName | string | ชื่อ (denormalized เพื่อแสดงผลเร็ว) |
 
---

## 🛠️ วิธีติดตั้งและรันโปรเจกต์
 
**ความต้องการของระบบ:** Node.js >= 18
 
**1. Clone โปรเจกต์**
 
```bash
git clone https://github.com/yahalofew/GuardDeploy-JS.git
cd GuardDeploy-JS
```
 
**2. ติดตั้ง Dependencies**
 
```bash
npm install
```
 
**3. รันระบบ (ต้องเปิด 2 Terminal พร้อมกัน)**
 
Terminal แรก — รัน Mock Backend:
```bash
npm run server
```
 
Terminal ที่สอง — รัน Frontend:
```bash
npm run dev
```
 
**4. เปิดเบราว์เซอร์**
 
```
http://localhost:5173
```
 
> **หมายเหตุ:** ตรวจสอบให้แน่ใจว่าในไฟล์ `package.json` มี script นี้อยู่:
> ```json
> "server": "json-server --watch db.json"
> ```
 
---

## 📸 Screenshots

**หน้าหลัก
<img width="800" alt="image" src="https://github.com/user-attachments/assets/fbbdf603-4319-473c-a8d6-43eb1e7c26dd" />

**ส่วนเพิ่มเจ้าหน้าที่
<img width="800" alt="image" src="https://github.com/user-attachments/assets/2aab9964-c4d7-4a3c-8969-9ec410ba525d" />

**เลือกจุดบนแผนที่
<img width="800" alt="image" src="https://github.com/user-attachments/assets/bffef414-ee90-463a-b1f0-57b310f2998e" />

**เพิ่มจุดการทำงาน
<img width="800" alt="image" src="https://github.com/user-attachments/assets/cca0a109-bdc8-4560-9db0-fa33963474f8" />

**ลากเจ้าที่ประจำตำแหน่ง
<img width="800" alt="image" src="https://github.com/user-attachments/assets/214fbf54-3239-4e97-87a9-9020d4a7a132" />

---
 
## ⚠️ Known Limitations
 
สิ่งที่รับรู้และจะปรับปรุงหากพัฒนาต่อ:
 
- **ใช้ JSON Server แทน Backend จริง** — ข้อมูลถูกเก็บใน `db.json` ไม่ใช่ฐานข้อมูลจริง หากหยุด server ข้อมูลที่เพิ่มระหว่าง session จะหายไป
- **ไม่มีระบบ Authentication** — ทุกคนที่เข้าถึง URL สามารถแก้ไขข้อมูลได้
- **ไม่มี Real-time Sync** — ถ้าผู้ใช้หลายคนเปิดพร้อมกัน ข้อมูลจะไม่ sync กันอัตโนมัติ ต้อง refresh หน้า
- **`personName` ถูก denormalize** — ถ้าแก้ชื่อพนักงาน ชื่อในการมอบหมายงานเก่าจะไม่อัปเดตตาม
---
 
## 💡 สิ่งที่จะพัฒนาต่อ
 
- [ ] เปลี่ยนจาก JSON Server เป็น Backend จริง (Node.js + Express หรือ NestJS)
- [ ] เพิ่มระบบ Authentication สำหรับผู้ดูแลระบบ
- [ ] เพิ่ม Real-time update ด้วย WebSocket หรือ Server-Sent Events
- [ ] เพิ่มระบบ Zone/Shift สำหรับจัดตารางเวรล่วงหน้า
- [ ] รองรับการ Export ตารางเวรเป็น PDF หรือ Excel
---
 
## 📝 หมายเหตุ
 
- โปรเจกต์นี้ใช้ `db.json` เป็น Mock Database สำหรับ Development เท่านั้น
- Port เริ่มต้นของ JSON Server คือ `3000` และ Frontend คือ `5173` หากมีการชนกันของ port สามารถแก้ได้ใน `package.json` และ `src/lib/api.js`

