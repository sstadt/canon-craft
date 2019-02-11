
/********************************
Firebase doesn't like custom
quest object, so we export
a function in place of a
constructor
********************************/

import uniqid from 'uniqid'

export const JournalEntry = () => {
  return {
    id: uniqid(),
    title: 'New Log Entry',
    date: new Date(),
    description: 'Synopsis of events'
  }
}
