# 16. Adding Metadata

- Metadata is crucial for SEO and shareability.

## In this chapter

- What metadata is.
- Types of metadata.
- How to add an Open Graph image using metadata.
- How to add a favicon using metadata.

## What is metadata?

- In web development, metadata provides additional details about a webpage.
- 주로 `<head>` 태그 안에 위치한다.

## Why is metadata important?

- Metadata plays a significant role in enhancing a webpage's SEO, making it more accessible and understandable for search engines and social media platforms.
- Additionally, metadata like Open Graph improves the appearance of shared links on social media, making the content more appealing and informative for users.

## Types of metadata

#### Title

- Title Metadata: Responsible for the title of a webpage that is displayed on the browser tab. It's crucial for SEO as it helps search engines understand what the webpage is about.

```html
<title>Page Title</title>
```

#### Description

- Description Metadata: This metadata provides a brief overview of the webpage content and is often displayed in search engine results.

```html
<meta name="description" content="A brief description of the page content." />
```

#### Keywords

- Keyword Metadata: This metadata includes the keywords related to the webpage content, helping search engines index the page.

```html
<meta name="keywords" content="keyword1, keyword2, keyword3" />
```

#### Open Graph

- Open Graph Metadata: This metadata enhances the way a webpage is represented when shared on social media platforms, providing information such as the title, description, and preview image.
  - 이 메타데이터는 제목, 설명, 미리보기 이미지 등의 정보를 제공하여 소셜 미디어 플랫폼에서 공유할 때 웹페이지가 표시되는 방식을 향상시킵니다.

```html
<meta property="og:title" content="Title Here" />
<meta property="og:description" content="Description Here" />
<meta property="og:image" content="image_url_here" />
```

#### Favicon

- Favicon Metadata: This metadata links the favicon (a small icon) to the webpage, displayed in the browser's address bar or tab.
  - 이 메타데이터는 파비콘(작은 아이콘)을 브라우저의 주소 표시줄이나 탭에 표시되는 웹페이지에 연결합니다.

```html
<link rel="icon" href="path/to/favicon.ico" />
```
