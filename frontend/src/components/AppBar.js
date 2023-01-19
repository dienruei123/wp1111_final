import * as React from "react"
import DefaultBar from "./DefaultBar"
import PersonalBar from "./PersonalBar"
import HostBar from "./HostBar"
import { useRent } from "../containers/hooks/useRent"

const ButtonAppBar = () => {
  const useRentContext = useRent()
  const { identity } = useRentContext
  const { signedIn } = useRentContext

  const renderBar = () => {
    if (!signedIn) return <DefaultBar />
    switch (identity) {
      case "Participant":
        return <PersonalBar />
      case "Host":
        return <HostBar />
      case "Admin":
        return <PersonalBar />
      default:
        throw new Error("INVALID_IDENTITY_ERROR")
    }
  }
  return renderBar()
}

export default ButtonAppBar
