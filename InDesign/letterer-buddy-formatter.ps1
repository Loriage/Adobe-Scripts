param(
    [Parameter(Mandatory = $true, Position = 0, HelpMessage = "Path to the input text file.")]
    [ValidateScript({ Test-Path $_ -PathType Leaf })]
    [string]$InputFilePath,

    [Parameter(Mandatory = $false, Position = 1, HelpMessage = "Path for the output formatted file.")]
    [string]$OutputFilePath
)

if ([string]::IsNullOrWhiteSpace($OutputFilePath)) {
    $InputFile = Get-Item -Path $InputFilePath
    $OutputFilePath = Join-Path -Path $InputFile.DirectoryName -ChildPath "$($InputFile.BaseName)_formatted$($InputFile.Extension)"
    Write-Verbose "Output file path not specified. Defaulting to: $OutputFilePath"
}

Write-Host "Starting script..."
Write-Host "Input File: $InputFilePath"
Write-Host "Output File: $OutputFilePath"

$currentPage = $null
$formattedLines = [System.Collections.Generic.List[string]]::new()

try {
    Get-Content -Path $InputFilePath -Encoding UTF8 | ForEach-Object {
        $line = $_.Trim()

        # Skip blank lines
        if ([string]::IsNullOrWhiteSpace($line)) {
            return
        }

        # Check for page marker (e.g., "page 8 :")
        if ($line -match '^\s*page\s+(\d+)\s*:\s*$') {
            $currentPage = $matches[1]
            Write-Verbose "Detected Page: $currentPage"
        }
        # Check for content line (e.g., "a- text", "1- text", "3+4- text")
        elseif ($currentPage -ne $null -and $line -match '^\s*([a-zA-Z0-9+]+)\s*-\s*(.*)$') {
            $identifier = $matches[1].Trim()
            $text = $matches[2].Trim()

            # Only add if there is actual text content
            if (-not [string]::IsNullOrWhiteSpace($text)) {
                $formattedLine = "$currentPage.$identifier`t$text"
                $formattedLines.Add($formattedLine)
                Write-Verbose "Processed Line: $formattedLine"
            } else {
                 Write-Verbose "Skipping line with identifier '$identifier' but no text on page $currentPage."
            }
        }
        else {
             Write-Verbose "Skipping unrecognized line format: $line"
        }
    }

    if ($formattedLines.Count -gt 0) {
        Set-Content -Path $OutputFilePath -Value $formattedLines -Encoding UTF8 -Force
        Write-Host "Successfully formatted script saved to: $OutputFilePath"
    } else {
        Write-Warning "No processable content found in the input file. Output file was not created or is empty."
    }

} catch {
    Write-Error "An error occurred during processing: $($_.Exception.Message)"
    Write-Error "Script execution halted."
}

Write-Host "Script finished."
