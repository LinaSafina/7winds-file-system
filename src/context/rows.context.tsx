import { createContext, useReducer, useState } from 'react';
import { defaultRowData } from '../constants/API';

import {
  RowOperationType,
  RowStateType,
  RowAction,
  RowStateItemType,
  RowTypeWithChild,
} from './rows.types';

const defaultValue: {
  rowList: RowStateType;
  dispatch: (action: RowAction) => void;
  rowOperation: RowOperationType;
  setRowOperation: (value: RowOperationType) => void;
} = {
  rowList: [{ ...defaultRowData }],
  dispatch: (action) => {},
  rowOperation: 'create',
  setRowOperation: (operation) => {},
};

export const RowsContext = createContext(defaultValue);

const rowsReducer = (
  state: RowStateType | RowTypeWithChild[],
  { type, payload }: RowAction
): RowStateType => {
  switch (type) {
    case 'SET': {
      if (payload.data) {
        return payload.data;
      }

      return state;
    }

    case 'DELETE': {
      const arrFiltering = (array: RowStateItemType[]) => {
        for (let i = 0; i < array.length; i++) {
          if (array[i].id !== payload.id) {
            if (array[i].child) {
              arrFiltering(array[i].child);
            }
          }

          if (array[i].id === payload.id) {
            array.splice(i, 1);
          }
        }
      };

      arrFiltering(state);

      return [...state];
    }

    case 'CREATE': {
      const arrCreation = (array: RowStateItemType[]) => {
        for (let i = 0; i < array.length; i++) {
          if (array[i].id !== payload.id) {
            if (array[i].child) {
              arrCreation(array[i].child);
            }
          }

          if (array[i].id === payload.id) {
            if (payload.folderType === payload.parentFolderType) {
              array.push({
                ...defaultRowData,
                isEdited: true,
                parentId: payload.parentId,
                folderType: payload.folderType,
              });
            } else {
              array[i] = {
                ...array[i],
                child: [
                  ...array[i].child,
                  {
                    ...defaultRowData,
                    isEdited: true,
                    parentId: payload.id,
                    folderType: payload.folderType,
                  },
                ],
              };
            }
          }
        }
      };

      arrCreation(state);

      return [...state];
    }

    case 'EDIT': {
      const arrEdit = (array: RowStateItemType[]) => {
        for (let i = 0; i < array.length; i++) {
          if (array[i].id !== payload.id) {
            if (array[i].child) {
              arrEdit(array[i].child);
            }
          }

          if (array[i].id === payload.id) {
            array.splice(i, 1, { ...array[i], isEdited: true });
          }
        }
      };

      arrEdit(state);

      return [...state];
    }

    case 'UPDATE': {
      const arrUpdate = (array: RowStateItemType[]) => {
        for (let i = 0; i < array.length; i++) {
          if (array[i].id !== payload.id) {
            if (array[i].child) {
              arrUpdate(array[i].child);
            }
          }

          if (payload.currentRow) {
            if (array[i].id === payload.id) {
              array[i] = {
                ...array[i],
                ...payload.currentRow,
                isEdited: false,
              };
            }
          }
        }
        return [...state];
      };

      return arrUpdate(state);
    }

    case 'CANCEL': {
      const arrCancel = (array: RowStateItemType[]) => {
        for (let i = 0; i < array.length; i++) {
          if (array[i].id !== payload.id) {
            if (array[i].child) {
              arrCancel(array[i].child);
            }
          }

          if (array[i].id === payload.id) {
            array[i] = {
              ...array[i],
              isEdited: false,
            };
          }
        }
      };

      arrCancel(state);

      return [...state];
    }

    default:
      return state;
  }
};

export const RowsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [rowList, dispatch] = useReducer(rowsReducer, [{ ...defaultRowData }]);

  const [rowOperation, setRowOperation] = useState<RowOperationType>('create');

  const value = {
    rowList,
    dispatch,
    rowOperation,
    setRowOperation,
  };

  return <RowsContext.Provider value={value}>{children}</RowsContext.Provider>;
};
