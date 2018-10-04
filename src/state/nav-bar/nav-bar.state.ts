export type NavLink = {
  linkText: string;
  url: string;
  sublinks?: NavLink[];
};

export type NavBarState = {
  logoUrl: string;
  appName: string;
  links: NavLink[];
  hoveredLink: NavLink;
};

export const DefaultNavBarState = (): NavBarState => ({
  links: [
    { linkText: 'Home', url: '/' },
    {
      linkText: 'Sales',
      url: '/sales',
      sublinks: [
        { linkText: '30 Day Forecast', url: '/sales/30-day-forecast' },
        { linkText: '60 Day Forecast', url: '/sales/60-day-forecast' },
        { linkText: '90 Day Forecast', url: '/sales/90-day-forecast' },
      ],
    },
    { linkText: 'Feedback', url: '/feedback' },
  ],
  hoveredLink: null,
  logoUrl: 'test.png',
  appName: 'Forecast Tool Name',
});
