import { useEffect, useState } from "react";

function Clock() {
  const [time, setTime] = useState(["", ""]);
  const engMonths = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const thaiMonths = [
    "ม.ค",
    "ก.พ",
    "มี.ค",
    "เม.ย",
    "พ.ค",
    "มิ.ย",
    "ก.ค",
    "ส.ค",
    "ก.ย",
    "ต.ค",
    "พ.ย",
    "ธ.ค",
  ];

  function setClock() {
    const now = new Date();
    const date = now.getDate().toString().padStart(2, "0");
    const month = engMonths[now.getMonth()];
    const year = now.getFullYear();
    const hour = now.getHours().toString().padStart(2, "0");
    const minute = now.getMinutes().toString().padStart(2, "0");

    const currentDate = `${date} ${month} ${year}`;
    const currentTime = `${hour}:${minute}`;
    setTime(() => [currentTime, currentDate]);
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
    <div className="hidden md:block">
      <h6 className="text-3xl leading-tight tracking-wide">{time[0]}</h6>
      <h6 className="text-base leading-none tracking-wide">{time[1]}</h6>
    </div>
  );
}

export default Clock;
