## run the server NestJS
```
nx serve server
```

## run the client Angular
```
nx serve client
```

## run the client and server
```
nx run-many --target=serve --projects=client,server
```
or  
```
nx run-many --target=serve --all
```

## stop listening server
check PID  
```
lsof -i :3000
```
kill PID  
```
kill <PID>
```

## generate angular module
```
nx generate @nx/angular:module <module-name> --project=client
```
> outside of nx, ng g module <module-name>

## generate angular component
```
nx generate @nx/angular:component <component-name> --project=client
```
> outside of nx, ng g component <component-name>

## generate nestjs module
```
nx generate @nx/nest:module app/<module-name> --project=server
```
> outside of nx, nest g module <module-name>

## generate nestjs controller
```
nx generate @nx/nest:controller app/<controller-name> --project=server
```
> outside of nx, nest g controller <controller-name>

## generate nestjs resolver
```
nx generate @nx/nest:resolver app/<resolver-name> --project=server
```
> outside of nx, nest g resolver <resolver-name>

## generate nestjs service
```
nx generate @nx/nest:service app/<service-name> --project=server
```
> outside of nx, nest g service <service-name>