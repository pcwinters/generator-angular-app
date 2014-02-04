angular.module("<%= moduleName %>").controller 'MainController',
	class MainController
		constructor: (@$scope) ->
			@$scope.events = []
			for eventName in ['rally:objectcreated', 'rally:objectupdated']
				@$scope.$on(eventName, @onEvent)

		onEvent: (name, args...) =>
			timestamp = (new Date()).toString())
			@$scope.events.push({timestamp, name})
