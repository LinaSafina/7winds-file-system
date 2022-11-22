import { MouseEvent, useContext } from 'react';

import { getDeleteRowUrl, url } from '../../constants/API';
import { RowsContext } from '../../context/rows.context';
import { FolderType, RowActionKind } from '../../context/rows.types';
import getIconByKey from '../../utils/getIconsByKey';
import { getRowCellClasses } from '../table-row/table-row.service';
import './table-icons.styles.scss';
import { folderTypes } from '../../utils/getIconsByKey';

const TableIcons: React.FC<{
  folderType: FolderType;
  id: number;
  isEdited?: boolean;
  height: number;
  parentId: number | null;
}> = ({ folderType, id, isEdited, height, parentId }) => {
  const { setRowOperation, dispatch } = useContext(RowsContext);

  const clickIconHandler = (event: MouseEvent<HTMLDivElement>) => {
    const classList = (event.target as Element).classList;

    setRowOperation('create');

    if (classList.contains('folder-1')) {
      dispatch({
        type: RowActionKind.CREATE,
        payload: {
          id,
          folderType: 'folder1',
          parentFolderType: folderType,
          parentId: null,
        },
      });
    }

    if (classList.contains('folder-2')) {
      dispatch({
        type: RowActionKind.CREATE,
        payload: {
          id,
          folderType: 'folder2',
          parentFolderType: folderType,
          parentId: parentId,
        },
      });
    }

    if (classList.contains('file')) {
      dispatch({
        type: RowActionKind.CREATE,
        payload: {
          id,
          folderType: 'file',
          parentFolderType: folderType,
          parentId: parentId,
        },
      });
    }

    if (classList.contains('trash')) {
      fetch(url + getDeleteRowUrl(id), { method: 'DELETE' })
        .then((response) => response.json())
        .then(() => {
          dispatch({
            type: RowActionKind.DELETE,
            payload: { id },
          });
        });
    }
  };

  return (
    <div className={` table__icons `}>
      <div
        className={`table__line ${getRowCellClasses(
          folderTypes[folderTypes.indexOf(folderType)]
        )}`}
        style={{ height: `${height * 60}px` }}
      ></div>
      <div
        className={`table__icons-container ${getRowCellClasses(
          folderTypes[folderTypes.indexOf(folderType)]
        )}  ${!isEdited ? 'saved' : ''}`}
      >
        {folderTypes
          .slice(folderTypes.indexOf(folderType))
          .map((iconId, index) => (
            <div
              key={index}
              style={{ backgroundImage: `url(${getIconByKey(iconId)})` }}
              className={`table__icon ${getRowCellClasses(iconId)}`}
              onClick={clickIconHandler}
            ></div>
          ))}
      </div>
    </div>
  );
};

export default TableIcons;
