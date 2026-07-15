import { Navigate, useLocation } from "react-router-dom";

/**
 * ProtectedRoute
 * Wrap any route element that should only be accessible to signed-in users.
 * Replace the `isAuthenticated` check below with your real auth logic
 * (e.g. reading from a store or context) once the backend is wired up.
 *
 * Usage:
 *   <Route element={<ProtectedRoute />}>
 *     <Route path="/profile" element={<Profile />} />
 *   </Route>
 */
export default function ProtectedRoute({ children, isAuthenticated = true, redirectTo = "/login" }) {
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace state={{ from: location }} />;
  }

  return children ?? null;
}
