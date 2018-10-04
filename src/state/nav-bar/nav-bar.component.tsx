import * as _ from 'lodash';
import { ChevronDownIcon } from 'mdi-react';
import * as React from 'react';
import { connect } from 'react-redux';
import { RootDispatch } from '../root-action';
import { RootState } from '../root-reducer';
import { hoverLink, navigateToLink, unhoverLink } from './nav-bar.actions';
import './nav-bar.scss';
import { NavLink } from './nav-bar.state';

const SamsClubLogo = require('./../../assets/img/1200px-Sams_Club.png');

type NavBarProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

const NavBarComponent = (props: NavBarProps) => (
  <div className="nav-bar">
    <img src={SamsClubLogo} width="40px" height="40px" />
    <div className="app-name">{props.appName}</div>
    {_.map(props.links, link => (
      <div key={link.linkText} onMouseEnter={() => props.hoverLink(link)} onMouseLeave={() => props.unHoverLink()}>
        <button
          className={`button__flat
          ${_.size(link.sublinks) > 0 && 'button__flat--with-icon'}
          ${props.location.pathname === link.url && 'button__flat--state-active'}`}
          onClick={() => props.navToLink(link)}
        >
          <span>{link.linkText}</span>
          {_.size(link.sublinks) > 0 && (
            <span className="icon--on-button">
              <ChevronDownIcon size={24} />
            </span>
          )}
        </button>
        <div
          style={{
            display:
              _.get(props, 'hoveredLink.linkText') === link.linkText && _.size(link.sublinks) > 0 ? 'block' : 'none',
          }}
          className={'button-hover-menu'}
        >
          {_.map(link.sublinks, sublink => (
            <div className={'menu-button'} key={sublink.linkText} onClick={() => props.navToLink(sublink)}>
              {sublink.linkText}
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

const mapStateToProps = (state: RootState) => ({
  ...state.router,
  ...state.navBar,
});

const mapDispatchToProps = (dispatch: RootDispatch) => ({
  navToLink: (navLink: NavLink) => navigateToLink(navLink)(dispatch),
  hoverLink: (navLink: NavLink) => dispatch(hoverLink(navLink)),
  unHoverLink: () => dispatch(unhoverLink()),
});

export const NavBar = connect(
  mapStateToProps,
  mapDispatchToProps,
)(NavBarComponent);
