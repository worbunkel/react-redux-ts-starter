import * as _ from 'lodash';

export const deepMergeReconciler = <State>(inboundState: State, originalState: State, reducedState: State): State =>
  _.merge(originalState, reducedState, inboundState);
