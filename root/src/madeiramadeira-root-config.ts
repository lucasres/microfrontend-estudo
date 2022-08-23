import { registerApplication, start } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";
import Cookies from "universal-cookie";
import microfrontendLayout from "./microfrontend-layout.html";

const cookies = new Cookies();
const routes = constructRoutes(microfrontendLayout);
const applications = constructApplications({
  routes,
  loadApp({ name }) {
    return System.import(name);
  },
});

const layoutEngine = constructLayoutEngine({ routes, applications });

applications.forEach((value: any) => {
  registerApplication({ 
    ...value,
    customProps: {
      jwt: localStorage.getItem("jwt"),
      supplierId: cookies.get("MM_SUPPLIER_ID"),
      supplierName: cookies.get("MM_SUPPLIER_NAME"),
    }
  })
});

layoutEngine.activate();
start();
