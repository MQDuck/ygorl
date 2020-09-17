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

import React from 'react';
import logo from './logo.png';
import './App.css';
import {generateAbilities} from './generateAbilities';

const NUM_ABILITIES = 6;
const DEFAULT_TOTAL = 72;
const DEFAULT_MIN_SCORE = 6;
const DEFAULT_MAX_SCORE = 17;
const DEFAULT_ENTROPY_SLIDER = 40;

class App extends React.Component<{},
  {
    abilities: number[],
    entropySlider: number,
    total: number
    minScore: number,
    maxScore: number,
    totalStr: string,
    minScoreStr: string,
    maxScoreStr: string
  }> {
  constructor(props: {}) {
    super(props);
    this.state = {
      abilities: Array(NUM_ABILITIES),
      entropySlider: DEFAULT_ENTROPY_SLIDER,
      total: DEFAULT_TOTAL,
      minScore: DEFAULT_MIN_SCORE,
      maxScore: DEFAULT_MAX_SCORE,
      totalStr: DEFAULT_TOTAL.toString(),
      minScoreStr: DEFAULT_MIN_SCORE.toString(),
      maxScoreStr: DEFAULT_MAX_SCORE.toString()
    };
  }

  public updateParameters = (total: number, minScore: number, maxScore: number) => {
    if (minScore * NUM_ABILITIES > total) {
      minScore = Math.floor(total / NUM_ABILITIES);
    }
    if (maxScore * NUM_ABILITIES < total) {
      maxScore = Math.ceil(total / NUM_ABILITIES);
    }
    this.setState({
      total: total,
      minScore: minScore,
      maxScore: maxScore,
      totalStr: total.toString(),
      minScoreStr: minScore.toString(),
      maxScoreStr: maxScore.toString()
    });
  };

  public updateTotal = () => {
    const total = parseInt(this.state.totalStr);
    if (isNaN(total)) {
      this.setState({totalStr: this.state.total.toString()});
    } else {
      this.updateParameters(total, this.state.minScore, this.state.maxScore);
    }
  };

  public updateMinScore = () => {
    const minScore = parseInt(this.state.minScoreStr);
    if (isNaN(minScore)) {
      this.setState({minScoreStr: this.state.minScore.toString()});
    } else {
      this.updateParameters(this.state.total, minScore, this.state.maxScore);
    }
  };

  public updateMaxScore = () => {
    const maxScore = parseInt(this.state.maxScoreStr);
    if (isNaN(maxScore)) {
      this.setState({maxScoreStr: this.state.maxScore.toString()});
    } else {
      this.updateParameters(this.state.total, this.state.minScore, maxScore);
    }
  };

  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <img src={logo} alt='Ysgorl' className='App-logo'/>
          Ability points
          <label>
            {'Total: '}
            <input
              type='text'
              name='total'
              value={this.state.totalStr}
              onChange={event => this.setState({totalStr: event.target.value})}
              onBlur={() => this.updateTotal()}
              onKeyDown={event => {
                if (event.key === 'Enter') {
                  this.updateTotal();
                }
              }}
            />
          </label>
          Ability score minimum and maximum
          <label>
            {'Minimum: '}
            <input
              type='text'
              name='minimum'
              value={this.state.minScoreStr}
              onChange={event => this.setState({minScoreStr: event.target.value})}
              onBlur={() => this.updateMinScore()}
              onKeyDown={event => {
                if (event.key === 'Enter') {
                  this.updateMinScore();
                }
              }}
            />
            {' Maximum: '}
            <input
              type='text'
              name='maximum'
              value={this.state.maxScoreStr}
              onChange={event => this.setState({maxScoreStr: event.target.value})}
              onBlur={() => this.updateMaxScore()}
              onKeyDown={event => {
                if (event.key === 'Enter') {
                  this.updateMaxScore();
                }
              }}
            />
          </label>
          Entropy
          <label>
            <input
              type='range'
              min='0'
              max='100'
              value={this.state.entropySlider}
              onChange={event => this.setState({entropySlider: parseInt(event.target.value)})}
            />
            {' ' + this.state.entropySlider}
          </label>

          <button
            type='button'
            onClick={() => {
              const averageAbility = this.state.total / NUM_ABILITIES;
              const minMaxDev = Math.min(averageAbility - this.state.minScore, this.state.maxScore - averageAbility);
              const entropy = Math.ceil(minMaxDev * NUM_ABILITIES * this.state.entropySlider / 50);
              //console.log(entropy);
              this.setState({
                abilities: generateAbilities(
                  this.state.total,
                  this.state.minScore,
                  this.state.maxScore,
                  NUM_ABILITIES,
                  entropy)
              });
            }}
          >
            Generate Ability Scores
          </button>
          {this.state.abilities.map((value, index) => {
            return value + ((index === this.state.abilities.length - 1) ? '' : '  |  ');
          })}
        </header>
      </div>
    );
  }
}

export default App;
