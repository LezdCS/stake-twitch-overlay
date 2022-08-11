import React, { useEffect, useState } from "react";
import "./WagerProgressBar.scss";
import userRolloverQuery from "../../queries/userRollover";

type WagerProps = {
  token: string;
  goal: number;
  positions: Array<any> | null;
};

const WagerProgessBar: React.FC<WagerProps> = ({ token, goal, positions }) => {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    getWager();
    const interval = setInterval(() => {
      getWager();
    }, 8000);

    return () => clearInterval(interval);
  }, [token]);

  const getWager = () => {
    var query = userRolloverQuery;

    var operationName = "userRollover";

    fetch("https://api.stake.bet/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        "X-Access-Token": token,
        Referer: "https://stake.com/",
        Origin: "https://stake.com",
      },
      body: JSON.stringify({
        operationName,
        query,
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.errors || data.data.user.activeRollovers.length === 0) {
          return;
        }
        setProgress(data.data.user.activeRollovers[0].progress * 100);
      });
  };

  let pos = null;
  if (positions !== null) {
    if (
      positions?.find((pos: any) => String(Object.keys(pos)) === "progress-bar")
    ) {
      pos = positions?.find(
        (pos: any) => String(Object.keys(pos)) === "progress-bar"
      )["progress-bar"];
    }
  }

  return (
    <div
      className="progress-bar"
      id="progress-bar"
      style={{
        top: pos !== null ? `${pos.top}px` : "",
        left: pos !== null ? `${pos.left}px` : "",
      }}
    >
      <div className="progress-bar__in" style={{ width: `${progress}%` }}></div>
      <p className="progress-bar__text">
        ${(Math.round(goal * (progress / 100) * 100) / 100).toFixed(2)} / $
        {goal}
        <span className="progress-bar__text__percentage">
          {" "}
          ({(Math.round(progress * 100) / 100).toFixed(2)}%)
        </span>
      </p>
    </div>
  );
};

export default WagerProgessBar;
