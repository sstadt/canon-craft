
/********************************
Firebase doesn't like custom
objects, so we export a function 
in place of a constructor
********************************/

export const Npc = ({ campaign, created_by }) => {
  return {
    name: 'New Npc',
    created_by,
    campaign,
    image: '',
    players: [],
    description: ''
  }
}
