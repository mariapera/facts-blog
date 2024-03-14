function Message({message, type='error'}) {
  return (
    <p className={`message message-${type}`}>{message}</p>
  )
}
export default Message