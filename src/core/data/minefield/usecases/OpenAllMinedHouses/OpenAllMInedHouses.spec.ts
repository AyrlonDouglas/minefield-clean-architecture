import { MinefieldBoardHouseContentEnum, MinefieldBoardHouseStateEnum } from "@domain/minefield/models/IMinefieldBoardHouse"
import { CreateMinefieldBoard } from "../CreateMinefieldBoard/CreateMinefieldBoard"
import { OpenAllMinedHouses } from "./OpenAllMInedHouses"

const makeSut = () => {
    const numberOfMines = 5
    const sizeOnXAxis = 5
    const sizeOnYAxis = 5
    const board = new CreateMinefieldBoard({
        numberOfMines,
        sizeOnXAxis,
        sizeOnYAxis
    }).create()

    const sut = new OpenAllMinedHouses(board)
    return { sut, board }
}

describe('OpenAllMinedHouses', () => {
    test('Should open all mined houses when called', () => {
        const { sut, board } = makeSut()
        const result = sut.open()
        const allHousesMinedBeenOpened = !result
            .boardHouses
            .some(row => row
                .some(house => house.content === MinefieldBoardHouseContentEnum.MINE
                    && house.state !== MinefieldBoardHouseStateEnum.OPENED))

        expect(result).not.toEqual(board)
        expect(allHousesMinedBeenOpened).toEqual(true)
    })
})