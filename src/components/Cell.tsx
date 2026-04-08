import { useState } from "react";

const CellValue = {
  X: "X",
  O: "O",
  EMPTY: "-",
} as const;

type CellValue = typeof CellValue[keyof typeof CellValue];

interface CellProps {
  row: number;
  col: number;
  value?: CellValue;
  onClick?: (row: number, col: number) => void;
  isGameOver?: boolean;
}

export function Cell({ row, col, value, onClick, isGameOver }: CellProps) {
  const [cellValue, setCellValue] = useState<CellValue>(CellValue.EMPTY);

  const handleClick = () => {
    if (cellValue === CellValue.EMPTY && value && !isGameOver) {
      setCellValue(value);
      onClick?.(row, col);
    }
  }

  return (
    <div className={`w-20 h-20 bg-white border border-gray-300 flex items-center justify-center text-2xl font-bold cursor-pointer ${cellValue === CellValue.X ? "text-amber-600" : cellValue === CellValue.O ? "text-blue-900" : "text-gray-300"} `}
      onClick={handleClick}>
      {cellValue}
    </div>
  );
}
