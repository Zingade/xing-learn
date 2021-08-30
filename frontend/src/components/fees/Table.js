import { lazy, useEffect } from 'react';
import HeaderCell from './HeaderCell';
import {MONTH_COLUMNS} from './CommonConstants'
import './Table.scss'
import { useDispatch, useSelector } from 'react-redux';
import { listUsers, saveUser } from '../../Redux/User/UserAction';
import {STUDENT_MAPPING, summaryFees} from './CommonConstants'
import {capitalizeCustom} from './CommonFunctions'
import Level from './Level';

// eslint-disable-next-line

const Row = lazy(() => import('./Row'));


function Table() {

  const userList = useSelector(state=>state.userList);
  const {loading, users, error} = userList;
  const userSave = useSelector(state=>state.userSave);
  const {success: successSave} = userSave;
  const userDelete = useSelector(state=>state.userDelete);
  const {success: successDelete} = userDelete;
  const dispatch = useDispatch();
  const grandTotal = [0,0,0,0,0,0,0,0,0,0,0,0];

  useEffect(()=>{
    if(successSave){
        //setModalVisible(false);
    }
    dispatch(listUsers());
    return () =>{
    };
  }, [successSave,successDelete,dispatch]);

  const updateDatabase = (values) => {
    let user = users.filter((stud)=>{return (stud.name === values.name)})[0];
    user.fees[values.month].amount = values.amount;
    user.fees[values.month].payMethod = values.payMethod;
    dispatch(saveUser(user))
  }

  const findGrandTotal = () => {
    const currentMonth = (((new Date()).getMonth()+7)%12)
    summaryFees.total.Overall = 0
    summaryFees.total.Cash = 0
    summaryFees.total.GPay = 0
    summaryFees.delta.Overall = 0
    summaryFees.delta.Cash = 0
    summaryFees.delta.GPay = 0
    users.map(user => {
      user.fees.map((fee,count) => {
        grandTotal[count%12] += parseInt(fee.amount)
        summaryFees.total.Overall += parseInt(fee.amount)
        if (fee.payMethod === "1") {
          summaryFees.total.GPay += parseInt(fee.amount)
          if ((count%12) === currentMonth){
            summaryFees.delta.GPay += parseInt(fee.amount);
            summaryFees.delta.Overall += parseInt(fee.amount);
          }
        }
        else{
          summaryFees.total.Cash += parseInt(fee.amount)
          if ((count%12) === currentMonth){
            summaryFees.delta.Cash += parseInt(fee.amount);
            summaryFees.delta.Overall += parseInt(fee.amount);
          }
        }
        return fee
      })
      return user
    })
  }

  return (
    <>
    {(loading) ? (
        <div>Loading...</div>
      ) : (error) ? (
        <div>{error}</div>
      ) : (<> 
        <div>
          <Level data={summaryFees}/>
        </div>
        <div className="table-container">
        <div
          className="table fadeInUp"
          style={{
            gridTemplateColumns: `repeat(${13}, auto)`,
          }}
        >
          {findGrandTotal()}
          <div className="row heading">
            <div className="cell heading">
              <div>Student Name</div>
            </div>
            {MONTH_COLUMNS.map((month) => (
              <>
              <HeaderCell
                key={month}
                value={capitalizeCustom(STUDENT_MAPPING[month].displayName)}
              />
              </>
            ))}
          </div>
          {users.map((user,count) => (
            (!user.isAdmin)?
              (<Row
              key={count}
              data={user}
              updateDatabase={updateDatabase}
              />):(<></>)
          ))}
          <div className="row heading">
            <div className="cell heading">
              <div>Grand Total</div>
            </div>
            {grandTotal.map((value) => (
              <> 
                <HeaderCell
                  key={value}
                  {...{value}}
                />
              </>
            ))}
          </div>
        </div>
      </div>
      </>
    )}
    </>
  );
}


export default Table;
