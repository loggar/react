const HeavyComponent = React.lazy(() => import("./HeavyComponent"));
const AnotherComponent = React.lazy(() => import("./AnotherComponent"));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <section>
          <HeavyComponent />
          <AnotherComponent />
        </section>
      </Suspense>
    </div>
  );
}
