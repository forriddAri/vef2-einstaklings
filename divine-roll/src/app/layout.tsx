export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <h1>🌟 Divine Roll Layout 🌟</h1> {/* This will appear on every page */}
        {children} {/* ✅ This is REQUIRED to render the page.tsx content */}
      </body>
    </html>
  );
}