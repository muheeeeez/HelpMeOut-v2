// Configuration settings for the application
// In a production environment, these should be managed through environment variables

export const config = {
  // AssemblyAI API key for video transcription
  // Sign up at https://www.assemblyai.com/ to get your API key
  ASSEMBLY_API_KEY: import.meta.env.VITE_ASSEMBLY_API_KEY,
  
  // Application settings
  APP_NAME: 'HelpMeOut',
  
  // Feature flags
  FEATURES: {
    TRANSCRIPTION_ENABLED: true,
    URL_SHORTENING_ENABLED: true
  }
}

export default config; 