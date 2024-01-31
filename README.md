<h1 align="center">
TinyBits
</h1>

<p align="center">
A URL shortener powered by Golang and Remix for efficient link management
</p>

<p align="center">
  <a href="https://github.com/jatindotdev/tinybits/graphs/contributors">
    <img src="https://img.shields.io/github/contributors/jatindotdev/tinybits" alt="GitHub contributors" />
  </a>
  <a href="https://github.com/jatindotdev/tinybits/issues">
    <img src="https://img.shields.io/github/issues/jatindotdev/tinybits" alt="GitHub issues" />
  </a>
  <a href="https://github.com/jatindotdev/tinybits/pulls">
    <img src="https://img.shields.io/github/issues-pr/jatindotdev/tinybits" alt="GitHub pull request" />
  </a>
</p>

> [!IMPORTANT]
> WIP! I am building it bit by bit and It's not ready yet

## Structure

`TinyBits` consists of two parts:

[`api`](/api) - A Golang server that handles the URL shortening and redirection
<br>
[`client`](/client) - A Remix app that provides a UI for managing the shortened URLs

## Getting Started

### Prerequisites

- [Go](https://golang.org/doc/install)
- [Node.js](https://nodejs.org/en/download/)
- [Pnpm](https://pnpm.io/installation)

### How to run

> Do setup the `.env` file in the root directory before running the app
> check [`.env.example`](.env.example) for reference

### Backend

```bash
# For live development with auto reload
go install github.com/cosmtrek/air@latest

# Start the server with air
air
```

```bash
# Start the server manually
go run .
```

### Frontend

```bash
# Change directory
cd client
```

```bash
# Install dependencies
pnpm install
```

```bash
# Start the app
pnpm dev
```
