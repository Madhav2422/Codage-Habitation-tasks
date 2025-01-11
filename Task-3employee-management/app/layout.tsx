import './globals.css';

export const metadata = {
  title: 'Employee Management App',
  description: 'Manage employees with add, edit, and delete functionalities',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
