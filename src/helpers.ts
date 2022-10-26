type MaybeHasValue = any | null;

export const execute = (
  callback: () => any
): [MaybeHasValue, MaybeHasValue] => {
  try {
    const res = callback();
    return [res, null];
  } catch (err) {
    // Maybe log the error somewhere else it's a good idea, for example:
    // logErrorToMyService(error, errorInfo);

    // For now, console.error can fit our needs
    console.error(new Error(err.message ?? err));
    return [null, err];
  }
};

export const executeAsync = async (callback: () => Promise<any>) => {
  try {
    const res = await callback();
    return [res, null];
  } catch (err) {
    // Maybe log the error somewhere else it's a good idea, for example:
    // logErrorToMyService(error, errorInfo);

    // For now, console.error can fit our needs
    console.error(new Error(err.message ?? err));
    return [null, err];
  }
};
