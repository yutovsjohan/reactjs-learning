export default class Consts {
  static FORMAT_DATE_DD_MM_YY: string = "dd/MM/yyyy";
}

export const Status = {
  READY_FOR_DEV: {
    value: 1,
    text: "Ready for dev",
  },
  IN_PROGRESS: {
    value: 2,
    text: "In-progress",
  },
  QA: {
    value: 3,
    text: "Q/A",
  },
  DONE: {
    value: 4,
    text: "Done",
  },
};

export const Priority = {
  LOW: {
    value: 1,
    text: "LOW",
  },
  MEDIUM: {
    value: 2,
    text: "MEDIUM",
  },
  HIGH: {
    value: 3,
    text: "HIGH",
  },
};
