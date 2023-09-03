import { Status } from "../../constants/Consts";

interface Props {
  value: number;
}

const StatusToText = ({ value }: Props) => {
  switch (value) {
    case Status.READY_FOR_DEV.value:
      return <span>{Status.READY_FOR_DEV.text}</span>;
    case Status.IN_PROGRESS.value:
      return <span>{Status.IN_PROGRESS.text}</span>;
    case Status.QA.value:
      return <span>{Status.QA.text}</span>;
    case Status.DONE.value:
      return <span>{Status.DONE.text}</span>;
    default:
      return <></>;
  }
};

export default StatusToText;
