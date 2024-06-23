import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";

function ChangeBackground({ settings, dispatch }) {
  const fileRef = useRef(null);
  const maxFileSize = 5 * 1024 * 1024; // 5 MB

  const changeBackground = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      dispatch({
        type: "CHANGE_BACKGROUND_FROM_USER",
        userBackground: reader.result,
      });
    };

    if (file && file.size <= maxFileSize) {
      console.log(file.size);
      reader.readAsDataURL(file);
    } else {
      alert("file size exceeds 5 MB");
    }
  };

  return (
    <div className="mb-2 flex w-full items-center justify-between">
      <button
        onClick={() => {
          dispatch({
            type: "CHANGE_BACKGROUND",
            selectedBackground:
              settings.selectedBackground === 0
                ? 22
                : (settings.selectedBackground - 1) % 21,
          });
        }}
      >
        <FontAwesomeIcon icon="fa-solid fa-arrow-left" />
      </button>
      <button onClick={() => fileRef.current.click()}>Change background</button>
      <input
        ref={fileRef}
        onChange={changeBackground}
        type="file"
        accept="image/png, image/jpeg"
        className="hidden"
      ></input>
      <button
        onClick={() => {
          dispatch({
            type: "CHANGE_BACKGROUND",
            selectedBackground:
              settings.selectedBackground === 22
                ? 0
                : (settings.selectedBackground + 1) % 21,
          });
        }}
      >
        <FontAwesomeIcon icon="fa-solid fa-arrow-right" />
      </button>
    </div>
  );
}

export default ChangeBackground;
