
const quests = [{
    title: 'Clear the Kobold Nest',
    description: 'The local magistrate has been having trouble with kobolds nearby. He\'s offered a reward in gold for anyone skilled enough to clear out their nest.'
  }, {
    title: 'Investigate the Tower',
    description: 'People have been dissapearing near the old tower in the country. Find out what\'s going on down there.'
  }]

export const getSampleQuest = () => {
  let max = quests.length
  let min = 0
  let index = Math.floor(Math.random() * (+max - +min)) + +min

  return quests[index]
}
