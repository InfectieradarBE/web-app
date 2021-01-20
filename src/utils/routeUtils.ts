
export const getExternalOrLocalContentURL = (url: string): string => url.startsWith('http') ? url : `${process.env.REACT_APP_CONTENT_URL}/${url}`;