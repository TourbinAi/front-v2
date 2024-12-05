import { CheckIcon, CrossIcon } from "lucide-react";

/**
 * Adornment component documentation.
 *
 * This module exports two adornment components: AdornmentSuccess and AdornmentError.
 * These components are used to display visual indicators of form input validation.
 *
 * @module Adornment
 */

/**
 * AdornmentSuccess component.
 *
 * Displays a check icon to indicate successful form input validation.
 *
 * @returns {JSX.Element} The AdornmentSuccess component.
 */

export const AdornmentSuccess = () => {
  return (
    <span>
      <CheckIcon height="1.5rem" width="1.5rem" />
    </span>
  );
};

export const AdornmentError = () => {
  return (
    <span>
      <CrossIcon height="1.5rem" width="1.5rem" />
    </span>
  );
};
