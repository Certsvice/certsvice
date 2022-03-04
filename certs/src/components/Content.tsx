type Props = {
  children: React.ReactNode
  className?: string
}

export default function PageContent({ children }: Props) {
  return <div className="mx-12 h-auto w-auto flex items-center justify-center my-8">{children}</div>
}
