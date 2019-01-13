
/********************************
Firebase doesn't like custom
quest object, so we export
a function in place of a
constructor
********************************/

import { hash } from '@/lib/util'

export const Objective = () => {
  let rand = Math.random()
  let time = new Date().getTime()
  let str = String((Math.random() + new Date().getTime()) * 1000)
  let id = Math.abs(hash(str))

  return {
    id: String(id),
    created_on: time,
    goal: 1,
    completed: 0,
    description: 'New Objective'
  }
}
