class Match {
    constructor(id, name, nextMatchId, nextLooserMatchId, tournamentRoundText, startTime, state, participants) {
        this.id = id;
        this.name = name;
        this.nextMatchId = nextMatchId; 
        this.nextLooserMatchId = nextLooserMatchId;
        this.tournamentRoundText = tournamentRoundText;
        this.startTime = startTime;
        this.state = state;
        this.participants = participants
      }
}
const matches = [
    new Match(1,"12",1,1,"", 12, "", [])
]

module.exports = [Match, matches]