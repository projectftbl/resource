import request from 'axios';
import assign from 'lodash/object/assign';
import cookie from 'react-cookie';
import qs from 'qs';

const extractData = response => response.data;

const getConfig = () => {
  const token = cookie.load('token');

  return { withCredentials: true, { headers: { 'x-session-token': token, 'x-original-host': window.location.origin }}}
};

const buildUrl = (url, options) => {
  if (options && options.query != null) return [ url, qs.stringify(options.query) ].join('?');
  return url;
};

export default {
  post(url, options) {
    return request.post(`/api${buildUrl(url, options)}`, options && options.data, getConfig()).then(extractData);
  }

, get(url, options) {
    return request.get(`/api${buildUrl(url, options)}`, getConfig()).then(extractData);
  }

, put(url, options) {
    return request.put(`/api${buildUrl(url, options)}`, options && options.data, getConfig()).then(extractData);
  }

, del(url, options) {
    return request.delete(`/api${buildUrl(url, options)}`, getConfig()).then(extractData);
  }
}