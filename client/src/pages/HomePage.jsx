import Leaderboard from "../components/Leaderboard"
import Matches from "../components/Matches"
import useLeaderboard from "../hooks/useLeaderboard"
import useMatches from "../hooks/useMatches"

function HomePage() {
  const {
    leaderboard,
    loading,
    error
  } = useLeaderboard()
  const {
    matches,
    loading: matchesLoading,
    error: matchesError
  } = useMatches()


  return (
    <div className="container">
      <h1>Luupinite ennustus 2026</h1>

      <div className="section">
        <h2>Edetabel</h2>

        {loading && (
          <div className="status-box">
            Laen edetabelit...
          </div>
        )}

        {error && (
          <div className="status-box error-box">
            {error}
          </div>
        )}

        {!loading && !error && (
          <Leaderboard leaderboard={leaderboard} />
        )}
      </div>

      <div className="section">
        <h2>Mängud</h2>

        {matchesLoading && (
          <div className="status-box">
            Laen mänge...
          </div>
        )}

        {matchesError && (
          <div className="status-box error-box">
            {matchesError}
          </div>
        )}

        {!matchesLoading && !matchesError && (
          <Matches matches={matches} />
        )}

      </div>
    </div>
  )
}

export default HomePage