import { MinefieldBoardHouseContentEnum, MinefieldBoardHouseStateEnum } from "@domain/minefield/models/IMinefieldBoardHouse"
import { MarkMinefieldBoardHouse } from "./MarkMinefieldBoardHouse"
import { MinefieldBoardHouse } from "../../models/MinefieldBoardHouse"
import { Position } from "@data/common/models/Position"

const makeSut = (inefieldBoardHouseState: MinefieldBoardHouseStateEnum) => {
    const minefieldBoardHouse = new MinefieldBoardHouse({
        content: MinefieldBoardHouseContentEnum.FREE,
        minesAround: 0,
        position: new Position(0, 0),
        state: inefieldBoardHouseState
    })
    const sut = new MarkMinefieldBoardHouse(minefieldBoardHouse)
    return {
        sut,
        minefieldBoardHouse
    }
}

describe('MarkMinefieldBoardHouse', () => {
    test('Should dont mark when state is OPENED', () => {
        const { sut } = makeSut(MinefieldBoardHouseStateEnum.OPENED)
        const result = sut.mark()
        expect(result.state).toEqual(MinefieldBoardHouseStateEnum.OPENED)
    })

    test('Should mark when state is CLOSED', () => {
        const { sut } = makeSut(MinefieldBoardHouseStateEnum.CLOSED)
        const result = sut.mark()
        expect(result.state).toEqual(MinefieldBoardHouseStateEnum.MARKED)
    })

    test('Should change state to CLOSED when state is MARKED', () => {
        const { sut } = makeSut(MinefieldBoardHouseStateEnum.MARKED)
        const result = sut.mark()
        expect(result.state).toEqual(MinefieldBoardHouseStateEnum.CLOSED)
    })
})