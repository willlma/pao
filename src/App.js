import React, { Component } from 'react';
import { men, women } from './lib/names';
import { reStrings } from './lib/constants';
import Results from './components/results';
import './App.css';

const getReString = (text) => {
  const { vowels } = reStrings;
  return '^' + [...text].map((char, i) => {
    return vowels + reStrings[char];
  }).join('');
}

export default class App extends Component {
  state = {}

  onSubmit = (text) => {
    const regex = new RegExp(getReString(text));
    const filter = (name) => {
      return regex.test(name);
    }
    const state = {
      menResults: text ? men.filter(filter) : undefined,
      womenResults: text ? women.filter(filter) : undefined
    };
    this.setState(state);
  }

  render() {
    const { menResults, womenResults } = this.state;
    return (
      <div className='App'>
        <div className='App-header'>
          <h2>Type a number, get a name. Fill out your <a href='http://artofmemory.com/wiki/Person-Action-Object_(PAO)_System#How_to_Create_a_PAO_Mnemonic_System'>PAO</a> system</h2>
        </div>
        <div className='main'>
          <p>This is based on the <a href='http://artofmemory.com/wiki/Major_System'>major system</a>. It searches the <a href='http://names.mongabay.com/'>most popular first names</a>.</p>
          <p>Prefer initials? See <a href='http://peoplebyinitials.com/'>famous people by initial</a> instead.</p>
          <p>Read more about the major system and generate common nouns <a href='http://major-system.info/en/'>here</a>.</p>
          <div className='type'>
            <span>Type a number</span>
            <input
              autoFocus maxLength='4'
              onChange={({ target }) => this.onSubmit(target.value)}
            />
          </div>
        </div>
        <div className='results-container'>
          <Results results={womenResults} title='Women' />
          <Results results={menResults} title='Men' />
        </div>
        {!(menResults || womenResults) &&
        <p className='ps'>PS: Since the major system works with sounds, and this searches by spelling, there are certain things that are hard to account for, like how "ch" (usually a 6) sometimes makes a K sound (which is a 7), e.g. Zachary.</p>}
      </div>
    );
  }
}
