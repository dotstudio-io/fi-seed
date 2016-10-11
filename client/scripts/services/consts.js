(function (window) {
  'use strict';

  var ng = window.angular;

  var ERR_WRONG_PARAM_TYPE = 'Wrong parameter type! Must be a String or an Array.';
  var ERR_INVALID_CONFIG = 'Config must be a valid $http config object.';
  var ERR_NO_PARAM = 'Parameter cannot be empty!';

  var ROUTE_API_CONSTS = '/api/consts';

  var CONFIG = {
    cache: true,
    params: {}
  };

  /**
   * Consts service function.
   */
  function constsServiceFn($http) {

    /**
     * Changes the default HTTP config.
     *
     * @param {Object} cfg The new $http config object.
     */
    function config(cfg) {
      if (!cfg || !ng.isObject(cfg)) {
        throw new Error(ERR_INVALID_CONFIG);
      }

      if (!cfg.params) {
        cfg.params = {};
      }

      CONFIG = cfg;
    }

    /**
     * Get consts values by name(s).
     */
    function get(consts) {
      if (!consts) {
        throw new Error(ERR_NO_PARAM);
      }

      if (!ng.isArray(consts) && !ng.isString(consts)) {
        throw new Error(ERR_WRONG_PARAM_TYPE);
      }

      CONFIG.params.consts = consts;

      return $http.get(ROUTE_API_CONSTS, CONFIG);
    }

    var constsServiceDef = {
      config: config,
      get: get
    };

    return constsServiceDef;

  }

  ng.module('App').factory('$consts', [
    '$http',

    constsServiceFn
  ]);

}(window));
