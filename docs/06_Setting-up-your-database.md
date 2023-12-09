# 6. Setting up your database

- https://nextjs.org/learn/dashboard-app/setting-up-your-database

## In this chapter

- Push your project to GitHub.
- Set up a Vercel account and link your GitHub repo for instant previews and deployments.
- Create and link your project to a Postgres database.
- Seed the database with initial data.

## Create a GitHub repository

## Create a Vercel account

## Connect and deploy your project

- https://nextjs-dashboard-pi-taupe.vercel.app/

## Create a Postgres database

- Storage 탭 -> 우측 상단 Connect Store 클릭 -> 모달에서 Create New 탭 -> Postgres -> Continue
- 연결되면 .env.local 탭으로 이동하여 `Show secret` 및 `Copy Snippet`를 클릭합니다.

```
POSTGRES_URL="postgres://default:Ck5Nl9fnVOmq@ep-rapid-sea-59338039-pooler.us-east-1.postgres.vercel-storage.com:5432/verceldb"
POSTGRES_PRISMA_URL="postgres://default:Ck5Nl9fnVOmq@ep-rapid-sea-59338039-pooler.us-east-1.postgres.vercel-storage.com:5432/verceldb?pgbouncer=true&connect_timeout=15"
POSTGRES_URL_NON_POOLING="postgres://default:Ck5Nl9fnVOmq@ep-rapid-sea-59338039.us-east-1.postgres.vercel-storage.com:5432/verceldb"
POSTGRES_USER="default"
POSTGRES_HOST="ep-rapid-sea-59338039-pooler.us-east-1.postgres.vercel-storage.com"
POSTGRES_PASSWORD="Ck5Nl9fnVOmq"
POSTGRES_DATABASE="verceldb"
```

- 코드 편집기로 이동하여 .env.example 파일의 이름을 .env로 바꿉니다. Vercel에서 복사한 내용을 붙여넣습니다.
- 마지막으로 터미널에서 `npm i @vercel/postgres`를 실행하여 Vercel Postgres SDK를 설치하세요.

## Seed your database

- 이제 데이터베이스가 생성되었으므로 일부 초기 데이터를 사용하여 시드해 보겠습니다.

  - 이렇게 하면 대시보드를 구축할 때 작업할 일부 데이터를 확보할 수 있습니다.

- 프로젝트의 /scripts 폴더에 Seed.js라는 파일이 있습니다. 이 스크립트에는 송장, 고객, 사용자, 수익 테이블을 생성하고 시드하기 위한 지침이 포함되어 있습니다.

## Quiz

- Q. What is 'seeding' in the context of databases?
- A. Populating the database with an initial set of data

## Exploring your database

- Go back to Vercel, and click Data on the sidenav.
- 각 테이블을 선택하면 해당 레코드를 보고 항목이 placeholder-data.js 파일의 데이터와 일치하는지 확인할 수 있습니다.

## Executing queries

- You can switch to the "query" tab to interact with your database. This section supports standard SQL commands.

```sql
SELECT invoices.amount, customers.name
FROM invoices
JOIN customers ON invoices.customer_id = customers.id
WHERE invoices.amount = 666;
```

| Amount | Name        |
| ------ | ----------- |
| 666    | Evil Rabbit |
