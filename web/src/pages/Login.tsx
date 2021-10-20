import { ChangeEvent, FormEvent, useState } from 'react'
import { useLoginMutation } from '../generated/graphql'

export const Login = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const [submitLogin, { error }] = useLoginMutation()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      submitLogin({
        variables: {
          ...form,
        },
      })
      console.log('FORM', form)
    } catch (error) {
      console.error(error)
    }
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value })
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="login-email"></label>
          <input
            id="login-email"
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={onChangeHandler}
          />
        </div>

        <div>
          <label htmlFor="login-password"></label>
          <input
            id="login-password"
            type="text"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={onChangeHandler}
          />
        </div>

        {error && <div>{JSON.stringify(error)}</div>}

        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}
