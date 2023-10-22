
function calculatePoints(cardArray) {
    // Formats array (from a to 1, k to 13, etc.) and sorts
    const cardConvert = {
        'a': [1, 1],
        't': [10, 10],
        'j': [10, 11],
        'q': [10, 12],
        'k': [10, 13]
    }

    cardArray.map(card => {
        card[0] = cardConvert[card[0]] ? cardConvert[card[0]][0] : parseInt(card[0]);
        card[1] = cardConvert[card[1]] ? cardConvert[card[1]][1] : parseInt(card[1]);
    })
    cardArray.sort((a, b) => a[1] - b[1]);

    const points = {
        total: 0,
        details: "",
    };

    // Checks for duplicates
    let dupSize = 1;
    let cardNum = cardArray[0][1];
    for (let i = 1; i < 5; i++) {
        if (cardNum == cardArray[i][1]) {
            dupSize++;
        } else {
            if (dupSize > 1) {
                points.total += dupSize * (dupSize - 1);
                points.details += `${dupSize == 3 ? "Trips" : "Pair"} for ${points.total}\n`;
            }
            dupSize = 1;
        }
        cardNum = cardArray[i][1];
    }
    if (dupSize > 1) {
        points.total += dupSize * (dupSize - 1);
        points.details += `${dupSize == 3 ? "Trips" : "Pair"} for ${points.total}\n`;
    }

    // Checks for sums of 15
    for (let i = 0; i < 5; i++) {
        for (let j = i + 1; j < 5; j++) {
            if (cardArray[i][0] + cardArray[j][0] == 15) {
                points.total += 2;
                points.details += `15 for ${points.total}\n`;
            }
            for (let k = j + 1; k < 5; k++) {
                if (cardArray[i][0] + cardArray[j][0] + cardArray[k][0] == 15) {
                    points.total += 2;
                    points.details += `15 for ${points.total}\n`;
                }
                for (let l = k + 1; l < 5; l++) {
                    if (cardArray[i][0] + cardArray[j][0] +
                        cardArray[k][0] + cardArray[l][0] == 15) {
                        points.total += 2;
                        points.details += `15 for ${points.total}\n`;
                    }
                }
            }
        }
    }
    if (cardArray[0][0] + cardArray[1][0] + cardArray[2][0] +
        cardArray[3][0] + cardArray[4][0] == 15) {
            points.total += 2;
            points.details += `15 for ${points.total}\n`;
    }

    // Check for flushes
    if (cardArray[0][2] == cardArray[1][2] &&
        cardArray[0][2] == cardArray[2][2] &&
        cardArray[0][2] == cardArray[3][2]) {
            if (cardArray[0][2] == cardArray[4][2]) {
                points.total += 5;
            }
            else {
                points.total += 4;
            }
            points.details += `Flush for ${points.total}\n`;
    }

    // Check for straights
    let straightSize = 1;
    let maxStraightSize = 1;
    for (let i = 0; i < 4; i++) {
        if (cardArray[i][1] == cardArray[i + 1][1] - 1) {
            straightSize++;
            maxStraightSize = Math.max(straightSize, maxStraightSize);
        } else straightSize = 1;
    }
    if (maxStraightSize > 2) {
        points.total += maxStraightSize;
        points.details += `Straight for ${points.total}\n`;
    }

    // Checks for matching suit jack
    for (let i = 0; i < 4; i++) {
        if (cardArray[i][1] == 10 && cardArray[i][2] == cardArray[4][2]) {
            points.total += 2;
            points.details += `Jack for ${points.total}\n`;
        }
    }
    return points;
}

function tokenizeInput(input) {
    input = input.trim().toLowerCase();
    let tokens = [];
    if (input.length !== 10) return tokens;
    for (let i = 0; i < input.length; i += 2) {
        let token = [];
        token.push(input.substring(i, i + 1));
        token.push(token[0]);
        token.push(input.substring(i + 1, i + 2));
        tokens.push(token);
    }
    return tokens;
}

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const cards = searchParams.get('cards');
    const cardArray = tokenizeInput(cards);
    if (cardArray.length == 0)
        return new Response('Invalid input');
    const pointBreakdown = calculatePoints(cardArray);
    return new Response(
        `Total: ${pointBreakdown.total}\nBreakdown:\n${pointBreakdown.details}`);
}