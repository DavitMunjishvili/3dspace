import Button from "./Button";

interface CloseButtonProps {
  className?: string;
  onClick?: () => void;
}

export default function CloseButton({ className, onClick }: CloseButtonProps) {
  return (
    <Button iconButton color="red" className={className} onClick={onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        className="h-6 w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </Button>
  );
}
