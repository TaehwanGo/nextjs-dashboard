# 13. Handling Errors

- In the previous chapter, you learned how to mutate data using Server Actions. Let's see how you can handle errors gracefully using JavaScript's `try/catch statements` and `Next.js APIs`.

## In this chapter

- How to use the special error.tsx file to catch errors in your route segments, and show a fallback UI to the user.
- How to use the notFound function and not-found file to handle 404 errors(for resources that don't exist).

## Adding try/catch to Server Actions

## Handling all errors with error.tsx

- error.tsx 파일은 경로 세그먼트에 대한 UI 경계를 정의하는 데 사용할 수 있습니다. 예상치 못한 오류에 대한 포괄적인 역할을 하며 사용자에게 대체(fallback) UI를 표시할 수 있습니다.

```tsx
'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="flex h-full flex-col items-center justify-center">
      <h2 className="text-center">Something went wrong!</h2>
      <button
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
        onClick={
          // Attempt to recover by trying to re-render the invoices route
          () => reset()
        }
      >
        Try again
      </button>
    </main>
  );
}
```

- There are a few things you'll notice about the code above:
  - "use client" - error.tsx needs to be a Client Component.
  - It accepts two props:
    - error: This object is an instance of JavaScript's native Error object.
    - reset: 오류 경계를 재설정하는 기능입니다. 실행되면 함수는 경로 세그먼트를 다시 렌더링하려고 시도합니다.
