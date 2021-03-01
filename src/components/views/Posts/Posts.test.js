import React from 'react';
import { shallow } from 'enzyme';
import { PostsComponent } from './Posts';

describe('Component Posts', () => {
  it('should render without crashing', () => {
    const component = shallow(<PostsComponent />);
    expect(component).toBeTruthy();
  });
});
