export default function HomePage() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-50">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg text-center">
                <h1 className="text-4xl font-bold mb-4">Welcome to Acme Financial Dashboard</h1>
                <p className="mb-6 text-gray-600">Track your revenue, manage invoices, and view customers all in one place.</p>
                <a href="/login" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold">Sign In</a>
            </div>
        </main>
    );
}
