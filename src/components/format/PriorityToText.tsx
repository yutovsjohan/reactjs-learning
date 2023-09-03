import { Priority } from "../../constants/Consts";

interface Props {
  value: number;
}

const PriorityToText = ({ value }: Props) => {
  switch (value) {
    case Priority.LOW.value:
      return <strong style={{ color: "green" }}>{Priority.LOW.text}</strong>;
    case Priority.MEDIUM.value:
      return (
        <strong style={{ color: "orange" }}>{Priority.MEDIUM.text}</strong>
      );
    case Priority.HIGH.value:
      return <strong style={{ color: "red" }}>{Priority.HIGH.text}</strong>;
    default:
      return <> </>;
  }
};

export default PriorityToText;
