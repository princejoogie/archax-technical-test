
export type DataShape = {
  id: string;
  name: string;
  spend: number;
  BCAP1: string;
  BCAP2: string;
  BCAP3: string;
};

export type ITree = {
  name: string;
  children: ITree[];
};
