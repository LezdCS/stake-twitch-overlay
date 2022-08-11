const SlugKuratorGameIndexQuery = `query SlugKuratorGameIndex($slug: String!) {
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
  }
  `;

export default SlugKuratorGameIndexQuery;
