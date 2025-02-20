import AdminProtectedRoute from "../../components/AdminProtectedRoute";
import AdminDashboard from "./AdminDashboard"; 

export default function AdministrationPage() {
  return (
    <AdminProtectedRoute>
      <AdminDashboard />
    </AdminProtectedRoute>
  );
}
