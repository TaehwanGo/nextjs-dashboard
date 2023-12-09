# 5. Navigating Between Pages

- https://nextjs.org/learn/dashboard-app/navigating-between-pages

## In this chapter

- How to use the `next/link` component.
- How to show and active link with the usePathname() hook.
- How navigation works in Next.js.

## Why optimize navigation?

- a 태그를 사용하면 페이지 전체가 새로고침된다 매번 이동할 때 마다

## The `<Link>` component

- `<Link>`는 클라이언트 사이드 네비게이션을 제공합니다.

### Automatic code-splitting and prefetching

- Next.js는 페이지를 자동으로 코드 스플리팅하고 필요할 때 미리 가져옵니다.
  - Link 컴포넌트 위에 마우스를 올리면 미리 가져온다.

## Pattern: Showing active links

- 일반적인 UI 패턴은 사용자가 현재 어떤 페이지에 있는지 알려주는 활성 링크를 표시하는 것입니다.
  - 이렇게 하려면 URL에서 사용자의 현재 경로를 가져와야 합니다.
- Next.js는 경로를 확인하고 이 패턴을 구현하는 데 사용할 수 있는 usePathname()이라는 후크를 제공합니다.
- usePathname()은 후크이므로 해당 컴포넌트를 클라이언트 구성 요소로 전환해야 합니다.
