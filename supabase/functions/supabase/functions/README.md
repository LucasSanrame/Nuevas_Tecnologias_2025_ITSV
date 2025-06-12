# Supabase Edge Functions

This directory contains Supabase Edge Functions, which are serverless functions that run on Supabase's Edge Runtime.

## Function Structure

Each function should be placed in its own subdirectory with the following structure:

```
functions/
├── [function-name]/
│   ├── index.ts
│   └── deno.json
```

## Prerequisites

- Supabase CLI installed
- Supabase project configured
- Node.js (version 18 or higher)

## Development Setup

1. Install Supabase CLI globally:
```bash
npm install -g supabase
```

2. Initialize Supabase project:
```bash
cd /path/to/project
supabase init
```

3. Start Supabase local development:
```bash
supabase start
```

## Deploying Functions

To deploy a function:

1. Navigate to your function directory:
```bash
cd functions/[function-name]
```

2. Deploy the function:
```bash
supabase functions deploy [function-name]
```

The function will be available at:
```
https://[project-ref].supabase.co/functions/v1/[function-name]
```

## Testing Functions

### Local Testing

1. Start Supabase local development:
```bash
supabase start
```

### Testing with cURL

Once deployed, you can test the function using cURL:
```bash
curl -X POST \
  https://[project-ref].supabase.co/functions/v1/[function-name] \
  -H "Content-Type: application/json" \
  -d '{"your": "payload"}'
```

## Function Development Guidelines

1. Use TypeScript for function development
2. Each function should be in its own directory
3. Include proper error handling and logging
4. Use environment variables for configuration
5. Follow Supabase Edge Functions best practices

## Environment Variables

Functions can access environment variables through the `Deno.env` API. Add environment variables to your Supabase project through the Supabase dashboard or CLI.

## Error Handling

Proper error handling is crucial. Functions should:
1. Return appropriate HTTP status codes
2. Include descriptive error messages
3. Log errors for debugging
4. Handle timeouts gracefully

## Logging

Use `console.log()` for logging. Logs will be visible in:
- Supabase dashboard
- Supabase CLI when using `supabase start`
- Function invocation output

## Security Best Practices

1. Validate all input data
2. Use proper authentication
3. Implement rate limiting
4. Follow principle of least privilege
5. Keep sensitive data secure

## Debugging

1. Use `supabase start` for local development
2. Add `--debug` flag to function invocations
3. Check logs in Supabase dashboard
4. Use proper error messages and logging

## Secrets

Functions can access secrets through the `Deno.env` API. Add secrets to your Supabase project through the Supabase dashboard or CLI.

## Deployment

To deploy a function:

1. Navigate to your function directory:
```bash
cd functions/[function-name]
```

2. Deploy the function:
```bash
supabase functions deploy [function-name]
```

The function will be available at:
```
https://[project-ref].supabase.co/functions/v1/[function-name]
```

## Common Issues

1. **Deployment Errors**:
   - Check function code for syntax errors
   - Verify all dependencies are included
   - Ensure proper TypeScript compilation

2. **Permission Errors**:
   - Verify function has proper permissions
   - Check role policies in Supabase
   - Ensure proper authentication

3. **Timeout Issues**:
   - Optimize function performance
   - Implement proper error handling
   - Consider breaking down complex operations
