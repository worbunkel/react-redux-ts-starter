export const rootErrorHandler = <T>(action: { type: string }) => {
  // tslint:disable-next-line:no-console
  console.error(`Error in action: ${action.type}`);
};
