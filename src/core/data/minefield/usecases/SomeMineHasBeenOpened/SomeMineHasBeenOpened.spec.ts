import { MinefieldBoardHouse } from "@data/minefield/models/MinefieldBoardHouse"
import { SomeMineHasBeenOpened } from "./SomeMineHasBeenOpened"
import { UpdateBoardHouseInBoard } from "../UpdateBoardHouseInBoard/UpdateBoardHouseInBoard"
import { MinefieldBoardHouseContentEnum, MinefieldBoardHouseStateEnum } from "@domain/minefield/models/IMinefieldBoardHouse"
import { Position } from "@data/common/models/Position"
import { CreateMinefieldBoard } from "../CreateMinefieldBoard/CreateMinefieldBoard"

const makeSut = ({ open }: { open: boolean }) => {
    const sizeOnXAxis = 3
    const sizeOnYAxis = 3
    const numberOfMines = 3

    const board = new CreateMinefieldBoard({
        numberOfMines,
        sizeOnXAxis,
        sizeOnYAxis
    }).create()

    const boardHouseMinedAndOpened = new MinefieldBoardHouse({
        content: MinefieldBoardHouseContentEnum.MINE,
        state: open ? MinefieldBoardHouseStateEnum.OPENED : MinefieldBoardHouseStateEnum.CLOSED,
        position: new Position(0, 0),
        minesAround: 100
    })

    const boardWithMineOpened = new UpdateBoardHouseInBoard({
        board,
        boardHouse: boardHouseMinedAndOpened
    }).update()

    const sut = new SomeMineHasBeenOpened(boardWithMineOpened)

    return { sut }
}

describe('SomeMineHasBeenOpened', () => {
    test('Should return true when some mine has been opend', () => {
        const { sut } = makeSut({ open: true })
        const result = sut.verify()
        expect(result).toEqual(true)
    })

    test('Should return false when none mine has been opend', () => {
        const { sut } = makeSut({ open: false })
        const result = sut.verify()
        expect(result).toEqual(false)
    })
})