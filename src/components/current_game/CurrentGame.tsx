import React, {useEffect, useState} from 'react';
import './CurrentGame.scss'

type CurrentGameProps = {
  token: string,
}

type Slot = {
  name: string,
  provider: string,
  thumbnailUrl: string,
  topMultiplier: Array<any>,
}

const CurrentGame: React.FC<CurrentGameProps> = ({token}) => {

    const [lastSlot, setLastSlot] = useState<Slot>({
      name: "None",
      provider: "None",
      thumbnailUrl: '',
      topMultiplier: [1,1,1]
    });

    const getLastBetGameDetails = (slug:string) => {
      let query = `query SlugKuratorGameIndex($slug: String!) {
        slugKuratorGame(slug: $slug) {
          ...GameKuratorGame
          multiplierLeaderboard {
            id
            payoutMultiplier
            updatedAt
            bet {
              ...BetFragment
            }
            position
          }
          profitLeaderboard {
            id
            profitValue
            updatedAt
            bet {
              ...BetFragment
            }
            position
          }
          groupGames {
            id
            group {
              ...GameKuratorGroup
            }
          }
          challengeList(limit: 5, offset: 0) {
            ...ChallengeTable
          }
        }
      }
      
      fragment GameKuratorGame on GameKuratorGame {
        id
        name
        slug
        thumbnailUrl
        edge
        description
        active
        icon
        isFavourite
        showMultiplierLeaderboard
        showProfitLeaderboard
        data {
          __typename
          ... on SoftswissGame {
            ...SoftswissGame
          }
          ... on EvolutionGame {
            ...EvolutionGame
          }
          ... on GameKuratorThirdPartyGame {
            ...GameKuratorThirdPartyGame
          }
        }
        groupGames {
          id
          group {
            id
            translation
            type
            slug
          }
        }
      }
      
      fragment SoftswissGame on SoftswissGame {
        id
        edge
        extId
        isDemoEnabled
        availableCurrencies
        provider {
          ...SoftswissProvider
        }
      }
      
      fragment SoftswissProvider on SoftswissProvider {
        id
        name
      }
      
      fragment EvolutionGame on EvolutionGame {
        id
        name
        category {
          id
          name
        }
        edge
        currencies: availableCurrencies
      }
      
      fragment GameKuratorThirdPartyGame on GameKuratorThirdPartyGame {
        id
        edge
        extId
        isDemoEnabled
        thirdPartyGameAvailableCurrencies: availableCurrencies
        provider {
          id
          name
        }
      }
      
      fragment BetFragment on Bet {
        id
        iid
        type
        scope
        game {
          name
          icon
          slug
        }
        bet {
          ... on CasinoBet {
            ...CasinoBet
            user {
              id
              name
            }
          }
          ... on EvolutionBet {
            ...EvolutionBet
            user {
              id
              name
            }
          }
          ... on MultiplayerCrashBet {
            ...MultiplayerCrashBet
            user {
              id
              name
            }
          }
          ... on MultiplayerSlideBet {
            ...MultiplayerSlideBet
            user {
              id
              name
            }
          }
          ... on SoftswissBet {
            ...SoftswissBet
            user {
              id
              name
            }
          }
          ... on ThirdPartyBet {
            ...ThirdPartyBet
          }
          ... on SportBet {
            ...SportBet
            user {
              id
              name
            }
          }
          ... on PlayerPropBet {
            ...PlayerPropBetFragment
            user {
              id
              name
            }
          }
        }
      }
      
      fragment CasinoBet on CasinoBet {
        id
        active
        payoutMultiplier
        amountMultiplier
        amount
        payout
        updatedAt
        currency
        game
        user {
          id
          name
        }
      }
      
      fragment EvolutionBet on EvolutionBet {
        id
        amount
        currency
        createdAt
        payout
        payoutMultiplier
        user {
          id
          name
        }
        softswissGame: game {
          id
          name
          edge
        }
      }
      
      fragment MultiplayerCrashBet on MultiplayerCrashBet {
        id
        user {
          id
          name
        }
        payoutMultiplier
        gameId
        amount
        payout
        currency
        result
        updatedAt
        cashoutAt
        btcAmount: amount(currency: btc)
      }
      
      fragment MultiplayerSlideBet on MultiplayerSlideBet {
        id
        user {
          id
          name
        }
        payoutMultiplier
        gameId
        amount
        payout
        currency
        slideResult: result
        updatedAt
        cashoutAt
        btcAmount: amount(currency: btc)
        active
        createdAt
      }
      
      fragment SoftswissBet on SoftswissBet {
        id
        amount
        currency
        updatedAt
        payout
        payoutMultiplier
        user {
          id
          name
        }
        softswissGame: game {
          id
          name
          edge
          extId
          provider {
            id
            name
          }
        }
      }
      
      fragment ThirdPartyBet on ThirdPartyBet {
        id
        amount
        currency
        updatedAt
        payout
        payoutMultiplier
        betReplay
        user {
          id
          name
        }
        thirdPartyGame: game {
          id
          name
          edge
          extId
          provider {
            id
            name
          }
        }
      }
      
      fragment SportBet on SportBet {
        id
        customBet
        amount
        active
        currency
        status
        payoutMultiplier
        cashoutMultiplier
        updatedAt
        payout
        createdAt
        potentialMultiplier
        adjustments {
          id
          payoutMultiplier
          updatedAt
          createdAt
        }
        user {
          id
          name
        }
        bet {
          iid
        }
        outcomes {
          odds
          status
          outcome {
            ...SportMarketOutcome
          }
          market {
            ...SportMarket
          }
          fixture {
            id
            status
            slug
            marketCount(status: [active, suspended])
            extId
            data {
              ...SportFixtureDataMatch
              ...SportFixtureDataOutright
              __typename
            }
            tournament {
              ...TournamentTreeNested
            }
            eventStatus {
              ...SportFixtureEventStatus
            }
            betradarStream {
              exists
            }
            abiosStream {
              exists
              stream {
                id
              }
            }
          }
        }
      }
      
      fragment SportMarketOutcome on SportMarketOutcome {
        active
        id
        odds
        name
        customBetAvailable
      }
      
      fragment SportMarket on SportMarket {
        id
        name
        status
        extId
        specifiers
        customBetAvailable
      }
      
      fragment SportFixtureDataMatch on SportFixtureDataMatch {
        startTime
        competitors {
          ...SportFixtureCompetitor
        }
        __typename
      }
      
      fragment SportFixtureCompetitor on SportFixtureCompetitor {
        name
        extId
        countryCode
        abbreviation
      }
      
      fragment SportFixtureDataOutright on SportFixtureDataOutright {
        name
        startTime
        endTime
        __typename
      }
      
      fragment TournamentTreeNested on SportTournament {
        id
        name
        slug
        category {
          ...CategoryTreeNested
        }
      }
      
      fragment CategoryTreeNested on SportCategory {
        id
        name
        slug
        sport {
          id
          name
          slug
        }
      }
      
      fragment SportFixtureEventStatus on SportFixtureEventStatus {
        homeScore
        awayScore
        matchStatus
        clock {
          matchTime
          remainingTime
        }
        periodScores {
          homeScore
          awayScore
          matchStatus
        }
        currentServer {
          extId
        }
        homeGameScore
        awayGameScore
        statistic {
          yellowCards {
            away
            home
          }
          redCards {
            away
            home
          }
          corners {
            home
            away
          }
        }
      }
      
      fragment PlayerPropBetFragment on PlayerPropBet {
        __typename
        active
        amount
        cashoutMultiplier
        createdAt
        currency
        customBet
        id
        odds
        payout
        payoutMultiplier
        updatedAt
        status
        user {
          id
          name
        }
        playerProps {
          id
          odds
          lineType
          playerProp {
            ...PlayerPropLineFragment
          }
        }
      }
      
      fragment PlayerPropLineFragment on PlayerPropLine {
        id
        line
        over
        under
        suspended
        balanced
        name
        player {
          id
          name
        }
        market {
          id
          stat {
            name
            value
          }
          game {
            id
            fixture {
              id
              name
              status
              eventStatus {
                ...FixtureEventStatus
              }
              data {
                ... on SportFixtureDataMatch {
                  __typename
                  startTime
                  competitors {
                    ...CompetitorFragment
                  }
                }
              }
              tournament {
                id
                category {
                  id
                  sport {
                    id
                    name
                    slug
                  }
                }
              }
            }
          }
        }
      }
      
      fragment FixtureEventStatus on SportFixtureEventStatus {
        homeScore
        awayScore
        matchStatus
        clock {
          matchTime
          remainingTime
        }
        periodScores {
          homeScore
          awayScore
          matchStatus
        }
        currentServer {
          extId
        }
        homeGameScore
        awayGameScore
        statistic {
          yellowCards {
            away
            home
          }
          redCards {
            away
            home
          }
          corners {
            home
            away
          }
        }
      }
      
      fragment CompetitorFragment on SportFixtureCompetitor {
        name
        extId
        countryCode
        abbreviation
      }
      
      fragment GameKuratorGroup on GameKuratorGroup {
        id
        slug
        translation
        icon
        type
      }
      
      fragment ChallengeTable on Challenge {
        id
        active
        award
        currency
        minBetUsd
        createdAt
        targetMultiplier
        creatorUser {
          id
          name
        }
        game {
          id
          name
          slug
        }
      }`;

      let variables = {slug: slug}
      
      fetch('https://api.stake.bet/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*',
          'X-Access-Token': token,
          'Referer': 'https://stake.com/',
          'Origin': 'https://stake.com'
        },
        body: JSON.stringify({
          query,
          variables,
        })
      })
        .then(r => r.json())
        .then(data => {
          console.log('data returned:', data)
          
          let slot:Slot = {
            name: data.data.slugKuratorGame.name,
            provider: data.data.slugKuratorGame.data != null ? data.data.slugKuratorGame.data.provider.name : 'Stake',
            thumbnailUrl: data.data.slugKuratorGame.thumbnailUrl,
            topMultiplier: [
              data.data.slugKuratorGame.multiplierLeaderboard[0].payoutMultiplier,
              data.data.slugKuratorGame.multiplierLeaderboard[1].payoutMultiplier,
              data.data.slugKuratorGame.multiplierLeaderboard[2].payoutMultiplier,
            ],
          }

          setLastSlot(slot)
      });

    }

    const getUserBetList = () => {
        let query = `query MyBetList {
          user {
            id
            houseBetList(offset: 0, limit: 10) {
              ...BetFragment
              __typename
            }
            __typename
          }
        }
        
        fragment BetFragment on Bet {
          id
          iid
          type
          scope
          game {
            name
            icon
            slug
            __typename
          }
          bet {
            ... on CasinoBet {
              ...CasinoBet
              user {
                id
                name
                __typename
              }
              __typename
            }
            ... on EvolutionBet {
              ...EvolutionBet
              user {
                id
                name
                __typename
              }
              __typename
            }
            ... on MultiplayerCrashBet {
              ...MultiplayerCrashBet
              user {
                id
                name
                __typename
              }
              __typename
            }
            ... on MultiplayerSlideBet {
              ...MultiplayerSlideBet
              user {
                id
                name
                __typename
              }
              __typename
            }
            ... on SoftswissBet {
              ...SoftswissBet
              user {
                id
                name
                __typename
              }
              __typename
            }
            ... on ThirdPartyBet {
              ...ThirdPartyBet
              __typename
            }
            ... on SportBet {
              ...SportBet
              user {
                id
                name
                __typename
              }
              __typename
            }
            ... on PlayerPropBet {
              ...PlayerPropBetFragment
              user {
                id
                name
                __typename
              }
              __typename
            }
            __typename
          }
        }
        
        fragment CasinoBet on CasinoBet {
          id
          active
          payoutMultiplier
          amountMultiplier
          amount
          payout
          updatedAt
          currency
          game
          user {
            id
            name
            __typename
          }
        }
        
        fragment EvolutionBet on EvolutionBet {
          id
          amount
          currency
          createdAt
          payout
          payoutMultiplier
          user {
            id
            name
            __typename
          }
          softswissGame: game {
            id
            name
            edge
            __typename
          }
        }
        
        fragment MultiplayerCrashBet on MultiplayerCrashBet {
          id
          user {
            id
            name
            __typename
          }
          payoutMultiplier
          gameId
          amount
          payout
          currency
          result
          updatedAt
          cashoutAt
          btcAmount: amount(currency: btc)
        }
        
        fragment MultiplayerSlideBet on MultiplayerSlideBet {
          id
          user {
            id
            name
            __typename
          }
          payoutMultiplier
          gameId
          amount
          payout
          currency
          slideResult: result
          updatedAt
          cashoutAt
          btcAmount: amount(currency: btc)
          active
          createdAt
        }
        
        fragment SoftswissBet on SoftswissBet {
          id
          amount
          currency
          updatedAt
          payout
          payoutMultiplier
          user {
            id
            name
            __typename
          }
          softswissGame: game {
            id
            name
            edge
            extId
            provider {
              id
              name
              __typename
            }
            __typename
          }
        }
        
        fragment ThirdPartyBet on ThirdPartyBet {
          id
          amount
          currency
          updatedAt
          payout
          payoutMultiplier
          betReplay
          user {
            id
            name
            __typename
          }
          thirdPartyGame: game {
            id
            name
            edge
            extId
            provider {
              id
              name
              __typename
            }
            __typename
          }
        }
        
        fragment SportBet on SportBet {
          id
          customBet
          amount
          active
          currency
          status
          payoutMultiplier
          cashoutMultiplier
          updatedAt
          payout
          createdAt
          potentialMultiplier
          adjustments {
            id
            payoutMultiplier
            updatedAt
            createdAt
            __typename
          }
          user {
            id
            name
            __typename
          }
          bet {
            iid
            __typename
          }
          outcomes {
            odds
            status
            outcome {
              ...SportMarketOutcome
              __typename
            }
            market {
              ...SportMarket
              __typename
            }
            fixture {
              id
              status
              slug
              marketCount(status: [active, suspended])
              extId
              data {
                ...SportFixtureDataMatch
                ...SportFixtureDataOutright
                __typename
              }
              tournament {
                ...TournamentTreeNested
                __typename
              }
              eventStatus {
                ...SportFixtureEventStatus
                __typename
              }
              betradarStream {
                exists
                __typename
              }
              abiosStream {
                exists
                stream {
                  id
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }
        }
        
        fragment SportMarketOutcome on SportMarketOutcome {
          active
          id
          odds
          name
          customBetAvailable
        }
        
        fragment SportMarket on SportMarket {
          id
          name
          status
          extId
          specifiers
          customBetAvailable
        }
        
        fragment SportFixtureDataMatch on SportFixtureDataMatch {
          startTime
          competitors {
            ...SportFixtureCompetitor
            __typename
          }
          __typename
        }
        
        fragment SportFixtureCompetitor on SportFixtureCompetitor {
          name
          extId
          countryCode
          abbreviation
        }
        
        fragment SportFixtureDataOutright on SportFixtureDataOutright {
          name
          startTime
          endTime
          __typename
        }
        
        fragment TournamentTreeNested on SportTournament {
          id
          name
          slug
          category {
            ...CategoryTreeNested
            __typename
          }
        }
        
        fragment CategoryTreeNested on SportCategory {
          id
          name
          slug
          sport {
            id
            name
            slug
            __typename
          }
        }
        
        fragment SportFixtureEventStatus on SportFixtureEventStatus {
          homeScore
          awayScore
          matchStatus
          clock {
            matchTime
            remainingTime
            __typename
          }
          periodScores {
            homeScore
            awayScore
            matchStatus
            __typename
          }
          currentServer {
            extId
            __typename
          }
          homeGameScore
          awayGameScore
          statistic {
            yellowCards {
              away
              home
              __typename
            }
            redCards {
              away
              home
              __typename
            }
            corners {
              home
              away
              __typename
            }
            __typename
          }
        }
        
        fragment PlayerPropBetFragment on PlayerPropBet {
          __typename
          active
          amount
          cashoutMultiplier
          createdAt
          currency
          customBet
          id
          odds
          payout
          payoutMultiplier
          updatedAt
          status
          user {
            id
            name
            __typename
          }
          playerProps {
            id
            odds
            lineType
            playerProp {
              ...PlayerPropLineFragment
              __typename
            }
            __typename
          }
        }
        
        fragment PlayerPropLineFragment on PlayerPropLine {
          id
          line
          over
          under
          suspended
          balanced
          name
          player {
            id
            name
            __typename
          }
          market {
            id
            stat {
              name
              value
              __typename
            }
            game {
              id
              fixture {
                id
                name
                status
                eventStatus {
                  ...FixtureEventStatus
                  __typename
                }
                data {
                  ... on SportFixtureDataMatch {
                    __typename
                    startTime
                    competitors {
                      ...CompetitorFragment
                      __typename
                    }
                  }
                  __typename
                }
                tournament {
                  id
                  category {
                    id
                    sport {
                      id
                      name
                      slug
                      __typename
                    }
                    __typename
                  }
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }
        }
        
        fragment FixtureEventStatus on SportFixtureEventStatus {
          homeScore
          awayScore
          matchStatus
          clock {
            matchTime
            remainingTime
            __typename
          }
          periodScores {
            homeScore
            awayScore
            matchStatus
            __typename
          }
          currentServer {
            extId
            __typename
          }
          homeGameScore
          awayGameScore
          statistic {
            yellowCards {
              away
              home
              __typename
            }
            redCards {
              away
              home
              __typename
            }
            corners {
              home
              away
              __typename
            }
            __typename
          }
        }
        
        fragment CompetitorFragment on SportFixtureCompetitor {
          name
          extId
          countryCode
          abbreviation
        }`;

        let operationName = "MyBetList"
        
        fetch('https://api.stake.bet/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
            'X-Access-Token': token,
            'Referer': 'https://stake.com/',
            'Origin': 'https://stake.com'
          },
          body: JSON.stringify({
            operationName,
            query,
          })
        })
          .then(r => r.json())
          .then(data => {
            console.log('data returned:', data)
            if(data.data.user.houseBetList.length > 0){
              getLastBetGameDetails(data.data.user.houseBetList[0].game.slug)
            }
        });
  }

  useEffect(() => {

    getUserBetList();
    const interval = setInterval(() => {
      getUserBetList();
    }, 8000);

    return () => clearInterval(interval);
  }, [token])

  return (
    <div className='current-game'> 
      <img className='current-game__image' src={lastSlot.thumbnailUrl}></img>
      <div className='current-game__basics'>
        <h2>🎰 CURRENT SLOT</h2>
        <div>
          <p className='current-game__basics__game-name'>{lastSlot.name}</p>
          <p className='current-game__basics__game-provider'>{lastSlot.provider.toUpperCase()}</p>
        </div>
      </div>
      <div className='divider'></div>
      <div className='current-game__infos'>
        <h2>👑 TOP SLOT HITS</h2>
        <div className='row'>
          <p>🥇</p>
          <p>{lastSlot.topMultiplier[0]} X</p>
        </div>
        <div className='row'>
          <p>🥈</p>
          <p>{lastSlot.topMultiplier[1]} X</p>
        </div>
        <div className='row'>
          <p>🥉</p>
          <p>{lastSlot.topMultiplier[2]} X</p>
        </div>
      </div>
      <div className='divider'></div>
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
      </div>
    </div>
  );
}

export default CurrentGame;