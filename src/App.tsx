import React from 'react';
import logo from './logo.svg';
import './App.css';
import {generateAbilities} from './generateAbilities';
import {Slider, Rail, Handles, Tracks, Ticks} from 'react-compound-slider';
import {Handle, Track} from './sliderComponents';

const NUM_ABILITIES = 6;

/*const sliderStyle: React.CSSProperties = {
  margin: '5%',
  position: 'relative',
  width: '90%'
};

const railStyle: React.CSSProperties = {
  position: 'absolute',
  width: '100%',
  height: 14,
  borderRadius: 7,
  cursor: 'pointer',
  backgroundColor: 'rgb(155,155,155)'
};*/

class App extends React.Component<{},
  {
    abilities: number[],
    entropy: number,
    total: number
    minScore: number,
    maxScore: number
  }> {
  constructor(props: {}) {
    super(props);
    this.state = {
      abilities: Array(6),
      entropy: 30,
      total: 72,
      minScore: 6,
      maxScore: 17
    };
  }

  /*public onSliderChange = (entropy: ReadonlyArray<number>) => {
    console.log(entropy);
    this.setState({entropy: entropy});
  };*/

  public updateParameters = () => {
    const stateUpdate: any = {};
    if (this.state.minScore * NUM_ABILITIES > this.state.total) {
      stateUpdate.minScore = Math.floor(this.state.total / NUM_ABILITIES);
    }
    if (this.state.maxScore * NUM_ABILITIES < this.state.total) {
      stateUpdate.maxScore = Math.ceil(this.state.total / NUM_ABILITIES);
    }
    this.setState(stateUpdate);
  };

  render() {
    //const domain = [0, 100];

    return (
      <div className='App'>
        <header className='App-header'>
          Ability points
          <label>
            Total:
            <input
              type='text'
              name='total'
              value={this.state.total}
              onChange={event => this.setState({total: parseInt(event.target.value)})}
              onBlur={() => this.updateParameters()}
              onKeyDown={event => {
                if (event.key === 'Enter') {
                  this.updateParameters();
                }
              }}
            />
          </label>
          Ability score minimum and maximum
          <label>
            Minimum:
            <input
              type='text'
              name='minimum'
              value={this.state.minScore}
              onChange={event => this.setState({minScore: parseInt(event.target.value)})}
              onBlur={() => this.updateParameters()}
              onKeyDown={event => {
                if (event.key === 'Enter') {
                  this.updateParameters();
                }
              }}
            />
            Maximum:
            <input
              type='text'
              name='maximum'
              value={this.state.maxScore}
              onChange={event => this.setState({maxScore: parseInt(event.target.value)})}
              onBlur={() => this.updateParameters()}
              onKeyDown={event => {
                if (event.key === 'Enter') {
                  this.updateParameters();
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
              value={this.state.entropy}
              onChange={event => this.setState({entropy: parseInt(event.target.value)})}
            />
            {/*<Slider
              mode={1}
              step={1}
              domain={domain}
              rootStyle={sliderStyle}
              onChange={this.onSliderChange}
              onUpdate={this.onSliderChange}
              values={this.state.entropy}
            >
              <Rail>
                {({getRailProps}) => (
                  <div style={railStyle} {...getRailProps()} />
                )}
              </Rail>
              <Handles>
                {({handles, getHandleProps}) => (
                  <div className="slider-handles">
                    {handles.map(handle => (
                      <Handle
                        key={handle.id}
                        handle={handle}
                        domain={domain}
                        getHandleProps={getHandleProps}
                      />
                    ))}
                  </div>
                )}
              </Handles>
              <Tracks right={false}>
                {({tracks, getTrackProps}) => (
                  <div className="slider-tracks">
                    {tracks.map(({id, source, target}) => (
                      <Track
                        key={id}
                        source={source}
                        target={target}
                        getTrackProps={getTrackProps}
                      />
                    ))}
                  </div>
                )}
              </Tracks>
            </Slider>*/}
            {this.state.entropy}
          </label>

          <button
            type='button'
            onClick={() => {
              this.setState({
                abilities: generateAbilities(this.state.total, this.state.minScore, this.state.maxScore, NUM_ABILITIES, this.state.entropy)
              });
            }}
          >
            Click Me!
          </button>
          {this.state.abilities.map((value, index) => {
            return value + ((index === this.state.abilities.length - 1) ? '' : ', ');
          })}
        </header>
      </div>
    );
  }
}

export default App;
