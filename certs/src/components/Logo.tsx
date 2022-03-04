import { Avatar } from '@nextui-org/react'

type Props = {
  image: string
}
export default function Logo({ image }: Props) {
  return (
    <div className="flex items-center ">
      <Avatar size="xl" src={image} color="secondary" bordered squared />
      <h1 style={{ color: '#e6e7ee', marginLeft: '0.5rem' }}>Certsvise</h1>
    </div>
  )
}
