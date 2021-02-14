import { mount } from 'marketing/MarketingApp';
import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default () => {
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      initialPath: history.location.pathname,
      onNavigate: ({ pathname: nextPathname }) => {
        const { pathname } = history.location;

        if (pathname !== nextPathname) {
          history.push(nextPathname);
        }
      },
    });

    // Think of this as an event listener being attached to the History object in the Container. Anytime the history object changes, onParentNavigate will be called
    // The Container is setup to use the BrowserHistory and so the history object's path is the path in the address bar after the domain name. So, anytime that changes
    // the event will fire and onParentNavigate will be called. This method is sent by the Marketing app as a return value to the mount method.
    // This is an example of Microfrontend COMMUNICATING with the Container.
    history.listen(onParentNavigate);
  }, []);

  return <div ref={ref} />;
};
