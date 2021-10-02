import * as React from 'react';

export const navigationRef = React.createRef();

export function navigate(name) {
  navigationRef.current?.navigate(name);
}

export function navigateRoute(name, route) {
  navigationRef.current?.navigate(name, route);
}

export function goBack() {
  console.log('back');
  navigationRef.current?.goBack();
}
