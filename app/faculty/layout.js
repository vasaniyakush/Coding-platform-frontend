"use client";
import PageNav from "@/components/facultypageNav";
import { AuthProvider, ProtectRoute } from "@/contexts/faculty-auth";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Faculty Panel</title>
        {/* <link rel="icon" href="/images/AppIcon.png" type="image/x-icon" /> */}
      </head>
      <body>
        <AuthProvider>
          <PageNav>
            <ProtectRoute>{children}</ProtectRoute>
          </PageNav>
        </AuthProvider>
      </body>
    </html>
  );
}
