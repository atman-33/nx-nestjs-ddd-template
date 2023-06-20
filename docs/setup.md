## change to your choice of directory
open shell
```
cd ~/Sites
```
> ~/Sites is example

## create nx workspace NestJS app
```
npx create-nx-workspace@latest --preset nest
```
- workspace name? => nx-nestjs-ddd-template
- app name? => server

## add Angular app
```
npm install @nrwl/angular
```
```
nx generate @nrwl/angular:application --name client \
--style scss \
--prefix app \
--routing
```

*add angular material*  
```
npm install @angular/material --dev
npx nx g @angular/material:ng-add --project=client
```
- custom theme? => pink-bluegrey(no matter what you choose)
- global angular material typography styles? => true
- include angular animations module? => do not include

> outside of nx, ng add @angular/material

## add domain in the library
```
npx nx generate @nx/js:library domain --directory=shared --importPath=@libs/shared/domain --tags=scope:shared,type:domain
```
- unit test runner => none
- bundler => none

> if you don't need shared-domain.ts, remove it.

## add infrastructure in the library
```
npx nx generate @nx/js:library infrastructure --directory=shared --importPath=@libs/shared/infrastructure --tags=scope:shared,type:infrastructure
```
- unit test runner => none
- bundler => none

> if you don't need shared-infrastructure.ts, remove it.

## add config in the library
```
npx nx generate @nx/js:library config --directory=shared --importPath=@libs/shared/config --tags=scope:shared,type:config
```
- unit test runner => none
- bundler => none

> if you don't need shared-config.ts, remove it.

## install oracledb
```
npm install oracledb @types/oracledb
```

## install sqlite3
```
npm install sqlite3
```

## install graphql etc for nestjs
```
npm install @nestjs/graphql @nestjs/apollo graphql apollo-server-express
```

## install class validator etc for nestjs
```
npm install class-validator class-transformer
```

## install mongoose and config for nestjs
```
npm install @nestjs/mongoose mongoose @nestjs/config
```

## install joi for nestjs *joi for validating .env values
```
npm install joi
```

## install bcrypt for nestjs
```
npm install bcrypt
```

## install and use apollo, graphql for angular
```
npm install apollo-angular @apollo/client graphql --force
```

### about codegen  
```
npm install @graphql-codegen/cli @graphql-codegen/schema-ast @graphql-codegen/typescript-apollo-angular @graphql-codegen/typescript-operations
```
*1. tsconfig.base.json => add "ESNext.AsyncIterable" in lib*  
```
  "compilerOptions": {
    ...
    "lib": ["es2020", "dom", "ESNext.AsyncIterable"],
    ...
```

*2. update app.module.ts*  
- add provide APOLLO_OPTIONS, userFactory etc
```
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ApolloModule,
    HeaderModule,
    LoginModule,
    SignUpModule
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httplink: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: httplink.create({
            uri: 'api/graphql'
          })
        }
      },
      deps: [HttpLink]
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

*3. create proxy and change project.json*
- create proxy.conf.json
- change project.json to add using proxy.conf.json

*4. create codegen.yml*
```
schema: http://localhost:3000/graphql
documents: "./apps/client/src/**/*.graphql"
generates: 
  apps/client/src/generated-types.ts: 
    plugins: 
      - typescript
      - typescript-operations
      - typescript-apollo-angular
```

*5. add target condegen in project.json*
```
    "codegen": {
      "executor": "nx:run-commands",
      "options": {
        "command": "graphql-codegen --config apps/client/codegen.yml --watch"
      }
```

*6. create <name>.mutation.graphql*

*7. execute codegen*
```
nx codegen client
```

*8. change noImplicitOverride int tsconfig.json
noImplicitOverride => false  
```
  "compilerOptions": {
    ...
    "noImplicitOverride": false,
    ...
```

### about auto complete graphql

*1. create .graphqlrc.yml on the top directory*
```
schema: http://localhost:3000/graphql
documents: "./apps/client/src/**/*.graphql"
```

*2. install orsenkucher.vscode-graphql in vscode*

* . reopen workspace*

then you can check that where *.graphql are success.  

## install passport for server
```
npm install --save @nestjs/passport passport passport-local
npm install --save-dev @types/passport-local
npm install --save @nestjs/jwt passport-jwt
npm install --save-dev @types/passport-jwt
```

## install coookie-parser
```
npm install cookie-parser
npm install --save-dev @types/cookie-parser
```

## install link-preview
```
npm install link-preview-js
```