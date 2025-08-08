# Fix services imports
$files = Get-ChildItem -Path "src" -Recurse -Include "*.js", "*.jsx" | ForEach-Object { $_.FullName }

$filesFixed = 0

foreach ($file in $files) {
    try {
        $content = Get-Content -Path $file -Raw -Encoding UTF8
        $originalContent = $content
        
        # Fix services imports
        $content = $content -replace "from `'@/\.\./\.\./services/", "from '@/services/"
        $content = $content -replace "from `"@/\.\./\.\./services/", "from '@/services/"
        $content = $content -replace "from `'@/\.\./services/", "from '@/services/"
        $content = $content -replace "from `"@/\.\./services/", "from '@/services/"
        
        # Fix configs imports  
        $content = $content -replace "from `'@/\.\./\.\./configs", "from '@/configs'"
        $content = $content -replace "from `"@/\.\./\.\./configs", "from '@/configs'"
        $content = $content -replace "from `'@/\.\./configs", "from '@/configs'"
        $content = $content -replace "from `"@/\.\./configs", "from '@/configs'"
        
        if ($content -ne $originalContent) {
            Set-Content -Path $file -Value $content -Encoding UTF8
            $filesFixed++
            Write-Host "Fixed: $file"
        }
    }
    catch {
        Write-Warning "Error processing file $file : $_"
    }
}

Write-Host "Total files with services/configs import fixes: $filesFixed"
