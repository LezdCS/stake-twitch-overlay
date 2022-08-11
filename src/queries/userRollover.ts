const userRolloverQuery = `query userRollover {
    user {
      rolloverList(limit: 10, offset: 0) {
        ...RolloverFragment
        __typename
      }
      activeRollovers {
        id
        active
        user {
          id
          __typename
        }
        amount
        lossAmount
        createdAt
        note
        currency
        expectedAmount
        expectedAmountMin
        progress
        activeBets {
          id
          iid
          game {
            id
            slug
            name
            __typename
          }
          bet {
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
  }
  
  fragment RolloverFragment on Rollover {
    id
    active
    user {
      id
      __typename
    }
    amount
    lossAmount
    createdAt
    currency
    expectedAmount
    expectedAmountMin
    progress
    note
  }`

export default userRolloverQuery;