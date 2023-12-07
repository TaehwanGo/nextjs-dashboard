# 14. Improving Accessibility

- We still need to discuss another piece of the puzzle: form validation.
- Let's see how to implement server-side validation with Server Actions, and how you can show form errors using the useFormState hook - while keeping accessibility in mind!

## In this chapter

- How to use `eslint-plugin-jsx-a11y` with Next.js to implement accessibility best practices.
- How to implement server-side form validation.
- How to use the React `useFormState` hook to handle form errors, and display them to the user.

## What is accessibility?

- Accessibility refers to designing and implementing web applications that everyone can use, including those with disabilities.
- It's a vast(광범위한) topic that covers many areas, such as keyboard navigation, semantic HTML, images, colors, videos, etc.
- While we won't go in-depth into accessibility in this course, we'll discuss the accessibility features available in Next.js and some common practices to make your applications more accessible.
  - 깊게 다루진 않지만 Next.js에서 제공하는 접근성 기능과 애플리케이션을 더 접근성 있게 만드는 일반적인 방법에 대해 알아보겠습니다.
  - 웹 접근성에 대해 자세히 알아보려면 아래 링크들을 참고하세요
    - https://web.dev/learn/accessibility/
    - https://web.dev/?hl=ko
    - [Web Content Accessibility Guidelines (WCAG) 2.1](https://www.w3.org/TR/WCAG21/)

## Using the ESLint accessibility plugin in Next.js

- 기본적으로 Next.js에는 접근성 문제를 조기에 파악하는 데 도움이 되는 `eslint-plugin-jsx-a11y` 플러그인이 포함되어 있습니다. 예를 들어 이 플러그인은 대체 텍스트가 없는 이미지가 있는 경우, `aria-*` 및 역할 속성을 잘못 사용하는 경우 등을 경고합니다.

## Improving form accessibility

- 양식의 접근성을 개선하기 위해 아래 세 가지 작업을 수행하고 있습니다.

#### 1. Semantic HTML

- Using semantic elements (`<input>`, `<option>`, etc) instead of `<div>`.
- This allows assistive technologies (AT) to focus on the input elements and provide appropriate contextual information to the user, making the form easier to navigate and understand.

#### 2. Labelling

- Including `<label>` and the htmlFor attribute ensures that each form field has a descriptive text label. This improves AT support by providing context and also enhances usability by allowing users to click on the label to focus on the corresponding input field.

#### 3. Focus Outline

- The fields are properly styled to show an outline when they are in focus.
- This is critical for accessibility as it visually indicates the active element on the page, helping both keyboard and screen reader users to understand where they are on the form. You can verify this by pressing tab.

## Form validation

### Client-side validation

- input tag에 required 속성을 추가하면 브라우저가 자동으로 필수 입력 필드를 검증합니다.

### Server-side validation

- By validating forms on the server, you can:

  - Ensure your data is in the expected format before sending it to your database.
  - Reduce the risk of malicious users bypassing client-side validation.
  - Have one source of truth for what is considered valid data.

- useFormState hook:

  - Takes two arguments: (action, initialState).
  - Returns two values: [state, dispatch] - the form state, and a dispatch function (similar to useReducer)

- Pass your createInvoice action as an argument of useFormState, and inside your `<form action={}>` attribute, call dispatch.

#### Zod safeParse

- safeParse() will return an object containing either a success or error field. This will help handle validation more gracefully without having put this logic inside the try/catch block.

#### labels

- `aria-describedby="customer-error"`: This establishes a relationship between the select element and the error message container. It indicates that the container with `id="customer-error"` describes the select element. Screen readers will read this description when the user interacts with the select box to notify them of errors.

- `id="customer-error"`: This id attribute uniquely identifies the HTML element that holds the error message for the select input. This is necessary for aria-describedby to establish the relationship.

- `aria-live="polite"`: The screen reader should politely notify the user when the error inside the div is updated. When the content changes (e.g. when a user corrects an error), the screen reader will announce these changes, but only when the user is idle so as not to interrupt them.

## Practice: Adding aria labels
