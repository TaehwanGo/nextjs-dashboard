# 13. Handling Errors

- https://nextjs.org/learn/dashboard-app/error-handling

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

## Handling 404 errors with the notFound function

- 오류를 적절하게 처리할 수 있는 또 다른 방법은 notFound 함수를 사용하는 것입니다.
- error.tsx는 모든 오류를 잡는 데 유용하지만 존재하지 않는 리소스를 가져오려고 할 때 notFound를 사용할 수 있습니다.
- For example, visit http://localhost:3000/dashboard/invoices/2e94d1ed-d220-449f-9f11-f0bbceed9645/edit.
  - 가짜 id이기 때문에 error.tsx가 정의된 /invoices의 하위 경로이기 때문에 error.tsx가 시작되는 것을 즉시 확인할 수 있습니다.
- 그러나 좀 더 구체적으로 설명하고 싶다면 404 오류를 표시하여 사용자가 액세스하려는 리소스를 찾을 수 없음을 알릴 수 있습니다.
- **notFound는 error.tsx보다 우선하므로 더 구체적인 오류를 처리하고 싶을 때 이에 접근할 수 있습니다!**

## Further reading

To learn more about error handling in Next.js, check out the following documentation:

- [Error Handling](https://nextjs.org/docs/app/building-your-application/routing/error-handling)
- [error.js API Reference](https://nextjs.org/docs/app/api-reference/file-conventions/error)
- [notFound() API Reference](https://nextjs.org/docs/app/api-reference/functions/not-found)
- [not-found.js API Reference](https://nextjs.org/docs/app/api-reference/file-conventions/not-found)
