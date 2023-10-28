import { MinefieldBoardHouseContentEnum, MinefieldBoardHouseStateEnum } from "@domain/minefield/models/IMinefieldBoardHouse"
import { MinefieldBoardHouse } from "../../models/MinefieldBoardHouse"
import { UpdateBoardHouseInBoard } from "./UpdateBoardHouseInBoard"
import { Position } from "@data/common/models/Position"
import { CreateMinefieldBoard } from "../CreateMinefieldBoard/CreateMinefieldBoard"

const makeSut = (params: { positionX: number, positionY: number }) => {
    const { positionX, positionY } = params
    const sizeOnXAxis = 3
    const sizeOnYAxis = 3
    const numberOfMines = 3

    const board = new CreateMinefieldBoard({
        numberOfMines,
        sizeOnXAxis,
        sizeOnYAxis
    }).create()

    const boardHouse = new MinefieldBoardHouse({
        content: MinefieldBoardHouseContentEnum.MINE,
        state: MinefieldBoardHouseStateEnum.MARKED,
        position: new Position(positionX, positionY),
        minesAround: 100
    })

    const sut = new UpdateBoardHouseInBoard({
        board,
        boardHouse
    })

    return { sut, board, boardHouse }
}

describe('UpdateBoardHouseInBoard', () => {
    test('should trhow error when house board is not found', () => {
        const { sut } = makeSut({ positionX: 9, positionY: 9 })
        const result = () => sut.update()
        expect(result).toThrowError("Positions do not exist on the board")
    })

    test('should trhow error when position in X or Y is negative', () => {
        const { sut } = makeSut({ positionX: -1, positionY: -1 })
        const result = () => sut.update()
        expect(result).toThrowError("Size axis must be greater than zero")
    })

    test('Should updated house board when found', () => {
        const positionX = 0
        const positionY = 1
        const { sut, board, boardHouse } = makeSut({ positionX, positionY })
        const result = sut.update()
        const boardHouseUpdate = result.boardHouses[positionX][positionY]
        expect(result).not.toEqual(board)
        expect(boardHouseUpdate).toEqual(boardHouse)
    })
})