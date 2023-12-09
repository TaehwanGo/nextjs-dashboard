# 7. Fetching Data

- https://nextjs.org/learn/dashboard-app/fetching-data

## In this chapter

- Learn about some approches to fetching data: APIs, ORMs, SQL, etc.
- How Server Components can help you access back-end resources more securely.
- What network waterfalls are.
- How to implement parallel data fetching using a JavaScript Pattern.

## choosing how to fetch data

### API layer

- API는 애플리케이션 코드와 데이터베이스 사이의 중간 계층입니다.
- API를 사용할 수 있는 몇 가지 경우가 있습니다.
  - If you're using 3rd party services that provide an API.
  - 클라이언트에서 데이터를 가져오는 경우 데이터베이스 비밀이 클라이언트에 노출되는 것을 방지하기 위해 서버에서 실행되는 API 계층이 있어야 합니다.
- Next.js에서는 [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)를 사용하여 API 엔드포인트를 생성할 수 있습니다.

### Database queries

- SQL이나 Prisma와 같은 ORM을 사용하여 데이터베이스와 상호작용하는 작업을 수행할 수 있습니다.
- 데이터베이스 쿼리를 작성해야하는 몇 가지 경우
  - API 엔드포인트를 생성할 때 데이터베이스와 상호 작용하는 논리를 작성해야 합니다.
  - React Server 컴포넌트(서버에서 데이터 가져오기)를 사용하는 경우 API 계층을 건너뛰고 데이터베이스 비밀이 클라이언트에 노출될 위험 없이 데이터베이스를 직접 쿼리할 수 있습니다.
- 서버 컴포넌트를 사용하여 데이터를 가져오는 것은 비교적 새로운 접근 방식이며 이를 사용하면 몇 가지 이점이 있습니다.
  - 서버 컴포넌트는 Promise를 지원하여 데이터 가져오기와 같은 비동기 작업을 위한 더 간단한 솔루션을 제공합니다. useEffect, useState 또는 데이터 가져오기 라이브러리에 접근하지 않고도 async/await 구문을 사용할 수 있습니다.
  - 서버 컴포넌트는 서버에서 실행되므로 비용이 많이 드는 데이터 가져오기 및 논리를 서버에 보관하고 결과만 클라이언트로 보낼 수 있습니다.
  - 앞서 언급한 것처럼 Server Components는 서버에서 실행되기 때문에 별도의 API 계층 없이 데이터베이스에 직접 쿼리할 수 있습니다.

### Using SQL

### Practice: Fetch data for the `<Card>` components

## What are request waterfalls?

- "waterfalls"는 일련의 네트워크 요청을 나타냅니다.
- 하나 기다리고 다음 것을 기다리고 다음 것을 기다리는 것

## Parallel data fetching

- waterfalls를 방지하는 일반적인 방법은 모든 데이터 요청을 동시에 병렬로 시작하는 것입니다.
- JavaScript에서는 Promise.all() 또는 Promise.allSettled() 함수를 사용하여 모든 약속을 동시에 시작할 수 있습니다.
