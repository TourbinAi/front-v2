declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'plugin::users-permissions.user': {
        resetPasswordToken: string;
        // ... other existing fields
      }
    }
  }
} 