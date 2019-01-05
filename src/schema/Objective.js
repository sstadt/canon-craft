
export default class Quest {
  constructor () {
    this.created_on = new Date().getTime()
    this.goal = 1
    this.completed = 0
    this.description = 'New Objective'
  }
}
