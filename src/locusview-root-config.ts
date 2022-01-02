import {
  registerApplication,
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

const showWhenAnyOf = (routes) => {
  return function (location) {
    return routes.some((route) => {
      return location.pathname === route;
    });
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

const applications: RegisterApplicationConfig[] = [
  {
    name: "layout",
    app: () => System.import("@locusview/layout-app"),
    activeWhen: ["/first-angular-app", "/first-react-app"],
  },
  {
    name: "login",
    app: () => System.import("@locusview/auth-app"),
    activeWhen: showWhenAnyOf(["/", "/login", "/signin"]),
  },
  {
    name: "first-angular-app",
    app: () => System.import("@locusview/angular-app"),
    activeWhen: showWhenPrefix(["/first-angular-app"]),
  },
  {
    name: "first-react-app",
    app: () => System.import("@locusview/react-app"),
    activeWhen: showWhenPrefix(["/first-react-app"]),
  },
];

applications.forEach((www) => registerApplication(www));

// HTML LAYOUT

// const routes = constructRoutes(document.querySelector('#single-spa-layout'));
// JSON LAYOUT
// const routes = constructRoutes({
//     type: "route",
//     path: "",
//     props: {title: "Title"},
//     routes: [{
//         type: "application",
//         name: "@locusview/navbar",
//         props: {title: "Title"},
//     }],
//     default: true
// });

// const applications = constructApplications({
//     routes,
//     loadApp({name}) {
//         return System.import(name);
//     },
// });
//
// const layoutEngine = constructLayoutEngine({routes, applications});
// applications.forEach(registerApplication);

start({
  urlRerouteOnly: true,
});
