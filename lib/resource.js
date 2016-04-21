import request from './request';

export const RESOURCE = '__resource__'; //Symbol('resource');

export default store => next => action => {
  let resourceAction = action[RESOURCE];

  if (typeof resourceAction === 'undefined') return next(action);

  const { types, meta } = resourceAction
      , { url, method, data, query, normalize = response => response } = resourceAction.payload
      , [ PENDING, FULFILLED, REJECTED ] = types;

  next({ type: PENDING, payload: { data: data, query: query }, meta });

  return request[method](url, { data: data, query: query }).then(
    response => {
      try {
        const normalized = normalize(response);
      } catch(e) {
        return next({ type: REJECTED, payload: null, error: true });
      }
      return next({ type: FULFILLED, payload: normalized, meta });
    }
  , error => next({ type: REJECTED, payload: error, error: true})
  );
};
