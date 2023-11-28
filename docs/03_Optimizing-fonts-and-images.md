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
