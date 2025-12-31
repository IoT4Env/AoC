# Pull image to download the dotnet sdk version 9.0 in docker
FROM mcr.microsoft.com/dotnet/sdk:9.0

# Copy source powershell files inside docker
COPY . /usr/aoc/powershell

# Sets current working directory inside docker
WORKDIR /usr/aoc/powershell

# Executes the powershell script
CMD ["pwsh", "part1Solution.ps1"]
