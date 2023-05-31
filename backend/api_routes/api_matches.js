const participants = require('./data/participants')
const router = require('express').Router()
const matches = require('./data/matches')
const users = require("./data/users")
// const verifyToken = require('./api_auth');

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

function verifyToken(token) {
    //   const decoded = jwt.verify(token, TOKEN_KEY);
      const user = users[0].find((u) => u.token === token);

      if (user) return true
      else return false
};

//1 API-EP for getting list of all matches
router.route('/').get((req, response) => {
    const token = req.headers.token
    //TODO: uncomment in prod
    // if (!verifyToken(token)) {
    //     response.sendStatus(401);
    // }
    response.send(response.json(matches))
})

//3 API-EP for getting list of all users
router.route('/generate').post((req, response) => {
    const token = req.headers.token
    console.log(req.body)
    generateMatchesBasedOn16Participants(req.body)
    //TODO: uncomment in prod
    // if (!verifyToken(token)) {
    //     response.sendStatus(401);
    // }
    response.send(response.json(matches))
})

router.route('/update').post((req, response) => {
   updateWinners(req.body)
    //TODO: uncomment in prod
    // const token = req.headers.token
    // if (!verifyToken(token)) {
    //     response.sendStatus(401);
    // }
    response.send(response.json(matches))
})


router.route('/:id').get((req, response) => {
    
    //TODO: uncomment in prod
    // const token = req.headers.token
    // if (!verifyToken(token)) {
    //     response.sendStatus(401);
    // }
    response.send(response.json(matches[req.params.id]))
})

//function for generation of base 8 matches
function generateMatchesBasedOn16Participants(array16Participants) {
    //clear the test element for types problem
    matches.splice(0,matches.length)
    //add participants to array in back
    array16Participants.forEach(element => {
        participants.push(element);
    });
    //shuffle participants
    participants.sort(() => Math.random() - 0.5);
    //generate matches
    let participantCounter = 1; // <= 16
    for (let i = 1; i <= 8; i++) {
       let actualMatch = new Match(i,"1/8 Final", null, null, "6", "2021-05-30", "Undone", [
        {
            id: participantCounter,
            resultText: 0,
            isWinner: false,
            status: null,
            name: participants[participantCounter-1],
            picture: null
        },
        {
            id: participantCounter+1,
            resultText: 0,
            isWinner: false,
            status: null,
            name: participants[participantCounter],
            picture: null
        }

    ]);
        
        matches.push(actualMatch);

        participantCounter+=2;
    }

}

function updateWinners(incomeMatches) {
    
    incomeMatches.forEach((element, index) => {
        if (element.id === 15) {
            if (element.participants.length === 2) {
                matches[index].participants[0].resultText = element.participants[0].resultText
                matches[index].participants[1].resultText = element.participants[1].resultText
            if (element.participants[0].resultText !== element.participants[1].resultText) {
                let winner
                if (element.participants[0].resultText > element.participants[1].resultText) {
                    winner = element.participants[0]
                    matches[index].participants[0].isWinner = true
                } else {
                    winner = element.participants[1]
                    matches[index].participants[1].isWinner = true
                }
            }
            }
            return;
        }
        //next match is null or with 1 participant => we need to create a match or compare and add winner
        if (element.state !== "Done") {
        if (element.nextMatchId === null) {
            //1 or 2 participants => 1 - skip, 2 - if two has same points -> skip
            if (element.participants.length === 2) {
                    matches[index].participants[0].resultText = element.participants[0].resultText
                    matches[index].participants[1].resultText = element.participants[1].resultText
                if (element.participants[0].resultText !== element.participants[1].resultText) {
                    let winner
                    if (element.participants[0].resultText > element.participants[1].resultText) {
                        winner = element.participants[0]
                        matches[index].participants[0].isWinner = true
                    } else {
                        winner = element.participants[1]
                        matches[index].participants[1].isWinner = true
                    }
                    
                    //set the nextmatch id on exist new match
                    if (index !== 8-1 && index !== 12-1 && index !== 14-1) {
                        matches[index+1].nextMatchId = matches.length+1
                    }
                    matches[index].state = "Done"
                    let match = new Match(matches.length+1, "1/8 Final", null, null, "6", "2021-05-35", "Undone", [
                        {
                            id: winner.id,
                            resultText: 0,
                            isWinner: false,
                            status: null,
                            name: winner.name,
                            picture: null
                        },
                    ]);
                  
                    matches.push(match)
                    matches[index].nextMatchId = matches[matches.length-1].id

            
                }
            }
        } else {
            if (element.participants.length === 2) {
                matches[index].participants[0].resultText = element.participants[0].resultText
                matches[index].participants[1].resultText = element.participants[1].resultText
            if (element.participants[0].resultText !== element.participants[1].resultText) {
                let winner
                if (element.participants[0].resultText > element.participants[1].resultText) {
                    winner = element.participants[0]
                    matches[index].participants[0].isWinner = true
                } else {
                    winner = element.participants[1]
                    matches[index].participants[1].isWinner = true
                }
           

                let match = matches[element.nextMatchId-1]
                match.participants.push(
                    {
                        id: winner.id,
                        resultText: 0,
                        isWinner: false,
                        status: null,
                        name: winner.name,
                        picture: null
                    },
                )
                matches[index].state = "Done"
             
            }
        }
        }
    }
    });  
     
}

module.exports = router