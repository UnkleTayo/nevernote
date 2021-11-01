import styled from '@emotion/styled'
import { Redirect } from 'react-router'
import { ListNotesEditor } from '../component/ListNotesEditor'
import { Navigation } from '../component/Navigation'
import { Wrapper } from '../component/wrapper'
import { isAuthenticated } from '../helper/auth'

export const Home: React.FC = () => {
  if (!isAuthenticated()) {
    return <Redirect to="/login" />
  }
  return (
    <HomeStyled>
      <Navigation />
      <ListNotesEditor />
    </HomeStyled>
  )
}

const HomeStyled = styled(Wrapper)`
  display: flex;
`
