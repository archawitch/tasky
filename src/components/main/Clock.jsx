import { useEffect, useRef, useState } from "react";
import { useSettings } from "../../context/SettingsContext";

function Clock() {
  const refInterval = useRef(null);
  const [time, setTime] = useState(["", ""]);
  const settings = useSettings();
  const lang = settings.lang;

  function setClock() {
    const now = new Date();
    const date = now.getDate().toString().padStart(2, "0");
    const month =
      lang === "EN" ? engMonths[now.getMonth()] : thaiMonths[now.getMonth()];
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
    refInterval.current = setInterval(() => {
      setClock();
    }, 1000);

    return () => {
      if (refInterval.current) {
        clearInterval(refInterval.current);
      }
    };
  }, [lang]);

  return (
    <div className="hidden md:block">
      <h6 className="text-3xl leading-tight tracking-wide">{time[0]}</h6>
      <h6 className="text-base leading-none tracking-wide">{time[1]}</h6>
    </div>
  );
}

export default Clock;

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
