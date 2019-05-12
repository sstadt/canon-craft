
const $body = document.querySelector('body')
const openModalClass = 'modal-open'
const openSidepanelClass = 'sidepanel-open'

const sidepanelOpen = () => {
  if (!$body.classList.contains(openSidepanelClass))
    $body.classList.add(openSidepanelClass)
}

const sidepanelClose = () => {
  if ($body.classList.contains(openSidepanelClass))
    $body.classList.remove(openSidepanelClass)
}

const modalOpen = () => {
  if (!$body.classList.contains(openModalClass))
    $body.classList.add(openModalClass)
}

const modalClose = () => {
  if ($body.classList.contains(openModalClass))
    $body.classList.remove(openModalClass)
}

export const initScrollLock = () => {
  document.addEventListener('sidepanel-open', sidepanelOpen)
  document.addEventListener('sidepanel-close', sidepanelClose)
  document.addEventListener('modal-open', modalOpen)
  document.addEventListener('modal-close', modalClose)
}
