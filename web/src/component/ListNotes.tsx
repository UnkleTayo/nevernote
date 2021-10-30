import styled from '@emotion/styled'
import { GENERICS } from './GlobalStyle'
export const ListNotes = () => {
  return (
    <ListNotesStyle>
      <h2>All Notes</h2>
    </ListNotesStyle>
  )
}

const ListNotesStyle = styled.div`
  height: 100%;
  width: 100%;
  max-width: 350px;
  color: ${GENERICS.colorBlackCalm};
  background-color: ${GENERICS.bgColor};

  > h2 {
    font-weight: normal;
    padding: 20px;
  }
`
