import { getActivities } from "@/actions/activities/get-activities"
import { Metadata } from "next"
import DisplayError from "@/utils/display-error"
import { DataTable } from "./components/data-table/data-table"
import { columns } from "./components/data-table/columns"

export const generateMetadata: Metadata = {
  title: `Anthill v2 - Settings`,
}

const Settings = async () => {
  const activitiesList = await getActivities()
  if ("error" in activitiesList) {
    DisplayError(activitiesList.error)
    return
  }

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={activitiesList} />
    </div>
  )
}

export default Settings
