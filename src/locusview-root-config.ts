import {
  registerApplication,
  unregisterApplication,
  unloadApplication,
  start,
  navigateToUrl,
  RegisterApplicationConfig,
} from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";

// import 'zone.js';

const showWhenAnyOf = (routes, appName) => {
  return function (location) {
    return routes.some((route) => location.pathname === route);
  };
};

const showWhenPrefix = (routes) => {
  return function (location) {
    return routes.some((route) => location.pathname.startsWith(route));
  };
};

const showExcept = (routes) => {
  return function (location) {
    return routes.every((route) => location.pathname !== route);
  };
};

// registerApplication('login', () => System.import('@locusview/auth-app'), showWhenAnyOf(['/login']));
// registerApplication('home-layout', () => System.import('@locusview/layout-app'), showExcept(['/login']));
// registerApplication('first-angular-app', () => System.import('@locusview/angular-app'), showWhenPrefix(['/first-angular-app']));
// registerApplication('first-react-app', () => System.import('@locusview/react-app'), showWhenPrefix(['/first-react-app']));

const loginApp: RegisterApplicationConfig = {
  name: "login",
  app: () => System.import("@locusview/auth-app"),
  activeWhen: showWhenAnyOf(["/", "/login", "/signin"], "login"),
};

const layoutApp: RegisterApplicationConfig = {
  name: "layout",
  app: () => System.import("@locusview/layout-app"),
  activeWhen: ["/first-angular-app", "/first-react-app"],
  customProps: (name, location) => {
    return { authToken: "d83jD63UdZ6RS6f70D0" };
  },
};

const firstAngularApp: RegisterApplicationConfig = {
  name: "first-angular-app",
  app: () => System.import("@locusview/angular-app"),
  activeWhen: showWhenPrefix(["/first-angular-app"]),
  customProps: (name, location) => {
    return { authToken: "d83jD63UdZ6RS6f70D0" };
  },
};

const firstReactApp: RegisterApplicationConfig = {
  name: "first-react-app",
  app: () => System.import("@locusview/react-app"),
  activeWhen: showWhenPrefix(["/first-react-app"]),
  customProps: (name, location) => {
    return { authToken: "d83jD63UdZ6RS6f70D0" };
  },
};

const applications: RegisterApplicationConfig[] = [
  loginApp,
  layoutApp,
  firstAngularApp,
  firstReactApp,
];

applications.forEach((www) => registerApplication(www));

start({
  urlRerouteOnly: true,
});
