# 11. Adding Search and Pagination

- `/dashboard/invoices`에서 search와 pagination에 대해 배워보자

## In this chapter

- Learn how to use the Next.js APIs: searchParams, usePathname, and useRouter.
- Implement search and pagination using URL search params.

## Starting code

- Your search functionality will span the client and the server. When a user searches for an invoice on the client, the URL params will be updated, data will be fetched on the server, and the table will re-render on the server with the new data.

## Why use URL search params?

- 위에서 언급한 대로 URL 검색 매개변수를 사용하여 검색 상태를 관리하게 됩니다. 클라이언트측 상태를 사용하여 수행하는 데 익숙하다면 이 패턴이 새로운 것일 수 있습니다.
- There are a couple of benefits of implementing search with URL params:
  - 1. 북마크 가능 및 공유 가능 URL: 검색 매개변수가 URL에 있으므로 사용자는 향후 참조 또는 공유를 위해 검색 쿼리 및 필터를 포함하여 애플리케이션의 현재 상태를 북마크할 수 있습니다.
  - 2. Server-Side Rendering 및 초기 로드: URL 매개변수를 서버에서 직접 사용하여 초기 상태를 렌더링할 수 있으므로 서버 렌더링을 더 쉽게 처리할 수 있습니다.
  - 3. 분석 및 추적: URL에 직접 검색어와 필터가 있으면 추가 클라이언트 측 논리 없이도 사용자 행동을 더 쉽게 추적할 수 있습니다.

## Adding the search functionality

- These are the Next.js client hooks that you'll use to implement the search functionality:

  - `useSearchParams` - Allows you to access the parameters of the current URL.
    - e.g. `/dashboard/invoices?page=1&query=pending` => `{page: '1', query: 'pending'}`
  - `usePathname` - Lets you read the current URL's pathname.
    - e.g. `/dashboard/invoices` => `/dashboard/invoices`
  - `useRouter` - Enables navigation between routes within client components programmatically.

- Overview of the implementation steps:
  - 1. Capture the user's input
  - 2. Update the URL with the search params.
  - 3. Keep the URL in sync with the input field.
  - 4. Update the table to reflect the search query.

## 1. Capture the user's input
