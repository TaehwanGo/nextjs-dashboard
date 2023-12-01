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

## Streaming a component

- So far, you're streaming a whole page. But, instead, you can be more granular and stream specific components using React Suspense.
- Suspense allows you to defer rendering parts of your application until some condition is met (e.g. data is loaded). You can wrap your dynamic components in Suspense.
  - 그런 다음 dynamic component가 로드되는 동안 표시할 대체(fallback) component를 전달합니다.
- 부모에서 데이터를 가져와서 자식에게 전달하는 방식에서 자식에서 직접 데이터를 호출하도록하고
  - 자식 컴포넌트가 데이터를 가져오는 동안 fallback UI를 표시합니다.

## Practice: Streaming `<LatestInvoices>`

## Grouping components

- 각 개별 카드에 대한 데이터를 가져올 수 있지만 이로 인해 카드가 로드될 때 팝업 효과가 발생할 수 있으며 이는 사용자에게 시각적으로 불편할 수 있습니다.
- 더 많은 시차 효과를 생성하려면 래퍼 구성 요소를 사용하여 카드를 그룹화할 수 있습니다. 즉, 정적 `<Sidebar/>`가 먼저 표시되고 그다음에 카드 등이 표시됩니다.

- (내 생각) 사실 각 개별 컴포넌트에서 데이터를 직접 조회하게 하고 Suspense를 감싸는 방식은 좋은지 잘 모르겠다
  - 데이터를 외부에서 동적으로 주입하는 방식이 더 좋을 것 같다.
  - Wrapper에서 데이터를 가져오고 각각의 컴포넌트에 넣어주는 방식이 좋은 것 같다. 대신 wrapper는 Suspense로 감싸야 한다

## Deciding where to place your Suspense boundaries

- Suspense 경계를 배치하는 위치는 다음 몇 가지 사항에 따라 달라집니다.

  - 페이지가 스트리밍될 때 사용자가 페이지를 경험하기를 원하는 방식입니다.
  - 어떤 콘텐츠에 우선순위를 두고 싶은지.
  - If the components rely on data fetching.

- Don't worry. There isn't a right answer.
  - You could stream the whole page like we did with loading.tsx... but that may lead to a longer loading time if one of the components has a slow data fetch.
  - You could stream every component individually... but that may lead to UI popping into the screen as it becomes ready.
  - You could also create a staggered effect by streaming page sections. But you'll need to create wrapper components.
- 일반적으로 데이터 가져오기를 필요한 구성 요소로 이동한 다음 Suspense에서 해당 구성 요소를 래핑하는 것이 좋습니다.

## Looking ahead

- 다음 장에서는 스트리밍을 염두에 두고 구축된 새로운 Next.js 렌더링 모델인 Partial Prerendering에 대해 알아봅니다.
