import os
import re
import sqlite3
import pathlib
import pandas as pd
import datetime
import argparse


ap = argparse.ArgumentParser()
ap.add_argument("-v","--value",required=True,help="Input your date")
ap.add_argument("-w","--working_directory")
args = vars(ap.parse_args())
# date_format_regex = r"[0-3]?[0-9]-[0-3]?[0-9]-(?:[0-9]{2})?[0-9]{2}"
try:
    date = args.get("value",1)
    WORKING_DIRCTORY = args.get("working_directory")

    # print(date)
    # print(type(date))
    # # date = str(date).strip()
    # if re.findall(r"[0-3]?[0-9]-[0-3]?[0-9]-(?:[0-9]{2})?[0-9]{2}",date):
    #     date_object = datetime.datetime.strptime("%Y-%m-%d")
    #     print(date_object.days)
    #     WORKING_DIRCTORY = args.get("working_directory")
    #     print(WORKING_DIRCTORY)
    # else:
    #     print("Enter valid date format(year-month-day / 2023-01-04)")
    #     exit()
except  Exception as e:
    print("===================================")
    print("Enter valid date format(year-month-day / 2023-01-04)")
    print("===================================")
    exit() 



root_path = pathlib.Path(__file__).parent
SQLITE_PATH = "C:/RPA/Repayment/repayment_database.db"
# EXPORT_FILE_NAME = str((datetime.datetime.today() -  datetime.timedelta(days=date)).strftime("%Y_%m_%d")) + " - " +str((datetime.datetime.today() -  datetime.timedelta(days=1)).strftime("%Y_%m_%d")) + "_repayment_report.xlsx"
EXPORT_FILE_NAME = f"{date}_repayment_report.xlsx"
# EXPORT_FILE_NAME = f"_repayment_report.xlsx"
TABLE_HEADER = ['Branch Code',"Main Code",  "Nominee AC", "Penal Interest", "Interest On Interest", "Interest", "Principal", "Task Status","Remark","Created_at"]


# FROM_DATE = str((datetime.datetime.today() -  datetime.timedelta(days=date)).strftime("%Y-%m-%d"))
# print(FROM_DATE)
# YESTERDAY = str((datetime.datetime.today() -  datetime.timedelta(days=1)).strftime("%Y-%m-%d"))
# print(YESTERDAY)


class TableCreationError(Exception):
    def __init__(self,message="Table Craetion Error"):
        self.message = message 
        super().__init__(self.message)

    def __str__(self):
        return f'{self.message}'

class MultipleValueReturn(Exception):
    def __init__(self,message="Multivalue Returned."):
        self.message = message
        super().__init__(self.message)

    def __str__(self):
        return f'{self.message}'


class SqliteClient():
    def __init__(self, db_path=None, conn=None) -> None:
        if db_path:
            self.db_path = db_path
        else:
            self.db_path = SQLITE_PATH

    def __call__(self):
        # TODO: connection error handle
        conn = sqlite3.connect(self.db_path)
        conn.row_factory = sqlite3.Row
        self.conn = conn
        return self

    def close_connection(self):
        self.conn.close()


sqlite = SqliteClient()

class RepaymentData(object):

    def __init__(
        self, 
        table_name = 'repayment_table',
        db = sqlite(), #connection established db
        cursor = None,
        ) -> None:

        self.table_name = table_name
        self.db = db
        self.cursor = cursor
        self.instance = None

    def objects(self):
        self.cursor = self.db.conn.cursor()
        return self
    def __call__(self, *args, **kwds):
        self.cursor = self.db.conn.cursor()
        return self

    @staticmethod
    def decode_row_object(obj):
        data = None
        if isinstance(obj, sqlite3.Row):
            data = {}
            keys = obj.keys()
            for key in keys:
                data[key] = obj[key]
        elif isinstance(obj, list):
            data = []
            for raw_data in obj:
                keys = raw_data.keys()
                data_dict = {}
                for key in keys:
                    data_dict[key] = raw_data[key]
                data.append(data_dict)
        return data

    
    def filter(self,limit:int=None, **kwargs):
        query = f"SELECT * FROM {self.table_name} WHERE "
        counter = 1
        for key,value in kwargs.items():
            if counter == 1:
                query += f"{key}= '{value}' "
            else:
                query += f"AND {key}= '{value}' "
            counter += 1
        if limit:
            query += f"LIMIT {limit}"
        selector = self.cursor.execute(query)
        result = selector.fetchall()
        self.cursor.close()
        data = self.decode_row_object(result)
        # set id as none
        self.id = None
        return data

    @staticmethod
    def get_key_value(kwargs):
        keys = ""
        values = ""
        counter = 1
        for key, value in kwargs.items():
            if counter == 1:
                keys += f'{key}'
                values += f"'{value}'"
            else:
                keys += f',{key}'
                values += f",'{value}'"
            counter +=1
        return keys,values


    def select_rows(self,path=None,query=None):
        query=f"SELECT * FROM {self.table_name}  WHERE date(created_at)='{date}';"
        selector = self.cursor.execute(query)
        result = selector.fetchall()
        data = self.decode_row_object(result)
        if data:
            df_dataframe = pd.DataFrame(data)
            df_dataframe.drop(columns=['id','sender',"nominee_code",'is_mail','filename'], axis=1, inplace=True)
            df_dataframe['task_status'].replace("Processed","Error",inplace=True)
            df_dataframe.columns = TABLE_HEADER
            df_dataframe.to_excel(f'{WORKING_DIRCTORY}/{EXPORT_FILE_NAME}')
            return True
        return data



if __name__ == "__main__":
    
    repay = RepaymentData()

    data = repay().select_rows()
    if data:
        print("========================")
        print("Successfully database is exported to excel.")
        print("\n")
        # print(f'FROM: {str((datetime.datetime.today() -  datetime.timedelta(days=date)).strftime("%Y/%m/%d"))}')
        # print(f'To: {str((datetime.datetime.today() -  datetime.timedelta(days=1)).strftime("%Y/%m/%d"))}')
        print("\n")
        print("Keep smiling. :)")
        print("========================")
    else:
        print("========================")
        print("Error on database export.")
        print(f"Either there is no data for this {date} or mistaken a data format.")
        print("\n\n")
        print("Keep smiling. :)")
        print("========================")

# import os
# os.system("python export_database.py")
    
   
