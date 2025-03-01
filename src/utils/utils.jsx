export function getAlarmSound(index) {
  return {
    name: `Alarm ${index + 1}`,
    url: `/sounds/alarm-${index + 1}.mp3`,
  };
}

export function hexToRgba(hex, opacity) {
  if (!hex || hex === "transparent") {
    return "transparent";
  }

  // Remove the hash at the start if it's there
  hex = hex.replace(/^#/, "");

  // Parse r, g, b values
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  // Return the rgba string
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}
