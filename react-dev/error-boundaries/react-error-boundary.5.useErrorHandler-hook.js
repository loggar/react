function App() {
  // ...

  return (
    <ErrorBoundary
      onError={(error, componentStack) => {
        logToErrorLoggingService(error, componentStack);
      }}

      // ...
    >
      <ComponentThatMightThrowAnError />
    </ErrorBoundary>
  );
}
