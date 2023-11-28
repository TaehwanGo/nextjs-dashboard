# 3. Optimizing fonts and images

## In this chapter

- How to add custom fonts with next/font
- how to add images with next/image
- How fonts and images are optimized in Next.js

## Why optimize fonts?

- 폰트가 적용되면서 레이아웃 시프트가 발생할 수 있다.
- Next.js는 next/font 모듈을 사용할 때 애플리케이션의 글꼴을 자동으로 최적화합니다.
- 빌드 시 글꼴 파일을 다운로드하고 다른 정적 자산과 함께 호스팅합니다. 이는 사용자가 애플리케이션을 방문할 때 성능에 영향을 미칠 수 있는 글꼴에 대한 추가 네트워크 요청이 없음을 의미합니다.

## Adding a primary font

```ts
// /app/ui/fonts/ts
import { Inter } from 'next/font/google';

export const inter = Inter({ subsets: ['latin'] });
```

## Practice: Adding a secondary font

## Why optimize images?

- Next.js는 최상위 /public 폴더 아래에 이미지와 같은 정적 자산을 제공할 수 있습니다. /public 내의 파일은 애플리케이션에서 참조될 수 있습니다.
- However, this means you have to manually:
  - Ensure your image is responsive on different screen sizes.
  - Specify image sizes for different devices.
  - Prevent layout shift as the images load.
  - Lazy load images that are outside the user's viewport.
- 이미지 최적화는 그 자체로 전문 분야로 간주될 수 있는 웹 개발의 큰 주제입니다. 이러한 최적화를 수동으로 구현하는 대신 next/image 구성 요소를 사용하여 이미지를 자동으로 최적화할 수 있습니다.

## The `<Image>` component

- The `<Image>` Component is an extension of the HTML `<img>` tag, and comes with automatic image optimization, such as:
  - Preventing layout shift automatically when images are loading.
  - Resizing images to avoid shipping large images to devices with a smaller viewport.
  - Lazy loading images by default (images load as they enter the viewport).
  - Serving images in modern formats, like WebP and AVIF, when the browser supports it.

## Adding the desktop hero image

- 레이아웃 변경을 방지하려면 이미지의 너비와 높이를 설정하는 것이 좋습니다.

## Practice: Adding the mobile hero image
