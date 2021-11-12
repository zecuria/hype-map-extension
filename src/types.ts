interface WordCount {
  word: string,
  count: number
}

export interface Item {
  startTime: string;
  startTimeStamp: number;
  displayTime: string;
  count: number,
  map: WordCount[],
}

// eslint-disable-next-line @typescript-eslint/naming-convention
interface actionInterface<payloadType> {
  type: string;
  payload: payloadType;
}

export {actionInterface};
