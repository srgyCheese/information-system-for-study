import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"

export const usePermissions = () => {
  const {user} = useContext(AuthContext)

  const canChangeUser = otherUser => {
    if (user.Role.name == 'admin') {
      return true
    }

    if (user.id == otherUser.id) {
      return true
    }

    if (user.Role.name == 'manager' && otherUser.Role.name == 'counsel') {
      return true
    }

    return false
  }

  
  const canChangeRoleTo = otherUser => {
    if (user.Role.name == 'admin') {
      return true
    }

    return false
  }

  return {canChangeUser, canChangeRoleTo}
}