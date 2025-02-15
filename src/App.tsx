import React, { useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { Users, Plus, Mail, Lock } from 'lucide-react';
import { supabase } from './lib/supabase';
import { Employee, EmployeeFormData } from './types';
import EmployeeForm from './components/EmployeeForm';
import EmployeeList from './components/EmployeeList';

function App() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [session, setSession] = useState<any>(null);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) {
      fetchEmployees();
    }
  }, [session]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: loginData.email,
        password: loginData.password,
      });

      if (error) throw error;
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.signUp({
        email: loginData.email,
        password: loginData.password,
        options: {
          data: {
            full_name: loginData.email.split('@')[0],
          }
        }
      });

      if (error) throw error;
      toast.success('Account created successfully! You can now sign in.');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchEmployees = async () => {
    const { data, error } = await supabase
      .from('employees')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Error fetching employees');
      return;
    }

    setEmployees(data || []);
  };

  const handleSubmit = async (data: EmployeeFormData) => {
    if (!session?.user?.id) return;

    try {
      if (editingEmployee) {
        const { error } = await supabase
          .from('employees')
          .update(data)
          .eq('id', editingEmployee.id);

        if (error) throw error;
        toast.success('Employee updated successfully');
      } else {
        const { error } = await supabase
          .from('employees')
          .insert([{ ...data, user_id: session.user.id }]);

        if (error) throw error;
        toast.success('Employee added successfully');
      }

      setShowForm(false);
      setEditingEmployee(null);
      fetchEmployees();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('employees')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Employee deleted successfully');
      fetchEmployees();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleEdit = (employee: Employee) => {
    setEditingEmployee(employee);
    setShowForm(true);
  };

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <div className="flex items-center justify-center mb-8">
            <Users className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold mb-6 text-center">Employee Tracker</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  required
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="you@example.com"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  required
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="••••••••"
                  minLength={6}
                />
              </div>
            </div>
            <div className="flex flex-col space-y-3">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>
              <button
                type="button"
                onClick={handleSignUp}
                disabled={isLoading}
                className="w-full bg-gray-50 text-gray-900 px-4 py-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
              >
                {isLoading ? 'Creating account...' : 'Create Account'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster position="top-right" />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600 mr-2" />
              <h1 className="text-2xl font-bold text-gray-900">Employee Tracker</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                  setEditingEmployee(null);
                  setShowForm(!showForm);
                }}
                className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Employee
              </button>
              <button
                onClick={() => supabase.auth.signOut()}
                className="text-gray-600 hover:text-gray-900"
              >
                Sign Out
              </button>
            </div>
          </div>

          {showForm && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-lg font-medium mb-4">
                {editingEmployee ? 'Edit Employee' : 'Add New Employee'}
              </h2>
              <EmployeeForm
                onSubmit={handleSubmit}
                initialData={editingEmployee || undefined}
              />
            </div>
          )}

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <EmployeeList
              employees={employees}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;