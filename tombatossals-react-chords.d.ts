declare module "@tombatossals/react-chords/lib/Chord" {
  import { FC } from "react";
  import { ChordPosition, Instrument } from "@/types/chords";

  export interface ChordProps {
    chord: ChordPosition;
    instrument: Instrument;
    lite?: boolean;
    size?: number;
    svgClass?: string;
  }

  const Chord: FC<ChordProps>;
  export default Chord;
}
