import React from 'react';
import Header from './components/Header';
import Products from './components/Products';
import NewProduct from './components/NewProduct';
import EditProduct from './components/EditProduct';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// REDUX
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Router>
      <Provider store={store}> {/* STATE AVAILABLE IN WHOLE COMPONENTS */}
        <Header />
        <div className="continaer">
          <Switch>
            <Route exact path="/" component={Products} />
            <Route exact path="/products/new" component={NewProduct} />
            <Route exact path="/products/edit/:id" component={EditProduct} />
          </Switch>
        </div>
      </Provider>
    </Router> 
  );
}

export default App;
