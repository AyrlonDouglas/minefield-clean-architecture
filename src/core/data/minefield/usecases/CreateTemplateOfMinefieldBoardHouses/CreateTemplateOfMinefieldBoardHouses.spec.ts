import { MinefieldBoardHouseContentEnum, MinefieldBoardHouseStateEnum } from "@domain/minefield/models/IMinefieldBoardHouse"
import { CreateTemplateOfMinefieldBoardHouses } from "./CreateTemplateOfMinefieldBoardHouses"
import { Position } from "@data/common/models/Position"
import { MinefieldBoardHouse } from "../../models/MinefieldBoardHouse"

const makeSut = (params: { sizeOnXAxis: number, sizeOnYAxis: number }) => {
    const sut = new CreateTemplateOfMinefieldBoardHouses({
        sizeOnXAxis: params.sizeOnXAxis,
        sizeOnYAxis: params.sizeOnYAxis
    })

    return { sut }
}

const templateElement = (params: { positionX: number, positionY: number }) => {
    return new MinefieldBoardHouse({
        content: MinefieldBoardHouseContentEnum.FREE,
        minesAround: 0,
        position: new Position(params.positionX, params.positionY),
        state: MinefieldBoardHouseStateEnum.CLOSED
    })
}

const templateMock = [
    [
        templateElement({ positionX: 0, positionY: 0 }),
        templateElement({ positionX: 0, positionY: 1 })
    ],
    [
        templateElement({ positionX: 1, positionY: 0 }),
        templateElement({ positionX: 1, positionY: 1 })
    ]
]

describe('CreateTemplateOfMinefieldBoardHouses', () => {
    test('Should throw error when sizeOnXAxis less than zero', () => {
        const { sut } = makeSut({ sizeOnXAxis: 0, sizeOnYAxis: 1 })
        const result = () => sut.create()
        expect(result).toThrow('size axis must be greater than zero')// criar metodo pra auxuliar os erros
    })

    test('Should throw error when sizeOnYAxis less than zero', () => {
        const { sut } = makeSut({ sizeOnXAxis: 1, sizeOnYAxis: 0 })
        const result = () => sut.create()
        expect(result).toThrow('size axis must be greater than zero')// criar metodo pra auxuliar os erros
    })

    test('Should create template when sizeOnYAxis and sizeOnXAxis be geater than zero', () => {
        const { sut } = makeSut({ sizeOnXAxis: 2, sizeOnYAxis: 2 })
        const result = sut.create()
        expect(result).toEqual(templateMock)
    })
})