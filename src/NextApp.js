import React from "react";
import {ConnectedRouter} from "react-router-redux";
import {Provider} from "react-redux";
import {Route, Switch} from "react-router-dom";

import "assets/vendors/style";
import "styles/wieldy.less";
import configureStore, {history} from "./appRedux/store";
import CircularProgress from "components/CircularProgress/index";
// import App from "./containers/App/index";
const App = React.lazy(() => import('./containers/App/index.js'));

export const store = configureStore();

const NextApp = () =>
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <React.Suspense fallback={
        <div className="gx-loader-view">
          <CircularProgress />
        </div>
      }>
        <Switch>
          <Route path="/" component={App}/>
        </Switch>
      </React.Suspense>
    </ConnectedRouter>
  </Provider>;

export default NextApp;
