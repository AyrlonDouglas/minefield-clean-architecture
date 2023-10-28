import { AllFreeFieldsWereOpened } from "@data/minefield/usecases/AllFreeFieldsWereOpened/AllFreeFieldsWereOpened";
import { CreateMinefieldBoard } from "@data/minefield/usecases/CreateMinefieldBoard/CreateMinefieldBoard";
import { MarkMinefieldBoardHouse } from "@data/minefield/usecases/MarkMinefieldBoardHouse/MarkMinefieldBoardHouse";
import { OpenAllMinedHouses } from "@data/minefield/usecases/OpenAllMinedHouses/OpenAllMInedHouses";
import { OpenMinefieldBoardHouse } from "@data/minefield/usecases/OpenMinefieldBoardHouse/OpenMinefieldBoardHouse";
import { OpenSurroundingHousesWhenEmpty } from "@data/minefield/usecases/OpenSurroundingHousesWhenEmpty/OpenSurroundingHousesWhenEmpty";
import { SomeMineHasBeenOpened } from "@data/minefield/usecases/SomeMineHasBeenOpened/SomeMineHasBeenOpened";
import { UpdateBoardHouseInBoard } from "@data/minefield/usecases/UpdateBoardHouseInBoard/UpdateBoardHouseInBoard";
import { IMinefieldBoard } from "@domain/minefield/models/IMinefieldBoard";
import { IMinefieldBoardHouse } from "@domain/minefield/models/IMinefieldBoardHouse";
import { forwardRef, useCallback, useEffect, useState } from "react";
import SkullIcon from "@presentation/components/icons/Skull";
import "./style.css";
import AppBoardHouse from "../BoardHouse";

export interface AppBoardProps {
  numberOfMines: number;
  sizeOnXAxis: number;
  sizeOnYAxis: number;
}

const AppBoard = forwardRef(({ props }: { props: AppBoardProps }, ref) => {
  const { numberOfMines = 5, sizeOnXAxis = 5, sizeOnYAxis = 5 } = props;
  const [board, setBoard] = useState<IMinefieldBoard>();
  const [loose, setloose] = useState(false);
  const [win, setWin] = useState(false);

  const buildBoard = useCallback(() => {
    const boardCreated = new CreateMinefieldBoard({
      numberOfMines,
      sizeOnXAxis,
      sizeOnYAxis,
    }).create();
    setBoard(boardCreated);
  }, [numberOfMines, sizeOnXAxis, sizeOnYAxis]);

  useEffect(() => {
    if (!board) {
      buildBoard();
    }
  }, [buildBoard, ref, board]);

  const onContextMenu = (
    event: React.MouseEvent<HTMLTableDataCellElement, MouseEvent>,
    house: IMinefieldBoardHouse
  ) => {
    event.stopPropagation();
    event.preventDefault();
    const houseMarked = new MarkMinefieldBoardHouse(house).mark();

    if (houseMarked && board) {
      const boardUpdated = new UpdateBoardHouseInBoard({
        boardHouse: houseMarked,
        board,
      }).update();
      setBoard(boardUpdated);
    }
  };

  const onClickHouse = (house: IMinefieldBoardHouse) => {
    if (!board) return;
    const houseOpened = new OpenMinefieldBoardHouse(house).open();
    const boardUpdated = new UpdateBoardHouseInBoard({
      board,
      boardHouse: houseOpened,
    }).update();
    const loose = new SomeMineHasBeenOpened(board).verify();
    setloose(loose);

    if (houseOpened.minesAround === 0 && !loose) {
      const boardWithHouseEmptyOpened = new OpenSurroundingHousesWhenEmpty({
        board,
        house: houseOpened,
      }).open();
      setBoard(boardWithHouseEmptyOpened);
    } else if (loose) {
      setBoard(new OpenAllMinedHouses(boardUpdated).open());
    } else {
      setBoard(boardUpdated);
    }
    if (!loose) setWin(new AllFreeFieldsWereOpened(boardUpdated).verify());
  };

  return (
    <>
      <header>
        <p>Bombs: {numberOfMines}</p>
        {loose ? (
          <>
            <div className="loose-info">
              <h2>YOU LOSE!!</h2>
              <SkullIcon width={32} height={32} fill="#fff" />
            </div>
          </>
        ) : null}
        {win ? <h2>YOU WON!!!</h2> : null}
      </header>
      <table>
        <tbody>
          {board?.boardHouses?.map((row, index) => (
            <tr key={index}>
              {row.map((house) => (
                <td
                  key={house.position.x + "-" + house.position.y}
                  onContextMenu={(e) => onContextMenu(e, house)}
                  className={loose ? "loose-td" : ""}
                >
                  <AppBoardHouse
                    house={house}
                    disabled={loose || win}
                    onClick={() => onClickHouse(house)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
});

export default AppBoard;
