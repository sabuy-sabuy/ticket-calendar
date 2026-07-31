function calculateDate() {
    let input = document.getElementById("travelDate").value;
    let resultDiv = document.getElementById("result");

    if(!input) {
        resultDiv.innerHTML = "<span style='color: red;'>⚠️ กรุณาเลือกวันที่เดินทางก่อนครับ!</span>";
        return;
    }

    // คำนวณวันที่ต้องจอง (ลบ 90 วัน)
    let travelDate = new Date(input);
    let bookingDate = new Date(travelDate);
    bookingDate.setDate(bookingDate.getDate() - 90); 
    
    let day = bookingDate.getDate().toString().padStart(2, '0');
    let month = (bookingDate.getMonth() + 1).toString().padStart(2, '0');
    let year = bookingDate.getFullYear();

    // แปลงวันที่สำหรับ Google Calendar (รูปแบบ YYYYMMDDTHHmm00)
    // ตั้งเวลา 08:15 น. ถึง 08:30 น.
    let startDateStr = year + month + day + "T081500";
    let endDateStr = year + month + day + "T083000";

    // ข้อมูลที่จะใส่ในปฏิทิน
    let eventTitle = encodeURIComponent("✈️ เตรียมจองตั๋วเดินทางวันที่ " + input);
    let eventDetails = encodeURIComponent("ได้เวลาเข้าไปจองตั๋วแล้ว! รีบเตรียมตัวเข้าเว็บ ระบบจะเปิดให้จองเวลา 08:30 น.");
    
    // สร้างลิงก์ Google Calendar
    let calLink = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&dates=${startDateStr}/${endDateStr}&details=${eventDetails}`;

    // แสดงผลบนหน้าเว็บ
    let message = `<span style='color: #d9534f; font-size: 1.2em; font-weight: bold;'>
                     🎉 วันที่ต้องกดจองตั๋ว: ${day}/${month}/${year} เวลา 08:30 น.
                   </span><br><br>`;
    
    message += `<a href="${calLink}" target="_blank" 
                   style="background-color: #4285F4; color: white; padding: 12px 24px; 
                          text-decoration: none; border-radius: 8px; font-weight: bold; 
                          display: inline-block; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                   📅 เพิ่มเตือนความจำลง Google Calendar
                </a>`;
                
    resultDiv.innerHTML = message;
}