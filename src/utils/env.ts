import "dotenv/config";

export default function checkEnv(
  envField: string,
  defaultValue: string
): string {
  const envValue = process.env[envField];
  if (envValue) {
    console.log(`🟢 Found ${envField} in env with value`);
    return envValue;
  } else {
    console.log(`🔴 Not found ${envField} Using default`);
    return defaultValue;
  }
}
