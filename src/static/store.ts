import { writable } from "svelte/store";

export type cell = {
    num: number,
    hints: number[],
    ans: number
}

export const sudoku = writable<cell[][]>([])
export const screen = writable("start")

export function validateSudoku(sudoku: cell[][]){
    for (let i = 0; i < 9; i++){
        const row: Set<number> = new Set(), column: Set<number> = new Set()
        for (let j = 0; j < 9; j++){
            if (row.has(sudoku[i][j].ans)) return false
            if (column.has(sudoku[j][i].ans)) return false

            row.add(sudoku[i][j].ans)
            column.add(sudoku[j][i].ans)
        }
    }
    for (let i = 0; i < 9; i += 3){
        for (let j = 0; j < 9; j += 3){
            const square: Set<number> = new Set()

            for (let k = 0; k < 3; k++){
                for (let l = 0; l < 3; l++){
                    if (square.has(sudoku[i + k][j + l].ans)) return false
                    square.add(sudoku[i + k][j + l].ans)
                }
            }
        }
    }
    return true
}

