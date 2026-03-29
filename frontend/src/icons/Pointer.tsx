import s from "./Pointer.module.css";

interface PointerProps {
  clicked?: boolean;
  onClick?: () => void;
}

export const Pointer = ({ clicked, onClick }: PointerProps) => {
  return (
    <svg
      className={s.pointer}
      onClick={onClick}
      width="6"
      height="6"
      viewBox="0 0 6 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.33887 2.98814L2.83887 0.68045L0.338868 2.98814M2.83887 1.06507L2.83887 5.68045"
        stroke={clicked ? "#334155" : "#64748B"}
      />
    </svg>
  );
};
