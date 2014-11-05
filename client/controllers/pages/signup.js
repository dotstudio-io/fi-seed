(function () {
    'use strict';

    /**
     * Signup Controller.
     */
    angular.module('App').controller('Pages:Signup', function ($scope, $http, $location, $session, statics) {

        $scope.pageClass = 'pages-signup';
        $scope.submitting = false;
        $scope.specialties = statics.specialties;

        $scope.submit = function () {
            $scope.submitting = true;

            $http.post('/api/users', {
                name: $scope.form.name,
                email: $scope.form.email,
                password: $scope.form.password,
                specialty: $scope.form.specialist ? $scope.form.speciality : null
            }).success(function (user) {
                $session.login(user);
                $location.path('/welcome');
            }).error(function (data, status) {
                if (status === 400) {
                    /* TODO: do something */
                } else {
                    /* TODO: do something */
                }
            }).finally(function () {
                $scope.submitting = false;
            });
        };
    });

}());
