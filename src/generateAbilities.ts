/*
 * Copyright (C) 2020 Jeffrey Thomas Piercy
 *
 * This file is part of Ygorl Ability Score Generator.
 *
 * Ygorl Ability Score Generator is free software: you can redistribute it and/or
 * modify it under the terms of the GNU General Public License as published by the
 * Free Software Foundation, either version 3 of the License, or (at your option)
 * any later version.
 *
 * Ygorl Ability Score Generator is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 * or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for
 * more details.
 *
 * You should have received a copy of the GNU General Public License along with
 * Ygorl Ability Score Generator.  If not, see <http://www.gnu.org/licenses/>.
 */

function randInt(stop: number) {
  return Math.floor(Math.random() * stop);
}

function randElement(arr: any[]) {
  return arr[randInt(arr.length)];
}

export default function generateAbilities(
  total: number,
  minScore: number,
  maxScore: number,
  numAbilities: number,
  entropy: number
) : number[] {
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

  const abilityIndices = Array.from({length: numAbilities}, (_, i) => i);

  // Create ability score array values differing by at most one and summing to numAbilities.
  const numExtra = total % numAbilities;
  const abilities = new Array(numAbilities).fill((total - numExtra) / numAbilities);
  if (numExtra !== 0) {
    const candidates = [...abilityIndices]
    for (let k = 0; k < numExtra; ++k) {
      const randIndex = randInt(candidates.length);
      ++abilities[candidates[randIndex]];
      candidates.splice(randIndex, 1);
    }
  }

  // Randomly modify values values within the passed parameters.
  for (let k = 0; k < entropy; ++k) {
    const upCandidates = abilityIndices.filter(i => abilities[i] < maxScore);
    const downCandidates = abilityIndices.filter(i => abilities[i] > minScore);
    let up: number;
    let down: number;

    if (downCandidates.length !== 1) {
      up = randElement(upCandidates);
      down = randElement(downCandidates.filter(i => i !== up));
    } else {
      down = downCandidates[0];
      up = randElement(upCandidates.filter(i => i !== down));
    }

    ++abilities[up];
    --abilities[down];
  }

  return abilities;
}
