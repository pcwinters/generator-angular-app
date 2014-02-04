angular.module("<%= moduleName %>", ['rui', 'rally', 'rally.app.iframe']).run((AppService, $rootScope) ->
	$rootScope.app = AppService.register("<%= moduleName %>")
)
