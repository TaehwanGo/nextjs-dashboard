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

## Adding pagination

- 데이터베이스 비밀이 노출될 수 있으므로 클라이언트에서 데이터를 가져오고 싶지 않습니다(API 계층을 사용하지 않는다는 점을 기억하세요). 대신 서버에서 데이터를 가져와서 컴포넌트에 prop으로 전달할 수 있습니다.

```tsx
// /app/ui/invoices/pagination.tsx
'use client';

import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Link from 'next/link';
import { generatePagination } from '@/app/lib/utils';
import { usePathname, useSearchParams } from 'next/navigation';

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  // ...
}
```

- Here's a breakdown of what's happening:

  - `createPageURL` creates an instance of the current search parameters.
  - Then, it updates the "page" parameter to the provided page number.
  - Finally, it constructs the full URL using the pathname and updated search parameters.

- 마지막으로 사용자가 새 검색어를 입력하면 페이지 번호를 1로 재설정하려고 합니다. `<Search>` 컴포넌트에서 handlerSearch 함수를 업데이트하면 됩니다.

## Summary

- Congratulations! You've just implemented search and pagination using URL Params and Next.js APIs.
- To summarize, in this chapter:
  - You've handled search and pagination with URL search parameters instead of client state.
  - You've fetched data on the server.
  - You're using the useRouter router hook for smoother, client-side transitions.
- 이러한 패턴은 클라이언트 측 React로 작업할 때 익숙했던 패턴과 다르지만 이제 URL 검색 매개변수를 사용하고 이 상태를 서버로 가져오는 것의 이점을 더 잘 이해할 수 있기를 바랍니다.
