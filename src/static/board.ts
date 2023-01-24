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
    if (!(pos.column >= 0 && pos.row >= 0)) return

    if (get(hint)){
        sudoku.update((data) => {
            data[pos.row][pos.column].num = null
            if (data[pos.row][pos.column].hints.includes(num))
                data[pos.row][pos.column].hints = data[pos.row][pos.column].hints.filter(e => e != num)
            else
                data[pos.row][pos.column].hints.push(num);
            return data
        })
    }
    else
        sudoku.update((data) => {
            data[pos.row][pos.column].num = num;
            data[pos.row][pos.column].hints = []
            return data
        })
        Movement.next()
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

export class Movement{

    static next(){
        const actPos = get(acctivePosition)
        actPos.column += 1
        if (actPos.column > 8) {
            actPos.column = 0
            actPos.row += 1
        }
        if (actPos.row > 8){
            actPos.column = 0
            actPos.row = 0
        }
        acctivePosition.set(actPos)
        if (get(sudoku)[actPos.row][actPos.column].immut){
            this.next()
            return
        }
    }
    
    static prev(){
        const actPos = get(acctivePosition)
        actPos.column -= 1
        if (actPos.column < 0) {
            actPos.column = 8
            actPos.row -= 1
        }
        if (actPos.row < 0){
            actPos.column = 8
            actPos.row = 8
        }
        acctivePosition.set(actPos)
        if (get(sudoku)[actPos.row][actPos.column].immut){
            this.prev()
            return
        }
    }
    
    static above(){
        const actPos = get(acctivePosition)
        actPos.row -= 1
        if (actPos.row < 0) {
            actPos.row = 8 
        }
        acctivePosition.set(actPos)
        if (get(sudoku)[actPos.row][actPos.column].immut){
            this.next()
            return
        }
    }
    
    static bellow(){
        const actPos = get(acctivePosition)
        actPos.row += 1
        if (actPos.row < 0) {
            actPos.row = 0
        }
        acctivePosition.set(actPos)
        if (get(sudoku)[actPos.row][actPos.column].immut){
            this.next()
            return
        }
    }

    static clear(){
        const actPos = get(acctivePosition)
        sudoku.update(data => {
            data[actPos.row][actPos.column].num = null
            data[actPos.row][actPos.column].hints = []
            return data
        })
        this.prev()
    }
} 

