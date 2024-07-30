import {
  coreEvents,
  getEventHandler,
  withModules
} from '@folio/stripes/core';

import Registry from './src/Registry';

const App = () => {
  return null;
};

// Track whether we've already fired the dash event with a boolean
let registryEventFired = false;

const LoadRegistryEvent = withModules(({
  modules,
  stripes
}) => {
  if (registryEventFired === false) {
    registryEventFired = true;

    // Doing our own special version of what HandlerManager does here,
    // because having to render a component to raise the event seems to cause race conditions
    // when done directly
    modules.handler.reduce((acc, module) => {
      const component = getEventHandler('LOAD_STRIPES_REGISTRY', stripes, module, Registry);
      if (component) {
        acc.push(component);
      }
      return acc;
    }, []);
  }
});

App.eventHandler = (event, stripes) => {
  if (event === coreEvents.LOGIN) {
    return () => <LoadRegistryEvent stripes={stripes} />;
  }

  return null;
};

export default App;

export { default as Registry } from './src/Registry';
