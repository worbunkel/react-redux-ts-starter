export const rootErrorHandler = <T>(action: { type: keyof T }) => {
  console.error(`Error in action: ${action.type}`);
};
