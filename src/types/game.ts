export interface Player {
	name: string;
	symbol: "X" | "O";
	moves: { row: number; col: number }[];
}
