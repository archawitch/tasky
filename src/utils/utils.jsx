export function getAlarmSound(index) {
  return {
    name: `Alarm ${index + 1}`,
    url: `/sounds/alarm-${index + 1}.mp3`,
  };
}
