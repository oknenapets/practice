import { ru } from 'date-fns/locale/';
import React from 'react';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RequiredAuth } from 'shared/components';
import { DefaultPage } from 'shared/layout';
import { Login, NotFound, Profile, Registration, Dealerships, Garage, CarInfo, Service } from './modules';
import { ROUTES } from './shared/constants';
import store from './store';

import 'assets/stylesheets/react-select.scss';
import 'assets/stylesheets/styles.scss';

registerLocale('ru', ru);
setDefaultLocale('ru');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DefaultPage />}>
            <Route element={<RequiredAuth />}>
              <Route path={ROUTES.profile} element={<Profile />} />
              <Route path={ROUTES.dealerships} element={<Dealerships />} />
              <Route path={ROUTES.garage} element={<Garage />} />
              <Route path={ROUTES.car} element={<CarInfo />} />
              <Route path={ROUTES.service} element={<Service />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Route>
          <Route path={ROUTES.login} element={<Login />} />
          <Route path={ROUTES.registration} element={<Registration />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
