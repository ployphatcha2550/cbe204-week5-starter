1.	Application description
- This is a simple full-stack Task Manager application that allows users to add, view, edit, delete, and mark tasks as completed while the frontend communicates with the backend through a REST API.

2.	How to install
- Open the project in VS Code and run npm install in backend folder. 

3.	How to run
- Start the backend server, then open the frontend index.html in the browser.

4.	API endpoints
-   GET /api/tasks
    GET /api/tasks/:id
    POST /api/tasks
    PUT /api/tasks/:id
    DELETE /api/tasks/:id

5.	How to test with Postman
- Choose the HTTP method, enter the API URL, add a JSON body if needed, then click Send.

6.	Known limitations
- Task data is stored in memory, so it resets when the server restarts.

7.	AI tools used, if any
- ChatGPT was used to help explain the lab, fix errors, and support debugging.
