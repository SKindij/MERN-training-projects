# Tech Notes




### User Stories

1. [ ] Replace current sticky note system
2. [x] Add a public facing page with basic info 
3. [ ] Add an employee login to the notes app 
4. [x] Provide a welcome page after login 
5. [ ] Provide easy navigation
6. [ ] Display current user and assigned role 
7. [ ] Provide a logout option 
8. [ ] Require users to login at least once per week
9. [ ] Provide a way to remove user access asap if needed 
10. [ ] Notes are assigned to specific users 
11. [ ] Notes have a ticket #, title, note body, created & updated dates
12. [ ] Notes are either OPEN or COMPLETED 
13. [ ] Users can be Employees, Managers, or Admins 
14. [ ] Notes can only be deleted by Managers or Admins 
15. [ ] Anyone can create a note (when customer checks-in)
16. [ ] Employees can only view and edit their assigned notes  
17. [ ] Managers and Admins can view, edit, and delete all notes 
18. [ ] Only Managers and Admins can access User Settings 
19. [ ] Only Managers and Admins can create new users 
20. [ ] Desktop mode is most important but should be available in mobile 

### 📚 The project structure (architecture):

```go
📁 TechNotes-App/
│
├─ server.js
├─ package.json
├─ .env
│
├─ 📁 models/
│   ├─ Note.js
│   └─ User.js
│
├─ 📁 views/
│   ├─ index.html
│   └─ 404.html
│
├─ 📁 controllers/
│   ├─ authController.js
│   ├─ notesController.js
│   └─ usersController.js
│
├─ 📁 config/
│   ├─ allowedOrigins.js
│   ├─ corsOptions.js
│   └─ dbConn.js
│
├─ 📁 middleware/
│   ├─ errorHandler.js
│   └─ logger.js
│
├─ 📁 routes/
│   ├─ noteRoutes.js
│   ├─ root.js
│   └─ userRoutes.js
│
└─ 📁 frontend/
    ├─ 📁 public/
    └─ 📁 src
        ├─ main.jsx
        ├─ index.css
        ├─ App.jsx
        │
        ├─ 📁 components/
        ├─ 📁 features/
        └─ 📁 app/

```


#### example ".env"

```go
  NODE_ENV=development
  DATABASE_URI='mongodb+srv://user:parolle@clustertodo.../techNotesDB?retryWrites=true&w=majority'
  ACCESS_TOKEN_SECRET=randombyte
  REFRESH_TOKEN_SECRET=randombyte
```

random byte generation using the crypto module
```javascript
  const crypto = require('crypto');
  const randomBytes = crypto.randomBytes(64).toString('hex');
  console.log(randomBytes);

```












