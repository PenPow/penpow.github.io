const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
    state = {}
    showTextNode(0)
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.classList.add('hvr-underline-from-left')
            button.classList.add('noselect')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0) {
        return startGame()
    }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}

const textNodes = [{
        id: 0,
        text: 'Welcome to the High Rise Mystery Choose Your Own Adventure\n\nBased on the TSBA Book Nominee: High Rise Mystery by Sharna Jackson.\n\nBecome Nik and Norva and have the chance to solve the mystery yourself! Will you discover the murderer, or will you fail Hugo?\nFind out in this choose your own adventure game!\n\nGood Luck!',
        options: [{
                text: 'Start Game',
                nextText: 1
            },
            {
                text: 'Find Out More',
                nextText: 0.5
            }
        ]
    },
    {
        id: 0.5,
        text: 'This choose your own adventure game was made for the TSBA Creative Response Challenge 2020/2021 by Joshua Clements.\n\nBased on the shortlisted book, High-Rise Mystery by Sharna Jackson.\nDue to time and size limitations, this is a modified version of the story to fit the style of game. Therefore the story is slightly different, but still keeps the same main storyline at heart.\n\nOverall, this took me around two days to make, from idea to finished game.\nI hope you enjoy it!',
        options: [{
                text: 'Start the Game',
                nextText: 1
            },
            {
                text: 'Back to Main Menu',
                nextText: 0
            }
        ]
    },
    {
        id: 1,
        text: 'There has been a murder in the Tri, the local council estate.\n Part time art teacher, and antiques dealer Hugo Knightly-Webb was found dead on a rubbish skip.\nNearby was a paint can, lying half tipped over onto the floor.\nYou pull your phone out and dial 999...',
        options: [{
                text: 'Take the paint can',
                setState: {
                    paintCan: true
                },
                nextText: 2
            },
            {
                text: 'Leave the paint can',
                nextText: 2
            }
        ]
    },
    {
        id: 2,
        text: 'Nee-naw Nee-naw\n\nAs the police arrive at the Tri, you are quickly whisked away to give evidence about the body. The policewoman, a former resident, asks if you found anything of interest nearby.',
        options: [{
                text: 'Hand in the paint can',
                requiredState: (currentState) => currentState.paintCan,
                setState: {
                    paintCan: false,
                    policeRespect: true,
                },
                nextText: 3
            },
            {
                text: 'Tell her that you saw a paint can',
                requiredState: (currentState) => !currentState.paintCan,
                setState: {
                    policeRespect: true,
                },
                nextText: 3
            },
            {
                text: 'Tell her you saw nothing',
                setState: {
                    policeRespect: false,
                },
                nextText: 3
            }
        ]
    },
    {
        id: 3,
        text: 'As you head over to your room, you see another resident, Mrs Kowalski, getting into the lift with you. What do you do?',
        options: [{
                text: 'Say nothing and go home as planned',
                nextText: 4
            },
            {
                text: 'Ask her if she has heard about Hugo\'s murder',
                nextText: 5
            },
            {
                text: 'Question Her',
                nextText: 8
            }
        ]
    },
    {
        id: 4,
        text: 'The lift slowly drags you up to your floor, as you sweat in the blistering heat. Mrs Kowalski comments about how she struggles to survive in the heat.',
        options: [{
            text: 'Go To Your Flat',
            setState: {
                info: false
            },
            nextText: 12
        }]
    },
    {
        id: 5,
        text: 'She says that she hasn\'t heard about it yet, and comments that you really liked him.',
        options: [{
                text: 'Tell her about the body',
                setState: {
                    info: true
                },
                nextText: 6
            },
            {
                text: 'Stay quiet and say that you only just found out yourself',
                setState: {
                    klowRespect: true
                },
                nextText: 7
            }
        ]
    },
    {
        id: 6,
        text: 'You tell her that you found his body at the bottom of a garbage chute.',
        options: [{
            text: 'Return Home',
            nextText: 12
        }]
    },
    {
        id: 7,
        text: 'You start crying as you tell her how much you miss him. She gives you a hug and tells you to stay strong.',
        options: [{
            text: 'Return Home',
            nextText: 12
        }, ]
    },
    {
        id: 8,
        text: 'You think about the detective plans you made,\n\nFollow Leads, \nFind Culprits, \nRestore Justice. \n\nYou turn to her and prepare to question her.',
        options: [{
                text: 'Ask about her project',
                setState: {
                    info: true
                },
                nextText: 9
            },
            {
                text: 'Ask about what she was doing',
                nextText: 10
            },
        ]
    },
    {
        id: 9,
        text: 'She went oddly quiet when you asked her this question. She only says that she was in her room with a friend.',
        options: [{
                text: 'Ask about the meeting',
                setState: {
                    info: true
                },
                nextText: 11
            },
            {
                text: 'Return Home',
                nextText: 12
            }
        ]
    },
    {
        id: 10,
        text: 'She says that she was doing a small project at the time, and that she missed the meeting for the Tri-Angels charity (the estate charity run by Jane).',
        options: [{
                text: 'Ask about her project',
                setState: {
                    info: true
                },
                nextText: 9
            },
            {
                text: 'Ask About the Meeting',
                setState: {
                    info: true
                },
                nextText: 11
            }
        ]
    },
    {
        id: 11,
        text: 'She says that she didn\'t get to attend the meeting as she was doing her weekly shop, but she mentions that things got heated between your dad and Hugo.',
        options: [{
            text: 'Return Home',
            nextText: 12
        }]
    },
    {
        id: 12,
        text: 'You get into bed contemplating the possible killers. As you consider their motives, and why they would do such a thing, you slowly drift off to sleep.',
        options: [{
            text: 'Next Day: Start Investigating',
            nextText: 13
        }]
    },
    {
        id: 13,
        text: 'As you walk down the hallway you see your policewoman friend, Katie. She notices you and starts walking towards you.',
        options: [{
                text: 'Talk to Katie',
                requiredState: (currentState) => currentState.policeRespect,
                nextText: 14
            },
            {
                text: 'Talk to Katie',
                requiredState: (currentState) => !currentState.policeRespect,
                nextText: 15
            }
        ]
    },
    {
        id: 14,
        text: 'Katie looked worried. She quickly says, "I am sorry girls" and walks up the stairs towards your apartment.',
        options: [{
                text: 'Follow Katie',
                nextText: 16
            },
            {
                text: 'Continue Investigation',
                nextText: 17
            }
        ]
    },
    {
        id: 15,
        text: 'Katie tells you that as much as she personally supports your investigative work, she tells you that her boss, DCI Sharp has ordered her to stop your work.\n\nYou lost since you lied to the police and lost their respect.\n\nGame over, try again.',
        options: [{
            text: 'Restart',
            nextText: -1
        }]
    },
    {
        id: 16,
        text: 'You turn around and start following Katie up the stairs.\n\nKnock Knock Knock\n\nShe opens the door to your apartment flanked by DCI Sharp. You hear them talking to your dad in the other room.',
        options: [{
            text: 'Listen to their conversation',
            nextText: 18
        }]
    },
    {
        id: 17,
        text: 'While you continued your investigation work, you let your father get arrested for the crime.\n\nYou Lose\nGame Over',
        options: [{
            text: 'Restart',
            nextText: -1
        }]
    },
    {
        id: 18,
        text: '"You do not have to say anything. But, it may harm your defence if you do not mention when questioned something which you later rely on in court. Anything you do say may be given in evidence."\n\nNo! You rush in to see them handcuffing and arresting your dad. Katie bows her head and says "I am sorry" again.',
        options: [{
            text: 'Next Page',
            nextText: 19
        }]
    },
    {
        id: 19,
        text: 'As your dad is led out, he tells you, "Stay Safe Nik & Norva, I will get us out of this"',
        options: [{
            text: 'Run to Selena\'s House',
            nextText: 20
        }]
    },
    {
        id: 20,
        text: 'You sit down on Selena\'s Chaise Longue. She looked sad, and looked visibly hurt that your dad was arrested. Nervously, she picked up a crumpled piece of paper and hands it to you. "I was given this last night, just read it"\n\nIt read, "Tick Tock, Tick Tock, give me the flipping clock."',
        options: [{
                text: 'Check CCTV Cameras',
                nextText: 21
            },
            {
                text: 'Investigate his Truck',
                nextText: 23
            }
        ]
    },
    {
        id: 21,
        text: 'As you walk towards Dad\'s office, to check the cameras you hear a loud noise, you turn around to see a large van on fire, Hugo\'s van! You see DCI Sharp run out of the office towards the explosion. Now is your chance to go in!',
        options: [{
                text: 'Go to the office',
                nextText: 22
            },
            {
                text: 'Run to the van',
                nextText: 23
            }
        ]
    },
    {
        id: 22,
        text: 'Hastily, you run inside and log into the CCTV system. You see a person carrying a body bag before throwing it down the rubbish chute, that must be Hugo! A few minutes later you see a man carrying a paint can, the official Tri paint can. Only Dad has access to them, so dad must be innocent!',
        options: [{
            text: 'Continue watching cameras',
            nextText: 24
        }]
    },
    {
        id: 23,
        text: 'You run towards the van, forgetting that DCI Sharp has her office near the cameras. You won\'t be able to access the cameras so you won\'t be able to solve the mystery.\n\nGame over, try again!',
        options: [{
            text: 'Restart',
            nextText: -1
        }]
    },
    {
        id: 24,
        text: 'You go back a bit further and see Serena handing Hugo a Vitonica, he takes a sip, and then enters, minutes later, the body is disposed of. Serena killed him for his money... Serena killed him for his money!',
        options: [{
            text: 'Call Katie',
            nextText: 25
        }]
    },
    {
        id: 25,
        text: 'Ring Ring, Ring Ring\n\nYou call Katie and tell her you know who killed Hugo. You explain that Selena was using the Vitonicas to poison Hugo. \nShe tells you to stay in your house and she would come deal with this.',
        options: [{
                text: 'Stay at home',
                nextText: 26
            },
            {
                text: 'Rush to Selena\'s',
                nextText: 27
            }
        ]
    },
    {
        id: 26,
        text: 'Katie rushes to your house,and tells you to come with her. You notice DCI Sharp rushing up the stairs.',
        options: [{
            text: 'Run to Selena\'s House.',
            nextText: 27
        }]
    },
    {
        id: 27,
        text: 'You rush up to the house and see Selena in tears. "Why would I kill Hugo. I\'m innocent!"\n\nYou explain that she was using the seeds to poison him, and that on the cameras he takes a sip and minutes later he was dead.\n\nKatie handcuffs Selena and walks her outside.',
        options: [{
            text: 'Next Page',
            nextText: 28
        }]
    },
    {
        id: 28,
        text: 'You look towards Selena as she was led out, and see a shadow of a familiar man outside. It was dad! You go and hug him as he slowly limps toward you.',
        options: [{
            text: 'Continue',
            nextText: 29
        }]
    },
    {
        id: 29,
        text: 'Congratulations!\n\nYou solved the mystery, and won the best detective prize for saving the Tri.\n\nPlay Again?',
        options: [{
                text: 'Play Again',
                nextText: 1
            },
            {
                text: 'Main Menu',
                nextText: 0
            }
        ]
    },
]

startGame()