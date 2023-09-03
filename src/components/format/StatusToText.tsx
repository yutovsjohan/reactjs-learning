import { Status } from "../../enums/Status";

interface Props {
  value: number;
}

const StatusToText = ({ value }: Props) => {
  switch (value) {
    case Status.READY_FOR_DEV:
      return <span>Ready for dev</span>;
    case Status.IN_PROGRESS:
      return <span>In-progress</span>;
    case Status.QA:
      return <span>Q/A</span>;
    case Status.DONE:
      return <span>Done</span>;
    default:
      return <></>;
  }
};

export default StatusToText;
