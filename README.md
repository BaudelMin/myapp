	Error : (<class 'TypeError'>, TypeError('not enough arguments for format string'), <traceback object at 0x00000208255D8AC0>)	
11:49:12.391	ERROR	Traceback (most recent call last):
  File "C:\Users\RPA\Documents\bots\prime-letter-actions\app\WeightageProcess.py", line 209, in before_run
    view.get_data_by_query_name(tablename)
  File "C:\Users\RPA\Documents\bots\prime-letter-actions\app\DBView.py", line 123, in get_data_by_query_name
    cursor.executemany(mysql_query, result)
  File "C:\ProgramData\robocorp\ht\1bab873_5a1fac3_9fcd2534\lib\site-packages\pymysql\cursors.py", line 187, in executemany
    return self._do_execute_many(
  File "C:\ProgramData\robocorp\ht\1bab873_5a1fac3_9fcd2534\lib\site-packages\pymysql\cursors.py", line 210, in _do_execute_many
    v = values % escape(next(args), conn)
TypeError: not enough arguments for format string

During handling of the above exception, another exception occurred:

Traceback (most recent call last):
  File "C:\Users\RPA\Documents\bots\prime-letter-actions\qrlib\QRDecorators.py", line 16, in wrapper
    value = function(self, *args, **kwargs)
  File "C:\Users\RPA\Documents\bots\prime-letter-actions\app\WeightageProcess.py", line 209, in before_run
    view.get_data_by_query_name(tablename)
  File "C:\Users\RPA\Documents\bots\prime-letter-actions\app\DBView.py", line 60, in __exit__
    raise Exception(args)
Exception: (<class 'TypeError'>, TypeError('not enough arguments for format string'), <traceback object at 0x00000208255D8AC0>)
11:49:12.395	INFO	Run Item: {'started_at': '2023-07-02 11:48:53', 'completed_at': '2023-07-02 11:49:12', 'status': 'Error', 'report_data': {'Task': 'Before run: WeightageProcess'}, 'is_ticket': False, 'notification': {}}	
11:49:12.395	ERROR	(<class 'TypeError'>, TypeError('not enough arguments for format string'), <traceback object at 0x00000208255D8AC0>)	
11:49:12.396	ERROR	Traceback (most recent call last):
  File "C:\Users\RPA\Documents\bots\prime-letter-actions\app\WeightageProcess.py", line 209, in before_run
    view.get_data_by_query_name(tablename)
  File "C:\Users\RPA\Documents\bots\prime-letter-actions\app\DBView.py", line 123, in get_data_by_query_name
    cursor.executemany(mysql_query, result)
  File "C:\ProgramData\robocorp\ht\1bab873_5a1fac3_9fcd2534\lib\site-packages\pymysql\cursors.py", line 187, in executemany
    return self._do_execute_many(
  File "C:\ProgramData\robocorp\ht\1bab873_5a1fac3_9fcd2534\lib\site-packages\pymysql\cursors.py", line 210, in _do_execute_many
    v = values % escape(next(args), conn)
TypeError: not enough arguments for format string

During handling of the above exception, another exception occurred:

Traceback (most recent call last):
  File "C:\Users\RPA\Documents\bots\prime-letter-actions\app\Bot.py", line 32, in start
    self.weightprocess.before_run()
  File "C:\Users\RPA\Documents\bots\prime-letter-actions\qrlib\QRDecorators.py", line 22, in wrapper
    raise e
  File "C:\Users\RPA\Documents\bots\prime-letter-actions\qrlib\QRDecorators.py", line 16, in wrapper
    value = function(self, *args, **kwargs)
  File "C:\Users\RPA\Documents\bots\prime-letter-actions\app\WeightageProcess.py", line 209, in before_run
    view.get_data_by_query_name(tablename)
  File "C:\Users\RPA\Documents\bots\prime-letter-actions\app\DBView.py", line 60, in __exit__
    raise Exception(args)
Exception: (<class 'TypeError'>, TypeError('not enough arguments for format string'), <traceback object at 0x00000208255D8AC0>)


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
