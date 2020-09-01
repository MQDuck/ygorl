function randInt(stop) {
    return Math.floor(Math.random() * stop)
}

function randElement(arr) {
    return arr[randInt(arr.length)]
}

export function generateAbilities(total, minScore, maxScore, numAbilities, entropy) {
    if (maxScore * numAbilities < total || minScore * numAbilities > total) {
        throw new Error('Invalid parameters');
    }

    if (minScore * numAbilities === total) {
        return new Array(numAbilities).fill(minScore);
    }
    if (maxScore * numAbilities === total) {
        return new Array(numAbilities).fill(maxScore);
    }

    const numExtra = total % numAbilities;
    const abilities = new Array(numAbilities).fill((total - numExtra) / numAbilities);
    if (numExtra !== 0) {
        const candidates = Array(numAbilities);
        for (let i = 0; i < numAbilities; ++i) {
            candidates[i] = i;
        }
        for (let k = 0; k < numExtra; ++k) {
            const randIndex = randInt(candidates.length);
            ++abilities[candidates[randIndex]];
            candidates.splice(randIndex, 1);
        }
    }

    function findNonMatching(val) {
        for (let i = 0; i < numAbilities; ++i) {
            if (abilities[i] !== val) {
                return i;
            }
        }
        throw new Error('(Hopefully) unreachable error')
    }

    for (let k = 0; k < entropy; ++k) {
        let up;
        let down;
        let numMin = 0;
        let numMax = 0;

        for (let i = 0; i < numAbilities; ++i) {
            if (abilities[i] === minScore) {
                ++numMin;
            } else if (abilities[i] === maxScore) {
                ++numMax;
            }
        }

        if (numMin === numAbilities - 1) {
            down = findNonMatching(minScore);
            up = randInt(numAbilities - 1);
            if (up >= down) {
                ++up;
            }
        } else if (numMax === numAbilities - 1 ) {
            up = findNonMatching(maxScore);
            down = randInt(numAbilities - 1);
            if (down >= up) {
                ++down;
            }
        } else {
            const upCandidates = [];
            for (let i = 0; i < numAbilities; ++i) {
                if (abilities[i] < maxScore) {
                    upCandidates.push(i);
                }
            }
            up = randElement(upCandidates);

            const downCandidates = [];
            for (let i = 0; i < numAbilities; ++i) {
                if (abilities[i] > minScore && i !== up) {
                    downCandidates.push(i);
                }
            }
            down = randElement(downCandidates)
        }

        ++abilities[up];
        --abilities[down];
    }

    return abilities;
}

console.log(generateAbilities(75, 6, 17, 6, 100));
