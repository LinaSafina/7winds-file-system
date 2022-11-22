import { RowStateItemType } from '../context/rows.types';

export const eID = 22589;

export const url = 'http://185.244.172.108:8081';

export const getDataUrl = `/v1/outlay-rows/entity/${eID}/row/list`;

export const createRowUrl = `/v1/outlay-rows/entity/${eID}/row/create`;

export const getUpdateRowUrl = (rID: number) => {
  return `/v1/outlay-rows/entity/${eID}/row/${rID}/update`;
};

export const getDeleteRowUrl = (rID: number) => {
  return `/v1/outlay-rows/entity/${eID}/row/${rID}/delete`;
};

export const defaultRowData: RowStateItemType = {
  id: 0,
  total: 0,
  equipmentCosts: 0,
  estimatedProfit: 0,
  machineOperatorSalary: 0,
  mainCosts: 0,
  materials: 0,
  mimExploitation: 0,
  overheads: 0,
  folderType: 'folder1',
  parentId: null,
  rowName: '',
  salary: 0,
  supportCosts: 0,
  child: [],
  isEdited: true,
  // parentFolderType: null,
  // heightOfLine: 60,
};
