# Fix double quote syntax errors in import statements

$sourceRoot = "src"
$pattern = "@/configs''"
$replacement = "@/configs'"

Write-Host "Searching for files with double quote syntax errors..."

$files = Get-ChildItem -Path $sourceRoot -Include "*.js", "*.jsx" -Recurse | 
    Where-Object { (Get-Content $_.FullName -Raw) -match [regex]::Escape($pattern) }

$totalFixed = 0

foreach ($file in $files) {
    Write-Host "Processing: $($file.FullName)"
    
    $content = Get-Content $file.FullName -Raw
    $newContent = $content -replace [regex]::Escape($pattern), $replacement
    
    if ($content -ne $newContent) {
        Set-Content $file.FullName -Value $newContent -NoNewline
        $totalFixed++
        Write-Host "  Fixed double quote syntax in: $($file.Name)"
    }
}

Write-Host "Total files with quote syntax fixes: $totalFixed"
