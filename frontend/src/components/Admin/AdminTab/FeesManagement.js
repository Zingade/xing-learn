import { lazy } from 'react';
import HeaderCell from '../../Utils/HeaderCell';
import {MONTH_COLUMNS} from '../../Utils/CommonConstants'
import '../../Utils/Table.scss'
import { useDispatch, useSelector } from 'react-redux';
import { saveUser } from '../../../Redux/User/UserAction';
import {STUDENT_MAPPING, summaryFees} from '../../Utils/CommonConstants'
import {capitalizeCustom} from '../../Utils/CommonFunctions'
import Level from '../../Utils/Level';
import { makeStyles } from '@material-ui/core';

// eslint-disable-next-line

const FeesRow = lazy(() => import('../../Utils/FeesRow'));

const useStyles = makeStyles((theme) => ({
  table:{
    width: "100%",
  },
  autoScroll:{
    overflowX:"auto",
  }
}));


function FeesManagement() {

  const userList = useSelector(state=>state.userList);
  const {loading, users, error} = userList;
  useSelector(state=>state.userSave);
  const dispatch = useDispatch();
  const grandTotal = [0,0,0,0,0,0,0,0,0,0,0,0];
  const classes = useStyles()
  const  studentList = users.filter((stud)=>{return (stud.isAdmin === false)});

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
        <div className={classes.table}>
          <div className={classes.autoScroll}>
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
                {MONTH_COLUMNS.map((month,count) => (
                  <HeaderCell
                    key={count}
                    value={capitalizeCustom(STUDENT_MAPPING[month].displayName)}
                  />
                ))}
              </div>
              {studentList.map((user,count) => (
                <FeesRow
                  key={count}
                  data={user}
                  updateDatabase={updateDatabase}
                />)
              )}
              <div className="row heading">
                <div className="cell heading">
                  <div>Grand Total</div>
                </div>
                {grandTotal.map((value,count) => (
                    <HeaderCell
                    key={count}
                    {...{value}}
                    />
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    )}
    </>
  );
}


export default FeesManagement;
