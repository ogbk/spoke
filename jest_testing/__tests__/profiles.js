/* eslint-disable */

import React from 'react';
import { shallow, mount, render } from 'enzyme';
import App from '../../client/app/components/App';
import Profile from '../../client/app/components/Profile';
import NotFound from '../../client/app/components/NotFound';

const ID_OK = 'ogbu_olu';
const PROFILES = require('../../server/assets/profiles.json');

describe('profiles.json', () => {

  test('only one profile is stored, id is "ogbu_olu"', () => {
    expect(PROFILES).toHaveLength(1);
    expect(PROFILES[0].id).toEqual(ID_OK);
  });

  test('profile id & name match just one option on select button', () => {
    let app = mount(<App />);
    const profileId = PROFILES[0].id;
    const profileName = PROFILES[0].name;

    expect(app.find('form select').children()).toHaveLength(2);

    expect(app.find('form select').childAt(0).text()).toBe(profileName);
    expect(app.find('form select').childAt(0).prop('value')).toBe(profileId);
    
    expect(app.find('form select').childAt(1).text()).not.toMatch(profileName);
    expect(app.find('form select').childAt(1).prop('value')).not.toMatch(profileId);
  });

})
