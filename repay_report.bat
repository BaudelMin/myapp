@echo off

ECHO Enter your date: format(Eg: 2023-01-14)
set /p "Date=" date=
python c:/RPA/Repayment/export_database.py --value=%date% --working_directory=%CD%
pause
