const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons');

let score = 0;

function startGame() {
    score = 0
    showTextNode(0)
}

function showTextNode(textNodeIndex) { 
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)

    for(let i = 0; i < textNode?.options?.length; i++) {
        if(textNode.options[i].setState) score++
    }
    textElement.innerText = textNode.text.replace(/\[(.*?)\]/, score)
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
    return option.requiredState == null
}

function selectOption(option) {
    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0) {
        return startGame()
    }
    showTextNode(nextTextNodeId)
}

const textNodes = [{
        id: 0,
        text: 'Welcome to the Carl Friedrich Gauss Quiz\n\nIn this quiz, you will be able to learn about Carl Friedrich Gauss, a child progedy and amazing mathematician\n\nGood Luck!',
        options: [{
                text: 'Start Game',
                nextText: 1,
            },
        ]
    },

    // Question 1 - Section 1
    {
        id: 1,
        text: 'Section 1: Family)\nWhile Gauss is mainly known for his mathematical abilities, he also has a busy family and personal life, how many children did he have to look after?',
        options: [{
                text: '4',
                nextText: 2
            },
            {
                text: '5',
                nextText: 2
            },
            {
                text: '6',
                nextText: 3
            },
            {
                text: '7',
                nextText: 2
            }
        ]
    },
    {
        id: 2,
        text: 'Incorrect. Gauss actually had SIX children during his lifetime to look after.',
        options: [{
                text: 'Continue to Next Question',
                nextText: 4
            },
        ]
    },
    {
        id: 3,
        text: 'Correct! Gauss had six children during his life, despite this, he was still very studious and spent the majority of his day working, as opposed to seeing his children.',
        options: [{
                text: 'Continue to Next Question',
                setState: true,
                nextText: 4
            },
        ]
    },

    // Question 2
    {
        id: 4,
        text: 'Question Number 2! His father almost stopped him from studying maths. Why was this?',
        options: [{
            text: 'Because they would shame the family name because they weren\'t as smart as him',
            nextText: 6
        },
        {
            text: 'Because his father wanted him to become a doctor',
            nextText: 5
        },
        {
            text: 'Because his parents thought maths was a useless hobby',
            nextText: 5
        },
        {
            text: 'Because they thought that he would be better as an engineer',
            nextText: 5
        }
    ]
    },
    {
        id: 5,
        text: 'Incorrect. Gauss\' father, Gebhard Dietrich Gauss, almost stopped him from studying mathematics because he and his wife were not as smart as Gauss, and would therefore bring shame upon the family name.',
        options: [{
                text: 'Continue to Next Question',
                nextText: 7
            },
        ]
    },
    {
        id: 6,
        text: 'Correct! His father did believe that by allowing him to study maths, shame would be brought upon the family.',
        options: [{
                text: 'Continue to Next Question',
                setState: true,
                nextText: 7
            },
        ]
    },


    // Question 3
    {
        id: 7,
        text: 'Gauss is highly logical, how old was he when he first corrected his father?',
        options: [{
            text: '1',
            nextText: 8
        },
        {
            text: '2',
            nextText: 8
        },
        {
            text: '3',
            nextText: 9
        },
        {
            text: '4',
            nextText: 8
        }
    ]
    },
    {
        id: 8,
        text: 'Incorrect. Was 3 years old when he first corrected his father, which must of given his dad a shock!',
        options: [{
                text: 'Continue to Next Question',
                nextText: 10
            },
        ]
    },
    {
        id: 9,
        text: 'Correct! At the age of 3, Gauss was already smarter than his father, commonly correcting him, this must of given his dad a shock!',
        options: [{
                text: 'Continue to Next Question',
                setState: true,
                nextText: 10
            },
        ]
    },

    // Question 4
    {
        id: 10,
        text: 'Gauss is well known for being a child prodigy, but how old was he when he wrote his first book detailing his discoveries.',
        options: [{
            text: '18',
            nextText: 11
        },
        {
            text: '19',
            nextText: 11
        },
        {
            text: '20',
            nextText: 11
        },
        {
            text: '21',
            nextText: 12
        }
    ]
    },
    {
        id: 11,
        text: 'Incorrect. Gauss wrote his first book, Disquisitiones Arithmeticae (Mathematical Investigations), at 21, at an age where nowadays, most people will be doing university, he was already writing theories.',
        options: [{
                text: 'Continue to Next Question',
                nextText: 13
            },
        ]
    },
    {
        id: 12,
        text: 'Correct! He did write his first book, Disquisitiones Arithmeticae (Mathematical Investigations), at age 21, when the majority of people will be studying in university, he was already writing theories.',
        options: [{
                text: 'Continue to Next Question',
                setState: true,
                nextText: 13
            },
        ]
    },

    // Question 5
    {
        id: 13,
        text: 'Gauss also was the first to construct a new shape, the most major mathematical discovery since the ancient Greeks!  How many sides did it have? ',
        options: [{
            text: '17',
            nextText: 15
        },
        {
            text: '19',
            nextText: 14
        },
        {
            text: '21',
            nextText: 14
        },
        {
            text: '23',
            nextText: 14
        }
    ]
    },
    {
        id: 14,
        text: 'Incorrect. He actually discovered the Heptadecagon, a 17 sided shape.',
        options: [{
                text: 'Continue to Next Question',
                nextText: 16
            },
        ]
    },
    {
        id: 15,
        text: 'Correct! He discovered the 17 sided shape, a Heptadecagon!',
        options: [{
                text: 'Continue to Next Question',
                setState: true,
                nextText: 16
            },
        ]
    },

    // Question 6 - Section 2
    {
        id: 16,
        text: 'Section 2: Personality)\nGauss also spent some of his life teaching exceptionally talented mathematicians, yet he hated teaching. Despite this, he still taught some students. What was the name of one of his pupils?',
        options: [{
            text: 'Wolfgang Amadeus Mozart',
            nextText: 17
        },
        {
            text: 'Blaise Pascal',
            nextText: 17
        },
        {
            text: 'John von Neumann',
            nextText: 17
        },
        {
            text: 'Dedekind',
            nextText: 18
        }
    ]
    },
    {
        id: 17,
        text: 'Incorrect. One of his pupils was Richard Dedekind, who followed in his footsteps working on number theory and algebra.',
        options: [{
                text: 'Continue to Next Question',
                nextText: 19
            },
        ]
    },
    {
        id: 18,
        text: 'Correct! One of his pupils was Richard Dedekind, who followed in his footsteps working on number theory and algebra.',
        options: [{
                text: 'Continue to Next Question',
                setState: true,
                nextText: 19
            },
        ]
    },

    // Question 7
    {
        id: 19,
        text: 'Gauss had a family motto, what was it? ',
        options: [{
            text: 'Freedom and Unity',
            nextText: 20
        },
        {
            text: 'Which one wins',
            nextText: 20
        },
        {
            text: 'He who fails, may not fail again',
            nextText: 20
        },
        {
            text: 'Few, but ripe',
            nextText: 21
        }
    ]
    },
    {
        id: 20,
        text: 'Incorrect. His Family Motto was actually, "Few, but ripe."',
        options: [{
                text: 'Continue to Next Question',
                nextText: 22
            },
        ]
    },
    {
        id: 21,
        text: 'Correct! His family motto is "Few, but ripe"',
        options: [{
                text: 'Continue to Next Question',
                setState: true,
                nextText: 22
            },
        ]
    },

    // Question 8
    {
        id: 22,
        text: 'While he was alive, he was able to witness the French Coup by Napoleon, was he for, or against the new French Leader',
        options: [{
            text: 'For',
            nextText: 23
        },
        {
            text: 'Against',
            nextText: 24
        },
    ]
    },
    {
        id: 23,
        text: 'Incorrect. He was strongly against Napoleon',
        options: [{
                text: 'Continue to Next Question',
                nextText: 25
            },
        ]
    },
    {
        id: 24,
        text: 'Correct! He was strongly against Napoleon.',
        options: [{
                text: 'Continue to Next Question',
                setState: true,
                nextText: 25
            },
        ]
    },

    // Question 9
    {
        id: 25,
        text: 'Gauss was very religious, but did he believe in the afterlife? ',
        options: [{
            text: 'Yes',
            nextText: 27
        },
        {
            text: 'No',
            nextText: 26
        },
    ]
    },
    {
        id: 26,
        text: 'Incorrect. He strongly believed in the afterlife',
        options: [{
                text: 'Continue to Next Question',
                nextText: 28
            },
        ]
    },
    {
        id: 27,
        text: 'Correct! He strongly believed in the afterlife',
        options: [{
                text: 'Continue to Next Question',
                setState: true,
                nextText: 28
            },
        ]
    },

    // Question 10
    {
        id: 28,
        text: 'As we know, Gauss is very religious, but what religion did he follow',
        options: [{
            text: 'Judaism',
            nextText: 29
        },
        {
            text: 'Protestantism',
            nextText: 30
        },
        {
            text: 'Catholicism',
            nextText: 29
        },
        {
            text: 'Buddhism',
            nextText: 29
        },
    ]
    },
    {
        id: 29,
        text: 'Incorrect. He was a strong believer in protestantism.',
        options: [{
                text: 'Continue to Next Question',
                nextText: 31
            },
        ]
    },
    {
        id: 30,
        text: 'Correct! He was a strong protestant',
        options: [{
                text: 'Continue to Next Question',
                setState: true,
                nextText: 31
            },
        ]
    },

    // Question 11 - Section 3
    {
        id: 31,
        text: 'Section 3: Mathematical Achievements)\nIn 1833, he constructed a revolutionary new invention, what did he create?',
        options: [{
            text: 'Piano',
            nextText: 32
        },
        {
            text: 'Sextant',
            nextText: 32
        },
        {
            text: 'Electromagnetic Telegraph',
            nextText: 33
        },
        {
            text: 'Tuning Fork',
            nextText: 32
        },
    ]
    },
    {
        id: 32,
        text: 'Incorrect. He actually invented the Electromagnetic Telegraph.',
        options: [{
                text: 'Continue to Next Question',
                nextText: 34
            },
        ]
    },
    {
        id: 33,
        text: 'Correct! He invented the Electomagnetic Telegraph.',
        options: [{
                text: 'Continue to Next Question',
                setState: true,
                nextText: 34
            },
        ]
    },

    // Question 12
    {
        id: 34,
        text: 'Another thing Gauss was interested in was the study of curvature, what is this the study of?',
        options: [{
            text: 'Curves',
            nextText: 36
        },
        {
            text: 'Surfaces',
            nextText: 35
        },
    ]
    },
    {
        id: 35,
        text: 'Incorrect. Curvature is the study of curves.',
        options: [{
                text: 'Continue to Next Question',
                nextText: 37
            },
        ]
    },
    {
        id: 36,
        text: 'Correct! This is the study of curves.',
        options: [{
                text: 'Continue to Next Question',
                setState: true,
                nextText: 37
            },
        ]
    },

    // Question 13
    {
        id: 37,
        text: 'What does a heliotrope do?',
        options: [{
            text: 'Work out the Angle',
            nextText: 38
        },
        {
            text: 'Tell you the time',
            nextText: 38
        },
        {
            text: 'Measure Long Distances',
            nextText: 39
        },
        {
            text: 'Tells you your position',
            nextText: 38
        },
    ]
    },
    {
        id: 38,
        text: 'Incorrect. A heliotrope is used to measure long distances while out at sea, by reflecting sunlight in a mirror.',
        options: [{
                text: 'Continue to Next Question',
                nextText: 40
            },
        ]
    },
    {
        id: 39,
        text: 'Correct! This is the study of curves.',
        options: [{
                text: 'Continue to Next Question',
                setState: true,
                nextText: 40
            },
        ]
    },

    // Question 14
    {
        id: 40,
        text: 'An asteroid passed by, but people were unable to get clear measurements of it, yet he was able to accurately predict the path. What was the asteroid called?',
        options: [{
            text: 'Hermes',
            nextText: 41
        },
        {
            text: 'Ceres',
            nextText: 42
        },
        {
            text: 'Eros',
            nextText: 41
        },
        {
            text: 'Icarus',
            nextText: 41
        },
    ]
    },
    {
        id: 41,
        text: 'Incorrect. When he was 23, scientists spotted the largest asteroid, Ceres, but they did not see it for long enough to know its orbit, but Gauss was able to make caluclations that accurately predicted the orbit.',
        options: [{
                text: 'Continue to Next Question',
                nextText: 43
            },
        ]
    },
    {
        id: 42,
        text: 'Correct! When he was 23, scientists spotted the largest asteroid, Ceres, but they did not see it for long enough to know its orbit, but Gauss was able to make caluclations that accurately predicted the orbit.',
        options: [{
                text: 'Continue to Next Question',
                setState: true,
                nextText: 43
            },
        ]
    },

    // Question 15
    {
        id: 43,
        text: 'When he wrote his first book when he was 21, what did he call it?',
        options: [{
            text: 'Disquisitiones Arithmaticae',
            nextText: 45
        },
        {
            text: 'Theoria Motus',
            nextText: 44
        },
        {
            text: 'General investigations of curved surfaces',
            nextText: 44
        },
        {
            text: 'Inaugural Lecture on Astronomy and Papers on the Foundations of Mathematics',
            nextText: 44
        },
    ]
    },
    {
        id: 44,
        text: 'Incorrect. As aluded to earlier in the quiz, his book was called Disquisitiones Arithmaticae.',
        options: [{
                text: 'Continue to Next Question',
                nextText: 46
            },
        ]
    },
    {
        id: 45,
        text: 'Correct! As aluded to earlier in the quiz, his book was called Disquisitiones Arithmaticae.',
        options: [{
                text: 'Continue to Next Question',
                setState: true,
                nextText: 46
            },
        ]
    },

    // Question 16 - Section 4
    {
        id: 46,
        text: 'Section 4: Random)\n Gauss, aged 7, could in, his head, add up all the numbers between 1 and 100. Can you do the same?',
        options: [{
            text: '4975',
            nextText: 47
        },
        {
            text: '5000',
            nextText: 47
        },
        {
            text: '5025',
            nextText: 47
        },
        {
            text: '5050',
            nextText: 48
        },
    ]
    },
    {
        id: 47,
        text: 'Incorrect. Gauss\' teacher was lazy, and didn\'t want to teach one morning, so the teacher gave the class this assignment, expecting it to take all day. Gauss worked this out in under a minute. He noticed that the sum was the same when he added the first and last number, and the second and second to last number, and so on. He figured out that the sum would be equal to the number of pairs (50) multiplied by the sum of each pair (101), which equals 5050.',
        options: [{
                text: 'Continue to Next Question',
                nextText: 49
            },
        ]
    },
    {
        id: 48,
        text: 'Correct! Gauss\' teacher was lazy, and didn\'t want to teach one morning, so the teacher gave the class this assignment, expecting it to take all day. Gauss worked this out in under a minute. He noticed that the sum was the same when he added the first and last number, and the second and second to last number, and so on. He figured out that the sum would be equal to the number of pairs (50) multiplied by the sum of each pair (101), which equals 5050.',
        options: [{
                text: 'Continue to Next Question',
                setState: true,
                nextText: 49
            },
        ]
    },

    // Question 17
    {
        id: 49,
        text: 'Knowing that Gauss was born in 1777 and died in 1855, without using a calculator, how many years did he live for',
        options: [{
            text: '76',
            nextText: 50
        },
        {
            text: '77',
            nextText: 50
        },
        {
            text: '78',
            nextText: 51
        },
        {
            text: '79',
            nextText: 50
        },
    ]
    },
    {
        id: 50,
        text: 'Incorrect. He actually lived for 78 years, a long time for when he was alive!',
        options: [{
                text: 'Continue to Next Question',
                nextText: 52
            },
        ]
    },
    {
        id: 51,
        text: 'Correct! He lived for 78 years, a long time for when he was alive!',
        options: [{
                text: 'Continue to Next Question',
                setState: true,
                nextText: 52
            },
        ]
    },

    // Question 18
    {
        id: 52,
        text: 'What was Gauss\' favourite colour',
        options: [{
            text: 'Yellow',
            nextText: 53
        },
        {
            text: 'Red',
            nextText: 54
        },
        {
            text: 'Blue',
            nextText: 53
        },
        {
            text: 'Green',
            nextText: 53
        },
    ]
    },
    {
        id: 53,
        text: 'Incorrect. Gauss loved the colour red, and apprently used it a lot in his life, in diagrams and in decorating his books and home.',
        options: [{
                text: 'Continue to Next Question',
                nextText: 55
            },
        ]
    },
    {
        id: 54,
        text: 'Correct! His favourite color is red!',
        options: [{
                text: 'Continue to Next Question',
                setState: true,
                nextText: 55
            },
        ]
    },

    // Question 19
    {
        id: 55,
        text: 'What was he commonly referred to as?',
        options: [{
            text: 'The Father of Modern Mathematics',
            nextText: 56
        },
        {
            text: 'The Foremost of all Mathematicians',
            nextText: 57
        },
        {
            text: 'The Inventor of the Modern World',
            nextText: 56
        },
        {
            text: 'The Father of Number Theory',
            nextText: 56
        },
    ]
    },
    {
        id: 56,
        text: 'Incorrect. He was referred to as "Princeps mathematicorum" or the "Foremost of all mathematicians"',
        options: [{
                text: 'Continue to Next Question',
                nextText: 58
            },
        ]
    },
    {
        id: 57,
        text: 'Correct! He was referred to as "Princeps mathematicorum" or the "Foremost of all mathematicians"',
        options: [{
                text: 'Continue to Next Question',
                setState: true,
                nextText: 58
            },
        ]
    },

    // Question 20
    {
        id: 58,
        text: 'What could his parents not do?',
        options: [{
            text: 'Read & Write',
            nextText: 60
        },
        {
            text: 'Speak',
            nextText: 59
        },
        {
            text: 'See',
            nextText: 59
        },
        {
            text: 'Hear',
            nextText: 59
        },
    ]
    },
    {
        id: 59,
        text: 'Incorrect. Surprisingly, his parents were both illiterate, and used large portions of their savings to get him a good education, where he learnt to write latin. Eventually, the local nobles took over and sponsored his education.',
        options: [{
                text: 'See your result',
                nextText: 61
            },
        ]
    },
    {
        id: 60,
        text: 'Correct!  Surprisingly, his parents were both illiterate, and used large portions of their savings to get him a good education, where he learnt to write latin. Eventually, the local nobles took over and sponsored his education.',
        options: [{
                text: 'See your result',
                setState: true,
                nextText: 61
            },
        ]
    },

    // End of Quiz
    {
        id: 61,
        text: `Congratulations on Completing the Quiz! You got [SCORE]/20.\n\nLook up your score on this graph to see what rank you achieved:\n» 18-20 - Gauss\n» 12-17 - Foremost of all Mathematicians\n» 6-11 - Child Progedy\n» 0-5 - Mathematician in Training\n\nTo play again, click the button below! Good Luck!`,
        options: [{
                text: 'Play Again',
                nextText: -1
            },
        ]
    },
]

startGame()