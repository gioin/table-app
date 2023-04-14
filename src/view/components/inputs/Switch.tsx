import { useEffect, useState } from "react";

interface ToggleProp {
  onCheck: (e: boolean) => any;
  checked: boolean;
  disabled?: boolean;
}

function Switch({ onCheck, checked, disabled = false }: ToggleProp) {
  const [enabled, setEnabled] = useState(checked);

  useEffect(() => {
    setEnabled(enabled);
  }, [enabled]);

  console.log("enabled", enabled);

  // useEffect(() => {
  // }, [enabled, onCheck])

  return (
    <div
      className="relative flex flex-col items-center justify-center"
      style={{
        pointerEvents: disabled ? "none" : "auto",
        opacity: disabled ? "0.5" : "auto"
      }}
    >
      <div className="flex">
        <label className="inline-flex relative items-center mr-5 h-[25px]">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={enabled}
            readOnly
          />
          <div
            onClick={() => {
              setEnabled(!enabled);
              onCheck(!enabled);
            }}
            className="w-10 h-4 cursor-pointer bg-[#f89797] rounded-full peer peer-focus:ring-green-300  peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[0.5px] after:left-[-4px] after:bg-[#fc0606] after:peer-checked:bg-[#44a0d3] after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#b1d4e7]"
          ></div>
        </label>
      </div>
    </div>
  );
}

export default Switch;
