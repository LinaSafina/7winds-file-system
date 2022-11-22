import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';

import TableCell from '../table-cell/table-cell.component';
import TableIcons from '../table-icons/table-icons.component';

import './table-row.styles.scss';
import { folderTypes } from '../../utils/getIconsByKey';
import { getRowCellClasses } from './table-row.service';
import {
  createRowUrl,
  defaultRowData,
  getUpdateRowUrl,
  url,
} from '../../constants/API';
import { RowsContext } from '../../context/rows.context';
import { RowActionKind, RowTypeWithExtra } from '../../context/rows.types';

const TableRow: React.FC<{
  data: RowTypeWithExtra;
  height: number;
}> = ({ data, height }) => {
  const { id, folderType, parentId, isEdited } = data;

  const { dispatch, rowOperation, setRowOperation } = useContext(RowsContext);

  const [formFields, setFormFields] = useState(defaultRowData);
  const {
    rowName: enteredRowName,
    salary: enteredSalary,
    equipmentCosts: enteredEquipmentCosts,
    estimatedProfit: enteredEstimatedProfit,
    supportCosts: enteredSupportCosts,
  } = formFields;

  useEffect(() => {
    setFormFields(data);
  }, [data]);

  const submitFormHandler = (event: FormEvent) => {
    event.preventDefault();

    if (enteredRowName.trim().length === 0) {
      return;
    }

    const fetchUrl = `${url}${
      rowOperation === 'create' ? createRowUrl : getUpdateRowUrl(id)
    }`;

    fetch(fetchUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formFields,
        parentId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: RowActionKind.UPDATE,
          payload: {
            currentRow: data.current,
            id: id,
            parentId: parentId,
          },
        });
      })
      .catch((error) => console.log(error));
  };

  const rowNameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setFormFields((prev) => ({ ...prev, rowName: event.target.value }));
  };

  const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormFields((prev) => ({
      ...prev,
      [name]: parseFloat(value.trim()) | 0,
    }));
  };

  const doubleClickHandler = () => {
    setRowOperation('update');

    dispatch({
      type: RowActionKind.EDIT,
      payload: {
        id: id,
      },
    });
  };

  return (
    <form
      className={`table__row ${
        isEdited ? 'table__row--edited' : ''
      } ${getRowCellClasses(folderTypes[folderTypes.indexOf(folderType)])}`}
      onSubmit={submitFormHandler}
      onDoubleClick={doubleClickHandler}
    >
      <TableIcons
        folderType={folderType}
        id={id}
        isEdited={isEdited}
        height={height}
        parentId={parentId}
      />

      <TableCell
        name='rowName'
        value={enteredRowName}
        onChange={rowNameChangeHandler}
        disabled={!isEdited}
      />
      <TableCell
        name='salary'
        value={enteredSalary}
        onChange={inputChangeHandler}
        disabled={!isEdited}
      />

      <TableCell
        name='equipmentCosts'
        value={enteredEquipmentCosts}
        onChange={inputChangeHandler}
        disabled={!isEdited}
      />
      <TableCell
        name='supportCosts'
        value={enteredSupportCosts}
        onChange={inputChangeHandler}
        disabled={!isEdited}
      />
      <TableCell
        name='estimatedProfit'
        value={enteredEstimatedProfit}
        onChange={inputChangeHandler}
        disabled={!isEdited}
      />
      <input type='submit' hidden />
    </form>
  );
};

export default TableRow;
