import request from 'axios';
import assign from 'lodash/object/assign';
import cookie from 'react-cookie';
import qs from 'qs';

const FORM_URL_ENCODED = 'application/x-www-form-urlencoded';

const extractData = response => response.data;

const getConfig = (options = { contentType: 'application/json' }) => {
  const token = cookie.load('token')
      , type = { 'Content-Type': options.contentType }
      , origin = { 'x-original-host': window.location.origin }
      , headers = assign({}, origin, type);

  return { withCredentials: true, headers: token == null ? headers : assign({}, headers, { 'x-session-token': token }) };
};

const buildUrl = (url, options) => {
  if (options && options.query != null) return [ url, qs.stringify(options.query) ].join('?');
  return url;
};

export default {
  post(url, options = {}) {
    const data = (options.options && options.options.contextType === FORM_URL_ENCODED && options.data) 
               ? qs.stringify(options.data) : options.data;

    return request.post(`/api${buildUrl(url, options)}`, data, getConfig(options.options)).then(extractData);
  }

, get(url, options) {
    return request.get(`/api${buildUrl(url, options)}`, getConfig()).then(extractData);
  }

, put(url, options = {}) {
    const data = (options.options && options.options.contextType === FORM_URL_ENCODED && options.data) 
               ? qs.stringify(options.data) : options.data;

    return request.put(`/api${buildUrl(url, options)}`, data, getConfig(options.options)).then(extractData);
  }

, del(url, options) {
    return request.delete(`/api${buildUrl(url, options)}`, getConfig()).then(extractData);
  }
}