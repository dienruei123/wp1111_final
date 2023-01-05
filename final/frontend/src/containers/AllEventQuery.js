import { useQuery } from "@apollo/client"
import { ALLEVENTS_QUERY } from "../graphql"
import { Typography } from "@mui/material"

const AllEventQuery = () => {
  const { data, loading, error } = useQuery(ALLEVENTS_QUERY, {
    pollInterval: 1,
  })
  console.log(data, error)
  return <Typography>data</Typography>
}
export default AllEventQuery
