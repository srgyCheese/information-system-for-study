const {roles} = require('./roles')

const getLowerRoles = (roleName) => {
  if (roleName == roles.ADMIN) {
    return [
      roles.COUNSEL,
      roles.MANAGER,
    ]
  }

  if (roleName == roles.MANAGER) {
    return [
      roles.COUNSEL,
    ]
  }

  return []
}

module.exports = {getLowerRoles}