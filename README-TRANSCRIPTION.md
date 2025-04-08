# Video Transcription Setup Guide

This guide explains how to set up video transcription in the HelpMeOut application using AssemblyAI.

## Overview

HelpMeOut uses the AssemblyAI API to provide automatic transcription of your screen recordings. This feature allows you to:

- Convert speech in your videos to text
- Support multiple languages
- Save transcripts for future reference
- Share transcribed content along with your videos

## Setup Instructions

### 1. Get an AssemblyAI API Key

1. Go to [AssemblyAI's website](https://www.assemblyai.com/) and sign up for a free account
2. After registration, navigate to your dashboard
3. Copy your API key (you get $5 free credit, which is about 3 hours of transcription)

### 2. Configure the Application

1. Open the `src/config.js` file in your project
2. Replace the placeholder API key with your actual AssemblyAI API key:

```javascript
export const config = {
  // Replace this with your actual API key
  ASSEMBLY_API_KEY: 'your-api-key-here',
  // other settings...
}
```

### 3. Using Transcription

Once configured, you can use the transcription feature by:

1. Viewing any video in the details page
2. Clicking on the "Generate Transcript" button
3. Waiting for the transcription to complete (this may take a few minutes depending on video length)
4. The transcript will be saved automatically with the video for future viewing

### Language Support

AssemblyAI supports multiple languages including:
- English (en)
- Spanish (es)
- French (fr)
- German (de)
- Italian (it)
- Portuguese (pt)
- And more

You can select the language before generating the transcript.

### Troubleshooting

If you encounter issues with transcription:

1. Ensure your API key is correctly entered in the config file
2. Check that your video has clear audio for transcription
3. Verify that your video URL is accessible to the AssemblyAI service
4. Try a shorter video first to test the functionality

### Limitations

- The free tier of AssemblyAI includes approximately 3 hours of transcription
- Processing time depends on the length of your video
- Video must have clear audio for accurate transcription
- The API requires internet connectivity

## Privacy Considerations

Your video URLs are sent to AssemblyAI for processing. Please review AssemblyAI's privacy policy to understand how they handle your data. 