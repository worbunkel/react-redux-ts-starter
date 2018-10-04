import { push } from 'connected-react-router';
import * as _ from 'lodash';
import { UnionToIntersection } from '../../utility.types';
import { RootDispatch } from '../root-action';
import { NavBarState, NavLink } from './nav-bar.state';

export enum NavBarActionType {
  SET_NAV_BAR_STATE = 'navBar/SET_NAV_BAR_STATE',
  HOVER_LINK = 'navBar/HOVER_LINK',
  UNHOVER_LINK = 'navBar/UNHOVER_LINK',
}

export type NavBarAction = {
  type: NavBarActionType;
  payload: UnionToIntersection<ReturnType<typeof NavBarActions[keyof typeof NavBarActions]>['payload']>;
};

export const navigateToLink = (navLink: NavLink) => (dispatch: RootDispatch) => {
  dispatch(push(navLink.url));
};

export const hoverLink = (navLink?: NavLink) => ({
  type: NavBarActionType.HOVER_LINK,
  payload: navLink,
});

export const unhoverLink = () => ({
  type: NavBarActionType.UNHOVER_LINK,
  payload: null,
});

export const setNavBarState = (navBarState: NavBarState) => ({
  type: NavBarActionType.SET_NAV_BAR_STATE,
  payload: navBarState,
});

export const NavBarActions = {
  setNavBarState,
  hoverLink,
};
