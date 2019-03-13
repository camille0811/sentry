import React from 'react';
import {shallow} from 'enzyme';

import GroupSeenBy from 'app/views/groupDetails/shared/seenBy';
import ConfigStore from 'app/stores/configStore';

describe('GroupSeenBy', function() {
  beforeEach(function() {
    jest.spyOn(ConfigStore, 'get').mockImplementation(() => []);
  });

  afterEach(function() {});

  describe('render()', function() {
    it('should return null if seenBy is falsy', function() {
      const wrapper = shallow(
        <GroupSeenBy group={TestStubs.Group({seenBy: undefined})} />
      );
      expect(wrapper.children()).toHaveLength(0);
    });

    it('should return a list of each user that saw', function() {
      const wrapper = shallow(
        <GroupSeenBy
          group={TestStubs.Group({
            seenBy: [
              {id: '1', email: 'jane@example.com'},
              {id: '2', email: 'john@example.com'},
            ],
          })}
        />
      );

      expect(wrapper.find('EyeIcon')).toHaveLength(1);
      expect(wrapper.find('AvatarList')).toHaveLength(1);
      expect(wrapper.find('AvatarList').prop('users')).toHaveLength(2);
    });
  });
});
