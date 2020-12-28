import React from "react";
import ReactDOM from "react-dom";
// import LogRocket from 'logrocket';

// import NextApp from './NextApp';
import { unregister as unregisterServiceWorker } from './registerServiceWorker'
import { AppContainer } from 'react-hot-loader';

import CircularProgress from "components/CircularProgress/index";
const NextApp = React.lazy(() => import('./NextApp'));

// Add this import:

//Environment
window.environment = 'Development';
// window.environment = 'Sandbox';
// window.environment = 'Production';

//BaseURL
window.ApiURL = 'https://dev.goodie.id/api-rest/';
// window.ApiURL = 'https://sandbox.goodie.id/api-rest/';
// window.ApiURL = 'https://service.goodie.id/api-rest/';

//Sandbox URL
window.sandboxURL = 'https://portalsandbox.goodie.id';
window.sandboxApiURL = 'https://sandbox.goodie.id/api-rest/';


// Wrap the rendering in a function:
const render = Component => {
  ReactDOM.render(
    // Wrap App inside AppContainer
    <AppContainer>
      <React.Suspense fallback={
        <div className="gx-loader-view">
          <CircularProgress />
        </div>
      }>
        <NextApp/>
      </React.Suspense>
    </AppContainer>,
    document.getElementById('root')
  );
};

// Do this once
// registerServiceWorker();
unregisterServiceWorker();

// Render once
render(NextApp);

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./NextApp', () => {
    render(NextApp);
  });
}
