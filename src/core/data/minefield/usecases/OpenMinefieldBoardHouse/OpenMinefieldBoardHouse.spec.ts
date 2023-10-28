import { MinefieldBoardHouse } from "@data/minefield/models/MinefieldBoardHouse"
import { OpenMinefieldBoardHouse } from "./OpenMinefieldBoardHouse"
import { MinefieldBoardHouseContentEnum, MinefieldBoardHouseStateEnum } from "@domain/minefield/models/IMinefieldBoardHouse"
import { Position } from "@data/common/models/Position"

const makeSut = (inefieldBoardHouseState: MinefieldBoardHouseStateEnum) => {
    const minefieldBoardHouse = new MinefieldBoardHouse({
        content: MinefieldBoardHouseContentEnum.FREE,
        minesAround: 0,
        position: new Position(0, 0),
        state: inefieldBoardHouseState
    })
    const sut = new OpenMinefieldBoardHouse(minefieldBoardHouse)
    return {
        sut,
        minefieldBoardHouse
    }
}

describe('OpenMinefieldBoardHouse', () => {
    test('Should dont open if MinefieldBoardHouse state is OPENED', () => {
        const { sut } = makeSut(MinefieldBoardHouseStateEnum.OPENED)
        const result = sut.open()
        expect(result.state).toEqual(MinefieldBoardHouseStateEnum.OPENED)
    })

    test('Should dont open if MinefieldBoardHouse state is MARKED', () => {
        const { sut } = makeSut(MinefieldBoardHouseStateEnum.MARKED)
        const result = sut.open()
        expect(result.state).toEqual(MinefieldBoardHouseStateEnum.MARKED)
    })

    test('Should open if MinefieldBoardHouse state is CLOSED', () => {
        const { sut } = makeSut(MinefieldBoardHouseStateEnum.CLOSED)
        const result = sut.open()
        expect(result.state).toEqual(MinefieldBoardHouseStateEnum.OPENED)
    })

})