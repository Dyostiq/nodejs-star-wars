FROM public.ecr.aws/lambda/nodejs:14 As development

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM public.ecr.aws/lambda/nodejs:14 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY --from=development /app/dist ./dist

CMD ["/app/dist/lambda.handler"]