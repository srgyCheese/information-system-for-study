import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { roles } from "../services/roles"

export const usePermissions = () => {
  const {user} = useContext(AuthContext)

  const _adminOrManager = () => {
    if (user.Role.name == roles.ADMIN || user.Role.name == roles.MANAGER) {
      return true
    }

    return false
  }
  
  const canChangeRoleTo = otherUser => {
    if (user.id == otherUser.id) {
      return false
    }

    if (user.Role.name == roles.ADMIN) {
      return true
    }

    return false
  }

  const lowerRoles = () => {
    if (user.Role.name == roles.ADMIN) {
      return [
        roles.COUNSEL,
        roles.MANAGER,
      ]
    }

    if (user.Role.name == roles.MANAGER) {
      return [
        roles.COUNSEL,
      ]
    }

    return null
  }

  return {
    users: {
      create: _adminOrManager,
      update: otherUser => {
        if (user.Role.name == roles.ADMIN) {
          return true
        }
    
        if (user.id == otherUser.id) {
          return true
        }
    
        if (user.Role.name == roles.MANAGER && otherUser.Role.name == roles.COUNSEL) {
          return true
        }
    
        return false
      },
      delete: otherUser => {
        if (user.id == otherUser.id) {
          return false
        }
    
        if (user.Role.name == roles.ADMIN) {
          return true
        }
    
        if (user.Role.name == roles.MANAGER && otherUser.Role.name == roles.COUNSEL) {
          return true
        }
    
        return false
      },
    },
    products: {
      create: _adminOrManager,
      update: _adminOrManager,
      delete: _adminOrManager,
    },
    categories: {
      create: _adminOrManager,
      update: _adminOrManager,
      delete: _adminOrManager,
    },
    warehouses: {
      create: _adminOrManager,
      update: _adminOrManager,
      delete: _adminOrManager,
    },
    productItems: {
      create: _adminOrManager,
      update: _adminOrManager,
      delete: _adminOrManager,
    },
    lowerRoles,
    canChangeRoleTo
  }
}