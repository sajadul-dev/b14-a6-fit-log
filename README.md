<div align="center">

<img src="./public/logo.png" alt="FitLog Logo" width="70" />

# FITLOG — Workout Library

A dark, responsive workout library built for people who want to browse exercises,
build a simple workout plan, and save workouts for later. FitLog uses live workout
data from an API and keeps the personal plan and saved list available after refresh.

</div>

---

## Technologies Used

- **Next.js**
- **Next.js App Router**
- **TypeScript**
- **Tailwind CSS**
- **Sonner** — toast notifications
- **REST API** — workout data
- **localStorage** — Plan, Saved and Done data

---

## API Resources

### All Workouts
`https://api.abcz.workers.dev/api/fitlog`

Used to load all workout data for the Workout Library.

### Workout Details
`https://api.abcz.workers.dev/api/fitlog/:id`

Used to load the details of a single workout.

---

## Key Features

1. **Workout Library**  
   Browse workout cards loaded directly from the API.

2. **Workout Details**  
   View image, muscle groups, equipment, difficulty, sets, reps, duration,
   calories, rating, description, and instructions.

3. **Today's Plan**  
   Add workouts to today's plan with a maximum limit of five workouts.

4. **Saved Workouts**  
   Save workouts for later and keep them stored in the browser.

5. **Search, Sort & Actions**  
   Search by workout name or tag, sort by duration, calories or rating,
   mark workouts as done, and remove them when needed.

---

## Responsive Design

FitLog is designed to work properly on:

- **PC / Desktop**
- **Tablet**
- **Mobile**

The layout, workout cards, navigation, details page, My Plan page, and footer
adapt to different screen sizes. Mobile users also get a hamburger navigation menu.


---

<div align="center">

**FITLOG — Train hard, log honest.**

</div>