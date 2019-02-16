
/********************************
Firebase doesn't like custom
quest object, so we export
a function in place of a
constructor
********************************/

import uniqid from 'uniqid'

export const JournalEntry = () => {
  return {
    title: 'New Log Entry',
    date: new Date(),
    published: false,
    description: 'Synopsis of events'
  }
}
