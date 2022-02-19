const Title: React.FC = ({ children }) => {
  return (
    <h1 className="my-6 font-bold">
      {children}
      <style jsx>{`
        h1 {
          font-size: 24px;
        }
      `}</style>
    </h1>
  )
}

export default Title
