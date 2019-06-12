
/**
 * For use in SidePanel components and used
 * in conjunction with the CharacterPermissions
 * component.
 * 
 * Need to provide the following on the component:
 *  - data property containing the object to edit
 *  - update method to handle action dispatched
 */
export const permissions = {
  methods: {
    togglePlayer ({ document, player }) {
      let currentPlayers = this.data.players
      let playerIndex = currentPlayers.indexOf(player)

      if (playerIndex > -1) {
        this.data.players.splice(playerIndex, 1)
      } else {
        this.data.players.push(player)
      }

      this.update({ id: document, players: this.data.players })
    },
    enableAllPlayers (npcId) {
      let players = this.data.players.slice()

      this.characters.forEach(character => {
        if (players.indexOf(character.player) < 0) {
          players.push(character.player)
        }
      })

      this.data.players = players
      this.update({ id: this.data.id, players })
    },
    disableAllPlayers (npcId) {
      let players = this.data.players.slice()
      
      this.characters.forEach(character => {
        let index = players.indexOf(character.player)

        if (index > -1) {
          players.splice(index, 1)
        }
      })

      this.data.players = players
      this.update({ id: this.data.id, players })
    }
  }
}