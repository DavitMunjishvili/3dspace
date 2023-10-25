import { RadioGroup } from "@headlessui/react";
import { useEffect, useState } from "react";
import Input from "../forms/Input";
import SliderInput from "../forms/SliderInput";

interface ProductScalePickerProps {
  onChange: (value: "default" | number) => void;
  value: "default" | number;
}

export default function ProductScalePicker({
  value,
  onChange,
}: ProductScalePickerProps) {
  const [isCustom, setIsCustom] = useState<boolean>(value !== "default");
  const [customValue, setCustomValue] = useState<number>(
    typeof value === "number" ? value : 100
  );

  const label = isCustom ? customValue : "ფაილის ზომა";

  useEffect(() => {
    if (isCustom) onChange(customValue);
    else onChange("default");
  }, [isCustom, customValue, onChange]);

  return (
    <div>
      ზომა: <span className="font-bold">{label}</span>
      <input name="scale" value={value} readOnly hidden />
      <RadioGroup value={isCustom} onChange={setIsCustom}>
        <RadioGroup.Label className="sr-only">ზომა</RadioGroup.Label>
        <div className="mt-2 flex gap-2">
          <RadioGroup.Option
            value={false}
            className={({ checked }) =>
              "flex cursor-pointer rounded-full border border-black/50 px-3 py-2 shadow-md outline-indigo-900 duration-150" +
              (checked ? " bg-indigo-200" : " bg-indigo-50 hover:bg-indigo-100")
            }
          >
            ფაილის ზომა
          </RadioGroup.Option>
          <RadioGroup.Option
            value={true}
            className={({ checked }) =>
              "flex cursor-pointer rounded-full border border-black/50 px-3 py-2 shadow-md outline-indigo-900 duration-150" +
              (checked ? " bg-indigo-200" : " bg-indigo-50 hover:bg-indigo-100")
            }
          >
            ზომის არჩევა
          </RadioGroup.Option>
        </div>
      </RadioGroup>
      {isCustom && (
        <div className="mt-4 flex items-center gap-4">
          <SliderInput
            value={customValue}
            onChange={setCustomValue}
            min={10}
            max={300}
          />
          <Input type="number" value={customValue} onChange={setCustomValue} />
        </div>
      )}
    </div>
  );
}
