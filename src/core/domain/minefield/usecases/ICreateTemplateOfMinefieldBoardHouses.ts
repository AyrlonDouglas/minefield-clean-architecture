import { IMinefieldBoardHouse } from "../models/IMinefieldBoardHouse";

export interface ICreateTemplateOfMinefieldBoardHouses {
    create: () => IMinefieldBoardHouse[][]
}