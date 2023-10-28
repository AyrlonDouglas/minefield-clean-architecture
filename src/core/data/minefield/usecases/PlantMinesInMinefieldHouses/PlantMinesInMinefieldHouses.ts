import { IMinefieldBoardHouse, MinefieldBoardHouseContentEnum } from "@domain/minefield/models/IMinefieldBoardHouse";
import { IPlantMinesInMinefieldHouses } from "@domain/minefield/usecases/IPlantMinesInMinefieldHouses";
import { cloneDeep } from "lodash";

interface PlantMinesInMinefieldHousesParams {
    minefieldHouses: IMinefieldBoardHouse[][]
    numberOfMines: number;
}

export class PlantMinesInMinefieldHouses implements IPlantMinesInMinefieldHouses {
    private templateMinefieldHouses: IMinefieldBoardHouse[][]
    private numberOfMines: number;

    constructor(params: PlantMinesInMinefieldHousesParams) {
        this.numberOfMines = params.numberOfMines
        this.templateMinefieldHouses = cloneDeep(params.minefieldHouses)
    }

    plant(): IMinefieldBoardHouse[][] {
        if (this.numberOfMines <= 0) {
            throw new Error('Number of mines must be greater than zero')
        }
        let minesPlantedInCells = 0
        while (minesPlantedInCells < this.numberOfMines) {
            const positionX = Math.floor(Math.random() * this.templateMinefieldHouses.length)
            const positionY = Math.floor(Math.random() * this.templateMinefieldHouses[0].length)
            const boardHouse = this.templateMinefieldHouses[positionX][positionY]
            if (boardHouse.content === MinefieldBoardHouseContentEnum.FREE) {
                boardHouse.content = MinefieldBoardHouseContentEnum.MINE
                minesPlantedInCells++
            }
        }
        return this.countMinesAround(this.templateMinefieldHouses)
    }

    private countMinesAround(boardHouses: IMinefieldBoardHouse[][]) {
        boardHouses.forEach(row => row.forEach(boardHouse => {
            boardHouse.position.positionsAroundAvailable({
                sizeOnXAxis: boardHouses.length,
                sizeOnYAxis: boardHouses[0].length
            }).forEach(([x, y]) => {
                if (boardHouses[x][y].content === MinefieldBoardHouseContentEnum.MINE) {
                    boardHouse.minesAround++
                }
            })
        }))
        return boardHouses
    }
}