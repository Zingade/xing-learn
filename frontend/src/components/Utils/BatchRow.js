import BatchCell from './BatchCell';
import './Table.scss'

function BatchRow(props) {
  const {data, updateDatabase} = props;
  return (
    <>
      <div className='row'>
        <div className="cell">
          <div className="month-name">
            {data.name}
          </div>
        </div>
        {
          data.batches.map((batch,count) => (
            <BatchCell
              key={count}
              updateDatabase={updateDatabase}
              cellID={(data.name +"@"+count+"@"+batch.isBatch)}
              isBatch={batch.isBatch}
              />
          ))
        }
      </div>
    </>
  );
}

export default BatchRow;
