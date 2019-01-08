
export default class Quest {
  constructor ({ game, created_by, title, description, objectives, players }) {
    this.game = game
    this.created_by = created_by
    this.title = title || ''
    this.description = description || ''
    this.objectives = objectives || []
    this.players = players || []
  }
}
