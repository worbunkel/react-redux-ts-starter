import Reactotron from 'reactotron-react-js';
import { reactotronRedux } from 'reactotron-redux';

export const reactotron = Reactotron.configure()
  .use(reactotronRedux())
  .connect();
