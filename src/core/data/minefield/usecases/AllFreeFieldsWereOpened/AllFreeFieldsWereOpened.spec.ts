import { AllFreeFieldsWereOpened } from "./AllFreeFieldsWereOpened"
import { mockBoardAllClosed, mockBoardWithAllFreeFieldsOpened, mockBoardWithSomeFreeFieldsOpened } from "../../test/MockAllFreeFieldsWereOpened"

const makeSut = (params: {
    openAllFreeField?: boolean,
    openSomeFreeFields?: boolean
}) => {
    const { openAllFreeField, openSomeFreeFields } = params
    let boardChosen
    switch (true) {
        case (openAllFreeField):
            boardChosen = mockBoardWithAllFreeFieldsOpened
            break
        case (openSomeFreeFields):
            boardChosen = mockBoardWithSomeFreeFieldsOpened
            break
        default:
            boardChosen = mockBoardAllClosed
    }
    const sut = new AllFreeFieldsWereOpened(boardChosen)
    return { sut }
}

describe('AllFreeFieldsWereOpened', () => {
    test('Should return false if all free fields were closed', () => {
        const { sut } = makeSut({})
        const result = sut.verify()
        expect(result).toEqual(false)
    })

    test('Should return false if some free fields were opned', () => {
        const { sut } = makeSut({ openSomeFreeFields: true })
        const result = sut.verify()
        expect(result).toEqual(false)
    })

    test('Should return true if all free fields were opened', () => {
        const { sut } = makeSut({ openAllFreeField: true })
        const result = sut.verify()
        expect(result).toEqual(true)
    })
})

