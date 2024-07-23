const ChannelPlayer = ({ selectedChannel }: 
    { selectedChannel: string | null}) => {
  return (
    <div>{selectedChannel}</div>
  )
}

export default ChannelPlayer