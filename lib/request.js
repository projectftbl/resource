import request from 'axios';
import assign from 'lodash/object/assign';
import cookie from 'react-cookie';
import qs from 'qs';

const extractData = response => response.data
    , config = { withCredentials: true };

const getConfig = () => {
  const token = cookie.load('token');

  if (token == null) return config;

  return assign({}, config, { headers: { 'x-session-token': token }});
};

export default {
  post(url, options) {
    return request.post(`/api${url}`, options && options.data, getConfig()).then(extractData);
  }

, get(url, options) {
    if (options && options.query != null) url = [ url, qs.stringify(options.query) ].join('?');

    return request.get(`/api${url}`, getConfig()).then(extractData);
  }

, put(url, options) {
    return request.put(`/api${url}`, options && options.data, getConfig()).then(extractData);
  }

, del(url) {
    return request.delete(`/api${url}`, getConfig()).then(extractData);
  }
}