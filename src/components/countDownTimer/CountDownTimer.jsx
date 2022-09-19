import React from "react";
import { useCountdown } from "../hooks/UseCountDown";
import DateTimeDisplay from "./DateTimeDisplay";
import styled from "styled-components";

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
      <DateTimeDisplay value={days} type={"Days"} isDanger={days <= 3} />
      <p>일&nbsp;</p>
      <DateTimeDisplay value={hours} type={"Hours"} isDanger={false} />
      <p>시&nbsp;</p>
      <DateTimeDisplay value={minutes} type={"Mins"} isDanger={false} />
      <p>분&nbsp;</p>
      <DateTimeDisplay value={seconds} type={"Seconds"} isDanger={false} />
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
