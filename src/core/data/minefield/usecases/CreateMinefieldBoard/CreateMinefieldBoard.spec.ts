import { MinefieldBoardHouseContentEnum } from "@domain/minefield/models/IMinefieldBoardHouse"
import { CreateMinefieldBoard } from "./CreateMinefieldBoard"

const makeSut = (params: {
    numberOfMines: number,
    sizeOnXAxis: number,
    sizeOnYAxis: number
}) => {
    const { numberOfMines, sizeOnXAxis, sizeOnYAxis } = params
    const sut = new CreateMinefieldBoard({
        numberOfMines,
        sizeOnXAxis,
        sizeOnYAxis
    })

    return { sut }
}

describe("CreateMinefieldBoard", () => {
    test('Should create corretly if params correts', () => {
        const paramsToMakeSut = {
            numberOfMines: 5,
            sizeOnXAxis: 5,
            sizeOnYAxis: 5
        }
        const { sut } = makeSut(paramsToMakeSut)
        const result = sut.create()
        const numberOfMines = result.boardHouses.reduce((prev, current) => {
            return prev + current.reduce((prev, current) => {
                return prev + (current.content === MinefieldBoardHouseContentEnum.MINE ? 1 : 0)
            }, 0)
        }, 0)
        const sizeOnXAxis = result.boardHouses.length
        const sizeOnYAxis = result.boardHouses[0].length

        expect(numberOfMines).toEqual(paramsToMakeSut.numberOfMines)
        expect(sizeOnXAxis).toEqual(paramsToMakeSut.sizeOnXAxis)
        expect(sizeOnYAxis).toEqual(paramsToMakeSut.sizeOnYAxis)
    })

    test("Shout throw some error when params is incorrect", () => {
        const paramsToMakeSut = {
            numberOfMines: 0,
            sizeOnXAxis: -1,
            sizeOnYAxis: 5
        }
        const { sut } = makeSut(paramsToMakeSut)
        const result = () => sut.create()
        expect(result).toThrow()
    })
})