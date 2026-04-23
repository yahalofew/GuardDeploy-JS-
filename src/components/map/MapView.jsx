import { MapContainer, useMapEvents, Marker, Popup, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Layers from "./Layers";
import useDutyStore from "../../store/useDutyStore";
// ค่อยบอกว่าเราคิดไปตรงไหนของแผนที่แล้วจะได้ทำงานตามนั้น
const ClickToAdd = ({ adding, onPick }) => {
  // (ตัวดักจับเหตุการณ์) ลงบนแผนที่โดยตรง มาจาก leaflet map
  // หลังจบการทำงานนี้ก้จะเด้งไปหน้า modal ให้ตั้งชื่อสถานที่ต่อ
  useMapEvents({
    click(e){ 
      // เป็นจริงไหม จริงเก็บลง ฟังชั่นonPick ที่ส่งมาจาก App.jsx แล้วส่งค่า lat lng ไปด้วย
    if (adding) onPick(e.latlng.lat,e.latlng.lng);
      // map.flyTo(e.latlng );
    }
  });
};

const MapView = ({ adding, onPick }) => {
  // ดึงข้อมูล locations จาก store มาใช้
  const locations = useDutyStore((state) => state.locations);
  const center = [13, 100];
  return (
    // flex-1 พื้นที่เหลือเท่าไรเอาหมด ขยายเต็มพื้นที เพราะด้านขวาจองไว้ w-80
    <div className="flex-1 bg-blue-100 ">
      {/* แผนที่ของเรา */}
      <MapContainer
        // เติมความสูงให้เต็ม
        className="h-full"
        // จุดกึ่งกลางของแผนที่ ว่าเริ่มเปิดหน้าให้ตั้งไว้จุดไหน
        center={center}
        // เลขเยอะซูมเยอะ
        zoom={7}
        crollWheelZoom={true}
      >
        {/* เป็น รายการให้เลือกได้เปลีย่นไปแบบต่างๆ */}
        <Layers />
        
        {/* ดักจับการคลิก สร้างฟังก์ชันดัก เมื่อมีการคลิกที่mapจะส่งเข้า*/}
        {/* ส่ง turn กับพิกัดเข้าไป */}
        <ClickToAdd adding={adding} onPick={onPick} />

        {/* ลูป locations ที่ดึงมาจาก store แล้วแสดงเป็น marker บนแผนที่ */}
        {
          locations.map((loc,index)=>{
            return <Marker 
            key={index} 
            position={[loc.lat,loc.lng]}
              
            // แสดงpopup เมื่อคลิกที่ marker
            ><Popup>
              <div className="text-xs">
                <h3>{loc.name}</h3>
                <p>Lat: {loc.lat.toFixed(6)}</p>
                <p>Lng: {loc.lng.toFixed(6)}</p>
                
              </div>
              </Popup>
              {/* แสดงtooltip เมื่อเอาเมาส์ไปชี้ที่ marker */}
              <Tooltip direction="center">{loc.name}</Tooltip>
              </Marker>
          })
        }
      </MapContainer>
    </div>
  );
};

export default MapView;
