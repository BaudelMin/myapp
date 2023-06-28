CREATE FUNCTION levenshtein_distance(s1 VARCHAR(255), s2 VARCHAR(255))
RETURNS INT
BEGIN
    DECLARE s1_len, s2_len, i, j, c, c_temp, cost INT;
    DECLARE s1_char, s2_char VARCHAR(1);
    DECLARE distance_matrix VARBINARY(255) DEFAULT '';
    
    SET s1_len = CHAR_LENGTH(s1);
    SET s2_len = CHAR_LENGTH(s2);
    SET distance_matrix = REPEAT(CONCAT(UNHEX('FF'), UNHEX('FF')), s1_len * s2_len);
    
    IF s1 = s2 THEN
        RETURN 0;
    ELSEIF s1_len = 0 THEN
        RETURN s2_len;
    ELSEIF s2_len = 0 THEN
        RETURN s1_len;
    ELSE
        SET i = 0;
        WHILE i < s1_len DO
            SET distance_matrix = INSERT(distance_matrix, (i * 2) + 1, 1, UNHEX('00'));
            SET i = i + 1;
        END WHILE;
        
        SET i = 0;
        WHILE i < s2_len DO
            SET distance_matrix = INSERT(distance_matrix, i * (s1_len * 2) + 1, 1, UNHEX('00'));
            SET i = i + 1;
        END WHILE;
        
        SET i = 1;
        WHILE i <= s1_len DO
            SET s1_char = SUBSTRING(s1, i, 1);
            SET j = 1;
            WHILE j <= s2_len DO
                SET s2_char = SUBSTRING(s2, j, 1);
                
                IF s1_char = s2_char THEN
                    SET cost = 0;
                ELSE
                    SET cost = 1;
                END IF;
                
                SET c = CONVERT(HEX(SUBSTRING(distance_matrix, (j - 1) * (s1_len * 2) + (i - 1) * 2 + 1, 2)), UNSIGNED);
                SET c_temp = LEAST(
                    CONVERT(HEX(SUBSTRING(distance_matrix, j * (s1_len * 2) + (i - 1) * 2 + 1, 2)), UNSIGNED) + 1,
                    CONVERT(HEX(SUBSTRING(distance_matrix, (j - 1) * (s1_len * 2) + i * 2 + 1, 2)), UNSIGNED) + 1,
                    c + cost
                );
                SET distance_matrix = INSERT(distance_matrix, j * (s1_len * 2) + i * 2 + 1, 2, UNHEX(RIGHT(CONCAT('00', HEX(c_temp)), 2)));
                
                SET j = j + 1;
            END WHILE;
            
            SET i = i + 1;
        END WHILE;
        
        RETURN CONVERT(HEX(SUBSTRING(distance_matrix, s1_len * s2_len * 2 + 1, 2)), UNSIGNED);
    END IF;
END

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
