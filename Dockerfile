# Use the official lightweight Nginx Alpine image
FROM nginx:alpine

# Copy all static site files into the Nginx container's public folder
COPY . /usr/share/nginx/html

# Expose port 80 for web traffic
EXPOSE 80

# Run Nginx in the foreground to keep the container active
CMD ["nginx", "-g", "daemon off;"]
