$zipFile = 'c:\Asmi 2\asmi-luxury-jewelry-traditional-hosting.zip'
if (Test-Path $zipFile) {
    Remove-Item $zipFile -Force
}

$includeItems = @(
    'index.html',
    'admin.html',
    '.htaccess',
    'api.php',
    'server.js',
    'package.json',
    'assets',
    'css',
    'js',
    'data'
)

$tempFolder = 'c:\Asmi 2\temp_traditional_package'
if (Test-Path $tempFolder) {
    Remove-Item $tempFolder -Recurse -Force
}
New-Item -ItemType Directory -Path $tempFolder | Out-Null

foreach ($item in $includeItems) {
    $src = Join-Path 'c:\Asmi 2' $item
    if (Test-Path $src) {
        Copy-Item -Path $src -Destination $tempFolder -Recurse -Force
    }
}

Compress-Archive -Path (Join-Path $tempFolder '*') -DestinationPath $zipFile -Force
Remove-Item $tempFolder -Recurse -Force

$zipSize = (Get-Item $zipFile).Length
Write-Output ("Created traditional hosting zip: $zipFile (Size: $([math]::Round($zipSize / 1MB, 2)) MB)")
