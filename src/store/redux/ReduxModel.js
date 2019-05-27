import ClientModel from "sap/ui/model/ClientModel";

import { createStore } from "redux";
import ReduxPropertyBinding from "./ReduxPropertyBinding";
import Context from "sap/ui/model/Context";
import ReduxListBinding from "./ReduxListBinding";
import ReduxTreeBinding from './ReduxTreeBinding';


export default class ReduxModel extends ClientModel {

  metadata = {
    publicMethods: []
  }

  constructor(reducers) {
    super();
    this._store = createStore(
      reducers,
      // with redux devtools browser plugin
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
    this._store.subscribe(() => {
      // once any data updated, perform check
      this.checkUpdate();
    });
  }

  getProperty(sPath, oContext) {
    return this._getObject(sPath, oContext);
  }

  _getObject(sPath, oContext) {
    var oNode = null;
    if (oContext instanceof Context) {
      oNode = this._getObject(oContext.getPath());
    } else if (oContext) {
      oNode = oContext;
    }
    if (!sPath) {
      return oNode;
    }

    var oState = this._store.getState();
    var iIndex = 0;
    var aParts = sPath.split('/');

    if (!aParts[0]) {
      // absolute path starting with slash
      if (aParts[1] === 'selector') {
        oNode = this.oSelectors[aParts[2]](this.oStore.getState(), oContext);
        iIndex = 3;
      } else {
        oNode = oState[aParts[1]];
        iIndex = 2;
      }
    }

    while (oNode && aParts[iIndex]) {
      var sPart = aParts[iIndex];
      var oTmpNode = oNode[sPart];
      if (typeof oTmpNode === 'function') {
        oNode = oTmpNode(this._store.getState(), oContext);
      } else {
        oNode = oTmpNode;
      }
      iIndex += 1;
    }
    return oNode;
  }

  dispatch(action) {
    this._store.dispatch(action);
  }

  bindProperty(sPath, oContext, mParameters) {
    return new ReduxPropertyBinding(this, sPath, oContext, mParameters);
  }

  bindTree(sPath, oContext, aFilters, mParameters, aSorters) {
    return new ReduxTreeBinding(this, sPath, oContext, aFilters, mParameters, aSorters);
  }

  bindList(sPath, oContext, aSorters, aFilters, mParameters) {
    return new ReduxListBinding(this, sPath, oContext, aSorters, aFilters, mParameters);
  }

}

