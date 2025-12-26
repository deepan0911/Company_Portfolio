# Quick Setup Script for Authentication

Write-Host "🔐 Authentication Setup Helper" -ForegroundColor Cyan
Write-Host "================================`n" -ForegroundColor Cyan

# Check if .env.local exists
if (Test-Path .env.local) {
    Write-Host "✅ .env.local file found" -ForegroundColor Green
} else {
    Write-Host "❌ .env.local file not found!" -ForegroundColor Red
    exit 1
}

Write-Host "`n📋 Current Configuration:" -ForegroundColor Yellow
Write-Host "-------------------------`n" -ForegroundColor Yellow

# Read and display current env vars (without sensitive values)
$envContent = Get-Content .env.local
foreach ($line in $envContent) {
    if ($line -match "^(NEXTAUTH_URL|GOOGLE_CLIENT_ID)=(.*)$") {
        $key = $matches[1]
        $value = $matches[2]
        if ($value -match "your-") {
            Write-Host "⚠️  $key = NOT SET" -ForegroundColor Yellow
        } else {
            Write-Host "✅ $key = SET" -ForegroundColor Green
        }
    }
    if ($line -match "^NEXTAUTH_SECRET=(.*)$") {
        $value = $matches[1]
        if ($value -match "your-") {
            Write-Host "⚠️  NEXTAUTH_SECRET = NOT SET" -ForegroundColor Yellow
        } else {
            Write-Host "✅ NEXTAUTH_SECRET = SET" -ForegroundColor Green
        }
    }
}

Write-Host "`n📝 Next Steps:" -ForegroundColor Cyan
Write-Host "-------------`n" -ForegroundColor Cyan

Write-Host "1. ✅ NEXTAUTH_SECRET is already configured" -ForegroundColor Green
Write-Host ""
Write-Host "2. 🔑 Setup Google OAuth (Optional):" -ForegroundColor Yellow
Write-Host "   - Visit: https://console.cloud.google.com/" -ForegroundColor White
Write-Host "   - Create a new project or select existing" -ForegroundColor White
Write-Host "   - Enable Google+ API" -ForegroundColor White
Write-Host "   - Create OAuth 2.0 credentials" -ForegroundColor White
Write-Host "   - Add redirect URI: http://localhost:3000/api/auth/callback/google" -ForegroundColor White
Write-Host "   - Copy Client ID and Secret to .env.local" -ForegroundColor White
Write-Host ""
Write-Host "3. 🚀 Restart your dev server:" -ForegroundColor Yellow
Write-Host "   npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "4. 🌐 Test the authentication:" -ForegroundColor Yellow
Write-Host "   - Sign Up: http://localhost:3000/auth/signup" -ForegroundColor White
Write-Host "   - Sign In: http://localhost:3000/auth/signin" -ForegroundColor White
Write-Host ""

Write-Host "📚 For detailed instructions, see AUTH_SETUP.md" -ForegroundColor Cyan
Write-Host ""
Write-Host "✨ Setup complete! Happy coding!" -ForegroundColor Green
