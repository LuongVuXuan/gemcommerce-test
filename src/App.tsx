import { useState } from "react";
import clsx from "clsx";
import { UNITS } from "./const";
import { normalizeInputValue } from "./utils";

const App = () => {
  const [unit, setUnit] = useState(UNITS[0]);
  const [value, setValue] = useState("0");


  const [valueBoxHover, setValueBoxHover] = useState(false);

  const handleContentMouseEnter = () => setValueBoxHover(true);
  const handleContentMouseLeave = () => setValueBoxHover(false);

  // Xử lý thay đổi input (onInput cho contentEditable, chỉ cho 1 dòng)
  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    // Loại bỏ ký tự xuống dòng nếu có
    const text = e.currentTarget.innerText.replace(/\n|\r/g, "");
    if (e.currentTarget.innerText !== text) {
      e.currentTarget.innerText = text;
    }
    setValue(text);
  };

  // Khi mất focus: chuẩn hóa giá trị, loại bỏ ký tự không hợp lệ, giới hạn giá trị
  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    const normalized = normalizeInputValue(e.currentTarget.innerText, unit);
    setValue(normalized);
    e.currentTarget.innerText = normalized;
  };

  // Khi đổi đơn vị: nếu chuyển sang % và giá trị > 100 thì set về 100
  const handleSetUnit = (u: string) => {
    if (unit !== u) {
      const normalized = normalizeInputValue(value, u);
      setValue(normalized);
      setUnit(u);
    }
  };

  // Xử lý nút cộng/trừ: tăng/giảm giá trị, giới hạn theo đơn vị
  const handleMinus = () => {
    const num = parseFloat(value) || 0;
    if (num > 0) {
      const next = Math.max(0, unit === "%" ? num - 1 : num - 1);
      setValue(normalizeInputValue(next.toString(), unit));
    }
  };
  const handlePlus = () => {
    const num = parseFloat(value) || 0;
    if (unit === "%") {
      if (num < 100) {
        const next = Math.min(100, num + 1);
        setValue(normalizeInputValue(next.toString(), unit));
      }
    } else {
      setValue(normalizeInputValue((num + 1).toString(), unit));
    }
  };

  return (
    <div className="w-screen h-screen bg-[#303030] flex items-center justify-center text-neutral-100">
      <div className="w-[280px] h-[120px] bg-[#151515] p-4 flex flex-col gap-4">
        <div className="flex items-center">
          <div className="flex-1 text-[#aaa]">
            Unit
          </div>

          <div className="w-[140px] p-[2px] bg-[#212121] rounded-md">
            <div className="flex gap-[2px]">
              {
                UNITS.map((u, index) => (
                  <div
                    key={index}
                    className={clsx(
                      "flex flex-1 justify-center items-center h-9 rounded-md text-xs cursor-pointer select-none transition-colors duration-200",
                      u === unit
                        ? "bg-[#424242] text-[#f9f9f9]"
                        : "bg-[#212121] text-[#aaa] hover:bg-[#3b3b3b]"
                    )}
                    onClick={() => handleSetUnit(u)}
                  >
                    {u}
                  </div>
                ))
              }
            </div>

          </div>
        </div>

        <div className="flex items-center">
          <div className="flex-1 text-[#aaa]">Value</div>
          <div
            className={clsx(
              "w-[140px] h-9 rounded-md flex items-center text-xs transition-colors duration-200",
              valueBoxHover ? "bg-[#3b3b3b]" : "bg-[#212121]"
            )}
          >
            <div
              className={clsx(
                "w-9 h-9 cursor-pointer select-none text-[#f9f9f9] text-xl text-center leading-9 transition-colors duration-200 rounded-l-md",
                "hover:bg-[#3b3b3b]",
                parseFloat(value) <= 0 && "opacity-50 pointer-events-none"
              )}
              onClick={handleMinus}
            >
              -
            </div>
            <div
              contentEditable
              suppressContentEditableWarning
              className="flex-1 bg-transparent outline-none border-none text-center text-[#f9f9f9] leading-none px-1 min-w-0 focus:outline-none transition-colors duration-200 whitespace-nowrap overflow-x-hidden overflow-y-hidden"
              onInput={handleInput}
              onBlur={handleBlur}
              onKeyDown={e => {
                // Chặn Enter để không xuống dòng
                if (e.key === "Enter") e.preventDefault();
              }}
              onMouseEnter={handleContentMouseEnter}
              onMouseLeave={handleContentMouseLeave}
              spellCheck={false}
              // Không chặn nhập, chỉ xử lý khi blur
              ref={el => {
                if (el && el.innerText !== value) el.innerText = value;
              }}
            />
            <div
              className={clsx(
                "w-9 h-9 cursor-pointer select-none text-[#f9f9f9] text-xl text-center leading-9 transition-colors duration-200 rounded-r-md",
                "hover:bg-[#3b3b3b]",
                unit === "%" && parseFloat(value) >= 100 && "opacity-50 pointer-events-none"
              )}
              onClick={handlePlus}
            >
              +
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
