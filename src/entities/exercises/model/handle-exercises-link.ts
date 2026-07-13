import { IExercisesItem } from "./exercises-type";

type Props = {
  ex: IExercisesItem;
  openPlayer: (url: string) => void;
};

export const handelExercisesLink = ({ openPlayer, ex }: Props) => {
  const handleCardClick = () => {
    if (!ex.link) return;
    if (ex.type === "exercise") {
      openPlayer(ex.link);
    } else if (ex.type === "riff") {
      window.open(ex.link, "_blank", "noreferrer");
    }
  };

  return { handleCardClick };
};
