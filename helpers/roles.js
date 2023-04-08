const roles = {
  ADMIN: 'admin',
  COUNSEL: 'counsel',
  MANAGER: 'manager'
}

const rolesList = [
  {
    title: 'Администратор',
    name: roles.ADMIN,
  },
  {
    title: 'Продавец-консультант',
    name: roles.COUNSEL,
  },
  {
    title: 'Менеджер',
    name: roles.MANAGER,
  },
]

module.exports = {roles, rolesList}