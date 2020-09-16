function randInt(stop: number) {
  return Math.floor(Math.random() * stop);
}

function randElement(arr: any[]) {
  return arr[randInt(arr.length)];
}

export function generateAbilities(
  total: number,
  minScore: number,
  maxScore: number,
  numAbilities: number,
  entropy: number) {
  if (maxScore * numAbilities < total || minScore * numAbilities > total) {
    throw new Error('Invalid parameters');
  }

  // Take care of edge cases where every value has to be the same. Things will break if we don't do it here.
  if (minScore * numAbilities === total) {
    return new Array(numAbilities).fill(minScore);
  }
  if (maxScore * numAbilities === total) {
    return new Array(numAbilities).fill(maxScore);
  }

  // Create ability score array with equal values, different by at most one and summing to numAbilities.
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

  // Randomly modify values values within the passed parameters.
  /*for (let k = 0; k < entropy; ++k) {
    let up: number;
    let down: number;
    let minIndex = 0;
    let maxIndex = 0;
    let numMin = 0;
    let numMax = 0;

    for (let i = 0; i < numAbilities; ++i) {
      if (abilities[i] === minScore) {
        ++numMin;
      } else if (abilities[i] === maxScore) {
        ++numMax;
      }

      if (abilities[i] < abilities[minIndex]) {
        minIndex = i;
      }
      if (abilities[i] > abilities[maxIndex]) {
        maxIndex = i;
      }
    }

    if (numMin === numAbilities - 1) {
      down = maxIndex;
      up = randInt(numAbilities - 1);
      if (up >= down) {
        ++up;
      }
    } else if (numMax === numAbilities - 1) {
      up = minIndex;
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
      down = randElement(downCandidates);
    }

    ++abilities[up];
    --abilities[down];
  }*/

  for (let k = 0; k < entropy; ++k) {
    let upCandidates = Array<number>();
    let downCandidates = Array<number>();
    let up: number;
    let down: number;

    for (let i = 0; i < numAbilities; ++i) {
      if (abilities[i] < maxScore) {
        upCandidates.push(i);
      }
      if (abilities[i] > minScore) {
        downCandidates.push(i);
      }
    }

    if (downCandidates.length !== 1) {
      up = randElement(upCandidates);
      const upDownIndex = downCandidates.indexOf(up);
      if (upDownIndex !== -1) {
        downCandidates.splice(upDownIndex, 1);
      }
      down = randElement(downCandidates);
    } else {
      down = downCandidates[0];
      const downUpIndex = upCandidates.indexOf(down);
      if (downUpIndex !== -1) {
        upCandidates.splice(downUpIndex, 1);
      }
      up = randElement(upCandidates)
    }

    ++abilities[up];
    --abilities[down];
  }

  return abilities;
}
