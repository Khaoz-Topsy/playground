import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react';
// import reportWebVitals from './reportWebVitals';

import { App } from './App';
import { DependencyInjectionProvider } from './integration/dependencyInjection';

import './scss/custom.scss';
import 'react-image-lightbox/style.css';

ReactDOM.render(
  <DependencyInjectionProvider>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </DependencyInjectionProvider>,
  document.getElementById('kurt-lourens-desktop')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
