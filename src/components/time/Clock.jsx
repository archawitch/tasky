import { useEffect, useState } from "react";

function Clock() {
  const [time, setTime] = useState(["  ", "  "]);

  function getMonthInThai(n) {
    switch (n) {
      case 1:
        return "มกราคม";
      case 2:
        return "กุมภาพันธ์";
      case 3:
        return "มีนาคม";
      case 4:
        return "เมษายน";
      case 5:
        return "พฤษภาคม";
      case 6:
        return "มิถุนายน";
      case 7:
        return "กรกฎาคม";
      case 8:
        return "สิงหาคม";
      case 9:
        return "กันยายน";
      case 10:
        return "ตุลาคม";
      case 11:
        return "พฤศจิกายน";
      case 12:
        return "ธันวาคม";
      default:
        return "";
    }
  }

  function setClock() {
    const now = new Date();
    const date = now.getDate().toString().padStart(2, "0");
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    const hour = now.getHours().toString().padStart(2, "0");
    const minute = now.getMinutes().toString().padStart(2, "0");

    const currentDate = `${date} ${getMonthInThai(month)} ${year}`;
    const currentTime = `${hour}:${minute}`;
    setTime(() => [currentDate, currentTime]);
  }

  useEffect(() => {
    // initial clock setup
    setClock();
    // set clock on every second
    setInterval(() => {
      setClock();
    }, 1000);
  }, []);

  return (
    <div>
      <h3 className="text-l">{time[0]}</h3>
      <h3 className="text-l tracking-wider">{time[1]}</h3>
    </div>
  );
}

export default Clock;
