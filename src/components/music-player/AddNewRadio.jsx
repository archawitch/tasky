import { useState, useRef } from "react";

function AddNewRadio({ visible, addNewRadio }) {
  const refUrl = useRef(null);
  const refName = useRef(null);
  const [id, setId] = useState("");
  const [isMatch, setIsMatch] = useState(false);
  return (
    <>
      <input
        ref={refUrl}
        onClick={(event) => event.stopPropagation()}
        onChange={(event) => {
          const url = event.target.value;
          var regExp =
            /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
          var match = url.match(regExp);
          if (match && match[7].length == 11) {
            setId(match[7]);
            setIsMatch(true);
            refName.current.focus();
          }
        }}
        style={{
          height: visible && !isMatch ? "auto" : "0",
          opacity: visible && !isMatch ? "1" : "0",
          paddingTop: visible && !isMatch ? "1rem" : "0",
          paddingBottom: visible && !isMatch ? "0.85rem" : "0",
          transitionDelay: visible ? "300ms" : "0ms",
          transitionDuration: visible ? "300ms" : "0ms",
        }}
        className="w-full bg-transparent outline-none transition-opacity"
        placeholder="paste a youtube URL"
      />
      <div
        style={{
          height: visible && isMatch ? null : "0",
          opacity: visible && isMatch ? "1" : "0",
          paddingTop: visible && isMatch ? "1rem" : "0",
          paddingBottom: visible && isMatch ? "0.85rem" : "0",
          transitionDelay: visible ? "150ms" : "0ms",
          transitionDuration: visible ? "150ms" : "0ms",
        }}
        className="flex w-full transition-opacity"
      >
        <input
          ref={refName}
          onClick={(event) => event.stopPropagation()}
          onKeyDown={(event) => {
            event.stopPropagation();
            if (event.code === "Enter") {
              if (event.target.value !== "" && id !== "") {
                const name = event.target.value;
                addNewRadio(id, name);
                refUrl.current.value = "";
                refName.current.value = "";
                setId("");
                setIsMatch(false);
              }
            } else if (event.code === "Escape") {
              setId("");
              setIsMatch(false);
              refUrl.current.value = "";
              refName.current.value = "";
              refUrl.current.focus();
            }
          }}
          style={{
            height: visible && isMatch ? null : "0",
            opacity: visible && isMatch ? "1" : "0",
            transitionDelay: visible ? "150ms" : "0ms",
            transitionDuration: visible ? "150ms" : "0ms",
          }}
          className="flex-grow bg-transparent outline-none transition-opacity"
          placeholder="add a name"
        />
        <button
          style={{
            height: visible && isMatch ? null : "0",
            opacity: visible && isMatch ? "1" : "0",
          }}
          onClick={(event) => {
            event.stopPropagation();
            setId("");
            setIsMatch(false);
            refUrl.current.value = "";
            refName.current.value = "";
            refUrl.current.focus();
          }}
          className="ml-[0.6rem] mr-[0.35rem] text-neutral-300 transition-colors hover:text-neutral-100"
        >
          cancel
        </button>
        <button
          style={{
            height: visible && isMatch ? null : "0",
            opacity: visible && isMatch ? "1" : "0",
          }}
          onClick={(event) => {
            event.stopPropagation();
            if (refName.current.value !== "" && id !== "") {
              const name = refName.current.value;
              addNewRadio(id, name);
              refUrl.current.value = "";
              refName.current.value = "";
              setId("");
              setIsMatch(false);
            }
          }}
          className="ml-[0.35rem] text-neutral-300 transition-colors hover:text-neutral-100"
        >
          ok
        </button>
      </div>
    </>
  );
}

export default AddNewRadio;
