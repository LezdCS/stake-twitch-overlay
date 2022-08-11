const MyBetListQuery = `query MyBetList {
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

export default MyBetListQuery;
