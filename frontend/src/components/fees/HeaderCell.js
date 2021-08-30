import './Table.scss'

function HeaderCell(props) {
  const {value} = props;
  return (
    <div className="cell heading">
      <div>{value}</div>
    </div>
  );
}


export default HeaderCell;
