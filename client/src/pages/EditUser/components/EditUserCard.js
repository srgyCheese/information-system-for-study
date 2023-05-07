import React from 'react'
import { usePermissions } from '../../../hooks/usePermissions'
import { rolesList } from '../../../services/roles'
import ReactInputMask from 'react-input-mask'

const EditUserCard = ({ user, setEditedUser, editedUser }) => {
  const permissions = usePermissions()

  const editInputTextProps = (valueName) => {
    return {
      value: editedUser[valueName] == undefined ? user[valueName] : editedUser[valueName],
      onChange: e => setEditedUser({
        ...editedUser,
        [valueName]: e.target.value
      })
    }
  }

  return (
    <div className='d-flex container-fluid gap-3' style={{ padding: 0 }}>
      <div>
        <img
          src={user.photo}
          className='object-fit-contain'
          style={{ height: '300px', width: '300px' }}
        />
        <input 
          type='file' 
          className="form-control mt-2" 
          onChange={e => setEditedUser({...editedUser, photo: e.target.files?.[0]})} 
          accept=".jpg, .jpeg, .png"
        />
      </div>
      <div className='w-100'>
        <div className="row">
          <div className="col-sm-3">
            <p className="mb-0">ФИО</p>
          </div>
          <div className="col-sm-9">
            <p className="text-muted mb-0">
              <input 
                className='form-control'
                {...editInputTextProps('name')}
              />
            </p>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-sm-3">
            <p className="mb-0">E-mail</p>
          </div>
          <div className="col-sm-9">
            <p className="text-muted mb-0">
              <input 
                className='form-control'
                {...editInputTextProps('email')}
              />
            </p>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-sm-3">
            <p className="mb-0">Телефон</p>
          </div>
          <div className="col-sm-9">
            <p className="text-muted mb-0">
              <ReactInputMask
                type='tel'
                mask="+7 (999) 999-99-99" 
                className="form-control"
                {...editInputTextProps('phone')}
              />
            </p>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-sm-3">
            <p className="mb-0">Роль</p>
          </div>
          <div className="col-sm-9">
            {permissions.canChangeRoleTo(user) ? (
              <select 
                className="form-select"
                value={editedUser.Role == undefined ? user.Role.name : editedUser.Role.name}
                onChange={e => setEditedUser({
                  ...editedUser,
                  Role: rolesList.find(role => role.name === e.target.value)
                })}
              >
                {rolesList.map(role => (
                  <option key={role.name} value={role.name} hidden={!permissions.lowerRoles().includes(role.name)}>{role.title}</option>
                ))}
              </select>
            ) : (
              <p className="text-muted mb-0">
                {user.Role.title}
              </p>
            )}
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-sm-3">
            <p className="mb-0">Пароль</p>
          </div>
          <div className="col-sm-9">
            <p className="text-muted mb-0">
              <input 
                className='form-control'
                {...editInputTextProps('password')}
              />
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditUserCard