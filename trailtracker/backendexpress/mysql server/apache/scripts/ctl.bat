@echo off

if not ""%1"" == ""START"" goto stop

cmd.exe /C start /B /MIN "" "C:\Users\Asher\.vscode\trailtracker\trailtracker\backendexpress\mysql server\apache\bin\httpd.exe"

if errorlevel 255 goto finish
if errorlevel 1 goto error
goto finish

:stop
cmd.exe /C start "" /MIN call "C:\Users\Asher\.vscode\trailtracker\trailtracker\backendexpress\mysql server\killprocess.bat" "httpd.exe"

if not exist "C:\Users\Asher\.vscode\trailtracker\trailtracker\backendexpress\mysql server\apache\logs\httpd.pid" GOTO finish
del "C:\Users\Asher\.vscode\trailtracker\trailtracker\backendexpress\mysql server\apache\logs\httpd.pid"
goto finish

:error
echo Error starting Apache

:finish
exit
