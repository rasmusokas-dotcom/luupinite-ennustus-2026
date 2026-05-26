import express from "express"
import getWorldCupMatches from "../api/footballApi.js"
import readPredictionFiles from "../utils/readPredictionFiles.js"
import getNextRoundKey from "../utils/getNextRoundKey.js"
const router = express.Router()

router.get("/", async (req, res) => {
  try {
    const matches = await getWorldCupMatches()
    const users = readPredictionFiles()

    const matchesWithPredictions = matches.map(match => {
      const nextRoundKey = getNextRoundKey(match.stage)

      if (!nextRoundKey) {
        return match
      }

      const homeSupporters = []
      const awaySupporters = []
      const bothSupporters = []

      users.forEach(user => {
        const predictions =
          user.bracketPredictions[nextRoundKey]

        if (!predictions) return

        const hasHome =
          predictions.includes(match.homeTeam)

        const hasAway =
          predictions.includes(match.awayTeam)

        if (hasHome && hasAway) {
          bothSupporters.push(user.userName)
        } else if (hasHome) {
          homeSupporters.push(user.userName)
        } else if (hasAway) {
          awaySupporters.push(user.userName)
        }
      })

      return {
        ...match,

        predictionSummary: {
          homeSupporters,
          awaySupporters,
          bothSupporters
        }
      }
    })

    res.json(matchesWithPredictions)
  } catch (error) {
    console.error("Matches error:", error)

    res.status(500).json({
      message: "Mängude laadimine ebaõnnestus"
    })
  }
})

export default router