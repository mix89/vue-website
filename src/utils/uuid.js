const uuid = ''
export function getUUID() {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(32).substring()
  }
  return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4())
}
export default uuid
