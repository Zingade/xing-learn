import Cell from './Cell';
import './Table.scss'

function Row(props) {
  const {data, updateDatabase} = props;
  return (
    <>
      <div className='row'>
        <div className="cell">
          <div className="expense-name">
            {data.name}
          </div>
        </div>
      </div>
      {
        data.fees.map((fee,count) => (
          <Cell
            key={count}
            updateDatabase={updateDatabase}
            cellID={(data.name +"@"+count+"@"+fee.amount)}
            total= {fee.amount}
            payMethod= {fee.payMethod}
            />
        ))
      }
    </>
  );
}

export default Row;
