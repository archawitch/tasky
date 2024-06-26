import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ActivityCalendar from "react-activity-calendar";
import { useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";
import {
  useActivity,
  DateToString,
} from "../../context/ActivityCalendarContext";
import { useSettings } from "../../context/SettingsContext";

function Activity({ closeStats }) {
  const settings = useSettings();
  const [isLoading, setIsLoading] = useState(true);
  const { s_now, s_lastDate } = getDateInfo();
  const [data, setData] = useState([
    {
      date: s_lastDate,
      count: 0,
      level: 0,
    },
    {
      date: s_now,
      count: 0,
      level: 0,
    },
  ]);
  const activities = useActivity();

  function getDateInfo() {
    const now = new Date(Date.now());
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const lastDate = new Date(
      now.getFullYear() - 1,
      now.getMonth(),
      now.getDate() + 1,
    );
    let s_now = DateToString(today);
    let s_lastDate = DateToString(lastDate);
    return { today, lastDate, s_now, s_lastDate };
  }

  function getBlockLabel(activity) {
    if (settings.lang == "EN") {
      const mins = `${activity.count % 60} ${activity.count % 60 === 1 ? "min" : "mins"}`;
      const hours =
        activity.count >= 60
          ? `${Math.floor(activity.count / 60)} ${activity.count / 60 >= 2 ? "hrs" : "hr"}`
          : "";
      return `${hours} ${mins} on ${activity.date}`.trim();
    } else {
      const mins = `${activity.count % 60} นาที`;
      const hours =
        activity.count >= 60 ? `${Math.floor(activity.count / 60)} ชม` : "";
      return `${hours} ${mins} เมื่อ ${activity.date}`.trim();
    }
  }

  useEffect(() => {
    setIsLoading(true);
    if (activities && activities.length > 0) {
      let { today, lastDate, s_now, s_lastDate } = getDateInfo();
      let aggregatedData = {};
      aggregatedData[s_lastDate] = 0;
      // aggregate the data by date
      activities.forEach((entry) => {
        const { date, spent } = entry;
        const d_date = new Date(date);
        while (d_date > lastDate && lastDate < today) {
          lastDate.setDate(lastDate.getDate() + 1);
          s_lastDate = DateToString(lastDate);
          aggregatedData[s_lastDate] = 0;
        }
        aggregatedData[date] += spent;
      });

      // fill in the last date of the year
      if (!aggregatedData[s_now]) {
        aggregatedData[s_now] = 0;
      }

      // format the data
      setData(() => {
        return Object.keys(aggregatedData).map((date) => ({
          date,
          count: aggregatedData[date],
          level: Math.min(4, Math.ceil(aggregatedData[date] / 60.0)),
        }));
      });
    }

    setIsLoading(false);
  }, []);

  return (
    <div
      style={{
        opacity: isLoading ? "0" : "1",
        transition: "opacity 0.15s",
      }}
      className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center px-[3rem] py-[2.4rem]"
    >
      <button
        onClick={closeStats}
        className="absolute right-[3rem] top-[2.4rem] text-2xl"
      >
        <FontAwesomeIcon icon="fa-solid fa-xmark" />
      </button>
      <div className="rounded-lg bg-neutral-800/80 p-4">
        <ActivityCalendar
          data={data}
          blockSize={16}
          blockRadius={4}
          blockMargin={4}
          colorScheme="dark"
          theme={{
            dark: ["hsl(0, 0%, 22%)", "hsl(225,92%,77%)"],
          }}
          labels={settings.lang === "EN" ? en_label : th_label}
          renderBlock={(block, activity) =>
            React.cloneElement(block, {
              "data-tooltip-id": "react-tooltip",
              "data-tooltip-html": getBlockLabel(activity),
            })
          }
        ></ActivityCalendar>
        <Tooltip
          id="react-tooltip"
          style={{
            fontSize: "0.6rem",
            letterSpacing: "0",
            fontWeight: "normal",
          }}
          className="text-xs tracking-normal"
        ></Tooltip>
      </div>
    </div>
  );
}

export default Activity;

const th_label = {
  months: [
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
  ],
  totalCount: "คุณโฟกัสไป {{count}} นาทีนับจากปีที่แล้ว",
  legend: {
    less: "น้อย",
    more: "มาก",
  },
};

const en_label = {
  totalCount: "{{count}} minutes last year",
};
