import styled from 'styled-components'

type Props = {
  children: React.ReactNode
  className: string
}

export default function Content({ children }: Props) {
  return <PageContent>{children}</PageContent>
}

const PageContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  @media (min-width: 1280px) {
    max-width: 1280px;
  }
  @media (min-width: 1024px) and (max-width: 1280px) {
    max-width: 1024px;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    max-width: 768px;
  }
  @media (max-width: 640px) {
    max-width: 640px;
  }
`
