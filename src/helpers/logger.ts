/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * General purpose information logger, record somewhere for debugging
 */
const info = (message: string, data?: { [k: string]: any }) => {
  console.group();
  console.log(message);
  data && Object.entries(data).forEach(([ key, value ]) => {
    console.log(key, value);
  });
  console.groupEnd();
};

/**
 * Log an error to our error provider that will alert a dev to fix
 */
const error = (message: string, error?: Error, data?: { [k: string]: any }) => {
  console.group();
  console.log(message);
  console.error(error);
  data && Object.entries(data).forEach(([ key, value ]) => {
    console.log(key, value);
  });
  console.groupEnd();
};

export const logger = { info, error };
