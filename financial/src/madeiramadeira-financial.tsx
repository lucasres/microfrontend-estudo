import React from "react";
import ReactDOM from "react-dom";
import { AppProps } from "single-spa";
import singleSpaReact from "single-spa-react";
import Root from "./root.component";

interface CustomProps {
  supplierName: string
  supplierId: string
  jwt: string
}

type Props = AppProps & CustomProps

const lifecycles = singleSpaReact<CustomProps>({
  React,
  ReactDOM,
  rootComponent: Root,
  errorBoundary(err, info, props) {
    // Customize the root error boundary for your microfrontend here.
    return null;
  },
});

const { bootstrap: _bootstrap, mount: _mount, unmount: _unmount } = lifecycles;

export function bootstrap(props: Props): Promise<any> {
  return Promise.resolve().then(() => {
    console.log("bootstrap", props)
    _bootstrap(props)
  });
}

export function mount(props) {
  return Promise.resolve().then(() => {
    console.log("mount", props)
    _mount(props)
  });
}

export function unmount(props) {
  return Promise.resolve().then(() => {
    console.log("unmount", props)
    _unmount(props)
  });
}
