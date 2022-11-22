import { useContext, useEffect } from 'react';

import TABLE_HEADERS from '../../constants/table-headers.json';
import TableRow from '../table-row/table-row.component';

import { RowsContext } from '../../context/rows.context';
import { defaultRowData, getDataUrl, url } from '../../constants/API';
import './project.styles.scss';
import { RowActionKind, RowListResponseType } from '../../context/rows.types';
import { flattenRowsList, findLastIndex } from './project.service';

const Project = () => {
  const { rowList, dispatch } = useContext(RowsContext);

  useEffect(() => {
    fetch(url + getDataUrl)
      .then((response) => response.json())
      .then((data: RowListResponseType) => {
        dispatch({
          type: RowActionKind.SET,
          payload: { data },
        });
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (rowList.length === 0) {
      dispatch({
        type: RowActionKind.SET,
        payload: {
          data: [defaultRowData],
        },
      });
    }
  }, [rowList]);

  return (
    <div className='table'>
      <div className='table__headers'>
        {TABLE_HEADERS.map(({ id, title }) => (
          <div key={id} className='table__head'>
            {title}
          </div>
        ))}
      </div>
      {rowList.length > 0 &&
        flattenRowsList(rowList, 0).map((item: any, index: any, array) => (
          <TableRow
            key={index}
            data={item}
            height={
              index === 0
                ? 0
                : findLastIndex(array, (el) => el.folderType === 'folder1') ===
                  index
                ? findLastIndex(array, (el) => el.folderType === 'folder1')
                : 1
            }
          />
        ))}
    </div>
  );
};

export default Project;
