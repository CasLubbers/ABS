// JavaScript source code
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var APIService = /** @class */ (function () {
        function APIService(miService) {
            this.miService = miService;
        }
        APIService.prototype.apiCall = function (program, transaction, record, maxReturnedRecords) {
            var _this = this;
            var request = {};
            request.program = program;
            request.transaction = transaction;
            request.record = record;
            request.maxReturnedRecords = maxReturnedRecords;
            return this.miService.executeRequest(request)
                .then(function (response) {
                    return response;
                }, function (response) { return _this.errorHandling(response); });
        };
        APIService.prototype.errorHandling = function (response) {
            var deferred = this.miService.q.defer();
            Odin.Log.error("Error in program: " + response.program + " while trying to run transaction: " + response.transaction);
            Odin.Log.error("Error in field: " + response.errorField);
            Odin.Log.error("Error code: " + response.errorCode);
            Odin.Log.error("Error message: " + response.errorMessage);
            Odin.Log.error("Error type: " + response.errorType);
            Odin.Log.error("Error: " + response.error);
            deferred.resolve("Error in program: " + response.program + " while trying to run transaction: " + response.transaction
                + ". see log for details");
            return deferred.promise;
        };
        return APIService;
    }());
    exports.APIService = APIService;
});
