import styled from 'styled-components'
import Header from './Header'

type Props = {
  children: React.ReactNode
}

export default function Root({ children }: Props) {
  return (
    <>
      <Header />
      <Container>
        {children}
      </Container>
    </>
  )
}


const Container = styled.section`
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  height: 100vh;
  align-items: center;
  width: 100vw;
`
