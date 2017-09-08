(function (window) {
  'use strict';

  var ng = window.angular;

  /**
   * Consts service function.
   *
   * @param {Object} $http AngularJS HTTP service.
   *
   * @returns {Object} AngularJS Service definition.
   */
  function constsServiceFn($http) {
    var defaults = {
      cache: true,
      params: {}
    };

    /**
     * Normalizes consts returned property names.
     *
     * @param {Object} res AngularJS HTTP response object.
     *
     * @returns {Object} The normalized response.
     */
    function normalizeProperties(res) {
      if (ng.isObject(res.data)) {
        for (var prop in res.data) {
          res.data[prop.toLowerCase()] = res.data[prop];
          delete res.data[prop];
        }
      }

      return res;
    }

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
     *
     * @param {String|[String]} names The const names to retreive.
     *
     * @returns {Promise} AngularJS HTTP promise.
     *
     * @throws {Error} If consts name are empty empty or not String or String
     * Array.
     */
    function get(names) {
      if (!names) {
        throw new Error('Parameter cannot be empty!');
      }

      if (!ng.isArray(names) && !ng.isString(names)) {
        throw new Error('Wrong parameter type! Must be a String or an Array.');
      }

      defaults.params.consts = names;

      return $http.get('/api/consts', defaults).then(normalizeProperties, ng.noop);
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
