
/********************************
Firebase doesn't like custom
quest object, so we export
a function in place of a
constructor
********************************/

export const Quest = ({ game, created_by, title, description, objectives, players }) => {
  return {
    game: game,
    created_by: created_by,
    title: title || '',
    description: description || '',
    objectives: objectives || [],
    players: players || []
  }
}
