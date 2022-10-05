export const asyncVirtualRepositoryFunctionExecutor = async <T>(action): Promise<T> => {
  return await action();
};
