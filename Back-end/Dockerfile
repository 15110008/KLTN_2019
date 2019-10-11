# using node:10 run time as a parent image!
FROM node:10

# Go out and stand at home directory
WORKDIR  ./monitoring-project-source/

# Copy all content in directory to container => Container now is a Home Directory
COPY ./ ./

#
RUN npm install --s

# Define env if want in docker
# ENV NODE_ENV=production
ENV MONITORING_PROJECTS_DATABASE_URL=mongodb://admin:admin123@ds245170.mlab.com:45170/monitoring_projects_db
CMD npm run start:dev
# Make port out of container, we can call to container from outside.
EXPOSE 3000