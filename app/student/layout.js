export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Student Panel</title>
        {/* <link rel="icon" href="/images/AppIcon.png" type="image/x-icon" /> */}
      </head>
      <body>{children}</body>
    </html>
  );
}
