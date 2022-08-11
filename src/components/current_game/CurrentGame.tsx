import React, { useEffect, useState } from "react";
import "./CurrentGame.scss";
import SlugKuratorGameIndexQuery from "../../queries/SlugKuratorGameIndex";
import MyBetListQuery from "../../queries/MyBetList";

type CurrentGameProps = {
  token: string;
  positions: Array<any> | null;
};

type Slot = {
  name: string;
  provider: string;
  thumbnailUrl: string;
  topMultiplier: Array<any>;
};

const CurrentGame: React.FC<CurrentGameProps> = ({ token, positions }) => {
  const [lastSlot, setLastSlot] = useState<Slot>({
    name: "None",
    provider: "None",
    thumbnailUrl: "",
    topMultiplier: [1, 1, 1],
  });

  const getLastBetGameDetails = (slug: string) => {
    let query = SlugKuratorGameIndexQuery;

    let variables = { slug: slug };

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
        query,
        variables,
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        let slot: Slot = {
          name: data.data.slugKuratorGame.name,
          provider:
            data.data.slugKuratorGame.data != null
              ? data.data.slugKuratorGame.data.provider.name
              : "Stake",
          thumbnailUrl: data.data.slugKuratorGame.thumbnailUrl,
          topMultiplier: [
            data.data.slugKuratorGame.multiplierLeaderboard[0].payoutMultiplier,
            data.data.slugKuratorGame.multiplierLeaderboard[1].payoutMultiplier,
            data.data.slugKuratorGame.multiplierLeaderboard[2].payoutMultiplier,
          ],
        };

        setLastSlot(slot);
      });
  };

  const getUserBetList = () => {
    let query = MyBetListQuery;

    let operationName = "MyBetList";

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
        if (data.data.user.houseBetList.length > 0) {
          getLastBetGameDetails(data.data.user.houseBetList[0].game.slug);
        }
      });
  };

  useEffect(() => {
    getUserBetList();
    const interval = setInterval(() => {
      getUserBetList();
    }, 8000);

    return () => clearInterval(interval);
  }, [token]);

  let pos = null;
  if (positions !== null) {
    if (
      positions?.find((pos: any) => String(Object.keys(pos)) === "current-game")
    ) {
      pos = positions?.find(
        (pos: any) => String(Object.keys(pos)) === "current-game"
      )["current-game"];
    }
  }
  return (
    <div
      className="current-game"
      id="current-game"
      style={{
        top: pos !== null ? `${pos.top}px` : "",
        left: pos !== null ? `${pos.left}px` : "",
      }}
    >
      <img className="current-game__image" src={lastSlot.thumbnailUrl}></img>
      <div className="current-game__basics">
        <h2>🎰 CURRENT SLOT</h2>
        <div>
          <p className="current-game__basics__game-name">{lastSlot.name}</p>
          <p className="current-game__basics__game-provider">
            {lastSlot.provider.toUpperCase()}
          </p>
        </div>
      </div>
      <div className="divider"></div>
      <div className="current-game__infos">
        <h2>👑 TOP SLOT HITS</h2>
        <div className="row">
          <p>🥇</p>
          <p>{lastSlot.topMultiplier[0]} X</p>
        </div>
        <div className="row">
          <p>🥈</p>
          <p>{lastSlot.topMultiplier[1]} X</p>
        </div>
        <div className="row">
          <p>🥉</p>
          <p>{lastSlot.topMultiplier[2]} X</p>
        </div>
      </div>
      {/* <div className='divider'></div>
      <div className='current-game__personnal-best'>
        <h2>🌟 PERSONAL BEST</h2>
        <div className='current-game__personnal-best__content'>
          <div className='row'>
            <p>WIN</p>
            <p>($8) $14,726</p>
          </div>
          <div className='row'>
            <p>X</p>
            <p>($8) 24578.45X</p>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default CurrentGame;
