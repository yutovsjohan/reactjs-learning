import { Priority } from "../../enums/Priority";

interface Props {
  value: number;
}

const PriorityToText = ({ value }: Props) => {
  switch (value) {
    case Priority.LOW:
      return <strong style={{ color: "green" }}>LOW</strong>;
    case Priority.MEDIUM:
      return <strong style={{ color: "orange" }}>MEDIUM</strong>;
    case Priority.HIGH:
      return <strong style={{ color: "red" }}>HIGH</strong>;
    default:
      return <> </>;
  }
};

export default PriorityToText;
