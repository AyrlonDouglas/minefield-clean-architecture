import { IMinefieldBoardHouse } from "../models/IMinefieldBoardHouse";

export interface IPlantMinesInMinefieldHouses {
    plant: () => IMinefieldBoardHouse[][]
}