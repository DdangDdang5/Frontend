// React import
import React from "react";

// Component import
import DateTimeDisplay from "./DateTimeDisplay";

// Package import
import styled from "styled-components";

//Hook
import { useCountdown } from "../hooks/UseCountDown";

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
    <Time style={{ display: "flex", color: "white" }}>
      {/* {days === 0 ? (
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
      )} */}
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
    </Time>
  );
};

const CountdownTimer = ({ targetDate }) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  if (days + hours + minutes + seconds <= 0) {
    return <ExpiredNotice />;
  } else {
    return (
      <ShowCounter
        // days={days}
        // hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    );
  }
};

const Time = styled.div`
  font-size: ${(props) => props.theme.fontSizes.lg};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  line-height: 30px;
`;

export default CountdownTimer;
