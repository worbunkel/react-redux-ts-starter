import * as _ from 'lodash';
import { assertUnreachable } from '../../utils';
import { NavBarAction, NavBarActionType } from './nav-bar.actions';
import { DefaultNavBarState, NavBarState } from './nav-bar.state';

export const navBarReducer = (prevState = DefaultNavBarState(), action: NavBarAction): NavBarState => {
  switch (action.type) {
    case NavBarActionType.HOVER_LINK:
      return onHoverLink(prevState, action.payload);
    case NavBarActionType.UNHOVER_LINK:
      return onUnhoverLink(prevState);
    default:
      assertUnreachable(action.type);

      return prevState;
  }
};

const onHoverLink = (prevState: NavBarState, payload: NavBarAction['payload']) => ({
  ...prevState,
  hoveredLink: payload,
});

const onUnhoverLink = (prevState: NavBarState) => ({
  ...prevState,
  hoveredLink: null,
});
