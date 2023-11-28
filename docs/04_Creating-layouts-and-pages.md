# 4. Creating layouts and pages

## In this chapter

- Create the dashboard routes using file-system routing
- Understand the role of folders and files when creating new route segments
- Create a nested layout that can be shared between multiple dashboard pages
- Understand what colocation, partial rendering, and the root layout are

## Colocation

- 페이지 파일에 특별한 이름(page.tsx, layout.tsx)을 가짐으로써 Next.js를 사용하면 UI 구성 요소를 같은 위치에 배치할 수 있습니다
  - UI 컴포넌트, 테스트 파일 등을 app 폴더에 배치할 수 있습니다
- 내 생각
  - 만약 이렇게 할 거라면 가상 경로를 만들어서 나누는 것이 좋을 것 같다
  - 그런데 가상경로로 나눌거면 그냥 기존 처럼 components 폴더에 넣는게 나을 것 같다

## Practice: Creating the dashboard pages

## Creating the dashboard layout

- 페이지 구성 요소만 업데이트되고 레이아웃은 다시 렌더링되지 않습니다. 이를 부분 렌더링이라고 합니다.

## Root layout

- 루트 레이아웃에 추가하는 모든 UI는 애플리케이션의 모든 페이지에서 공유됩니다.
- 루트 레이아웃을 사용하여 `<html>` 및 `<body>` 태그를 수정하고 메타데이터를 추가할 수 있습니다.
