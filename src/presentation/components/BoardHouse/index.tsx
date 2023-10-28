import {
  IMinefieldBoardHouse,
  MinefieldBoardHouseContentEnum,
  MinefieldBoardHouseStateEnum,
} from "@domain/minefield/models/IMinefieldBoardHouse";
import ExplosionBombIcon from "@presentation/components/icons/ExplosionBomb";
import FlagIcon from "@presentation/components/icons/Flag";
import "./style.css";

interface BoardHouseProps {
  house: IMinefieldBoardHouse;
  disabled: boolean;
  onClick: () => void;
}
export default function AppBoardHouse(props: BoardHouseProps) {
  const { house, disabled = false, onClick } = props;

  const handlerCell = () => {
    if (house.state === MinefieldBoardHouseStateEnum.MARKED)
      return (
        <FlagIcon
          key={house.position.x + "-" + house.position.y}
          height={32}
          width={32}
          fill="#cc2936"
        />
      );
    if (house.state === MinefieldBoardHouseStateEnum.OPENED) {
      if (house.content === MinefieldBoardHouseContentEnum.MINE)
        return (
          <ExplosionBombIcon
            key={house.position.x + "-" + house.position.y}
            height={48}
            width={48}
          />
        );
      if (house.minesAround === 0) {
        return <div className="safe"></div>;
      } else {
        return (
          <div className="no-safe">
            <p>{house.minesAround}</p>
          </div>
        );
      }
    }
    return <p></p>;
  };
  return (
    <button className="house" disabled={disabled} onClick={onClick}>
      {handlerCell()}
    </button>
  );
}
