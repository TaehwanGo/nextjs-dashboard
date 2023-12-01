# 9. Streaming

- https://nextjs.org/learn/dashboard-app/streaming

## In this chapter

- What streaming is and when you might use it.
- How to implement streaming with loading.tsx and Suspense.
- What loading skeletons are.
- What route groups are, and when you might use them.
- Where to place Suspense boundaries(경계) in your application.

## What is streaming?

- Streaming은 경로를 더 작은 "chunks"로 나누고 준비가 되면 서버에서 클라이언트로 점진적으로 스트리밍할 수 있는 데이터 전송 기술입니다.
- By streaming, you can prevent slow data requests from blocking your whole page.
- This allows the user to see and interact with parts of the page without waiting for all the data to load before any UI can be shown to the user.

- There are two ways you implement streaming in Next.js:
  - 1. At the page level, with the loading.tsx file.
  - 2. For specific components, with `<Suspense>`.

## Streaming a whole page with loading.tsx

- A few things are happening here:
  - 1. `loading.tsx` is a special Next.js file built on top of Suspense, it allows you to create fallback UI to show as a replacement while page content loads.
  - 2. Since `<Sidebar>` is static, so it's shown immediately. The user can interact with `<Sidebar>` while the dynamic content is loading.
  - 3. 사용자는 다른 페이지로 이동하기 전에 페이지 로드가 완료될 때까지 기다릴 필요가 없습니다(this is called interruptable navigation).

## Adding loading skeletons

## Fixing the loading skeleton bug with route groups

- Right now, your loading skeleton will apply to the invoices and customers pages as well.
- We can change this with [Route Groups](https://nextjs.org/docs/app/building-your-application/routing/route-groups). Create a new folder called `/(overview)` inside the dashboard folder. Then, move your `loading.tsx` and `page.tsx` files inside the folder.
- Route groups allow you to organize files into logical groups without affecting the URL path structure.
- When you create a new folder using parentheses (), the name won't be included in the URL path. So `/dashboard/(overview)/page.tsx` becomes `/dashboard`.
