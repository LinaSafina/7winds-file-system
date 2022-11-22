export type FolderType = 'folder1' | 'folder2' | 'file' | 'trash';

export type ParentIdType = number | null;

export type ParentFolderType = FolderType | null;

export type RowOperationType = 'create' | 'update';

export type RowType = {
  equipmentCosts: number;
  estimatedProfit: number;
  id: number;
  machineOperatorSalary: number;
  mainCosts: number;
  materials: number;
  mimExploitation: number;
  overheads: number;
  rowName: string;
  salary: number;
  supportCosts: number;
  total: number;
};

export type RowTypeWithChild = RowType & {
  child: RowTypeWithChild[];
};

export type RowStateItemType = RowTypeWithChild & {
  folderType?: FolderType;
  isEdited?: boolean;
  parentId?: ParentIdType;
  child: RowStateItemType[];
};

export type RowTypeWithExtra = RowTypeWithChild & {
  folderType: FolderType;
  isEdited?: boolean;
  parentId: ParentIdType;
};

export type RowStateType = RowStateItemType[];

export enum RowActionKind {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  EDIT = 'EDIT',
  CANCEL = 'CANCEL',
  SET = 'SET',
  DELETE = 'DELETE',
}

export type RowAction = {
  type: RowActionKind;
  payload: PayloadType;
};

export type PayloadType = {
  folderType?: FolderType;
  parentId?: ParentIdType;
  id?: number;
  data?: RowTypeWithChild[] | RowStateItemType[];
  currentRow?: RowType | RowTypeWithChild;
  isEdited?: boolean;
  parentFolderType?: ParentFolderType;
  newRow?: RowType;
};

export type RowResponseType = {
  current: RowType;
  changed: RowType[];
};

export type RowListResponseType = RowTypeWithChild[];
