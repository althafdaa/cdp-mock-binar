<br />
<div align="center">
  <h3 align="center">Althaf Demiandra - Frontend Mock Test </h3>
  <img src="https://global-uploads.webflow.com/5e70b9a791ceb781b605048c/62c5720d8b3b6003c2f46fa4_logo-binar-academy.svg" alt="logo" height="100">
  <p align="center">
   Career Development Program Test

  </p>
</div>

# How to Test and Run in Your Local

Clone the repository
Open up terminal with the repository local directory

```
npm install
```

```
npm run dev
```

# About The Project

[https://cdp-mock-binar.vercel.app/](https://cdp-mock-binar.vercel.app/)

This is a mock test for the completion of Binar Academy Career Development Program. Assignee was asked to mimick certain feature and design while consuming REST API provided.The project itself is bootsrapped with [Create T3 App](https://github.com/t3-oss/create-t3-app)

```
npx install create-t3-app
```

## Builth With

### The Base

Bootstrapped with create-t3-app

- [Typescript](https://www.typescriptlang.org/)
- [NextJs](https://nextjs.org/)

### The CSS Component

- [Chakra UI](https://chakra-ui.com/)

### The State Management and Consuming API

- [Axios](https://axios-http.com/docs/intro)
- [React Query](https://github.com/tanstack/query)
- [Formik](https://formik.org/)

### The Supporter

- [Yup](https://github.com/jquense/yup) - my go to object schema validation
- [nookies](https://github.com/maticzav/nookies) - the best library that helped NextJs handle cookies and token

## Feature

- CRUD to Products
- Login/Register Page
- Protected Routes with token handled on the server
- SSR Data Fetching with Hydration/Dehydration

## How To Bootstrap This Project

```
npx install create-t3-app
```

- Pick Typescript for Languages
- Unchecked everything (prisma, tailwind, nextauth)
- Install all the remaining depedencies

```
npm install @chakra-ui/react @emotion/react @emotion/styled framer-motion axios formik react-query yup nookies
```

## What I Learned

Most of the tech used in this project is new to me, this is probably my first ever finished Typescript project. The only thing that i already get used is `axios`. Also this is my first time using `react-query` my first impression was great! I am used with using [useSWR](https://swr.vercel.app/) and the caching and how it provide me with loading error state is really great out of the box is really great! With this i rarely use useState in this project because everything just synced.

## Assignment Question

4. Dari dokumen https://testbinar.docs.apiary.io/, menurut anda, apakah ada desain yang
   kurang maupun keliru? Jika ada tuliskan kekurangan-kekurangan desain tersebut.

- The status response really bad. all the response returned 200 and i can't catch an error wit trycatch block and need to catch it manually inside try block which is kinda tedious and not best practice
- And how the `/v1/products` sorted is kinda weird, it is not sorted by Date by default and i don't think there's query parameter to set that up
- There's an error in .put and .delete method in `/v1/products/${id}`, but i believe the code is fine
