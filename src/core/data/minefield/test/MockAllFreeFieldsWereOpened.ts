import { cloneDeep } from "lodash";
import { CreateMinefieldBoard } from "../usecases/CreateMinefieldBoard/CreateMinefieldBoard";
import { OpenMinefieldBoardHouse } from "../usecases/OpenMinefieldBoardHouse/OpenMinefieldBoardHouse";

const numberOfMines = 5
const sizeOnXAxis = 5
const sizeOnYAxis = 5

export const mockBoardAllClosed = new CreateMinefieldBoard({
    numberOfMines,
    sizeOnXAxis,
    sizeOnYAxis
}).create()
export const mockBoardWithAllFreeFieldsOpened = makeMockBoardWithAllFreeFieldsOpened()
export const mockBoardWithSomeFreeFieldsOpened = makeMockBoardSomeFreeFieldsOpened()

function makeMockBoardSomeFreeFieldsOpened() {
    const boardCopy = cloneDeep(mockBoardAllClosed)
    let anyAlreadyOpen = false
    while (!anyAlreadyOpen) {
        const positionX = Math.floor(Math.random() * sizeOnXAxis)
        const positionY = Math.floor(Math.random() * sizeOnYAxis)
        const houseToOpen = boardCopy.boardHouses[positionX][positionY]
        const houseToCompare = cloneDeep(houseToOpen)
        new OpenMinefieldBoardHouse(houseToOpen).open()
        if (houseToOpen.state != houseToCompare.state) {
            anyAlreadyOpen = true
        }
    }
    return boardCopy
}

function makeMockBoardWithAllFreeFieldsOpened() {
    const boardCopy = cloneDeep(mockBoardAllClosed)
    boardCopy.boardHouses.forEach(row => {
        row.forEach(house => {
            new OpenMinefieldBoardHouse(house).open()
        })
    })
    return boardCopy
}