import React from "react";
import { useCountdown } from "../hooks/UseCountDown";
import DateTimeDisplay from "./DateTimeDisplay";

const ExpiredNotice = () => {
  return (
    <div className="expired-notice">
      <span>Expired!!!</span>
      <p>Please select a future date and time.</p>
    </div>
  );
};

const ShowCounter = ({ days, hours, minutes, seconds }) => {
  return (
    <div style={{ display: "flex", color: "white" }}>
      {days === 0 ? (
        ""
      ) : (
        <>
          <DateTimeDisplay value={days} type={"Days"} />
          <p>일&nbsp;</p>
        </>
      )}
      {hours === 0 ? (
        ""
      ) : (
        <>
          <DateTimeDisplay value={hours} type={"Hours"} isDanger={false} />
          <p>시&nbsp;</p>
        </>
      )}
      {minutes === 0 ? (
        ""
      ) : (
        <>
          <DateTimeDisplay
            value={minutes}
            type={"Mins"}
            isDanger={minutes <= 5}
          />
          <p>분&nbsp;</p>
        </>
      )}
      <DateTimeDisplay
        value={seconds}
        type={"Seconds"}
        isDanger={minutes < 5 ? seconds < 60 : false}
      />
      <p>초</p>
    </div>
  );
};

const CountdownTimer = ({ targetDate }) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  if (days + hours + minutes + seconds <= 0) {
    return <ExpiredNotice />;
  } else {
    return (
      <ShowCounter
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    );
  }
};

export default CountdownTimer;
