
/********************************
Firebase doesn't like custom
objects, so we export a function 
in place of a constructor
********************************/

export const Npc = ({ campaign }) => {
  return {
    name: 'New Npc',
    campaign: campaign,
    image: '',
    players: [],
    description: ''
  }
}
