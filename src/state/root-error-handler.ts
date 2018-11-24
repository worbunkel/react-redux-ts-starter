export const rootErrorHandler = <T>(action: { type: keyof T }) => {
  // tslint:disable-next-line:no-console
  console.error(`Error in action: ${action.type}`);
};
