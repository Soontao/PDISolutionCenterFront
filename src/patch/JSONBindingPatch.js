import JSONPropertyBinding from "sap/ui/model/json/JSONPropertyBinding";
import JSONModel from "sap/ui/model/json/JSONModel";
import { forEach, isEqual } from "lodash";

/**
 * overwrite set property logic
 */
JSONModel.prototype.setProperty = function(sPath, oValue, oContext, bAsyncUpdate) {

  var sResolvedPath = this.resolve(sPath, oContext),
    iLastSlash, sObjectPath, sProperty;

  // return if path / context is invalid
  if (!sResolvedPath) {
    return false;
  }

  // If data is set on root, call setData instead
  if (sResolvedPath == "/") {
    this.setData(oValue);
    return true;
  }

  iLastSlash = sResolvedPath.lastIndexOf("/");

  // In case there is only one slash at the beginning, sObjectPath must contain this slash
  sObjectPath = sResolvedPath.substring(0, iLastSlash || 1);
  sProperty = sResolvedPath.substr(iLastSlash + 1);

  var oObject = this._getObject(sObjectPath);

  if (oObject) {

    // with lodash well-tested deep equal
    if (!isEqual(oObject[sProperty], oValue)) {

      oObject[sProperty] = oValue;

      // Directly fire 'change' event for 'PropertyBinding' object when data changed
      forEach(this.getBindings(), (binding: JSONPropertyBinding) => {
        var path: string = binding.getPath() || "";
        if (path.startsWith(sPath)) {
          binding._fireChange({ reason: "Change" });
        }
      });

      this.checkUpdate(false, bAsyncUpdate);

    }

    return true;
  }

  return false;
};