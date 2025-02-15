# EmployeeTracker

Employee Tracker is a web application for managing employee information. It allows users to add, edit, and delete employee records. The application is built with React, TypeScript, and Supabase, and uses Tailwind CSS for styling.

## Features

- User authentication with Supabase
- Add, edit, and delete employee records
- Responsive design with Tailwind CSS
- Real-time updates with Supabase

## Project Structure

```
.bolt/
	config.json
	prompt
.env
.gitignore
.qodo/
eslint.config.js
index.html
package.json
postcss.config.js
src/
	App.tsx
	components/
		EmployeeForm.tsx
		EmployeeList.tsx
	index.css
	lib/
		supabase.ts
	main.tsx
	types/
		index.ts
	vite-env.d.ts
supabase/
	migrations/
		20250213105406_humble_coral.sql
tailwind.config.js
tsconfig.app.json
tsconfig.json
tsconfig.node.json
vite.config.ts
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:

```sh
git clone https://github.com/your-username/employee-tracker.git
cd employee-tracker
```

2. Install dependencies:

```sh
npm install
```

3. Set up environment variables:

Create a .env file in the root directory and add your Supabase credentials:

```
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_SUPABASE_URL=your-supabase-url
```

4. Run the development server:

```sh
npm run dev
```

The application will be available at `http://localhost:3000`.

## Usage

1. Sign up or sign in using your email and password.
2. Add new employees by clicking the "Add Employee" button.
3. Edit or delete existing employees using the action buttons in the employee list.

## Configuration

### Tailwind CSS

Tailwind CSS is configured in the tailwind.config.js file. You can customize the theme and add plugins as needed.

### ESLint

ESLint is configured in the eslint.config.js file. It includes recommended rules for JavaScript and TypeScript, as well as React hooks and React Refresh plugins.

### Vite

Vite is used as the build tool and development server. The configuration is in the vite.config.ts file.

## Database

The database schema and policies are defined in the 20250213105406_humble_coral.sql file. It includes the `employees` table and row-level security policies.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgements

- [React](https://reactjs.org/)
- [Supabase](https://supabase.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/)
- [Vite](https://vitejs.dev/)


