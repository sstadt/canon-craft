
/********************************
Firebase doesn't like custom
quest object, so we export
a function in place of a
constructor
********************************/

export const Objective = () => {
  return {
    created_on: new Date().getTime(),
    goal: 1,
    completed: 0,
    description: 'New Objective'
  }
}
