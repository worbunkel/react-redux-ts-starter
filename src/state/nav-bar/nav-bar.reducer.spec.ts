// import * as dayjs from 'dayjs';
// import {
//   getThirtyDayForecastFailure,
//   getThirtyDayForecastRequest,
//   getThirtyDayForecastSuccess,
// } from './nav-bar.actions';
// import { navBarReducer } from './nav-bar.reducer';
// import { DefaultNavBarState, ForecastDayDatum } from './nav-bar.state';

// describe('navBarReducer', () => {
//   describe('on uncaught action', () => {
//     it('should return the state', () => {
//       const prevState = DefaultNavBarState();
//       const testAction: any = { type: 'asdf', payload: {} };

//       const newState = navBarReducer(prevState, testAction);

//       expect(newState).toEqual(prevState);
//     });
//   });

//   describe('on GET_THIRTY_DAY_FORECAST_REQUEST', () => {
//     it('should set isLoading to true', () => {
//       const prevState = DefaultNavBarState();
//       prevState.isLoading = false;

//       const newState = navBarReducer(prevState, getThirtyDayForecastRequest());

//       expect(newState.isLoading).toEqual(true);
//     });
//   });

//   describe('on GET_THIRTY_DAY_FORECAST_SUCCESS', () => {
//     it('should set isLoading to false', () => {
//       const prevState = DefaultNavBarState();
//       const thirtyDayForecastData: ForecastDayDatum[] = [
//         {
//           day: 1,
//           date: dayjs().unix(),
//           compPercent: 100,
//           forecast: 20,
//           lastYearActual: 30,
//           thisYearActual: 50,
//           versusPlan: 20,
//         },
//       ];

//       const newState = navBarReducer(prevState, getThirtyDayForecastSuccess(thirtyDayForecastData));

//       expect(newState.isLoading).toEqual(false);
//     });
//     it('should set thirtyDayForecastData', () => {
//       const prevState = DefaultNavBarState();
//       const thirtyDayForecastData: ForecastDayDatum[] = [
//         {
//           day: 1,
//           date: dayjs().unix(),
//           compPercent: 100,
//           forecast: 20,
//           lastYearActual: 30,
//           thisYearActual: 50,
//           versusPlan: 20,
//         },
//       ];

//       const newState = navBarReducer(prevState, getThirtyDayForecastSuccess(thirtyDayForecastData));

//       expect(newState.thirtyDayForecastData).toEqual(thirtyDayForecastData);
//     });
//   });

//   describe('on GET_THIRTY_DAY_FORECAST_FAILURE', () => {
//     it('should set isLoading to false', () => {
//       const prevState = DefaultNavBarState();

//       const newState = navBarReducer(prevState, getThirtyDayForecastFailure());

//       expect(newState.isLoading).toEqual(false);
//     });
//     it('should return the state', () => {
//       const prevState = DefaultNavBarState();
//       prevState.isLoading = false;

//       const newState = navBarReducer(prevState, getThirtyDayForecastFailure());

//       expect(newState).toEqual(prevState);
//     });
//   });
// });
