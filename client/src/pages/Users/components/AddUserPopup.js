import React, { useContext, useRef, useState } from 'react'
import Popup from '../../../components/Popup'
import Spinner from '../../../components/Spinner'
import { PopupContext } from '../../../contexts/PopupContext'
import { toast } from 'react-toastify'
import { useAddCategory } from '../../../queries/categoryQueries'
import { useAddUser } from '../../../queries/usersQueries'

const roles = [
  {
    title: 'Продавец-консультант',
    name: 'counsel'
  },
  {
    title: 'Менеджер',
    name: 'manager'
  },
]

const AddUserPopup = () => {
  const { closePopup } = useContext(PopupContext)
  const addUser = useAddUser()

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState(null)
  const photoRef = useRef()

  const submitHandler = async e => {
    e.preventDefault()

    if (!name.trim()) {
      return toast('Не введено ФИО', {
        type: 'error'
      })
    }

    if (!photoRef.current?.files?.length) {
      return toast('Нет фото сотрудника', {
        type: 'error'
      })
    }

    if (!phone.trim()) {
      return toast('Нет введен телефон', {
        type: 'error'
      })
    }

    if (!email.trim()) {
      return toast('Нет введен e-mail', {
        type: 'error'
      })
    }

    if (!role) {
      return toast('Нет введена роль', {
        type: 'error'
      })
    }

    addUser.mutate({
      role,
      email,
      name,
      phone,
      photo: photoRef.current.files[0],
      password
    }, {
      onSuccess: closePopup
    })
  }

  return (
    <Popup title={`Создание пользователя`}>
      <form onSubmit={submitHandler}>
        <div className="form-outline mb-3">
          <label className="form-label">Фото пользователя</label>
          <input 
            className="form-control" 
            type="file"
            accept=".jpg, .jpeg, .png"
            ref={photoRef}
          />
        </div>
        <div className="form-outline mb-3">
          <label className="form-label">ФИО</label>
          <input 
            type="text" 
            className="form-control" 
            onChange={e => setName(e.target.value)}
            value={name}
          />
        </div>
        <div className="form-outline mb-3">
          <label className="form-label">Номер телефона</label>
          <input 
            type="text" 
            className="form-control" 
            onChange={e => setPhone(e.target.value)}
            value={phone}
          />
        </div>
        <div className="form-outline mb-3">
          <label className="form-label">E-mail</label>
          <input 
            type="text"
            className="form-control" 
            onChange={e => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="form-outline mb-3">
          <label className="form-label">Пароль</label>
          <input 
            type="text" 
            className="form-control" 
            onChange={e => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div className="form-outline">
          <label className="form-label">Роль</label>
          
          <select 
            className="form-select"
            value={role}
            onChange={e => setRole(e.target.value)}
          >
            <option value={null}> </option>
            {roles?.map(el => <option key={el.name} value={el.name}>{el.title}</option>)}
          </select>
        </div>

        <button type="submit" className="btn btn-success mt-4" disabled={addUser.isLoading}>
          {addUser.isLoading && <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>}
          Создать
        </button>
      </form>
    </Popup>
  )
}

export default AddUserPopup