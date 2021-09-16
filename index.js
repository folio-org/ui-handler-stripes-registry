import { coreEvents, HandlerManager } from '@folio/stripes/core';
import Registry from './src/Registry';

const App = () => {
  return null;
};

// Track whether we've already fired the dash event with a boolean
let registryEventFired = false;
App.eventHandler = (event, stripes) => {
  if (event === coreEvents.LOGIN && registryEventFired === false) {
    // Ensure event only fired once
    registryEventFired = true;
    return () => (
      <HandlerManager
        data={Registry}
        event="ui-handler-stripes-registry-load"
        stripes={stripes}
      />
    );
  }

  return null;
};

export default App;

export { default as Registry } from './src/Registry';
