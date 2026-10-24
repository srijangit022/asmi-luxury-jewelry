Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem

$baseDir = "c:\Asmi 2"
$zipOut = "c:\Asmi 2\asmi-luxury-jewelry.zip"

if (Test-Path $zipOut) {
    Remove-Item $zipOut -Force
}

$zip = [System.IO.Compression.ZipFile]::Open($zipOut, [System.IO.Compression.ZipArchiveMode]::Create)

$filesToInclude = @(
    "style.css",
    "functions.php",
    "index.php",
    "front-page.php",
    "page.php",
    "header.php",
    "footer.php",
    "woocommerce.php",
    "screenshot.png",
    "WORDPRESS_DEPLOYMENT_GUIDE.md"
)

$themeDir = "c:\Asmi 2\wordpress-theme"
foreach ($f in $filesToInclude) {
    $full = Join-Path $themeDir $f
    if (-not (Test-Path $full)) {
        $full = Join-Path $baseDir $f
    }
    if (Test-Path $full) {
        $entryName = "asmi-luxury-jewelry/" + $f
        [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($zip, $full, $entryName, [System.IO.Compression.CompressionLevel]::Optimal) | Out-Null
    }
}

$dirsToInclude = @("css", "js", "assets", "data")
foreach ($d in $dirsToInclude) {
    $dirFull = Join-Path $baseDir $d
    $allFiles = Get-ChildItem -Path $dirFull -Recurse -File
    foreach ($file in $allFiles) {
        $relPath = $file.FullName.Substring($baseDir.Length).TrimStart("\/")
        $entryName = "asmi-luxury-jewelry/" + $relPath.Replace("\", "/")
        [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($zip, $file.FullName, $entryName, [System.IO.Compression.CompressionLevel]::Optimal) | Out-Null
    }
}

$zip.Dispose()
Write-Host "SUCCESS: asmi-luxury-jewelry.zip created with forward slashes and root folder."

# Also synchronize asmi-luxury-jwellery.zip so both named archives are always identical
$zipAlt = "c:\Asmi 2\asmi-luxury-jwellery.zip"
Copy-Item $zipOut $zipAlt -Force
Write-Host "SUCCESS: asmi-luxury-jwellery.zip synchronized with identical files."
