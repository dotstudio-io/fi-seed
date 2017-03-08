(function (window) {
  'use strict';

  var ng = window.angular;

  /**
   * Consts service function.
   */
  function constsServiceFn($http) {
    var defaults = {
      cache: true,
      params: {}
    };

    /**
     * Changes the default HTTP config.
     *
     * @param {Object} cfg The new $http config object.
     */
    function config(cfg) {
      if (!cfg || !ng.isObject(cfg)) {
        throw new Error('Config must be a valid $http config object.');
      }

      if (!cfg.params) {
        cfg.params = {};
      }

      defaults = cfg;
    }

    /**
     * Get consts values by name(s).
     */
    function get(consts) {
      if (!consts) {
        throw new Error('Parameter cannot be empty!');
      }

      if (!ng.isArray(consts) && !ng.isString(consts)) {
        throw new Error('Wrong parameter type! Must be a String or an Array.');
      }

      defaults.params.consts = consts;

      return $http.get('/api/consts', defaults);
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