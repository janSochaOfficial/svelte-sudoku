import { get, writable } from "svelte/store"
import { sudoku } from "./store"

export type position = {
    row: number,
    column: number
}

export const acctivePosition = writable<position>({row: -1, column: -1})
export const erase = writable(false)
export const hint = writable(false)

export function setNumber(pos: position, num: number){
    if (pos.column >= 0 && pos.row >= 0)
        sudoku.update((data) => {
            data[pos.row][pos.column].num = num;
            return data
        })
}

export function solveSudoku(){
    sudoku.update(data => data.
        map(row => row.
            map(cell => {
                return {
                    num: cell.ans,
                    ans: cell.ans,
                    hints: [],
                    immut: cell.immut
                }
            }))
    )
}

