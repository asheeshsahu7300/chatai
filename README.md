<a href="https://chat.vercel.ai/">
  <img alt="Next.js 14 and App Router-ready AI chatbot." src="https://chat.vercel.ai/opengraph-image.png">
  <h1 align="center">Next.js & Stytch AI Chatbot</h1>
</a>

<p align="center">
  An open-source AI chatbot app template built with Next.js, the Vercel AI SDK, OpenAI, Vercel KV and Stytch.
</p>

<p align="center">
  For more information about the development of this project and the process involved, check out the <a href="https://www.keanankoppenhaver.com/done-for-you-authentication-with-stytch/">project writeup</a>.
</p>

## Features

- [Next.js](https://nextjs.org) App Router
- React Server Components (RSCs), Suspense, and Server Actions
- [Vercel AI SDK](https://sdk.vercel.ai/docs) for streaming chat UI
- Support for OpenAI (default), Anthropic, Cohere, Hugging Face, or custom AI chat models and/or LangChain
- [shadcn/ui](https://ui.shadcn.com)
  - Styling with [Tailwind CSS](https://tailwindcss.com)
  - [Radix UI](https://radix-ui.com) for headless component primitives
  - Icons from [Phosphor Icons](https://phosphoricons.com)
- Chat History, rate limiting, and session storage with [Vercel KV](https://vercel.com/storage/kv)
- [Stytch](https://stytch.com/) for authentication

## Try the Hosted Version

If you don't want to mess with configuring environment variables and setting up your own infrastructure, you can try the already-deployed and configured version currently live at: [https://stytch-ai-chatbot.vercel.app/](https://stytch-ai-chatbot.vercel.app/)

## Running locally

To run this project locally, start by cloning this repository onto your local machine.

```bash
git clone git@github.com:kkoppenhaver/stytch-ai-chatbot.git
```
You will need to use the environment variables [defined in `.env.example`](.env.example) to run Next.js AI Chatbot. To get things running locally, run `cp .env.example .env` to generate yourself an env file and then populate actual values for each of the variables defined there. 

### Getting an OpenAI API Key
At the moment, this app uses OpenAI models to provide the chat output requested by the user. This means you'll need an OpenAI API key to make these API calls. Create or log in to your OpenAI account and copy your API key down into your `.env` file.

### Setting up Stytch
To get Stytch up and running, sign up or log in to your Stytch account. Create a Stytch Consumer project via the Stytch Dashboard if you don't have one already. To do so, click on your existing project name in top left corner of the Dashboard, click Create a new project, and then select Consumer authentication.

Copy your `project_id`, `secret`, and `public_token` from the Test environment tab in the API keys section of the Stytch Dashboard. You'll need to include these values in your `.env` file.

Finally, navigate to the Frontend SDKs tab in the Stytch Dashboard and enable the authentication products that you're interested in adding to your application.

### Creating a KV Database Instance

Out of the box, this project uses Vercel KV for storage. Before you start, make sure you follow the steps outlined in the [quick start guide](https://vercel.com/docs/storage/vercel-kv/quickstart#create-a-kv-database) provided by Vercel. This guide will assist you in creating and configuring your KV database instance on Vercel, enabling your application to interact with it.

Remember to update your environment variables (`KV_URL`, `KV_REST_API_URL`, `KV_REST_API_TOKEN`, `KV_REST_API_READ_ONLY_TOKEN`) in the `.env` file with the appropriate credentials provided during the KV database setup.

### Gerenate env file, install dependencies and run!

When you have all the varialbles in the `.env` file populated, you can install the dependencies and run the local server.

```bash
pnpm install
pnpm dev
```

The chatbot should now be running on [localhost:3000](http://localhost:3000/).

## History

This codebase was forked from the [Vercel AI Chatbot demo](https://github.com/vercel/ai-chatbot) and the originally-included NextAuth.js authentication was swapped out to allow the application to leverage Stytch instead.

## Possible future improvements
  - **Additional models**: Since the original use of this project was intended to be a demonstration of different AI models, a future version will have a model selector to let users utilize different models for different types of chats.
  - **Add support for models with vision**: Allow users to upload images and have the selected model process them to include information about these images in chats.# chatai
