import './table-cell.styles.scss';

const TableCell = ({ ...inputProps }) => {
  return (
    <div className='table__cell'>
      <input className='input' {...inputProps} tabIndex={-1} />
    </div>
  );
};

export default TableCell;
