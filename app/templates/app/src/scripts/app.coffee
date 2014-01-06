angular.module("<%= moduleName %>", ['rui', 'rally']).run((rally) ->
	rally.boostrap()
)
