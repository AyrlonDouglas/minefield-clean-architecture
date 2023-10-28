import { MinefieldBoardHouseContentEnum } from "@domain/minefield/models/IMinefieldBoardHouse"
import { CreateTemplateOfMinefieldBoardHouses } from "../CreateTemplateOfMinefieldBoardHouses/CreateTemplateOfMinefieldBoardHouses"
import { PlantMinesInMinefieldHouses } from "./PlantMinesInMinefieldHouses"

const makeSut = ({ numberOfMines }: { numberOfMines: number }) => {
    const sizeOnXAxis = 3
    const sizeOnYAxis = 3

    const minefieldHouses = new CreateTemplateOfMinefieldBoardHouses({
        sizeOnXAxis,
        sizeOnYAxis
    }).create()

    const sut = new PlantMinesInMinefieldHouses({
        minefieldHouses,
        numberOfMines
    })

    return { sut, minefieldHouses, sizeOnXAxis, sizeOnYAxis }
}

describe('PlantMinesInMinefieldHouses', () => {
    test('Should throw an error when number of mines is equal to or less than zero', () => {
        const { sut } = makeSut({ numberOfMines: 0 })
        const result = () => sut.plant()
        expect(result).toThrowError('Number of mines must be greater than zero')
    })

    test('should plant bombs when numerOfMines is greater than zero', () => {
        const numberOfMines = 2
        const { sut, minefieldHouses } = makeSut({ numberOfMines })
        const result = sut.plant()
        const minesPlantedCount = result.reduce((prev, current) => {
            return prev + current.reduce((prev, current) => {
                return prev + (current.content === MinefieldBoardHouseContentEnum.MINE ? 1 : 0)
            }, 0)
        }, 0)
        expect(result).toBeDefined()
        expect(minesPlantedCount).toEqual(numberOfMines)
        expect(result).not.toEqual(minefieldHouses)
    })

    test('should count the number of mines around right', () => {
        const numberOfMines = 2
        const { sut, sizeOnXAxis, sizeOnYAxis } = makeSut({ numberOfMines })
        const result = sut.plant()

        const largestMinesAround = result.reduce((prev, current) => {
            const lagestInCurrentRow = current.reduce((prev, current) => {
                return current.minesAround > prev ? current.minesAround : prev
            }, 0)
            return lagestInCurrentRow > prev ? lagestInCurrentRow : prev
        }, 0)
        const hasSomeMine = result.some(row => row.some(boardHouse => boardHouse.minesAround > 0))
        const countIsAssertive = result.every(row => row.every(boardHouse => {
            let minesAround = 0
            boardHouse.position.positionsAroundAvailable({ sizeOnXAxis, sizeOnYAxis })
                .forEach(([x, y]) => {
                    if (result[x][y].content === MinefieldBoardHouseContentEnum.MINE) {
                        minesAround++
                    }
                })
            return boardHouse.minesAround === minesAround
        }))

        expect(hasSomeMine).toEqual(true)
        expect(largestMinesAround).toBeLessThanOrEqual(numberOfMines)
        expect(countIsAssertive).toEqual(true)
    })
})