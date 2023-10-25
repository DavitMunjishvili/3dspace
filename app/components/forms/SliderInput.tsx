interface SlideInputProps {
  onChange: (value: number) => void;
  value: number;
  min: number;
  max: number;
}
export default function SliderInput({
  value,
  min,
  max,
  onChange,
}: SlideInputProps) {
  function handleChange(val: string) {
    onChange(parseInt(val));
  }

  return (
    <input
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={(e) => handleChange(e.currentTarget.value)}
    />
  );
}
