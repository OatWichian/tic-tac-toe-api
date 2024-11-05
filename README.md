## Project structure
```bash
├── prisma
│   ├── schema.prisma # manage models
├── src
│   ├── auth # auth guard
│   ├── config
│   │   ├── app-config.module.ts
│   │   ├── **/*.ts # config
│   ├── database
│   │   ├── migrations
│   │   │   ├── $yyyymmdd-$running-$table.ts # file migration
│   │   ├── knex-connect.ts # use knex for migration
│   │   ├── prisma.module.ts
│   │   ├── prisma.service.ts
│   ├── routes
│   │   ├── admin-route
│   │   │   ├── $modules
│   │   │   ├── admin-route.module.ts
│   │   ├── api-route
│   │   │   ├── $modules
│   │   │   ├── api-route.module.ts
│   │   ├── routes.module.ts
│   │   ├── router.config.ts
│   ├── helpers
│   │   ├── **/*.ts # mapping data, dto, type, interface, enum, etc.
│   ├── req-api # util http request
├── .env.dev
└── package.json
```
### New Route
```bash
# === gen module ===
$ nest g mo routes/admin-route/[path]
$ nest g mo routes/api-route/[path]
# or
$ npm run nestmo:admin --path=[path]
$ npm run nestmo:api --path=[path]
# example : npm run nestmo:admin --path=master-data/company
# example : npm run nestmo:api --path=master-data/company

# === new admin ===
$ nest g res routes/admin-route/[path] --no-spec
# or
$ npm run nestres:admin --path=[path]
# example : npm run nestres:admin --path=master-data/company/equipment

# === new api ===
$ nest g res routes/api-route/[path] --no-spec
# or
$ npm run nestres:api --path=[path]
# example : npm run nestres:api --path=master-data/company/equipment
```