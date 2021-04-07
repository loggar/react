function App() {
  // ...

  return (
    <ErrorBoundary
      fallbackRender={({ error, resetErrorBoundary, componentStack }) => (
        <div>
          <h1>An error occurred: {error.message}</h1>
          <button onClick={resetErrorBoundary}>Try again</button>
        </div>
      )}
    >
      <ComponentThatMightThrowAnError />
    </ErrorBoundary>
  );
}
