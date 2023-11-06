export const useJWT = () => {
  function decodePayload<T>(token: string) {
    const payload = token.split('.')[1];
    try {
      JSON.parse(window.atob(payload));
    } catch {
      return {} as Record<string, never>;
    }
    return JSON.parse(window.atob(payload)) as T;
  }

  return {
    decodePayload,
  };
};

export { useJWT as jwt };
