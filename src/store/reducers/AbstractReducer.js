

export interface AbstractReducer {
  type: string,
  action: (...any) => Promise<void>
}

export interface Reducers {
  [string]: AbstractReducer
}

export const createReducers = () => {

  const reducers: Reducers = {};

  const registerReducer = (r: AbstractReducer, force = false) => {

    if (!r.type) {
      throw new Error("Must define the reducer type");
    }
    if (!r.action) {
      throw new Error(`Must define the reducer action for "${r.type}"`);
    }

    if (!force && reducers[r.type] != undefined) {
      throw new Error(`"${r.type}" has been defined before, if you want to overwrite it, set 'force' as true`);
    }

    reducers[r.type] = r;

  };

  return { reducers, registerReducer };

};

