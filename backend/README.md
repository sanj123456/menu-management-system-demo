# NestJS Project Setup Guide

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

---

## Project Setup

### Step 1: Clone the Repository

```bash
git clone <your-repo-url>
cd <your-project-folder>
cd backend
```

### Step 2: Create the `.env` File

Create a `.env` file in the root of your project folder and add the following:

```env
DATABASE_URL="postgresql://postgres:root@localhost:5432/menu_management"
```

### Step 3: Install Dependencies

```bash
npm install
```

### Step 4: Generate Prisma Client

```bash
npx prisma generate
```

### Step 5: Apply Database Migrations

```bash
npx prisma migrate deploy
```

### Step 6: Build the Project

```bash
npm run build
```

---

## Running the Project

### Development Mode

```bash
npm run start
```

### Watch Mode (Hot Reload)

```bash
npm run start:dev
```

### Production Mode

```bash
npm run start:prod
```

---

## Testing

### Run Unit Tests

```bash
npm run test
```

### Run End-to-End Tests

```bash
npm run test:e2e
```

### Generate Test Coverage Report

```bash
npm run test:cov
```

---

## Deployment

When you're ready to deploy your NestJS application to production, follow the steps in the [NestJS Deployment Documentation](https://docs.nestjs.com/deployment).

If you're deploying to AWS, consider using [Mau](https://mau.nestjs.com):

```bash
npm install -g mau
mau deploy
```

---

## Resources

- [NestJS Documentation](https://docs.nestjs.com)  
- [Discord Channel](https://discord.gg/G7Qnnhy)  
- [Video Courses](https://courses.nestjs.com)  
- [NestJS Mau for AWS Deployment](https://mau.nestjs.com)  
- [NestJS Devtools](https://devtools.nestjs.com)  
- [Enterprise Support](https://enterprise.nestjs.com)  
- [Jobs Board](https://jobs.nestjs.com)

---

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
