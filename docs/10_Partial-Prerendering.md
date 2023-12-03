# 10. Partial Prerendering (Optional)

- Partial Prerendering is an experimental feature introduced in Next.js 14.
- The content of this page may be updated as the feature progresses in stability.

## In this chapter

- What Partial Prerendering is.
- How Partial Prerendering works.

## Combining Static and Dynamic Content

- 이 앱의 대시보드 페이지는 정적 콘텐츠와 동적 콘텐츠를 모두 포함하고 있습니다.
- 정적 콘텐츠 : `<SlideVan />` 컴포넌트
- 동적 콘텐츠 : 그 외 나머지 대시보드 내 데이터를 통해 그려지는 모든 컴포넌트들

## What is Partial Prerendering?

- Next.js 14에서 도입된 실험적인 기능입니다.
- When a user visits a route:
  - A static route shell is served, this makes the initial load fast.
  - The shell leaves holes where dynamic content will load in async.
  - The async holes are loaded in parallel, reducing the overall load time of the page.
- 이는 전체 경로가 완전히 정적이거나 동적인 오늘날 애플리케이션의 작동 방식과 다릅니다.

## How does Partial Prerendering work?

- Partial Prerendering은 React의 Concurrent API를 활용하고 Suspense를 사용하여 일부 조건이 충족될 때까지(예: 데이터 로드) 애플리케이션의 렌더링 부분을 연기합니다.
- fallback은 다른 정적 콘텐츠와 함께 초기 정적 파일에 포함됩니다.
  - 빌드 시(또는 유효성 재검사 중에) 경로의 정적 부분이 사전 렌더링되고 나머지 부분은 사용자가 경로를 요청할 때까지 연기됩니다.
- Suspense는 정적부분과 동적부분 사이의 경계로 사용된다
  - 동적으로 만들기 위해 서버컴포넌트에서 데이터를 가져오는 곳에 unstable_noStore를 사용했었다
- 부분 사전 렌더링(Partial Prerendering)의 가장 큰 장점은 이를 사용하기 위해 코드를 변경할 필요가 없다는 것입니다. Suspense를 사용하여 경로의 동적 부분을 래핑하는 한 Next.js는 경로의 어느 부분이 정적이고 어느 부분이 동적인지 알 수 있습니다.
