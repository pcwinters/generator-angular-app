angular.module("<%= moduleName %>", ['rui', 'rally']).run(($rootScope, AppService) ->
	AppService.register($rootScope)
)
