const App = () => {
  return (
    <ErrorBoundary FallbackComponent={CharacterFallback}>
      <ComponentWhereErrorMightOccur />
    </ErrorBoundary>
  );
};

const ComponentWhereErrorMightOccur = () => {
  const handleError = useErrorHandler();
  const callAPI = () => {
    const result = fetch(apiURL)
      .then(
        (response) => response.json(),
        (error) => handleError(error)
      )
      .then((data) => {
        return data["results"];
      });
    return result;
  };
  useEffect(() => {
    (async function () {
      await callAPI();
    })();
  }, []);
  return <div></div>;
};
