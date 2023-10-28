import { IMinefieldBoard } from "@domain/minefield/models/IMinefieldBoard";
import { IMinefieldBoardHouse } from "@domain/minefield/models/IMinefieldBoardHouse";
import { IUpdateBoardHouseInBoard } from "@domain/minefield/usecases/IUpdateBoardHouseInBoard";
import { cloneDeep } from "lodash";

interface UpdateBoardHouseInBoardParams {
    board: IMinefieldBoard
    boardHouse: IMinefieldBoardHouse
}

export class UpdateBoardHouseInBoard implements IUpdateBoardHouseInBoard {
    private board: IMinefieldBoard
    private boardHouse: IMinefieldBoardHouse

    constructor(params: UpdateBoardHouseInBoardParams) {
        this.board = cloneDeep(params.board)
        this.boardHouse = cloneDeep(params.boardHouse)
    }

    update(): IMinefieldBoard {
        const positionX = this.boardHouse.position.x
        const positionY = this.boardHouse.position.y
        this.positionIsValid()
        this.board.boardHouses[positionX][positionY] = this.boardHouse
        return this.board
    }

    private positionIsValid() {
        const positionX = this.boardHouse.position.x
        const positionY = this.boardHouse.position.y
        const sizeOnXAxis = this.board.boardHouses.length
        const sizeOnYAxis = this.board.boardHouses[0].length

        if (positionX < 0 || positionY < 0) {
            throw new Error('Size axis must be greater than zero')
        }

        if (positionX >= sizeOnXAxis || positionY >= sizeOnYAxis) {
            throw new Error("Positions do not exist on the board")
        }

    }
}