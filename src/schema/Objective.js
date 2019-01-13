
/********************************
Firebase doesn't like custom
quest object, so we export
a function in place of a
constructor
********************************/

import uniqid from 'uniqid'

export const Objective = () => {
  return {
    id: uniqid(),
    created_on: new Date(),
    goal: 1,
    completed: 0,
    description: 'New Objective'
  }
}
