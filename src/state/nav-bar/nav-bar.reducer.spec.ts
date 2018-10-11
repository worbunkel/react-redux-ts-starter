import { hoverLink, NavBarActionType, unhoverLink } from './nav-bar.actions';
import { navBarReducer } from './nav-bar.reducer';
import { DefaultNavBarState, NavLink } from './nav-bar.state';

describe('navBarReducer', () => {
  describe('on uncaught action', () => {
    it('should return the state', () => {
      const prevState = DefaultNavBarState();
      const testAction: any = { type: 'asdf', payload: {} };

      const newState = navBarReducer(prevState, testAction);

      expect(newState).toEqual(prevState);
    });
  });

  describe(`on ${NavBarActionType.HOVER_LINK}`, () => {
    it('should set hoveredLink to the hovered link', () => {
      const prevState = DefaultNavBarState();
      const testLink: NavLink = {
        linkText: 'Test',
        url: '/test',
      };

      const newState = navBarReducer(prevState, hoverLink(testLink));

      expect(newState.hoveredLink).toEqual(testLink);
    });
  });

  describe(`on ${NavBarActionType.UNHOVER_LINK}`, () => {
    it('should set hoveredLink to null', () => {
      const prevState = {
        ...DefaultNavBarState(),
        hoveredLink: undefined,
      };

      const newState = navBarReducer(prevState, unhoverLink());

      expect(newState.hoveredLink).toBe(null);
    });
  });
});
