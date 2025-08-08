# Fix all remaining @/../ import paths

$sourceRoot = "src"
$patterns = @(
    @{ pattern = "@/\.\."; replacement = "@" }
)

Write-Host "Searching for files with @/../ import paths..."

$allFiles = Get-ChildItem -Path $sourceRoot -Include "*.js", "*.jsx" -Recurse
$totalFixed = 0

foreach ($file in $allFiles) {
    $content = Get-Content $file.FullName -Raw
    $originalContent = $content
    
    # Fix @/../ patterns
    $content = $content -replace "@/\.\./", "@/"
    
    if ($content -ne $originalContent) {
        Set-Content $file.FullName -Value $content -NoNewline
        $totalFixed++
        Write-Host "  Fixed @/../ paths in: $($file.Name)"
    }
}

Write-Host "Total files with @/../ import fixes: $totalFixed"
