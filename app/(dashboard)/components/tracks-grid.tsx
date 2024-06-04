import { getActivities } from "@/actions/activities/get-activities"
import getTrackRowsForPeriod from "../../../actions/tracks/get-track-rows-for-period"
import populateWithNewTracks from "../../../utils/populate-with-new-tracks"
import NewTracksRow from "./new-tracks-row"
import Selector from "./selector"
import TracksRow from "./tracks-row"
import { Suspense } from "react"
import { SkeletonLoader } from "@/components/skeleton-lodaer"
import DisplayError from "@/utils/display-error"

async function TracksGrid({ from, to }: { from: Date; to: Date }) {
  const weeks = await getTrackRowsForPeriod(from)
  const allActivities = await getActivities()
  if ("error" in allActivities) {
    // DisplayError(allActivities.error.code)
    console.log(allActivities.error.code)

    return
  }

  if (!weeks)
    return (
      <NewTracksRow
        opened={true}
        key={from.toDateString()}
        allActivities={allActivities}
        from={from}
        to={to}
      />
    )

  if ("error" in weeks) {
    // DisplayError(weeks.error.code)
    console.log(weeks.error.code)
    return
  }

  return (
    <>
      <Suspense fallback={<SkeletonLoader />}>
        {weeks.TrackRow.map((trackRow) => {
          return (
            <>
              <Selector
                key={trackRow.activityId}
                trackRowId={trackRow.id}
                activityId={trackRow.activityId}
                activities={allActivities}
              />

              <TracksRow
                trackData={populateWithNewTracks(
                  trackRow.Track,
                  trackRow.id,
                  from,
                  to
                )}
                key={trackRow.id}
              />
            </>
          )
        })}
        <NewTracksRow
          opened={weeks.TrackRow.length === 0}
          key={weeks.TrackRow.length}
          allActivities={allActivities}
          from={from}
          to={to}
        />
      </Suspense>
    </>
  )
}

export default TracksGrid
