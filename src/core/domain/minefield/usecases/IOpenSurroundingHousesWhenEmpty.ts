import { IMinefieldBoard } from "../models/IMinefieldBoard";

export interface IOpenSurroundingHousesWhenEmpty {
    open: () => IMinefieldBoard
}