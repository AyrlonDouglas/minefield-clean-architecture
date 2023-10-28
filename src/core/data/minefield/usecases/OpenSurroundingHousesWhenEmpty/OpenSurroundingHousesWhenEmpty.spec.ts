import { CreateMinefieldBoard } from "../CreateMinefieldBoard/CreateMinefieldBoard"
import { MinefieldBoardHouseStateEnum } from "@domain/minefield/models/IMinefieldBoardHouse"
import { OpenSurroundingHousesWhenEmpty } from "./OpenSurroundingHousesWhenEmpty"

const makeSut = () => {
    const numberOfMines = 1
    const sizeOnXAxis = 5
    const sizeOnYAxis = 5

    const board = new CreateMinefieldBoard({
        numberOfMines,
        sizeOnXAxis,
        sizeOnYAxis
    }).create()

    const houseEmpty = board.boardHouses.find(row =>
        row.find(house => house.minesAround === 0
        ))![0]

    const sut = new OpenSurroundingHousesWhenEmpty({
        board,
        house: houseEmpty
    })
    return { sut, houseEmpty }
}

describe('OpenSurroundingHousesWhenEmpty', () => {
    test('Should open houses surround when mines arroung be 0', () => {
        const { sut, houseEmpty } = makeSut()
        const result = sut.open()
        const positionX = houseEmpty.position.x
        const positionY = houseEmpty.position.y
        const houseAroundAreOpen = result
            .boardHouses[positionX][positionY]
            .position.positionsAroundAvailable({
                sizeOnXAxis: result.sizeOnXAxis,
                sizeOnYAxis: result.sizeOnYAxis
            }).every(([x, y]) => {
                return result.boardHouses[x][y].state === MinefieldBoardHouseStateEnum.OPENED
            })

        expect(houseAroundAreOpen).toEqual(true)
    })
})