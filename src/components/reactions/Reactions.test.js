import React from 'react';
import { shallow, mount } from 'enzyme';
import Reactions from './Reactions';
import {Reaction, Heart, Like, Dislike, Haha, Wow, Sad, Angry, Count} from './Reaction';

describe('Reactions', () => {
  it('renders properly', () => {
    const component = shallow(<Reactions type={"comments"} id={1}/>);
  
    expect(component).toMatchSnapshot();
  });
});


describe('activeEmojis being switched', () => {
  it('switch from heart(1), like(0) to heart(0), like(1)', () => {
    let component = mount(<Reactions type={"comments"} id={1}/>);
    const heartWrapper = component.find('form.reaction').at(0).children().at(0);
    const likeWrapper = component.find('form.reaction').at(1).children().at(0);
    heartWrapper.simulate('click')
    likeWrapper.simulate('click')
    let heartCounter = component.find('form.reaction').at(0).children().at(1).props().count
    let likeCounter = component.find('form.reaction').at(1).children().at(1).props().count
    // console.log(heartWrapper.debug())
    // console.log(likeWrapper.debug())
    // console.log(heartCounter)
    // console.log(likeCounter)
    expect(likeCounter).toBe(1)
    expect(heartCounter).toBe(0)
  });
});

describe('activeEmoji being added and removed', () => {
  it('switch from wow(0) => wow(1)', () => {
    const component = mount(<Reactions type={"comments"} id={1}/>);
    const reactionWrapper = component.find('form.reaction').children().first();
    let counter = component.find('Count').first().props().count;
    
    
    expect(counter).toBe(0)
    reactionWrapper.simulate('click')
    counter = component.find('Count').first().props().count;
    expect(counter).toBe(1)
  });
  it('switch from wow(1) => wow(0)', () => {
    const component = mount(<Reactions type={"comments"} id={1}/>);
    const reactionWrapper = component.find('form.reaction').children().first();
    reactionWrapper.simulate('click')
    let counter = component.find('Count').first().props().count;
    
    
    expect(counter).toBe(1)
    reactionWrapper.simulate('click')
    counter = component.find('Count').first().props().count;
    expect(counter).toBe(0)
  });
});