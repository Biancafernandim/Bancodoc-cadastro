/**
 * @file This is the main entry point for the React application.
 * It renders the root `App` component into the DOM.
 * @author Jules
 */

// Imports StrictMode, a tool for highlighting potential problems in an application.
import { StrictMode } from 'react';
// Imports createRoot, the API to create a root for rendering React components.
import { createRoot } from 'react-dom/client';
// Imports the global CSS styles for the application.
import './index.css';
// Imports the main App component.
import App from './App.jsx';

/**
 * Renders the React application into the DOM.
 * The `createRoot` method is used to create a root element for the React tree,
 * and the `render` method is used to render the `App` component into that root.
 * The `StrictMode` component is used to highlight potential problems in the application.
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);