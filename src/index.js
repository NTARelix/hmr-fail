///<reference types="webpack-env" />
import { stringToLog } from './exports-string';

console.log('Initial value:', stringToLog);

if (module.hot) {
  module.hot.accept('./exports-string', () => {
    console.log('New value:', stringToLog);
  });
}
