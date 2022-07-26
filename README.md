# To Do
This web application is a simple application to manage a list of things to do.

## Infrastructure

This applications consists of two parts:
  1. Frontend: Single Page Application built with: React and Material.
  2. Backend: HTTP REST API built with Node.js, Express and MongoDB.

## How to run

to start the application use docker compose:

`docker-compose up --build`

once the app is running you can open:

http://localhost:3000

on your browser.

## Challenges
# Due dates
A user should be able to set a due date on a task. A user should be able to filter tasks due today.
# Supporting a large number of tasks
Only 20 tasks should be loaded at first. More tasks should be loaded as the user scrolls.
# Reordering tasks
A user should be able to drag and drop tasks to order them. For example if you have 3 tasks in
the list: 1, 2 and 3. The user should be able to drag and drop task 3 between 1 and 2 which
would result in the list: 1, 3 and 2.

## Refactoring and changes:
# Frontend :
1. Improve file structure.
2. Created separate folder for our components
3. Create utils.js file for managing our api calls so we can    use our api to make it easily accessible to any module/component.
4. Make separate styles.js file for our components style

# Backend:
1. Create controller.js for managing our api logics.
2. Create logs.js fire for our logging configuration.


# Security:
1. I have used the wiston module for implementing logging functionality.
2. I have tested XSS attack cases. We have avoided directly rendering html strings.
3. I have handled the exceptions on api calls and handled in the logger as well.
# Bug:
1. Completed field is not updating in the backend although the api is working fine.
`Their is change in backend where we are updating todos their was wrong collection name is used we have fixed with right one`

# Fixed Docker compose issue
1. we have created the bridge by adding -
    `networks:
      filestage-app:
        driver: bridge`
  this in `service`.

2. we have added this
      networks:
            - filestage-app
 in our `api` and `frontend`

3. we have added this
      networks:
            - filestage-app
 in our `api` and `frontend`

4. Auditing package dependencies for security vulnerabilities
  `npm audit`
  `npm audit fix`
