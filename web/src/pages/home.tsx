import styled from '@emotion/styled'
import { ListNotes } from '../component/ListNotes'
import { Navigation } from '../component/Navigation'
import { Wrapper } from '../component/wrapper'

export const Home = () => {
  return (
    <HomeStyled>
      <Navigation />
      <ListNotes />
    </HomeStyled>
  )
}

const HomeStyled = styled(Wrapper)`
  display: flex;
`
