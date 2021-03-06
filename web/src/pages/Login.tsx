import styled from '@emotion/styled'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { GENERICS } from '../component/GlobalStyle'
import { Wrapper } from '../component/wrapper'
import { useLoginMutation } from '../generated/graphql'
import Illustration from '../assets/images/illustartion.jpg'
import Logo from '../assets/images/never.png'
import { Redirect, RouterProps } from 'react-router'
import { Link } from 'react-router-dom'
import { isAuthenticated, saveToken } from '../helper/auth'
import { useRequired } from '../helper/formHook'

export const Login = ({ history }: RouterProps) => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const [submitLogin, { error, loading, client }] = useLoginMutation()
  const { isValid } = useRequired(form)

  if (isAuthenticated()) {
    return <Redirect to="/" />
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const data = await submitLogin({
        variables: {
          ...form,
        },
      })
      await client.resetStore()
      saveToken(data.data?.login.access_token!)

      history.push('/')
    } catch (error) {
      console.error(error)
    }
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value })
  return (
    <Wrapper center={true}>
      <FormWrapper className="login-container">
        <div className="left-side">
          <img src={Illustration} alt="login" />
        </div>
        <div className="right-side">
          <div>
            <img src={Logo} alt="Logo" />
            <h2>Nevernote</h2>
          </div>
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
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={onChangeHandler}
              />
            </div>

            {error &&
              error.graphQLErrors.map(({ message }, i) => (
                <div key={i}>
                  <small className="error-message">{message}</small>
                </div>
              ))}

            <div>
              <button disabled={!isValid || loading} type="submit">
                {loading ? '...' : 'Submit'}
              </button>
            </div>
            <p>
              Don't have an account? Signup&nbsp;
              <span>
                <Link to="/signup">here</Link>
              </span>
            </p>
          </form>
        </div>
      </FormWrapper>
    </Wrapper>
  )
}

const FormWrapper = styled('div')`
  display: flex;
  align-items: center;
  border: ${GENERICS.border};
  border-radius: 5px;
  padding: 50px;
  user-select: none;
  gap: 20px;

  > div {
    flex: 0.5;
  }

  .left-side {
    img {
      width: 200px;
    }
  }

  .right-side {
    > div:first-of-type {
      text-align: center;
      img {
        width: 50px;
        border-radius: 10px;
      }
      margin-bottom: 20px;
    }

    form {
      div {
        margin-bottom: 10px;

        input {
          border: 2px solid gray;
          border-radius: 5px;
          padding: 10px 20px;
          outline: none;
          transition: 0.5s;
          &:focus {
            border-color: blue;
          }
        }

        button {
          border-radius: 5px;
          width: 100%;
          color: white;
          background-color: ${GENERICS.primaryColor};
          padding: 8px 20px;

          &:disabled {
            background-color: #ccc;
          }
        }
        small.error-message {
          color: red;
        }
      }

      p {
        font-size: 12px;
        a {
          color: ${GENERICS.primaryColor};
        }
      }
    }
  }
`
