# Diff Details

Date : 2022-03-09 15:02:23

Directory /home/jacob/Code/mln-dashboard

Total : 75 files,  2472 codes, 645 comments, 535 blanks, all 3652 lines

[summary](results.md) / [details](details.md) / [diff summary](diff.md) / diff details

## Files
| filename | language | code | comment | blank | total |
| :--- | :--- | ---: | ---: | ---: | ---: |
| [.eslintrc.json](/.eslintrc.json) | JSON | 3 | 0 | 1 | 4 |
| [.mocharc.json](/.mocharc.json) | JSON | 4 | 0 | 0 | 4 |
| [.nycrc.json](/.nycrc.json) | JSON | 17 | 0 | 0 | 17 |
| [README.md](/README.md) | source.markdown.math | 50 | 0 | 23 | 73 |
| [docs/apps.md](/docs/apps.md) | source.markdown.math | 14 | 0 | 6 | 20 |
| [docs/authentication_verification_and_security.md](/docs/authentication_verification_and_security.md) | source.markdown.math | 9 | 0 | 9 | 18 |
| [docs/authorization.md](/docs/authorization.md) | source.markdown.math | 4 | 0 | 4 | 8 |
| [docs/backend.md](/docs/backend.md) | source.markdown.math | 421 | 0 | 165 | 586 |
| [docs/client.md](/docs/client.md) | source.markdown.math | 18 | 0 | 5 | 23 |
| [docs/code_organization.md](/docs/code_organization.md) | source.markdown.math | 33 | 0 | 8 | 41 |
| [docs/file_permissions.md](/docs/file_permissions.md) | source.markdown.math | 23 | 0 | 16 | 39 |
| [docs/live_editing.md](/docs/live_editing.md) | source.markdown.math | 31 | 0 | 6 | 37 |
| [docs/users_and_groups.md](/docs/users_and_groups.md) | source.markdown.math | 10 | 0 | 8 | 18 |
| [next-env.d.ts](/next-env.d.ts) | TypeScript | 0 | 4 | 2 | 6 |
| [next.config.js](/next.config.js) | JavaScript | 3 | 1 | 1 | 5 |
| [package.json](/package.json) | JSON | 60 | 0 | 1 | 61 |
| [public/vercel.svg](/public/vercel.svg) | XML | 4 | 0 | 0 | 4 |
| [register.js](/register.js) | JavaScript | 16 | 8 | 4 | 28 |
| [src/common/account/sanityCheck.ts](/src/common/account/sanityCheck.ts) | TypeScript | 66 | 9 | 3 | 78 |
| [src/common/apps/[...appTypes].ts](/src/common/apps/%5B...appTypes%5D.ts) | TypeScript | 23 | 0 | 7 | 30 |
| [src/common/constants.ts](/src/common/constants.ts) | TypeScript | 12 | 0 | 1 | 13 |
| [src/common/types/[...frontendTypes].ts](/src/common/types/%5B...frontendTypes%5D.ts) | TypeScript | 62 | 13 | 7 | 82 |
| [src/components/appIcon.tsx](/src/components/appIcon.tsx) | TypeScript React | 9 | 0 | 1 | 10 |
| [src/components/copyright.tsx](/src/components/copyright.tsx) | TypeScript React | 16 | 0 | 2 | 18 |
| [src/components/panelLayout/access-denied.js](/src/components/panelLayout/access-denied.js) | JavaScript | 15 | 0 | 2 | 17 |
| [src/components/panelLayout/panelLayout.js](/src/components/panelLayout/panelLayout.js) | JavaScript | 13 | 0 | 1 | 14 |
| [src/pages/TODO_error.jsx](/src/pages/TODO_error.jsx) | JavaScript React | 14 | 1 | 3 | 18 |
| [src/pages/_app.jsx](/src/pages/_app.jsx) | JavaScript React | 12 | 5 | 2 | 19 |
| [src/pages/about.tsx](/src/pages/about.tsx) | TypeScript React | 0 | 0 | 1 | 1 |
| [src/pages/api/account/create.ts](/src/pages/api/account/create.ts) | TypeScript | 33 | 8 | 11 | 52 |
| [src/pages/api/account/delete.ts](/src/pages/api/account/delete.ts) | TypeScript | 25 | 4 | 7 | 36 |
| [src/pages/api/account/meta.ts](/src/pages/api/account/meta.ts) | TypeScript | 0 | 15 | 0 | 15 |
| [src/pages/api/account/resend_verification.ts](/src/pages/api/account/resend_verification.ts) | TypeScript | 0 | 6 | 0 | 6 |
| [src/pages/api/account/reset_password.ts](/src/pages/api/account/reset_password.ts) | TypeScript | 11 | 1 | 2 | 14 |
| [src/pages/api/account/verify.ts](/src/pages/api/account/verify.ts) | TypeScript | 0 | 13 | 0 | 13 |
| [src/pages/api/auth/[...nextauth].js](/src/pages/api/auth/%5B...nextauth%5D.js) | JavaScript | 94 | 92 | 15 | 201 |
| [src/pages/api/examples/jwt.js](/src/pages/api/examples/jwt.js) | JavaScript | 6 | 1 | 2 | 9 |
| [src/pages/api/examples/session.js](/src/pages/api/examples/session.js) | JavaScript | 5 | 1 | 1 | 7 |
| [src/pages/api/files-old/upload.ts](/src/pages/api/files-old/upload.ts) | TypeScript | 33 | 6 | 9 | 48 |
| [src/pages/api/fs/files.ts](/src/pages/api/fs/files.ts) | TypeScript | 68 | 20 | 16 | 104 |
| [src/pages/api/fs/list.ts](/src/pages/api/fs/list.ts) | TypeScript | 33 | 72 | 13 | 118 |
| [src/pages/api/fs/manage.ts](/src/pages/api/fs/manage.ts) | TypeScript | 0 | 6 | 0 | 6 |
| [src/pages/api/fs/mkdir.ts](/src/pages/api/fs/mkdir.ts) | TypeScript | 0 | 22 | 0 | 22 |
| [src/pages/api/fs/permissions.ts](/src/pages/api/fs/permissions.ts) | TypeScript | 0 | 91 | 0 | 91 |
| [src/pages/api/graphql.ts](/src/pages/api/graphql.ts) | TypeScript | 19 | 0 | 4 | 23 |
| [src/pages/auth/create_account.tsx](/src/pages/auth/create_account.tsx) | TypeScript React | 111 | 1 | 7 | 119 |
| [src/pages/auth/error.tsx](/src/pages/auth/error.tsx) | TypeScript React | 42 | 0 | 5 | 47 |
| [src/pages/auth/forgot_password.tsx](/src/pages/auth/forgot_password.tsx) | TypeScript React | 80 | 1 | 6 | 87 |
| [src/pages/auth/login.jsx](/src/pages/auth/login.jsx) | JavaScript React | 77 | 4 | 4 | 85 |
| [src/pages/auth/verify.tsx](/src/pages/auth/verify.tsx) | TypeScript React | 113 | 16 | 14 | 143 |
| [src/pages/dashboards.tsx](/src/pages/dashboards.tsx) | TypeScript React | 22 | 69 | 7 | 98 |
| [src/pages/data-deletion.tsx](/src/pages/data-deletion.tsx) | TypeScript React | 0 | 0 | 1 | 1 |
| [src/pages/gallery.tsx](/src/pages/gallery.tsx) | TypeScript React | 0 | 0 | 1 | 1 |
| [src/pages/index.jsx](/src/pages/index.jsx) | JavaScript React | 20 | 3 | 4 | 27 |
| [src/pages/learn.tsx](/src/pages/learn.tsx) | TypeScript React | 0 | 0 | 1 | 1 |
| [src/pages/privacy.tsx](/src/pages/privacy.tsx) | TypeScript React | 0 | 0 | 1 | 1 |
| [src/pages/terms-of-service.tsx](/src/pages/terms-of-service.tsx) | TypeScript React | 0 | 0 | 1 | 1 |
| [src/pages/todo_404.tsx](/src/pages/todo_404.tsx) | TypeScript React | 0 | 0 | 1 | 1 |
| [src/pages/todo_500.tsx](/src/pages/todo_500.tsx) | TypeScript React | 0 | 0 | 1 | 1 |
| [src/prisma/migrations/20220304144956_init/migration.sql](/src/prisma/migrations/20220304144956_init/migration.sql) | SQL | 65 | 11 | 11 | 87 |
| [src/prisma/prisma.ts](/src/prisma/prisma.ts) | TypeScript | 4 | 12 | 5 | 21 |
| [src/prisma/schema.prisma](/src/prisma/schema.prisma) | Prisma | 77 | 40 | 17 | 134 |
| [src/prisma/seed.ts](/src/prisma/seed.ts) | TypeScript | 88 | 32 | 5 | 125 |
| [src/server/account/createUser.ts](/src/server/account/createUser.ts) | TypeScript | 68 | 19 | 9 | 96 |
| [src/server/account/sendVerfCode.ts](/src/server/account/sendVerfCode.ts) | TypeScript | 58 | 14 | 16 | 88 |
| [src/server/common/junk.ts](/src/server/common/junk.ts) | TypeScript | 12 | 6 | 2 | 20 |
| [src/server/graphql/context.ts](/src/server/graphql/context.ts) | TypeScript | 8 | 0 | 3 | 11 |
| [src/server/graphql/resolvers.ts](/src/server/graphql/resolvers.ts) | TypeScript | 61 | 3 | 10 | 74 |
| [src/server/graphql/types.ts](/src/server/graphql/types.ts) | TypeScript | 72 | 13 | 8 | 93 |
| [src/styles/Home.module.css](/src/styles/Home.module.css) | CSS | 105 | 0 | 17 | 122 |
| [src/styles/globals.css](/src/styles/globals.css) | CSS | 14 | 0 | 3 | 17 |
| [test/hello-world.unit.test.ts](/test/hello-world.unit.test.ts) | TypeScript | 17 | 0 | 3 | 20 |
| [test/index.ts](/test/index.ts) | TypeScript | 4 | 0 | 2 | 6 |
| [test/tsconfig.json](/test/tsconfig.json) | JSON with Comments | 26 | 0 | 0 | 26 |
| [tsconfig.json](/tsconfig.json) | JSON with Comments | 39 | 2 | 1 | 42 |

[summary](results.md) / [details](details.md) / [diff summary](diff.md) / diff details