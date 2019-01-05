
export default class Quest {
  constructor ({ game, created_by, title }) {
    this.game = game
    this.created_by = created_by
    this.title = title || ''
    this.description = ''
    this.objectives = []
    this.players = []
  }
}
