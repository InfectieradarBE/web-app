export const getErrorMsg = (err: any): string => {
  if (err.response) {
    if (err.response.data && err.response.data.error) {
      return err.response.data.error;
    }
  }
  return 'no error response';
}
