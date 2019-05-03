
export default value => {
  var div = document.createElement("div")
  div.innerHTML = value
  var text = div.textContent || div.innerText || ""
  return text
}