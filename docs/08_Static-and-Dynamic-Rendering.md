# 8. Static and Dynamic Rendering

## In this chapter

- What static rendering is and how it can improve your application's performance.
- What dynamic rendering is and when to use it.
- Different approaches to make your dashboard dynamic.
- Simulate a slow data fetch to see what happens.

## What is Static Rendering?

- `정적 렌더링`을 사용하면 빌드 시(배포 시) 또는 revalidation(https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#revalidating-data) 중에 데이터 fetching 및 렌더링이 서버에서 발생합니다.
- 그런 다음 결과는 CDN(Content Delivery Network)에 배포되고 `캐시될 수 있습니다`.
  - 사용자가 애플리케이션을 방문할 때마다 캐시된 결과가 제공됩니다.
- 정적 렌더링에는 몇 가지 이점이 있습니다.
  - Faster Websites : 사전 렌더링된 콘텐츠를 캐시하고 전역적으로 배포할 수 있습니다. 이를 통해 전 세계 사용자가 웹사이트 콘텐츠에 더욱 빠르고 안정적으로 액세스할 수 있습니다.
  - Reduced Server Load : 콘텐츠가 캐시되기 때문에 서버는 각 사용자 요청에 대해 콘텐츠를 동적으로 생성할 필요가 없습니다.
  - SEO : 사전 렌더링된 콘텐츠는 페이지가 로드될 때 이미 콘텐츠를 사용할 수 있으므로 검색 엔진 크롤러가 색인을 생성하기가 더 쉽습니다. 이를 통해 검색 엔진 순위가 향상될 수 있습니다.
- 정적 렌더링은 데이터가 없거나 사용자 간에 공유되는 데이터가 없는 UI에 유용합니다.
  - e.g. 정적 블로그 게시물이나 제품 페이지 등
- 정기적으로 업데이트되는 개인화된 데이터가 있는 대시보드에는 적합하지 않을 수 있습니다.

## What is Dynamic Rendering?

- 동적 렌더링을 사용하면 요청 시(사용자가 페이지를 방문할 때) 각 사용자의 콘텐츠가 서버에서 렌더링됩니다.
- 동적 렌더링에는 몇 가지 이점이 있습니다.
  - Real-Time Data : Dynamic rendering allows your application to display real-time or frequently updated data. This is ideal for applications where data changes often.
  - User-Specific Content : It's easier to serve personalized content, such as dashboards or user profiles, and update the data based on user interaction.
  - Request Time Information : Dynamic rendering allows you to access information that can only be known at request time, such as cookies or the URL search parameters.
