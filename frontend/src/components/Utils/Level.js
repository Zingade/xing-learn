import './Table.scss';
import {FEES_SUMMARY, FEES_DISPLAY} from '../Utils/CommonConstants'
import {capitalizeCustom, formatNumberCustom} from '../Utils/CommonFunctions'
  


function PureLevelItem({item, total, delta}) {
 
  return (
    <>
      <h4>{capitalizeCustom(FEES_DISPLAY[item].displayName)}</h4>
      <h3>
        {(delta > 0 ? (
                `+${formatNumberCustom(delta, FEES_DISPLAY[item].format, item)}`
          ) : (
            0
          )
        )}
      </h3>
      <h1>
        {
          formatNumberCustom(total, FEES_DISPLAY[item].format, item)
        }
      </h1>
    </>
  );
}

const LevelItemCustom = PureLevelItem;

function Level({data}) {
  return (
    <div className="Level">
      {FEES_SUMMARY.map((item, index) => (
        <div
          key={index}
          className={`level-item is-${item}`}
        >
          <LevelItemCustom
            {...{item}}
            total={data.total[item]}
            delta={data.delta[item]}
            />
        </div>
      ))}
    </div>
  );
}

export default Level;
