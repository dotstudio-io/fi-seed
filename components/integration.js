/*jslint node: true */
'use strict';

var https = require('https');
var dateformat = require('dateformat');

/**
 * Component's defaults.
 */
var defaults = {
    params: function () {
        return {
            IdPaciente: null,
            Token: 'NQAxADcANgAyADUANAB8ADgALwA5AC8AMgAwADEANAAgADkAOgA0ADMAOgA0ADUAIABQAE0A',
            ParametroBaseConsulta: {
                ExtensionData: null,
                TipoMensaje: '1',
                FechaHoraMensaje: dateformat(new Date(), 'Ymd H:i'),
                IdSitioSoftware: '2',
                IdSoftwareInforma: '2',
                VersionSoftwareInforma: '1',
                CodigoEstablecimientoConsulta: null
            }
        };
    },

    options: function (subpath, params) {
        return {
            hostname: 'catest.saludsidra.cl',
            port: 443,
            path: '/Saydex.Integracion.MiSalud/' + subpath + '?parametroEntrada=' + encodeURIComponent(JSON.stringify(params)),
            method: 'GET',
            rejectUnauthorized: false
        };
    }
};

/**
 * Base requester function.
 */
function request(subpath, ryf, est, cb) {
    var params, options;

    params = defaults.params();
    params.IdPaciente = ryf;
    params.ParametroBaseConsulta.CodigoEstablecimientoConsulta = est;

    options = defaults.options(subpath, params);

    https.get(options, function (response) {
        response.on('data', function (data) {
            cb.call(this, null, JSON.parse(data.toString()));
        });
    }).on('error', function (err) {
        console.error("Integration service request error!", err);
        cb.call(this, err);
    });
}

/**
 * Get patient's basic data.
 */
module.exports.getPatient = function getPatient(ryf, est, cb) {
    request('Paciente.svc/ObtenerPacienteRest', ryf, est, function (err, data) {
        if (err) {
            cb.call(this, err);
        } else {
            var patient = data.ObtenerPacienteRestResult.Paciente;

            /* Normalize response data */
            cb.call(this, null, {
                city: null,
                gender: {
                    value: patient.Sexo
                },
                name: {
                    first: patient.Nombres,
                    last: patient.PrimerApellido + " " + patient.SegundoApellido
                }
            });
        }
    });
};

/**
 * Get patient's detailed information.
 */
module.exports.getPatientInfo = function getPatientInfo(ryf, est, cb) {
    request('Paciente.svc/ObtenerInformacionPacienteRest', ryf, est, cb);
};
