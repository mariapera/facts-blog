function Button({children, className, style, disabled, handleClick}) {
  return (
    <button className={className} style={style} disabled={disabled} onClick={handleClick}>{children}</button>
  )
}
export default Button