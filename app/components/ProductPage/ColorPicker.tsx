import { RadioGroup } from "@headlessui/react";
import { generateProductColor } from "~/utils";

export type ColorOptionType = {
  id: number;
  label: string;
  value: string;
  extraPrice: number;
};

interface ProductColorPickerProps {
  onChange: (color: ColorOptionType) => void;
  value: ColorOptionType | null;
}

export default function ProductColorPicker({
  value,
  onChange,
}: ProductColorPickerProps) {
  const colorOptions: ColorOptionType[] = [
    { id: 0, label: "შავი", value: "black", extraPrice: 0 },
    { id: 1, label: "თეთრი", value: "white", extraPrice: 0 },
    { id: 2, label: "წითელი", value: "red", extraPrice: 5 },
    { id: 3, label: "ლურჯი", value: "blue", extraPrice: 5 },
    { id: 4, label: "ყვითელი", value: "yellow", extraPrice: 5 },
    { id: 5, label: "მწვანე", value: "green", extraPrice: 5 },
  ];

  const selectedColor = colorOptions.find((color) => value?.id === color.id);
  const label = selectedColor
    ? selectedColor.extraPrice
      ? selectedColor.label + ` (+${selectedColor.extraPrice} ლარი)`
      : selectedColor.label
    : "გთხოვთ აირჩიოთ 1 ფერი";

  return (
    <div>
      Color: <span className="font-bold">{label}</span>
      <input name="color" value={selectedColor?.value || ""} hidden readOnly />
      <RadioGroup value={selectedColor || null} onChange={onChange}>
        <RadioGroup.Label className="sr-only">Color</RadioGroup.Label>
        <div className="mt-2 flex gap-2">
          {colorOptions.map((color) => (
            <RadioGroup.Option
              key={color.id}
              value={color}
              className={({ checked }) =>
                `
                  ${checked ? "outline-none" : "outline-1 outline-offset-2 "}
                    flex cursor-pointer outline-indigo-900 ${generateProductColor(
                      color.value
                    )} rounded-full border border-black/50 p-3 shadow-md`
              }
            ></RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
}
