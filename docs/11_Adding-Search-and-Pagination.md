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

- onChange에 대한 handler를 만들어서 input의 value를 업데이트 해준다.

## 2. Update the URL with the search params

- You can use Next.js's useRouter and usePathname hooks to update the URL.

```tsx
replace(${pathname}?${params.toString()})
```

- updates the URL with the user's search data. For example, /dashboard/invoices?query=lee if the user searches for "Lee".
- The URL is updated without reloading the page, thanks to Next.js's client-side navigation (which you learned about in the chapter on navigating between pages.

## 3. Keep the URL and input in sync

### defaultValue vs. value / Controlled vs. Uncontrolled

If you're using state to manage the value of an input, you'd use the value attribute to make it a controlled component. This means React would manage the input's state.

However, since you're not using state, you can use defaultValue. This means the native input will manage its own state. This is okay since you're saving the search query to the URL instead of state.

## 4. Updating the table

- 마지막으로 검색 쿼리를 반영하도록 테이블 구성 요소를 업데이트해야 합니다.

- Page components는 searchParams 이라 불리는 prop을 받는다

  - Page 컴포넌트가 받는 props -> https://nextjs.org/docs/app/api-reference/file-conventions/page
    - params: Object - The route parameters for the page, if any. For example, for the route /posts/[pid], we'd receive { pid: 'abc' } as params.
    - searchParams: Object - The query string parameters for the page, if any. For example, for the route /posts?foo=bar, we'd receive { foo: 'bar' } as searchParams.

- input값을 입력하면 onChange에서 replace를 통해 URL을 업데이트하고, Page 컴포넌트에서 searchParams를 받아서 데이터를 가져온다.

## Best practice: Debouncing

- 모든 입력에 대해 서버에 요청을 보내는 대신, 입력이 멈추면 서버에 요청을 보내는 것이 좋다.
- 공식문서에서는 'use-debounce' 라이브러리를 사용했지만 나는 lodash의 debounce를 사용했다.
