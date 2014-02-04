angular.module("<%= moduleName %>", ['rui', 'rally', 'rally.app.iframe']).run((AppService) ->
	AppService.register("<%= moduleName %>")
)
