# Use the official Node.js image as the base image
FROM imbios/bun-node:latest as build

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and bun.lockb files to the working directory
COPY package.json bun.lockb ./

# Install the app dependencies
RUN bun install

# Copy the rest of the app files to the working directory
COPY . .

# Build the Remix app
RUN bun i -g @dotenvx/dotenvx
#RUN  bunx --bun vite build
# Copy our static assets from our build container


EXPOSE 80


FROM nginx:stable-alpine as production-stage

COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
