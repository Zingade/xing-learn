import FeesCell from './FeesCell';
import './Table.scss'

function FeesRow(props) {
  const {data, updateDatabase} = props;
  return (
    <>
      <div className='row'>
        <div className="cell">
          <div className="month-name">
            {data.name}
          </div>
        </div>
      </div>
      {
        data.fees.map((fee,count) => (
          <FeesCell
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

export default FeesRow;
