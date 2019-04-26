
/********************************
Firebase doesn't like custom
quest object, so we export
a function in place of a
constructor
********************************/

export const Npc = () => {
  return {
    name: 'New Npc',
    players: [],
    description: '',
    notes: ''
  }
}
