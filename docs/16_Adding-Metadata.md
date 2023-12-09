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

## Adding metadata

- Next.js has a Metadata API that can be used to define your application metadata. There are two ways you can add metadata to your application:

  - Config-based
    - Export a static metadata object or a dynamic generateMetadata function in a `layout.js` or `page.js` file.
  - File-based
    - Next.js has a range of special files that are specifically used for metadata purposes:
      - `favicon.ico`, `apple-icon.jpg`, and `icon.jpg`: Utilized for favicons and icons
      - `opengraph-image.jpg` and `twitter-image.jpg`: Employed for social media images
      - `robots.txt`: Provides instructions for search engine crawling
      - `sitemap.xml`: Offers information about the website's structure

- You have the flexibility to use these files for static metadata, or you can generate them programmatically within your project.
- With both these options, Next.js will automatically generate the relevant `<head>` elements for your pages.

### Favicon and Open Graph image

- In your `/public` folder, you'll notice you have two images: `favicon.ico` and `opengraph-image.jpg`.
- Move these images to the root of your `/app` folder.
- After doing this, Next.js will automatically identify and use these files as your favicon and OG image. You can verify this by checking the `<head>` element of your application in dev tools.

#### Good to know:

- You can also create dynamic OG images using the [ImageResponse](https://nextjs.org/docs/app/api-reference/functions/image-response) constructor.

### Page title and descriptions

- In your root layout, update the metadata object to include a template:

```tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Acme Dashboard',
    default: 'Acme Dashboard',
  },
  description: 'The official Next.js Learn Dashboard built with App Router.',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};
```

### Practice: Adding metadata

- /login page.
- /dashboard page.
- /dashboard/customers page.
- /dashboard/invoices/create page.
- /dashboard/invoices/[id]/edit page.
