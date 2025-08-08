# Fix all remaining string syntax errors

$sourceRoot = "src"

Write-Host "Searching for files with string syntax errors..."

$allFiles = Get-ChildItem -Path $sourceRoot -Include "*.js", "*.jsx" -Recurse
$totalFixed = 0

foreach ($file in $allFiles) {
    $content = Get-Content $file.FullName -Raw
    $originalContent = $content
    
    # Fix various string syntax errors
    $content = $content -replace "from '@/([^']*)'\"", "from '@/`$1'"
    $content = $content -replace "from '@/([^']*)\";", "from '@/`$1';"
    $content = $content -replace "from '@/([^']*)"([^;])", "from '@/`$1'`$2"
    
    if ($content -ne $originalContent) {
        Set-Content $file.FullName -Value $content -NoNewline
        $totalFixed++
        Write-Host "  Fixed string syntax in: $($file.Name)"
    }
}

Write-Host "Total files with string syntax fixes: $totalFixed"
