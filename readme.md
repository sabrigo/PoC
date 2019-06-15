# PoC

## Pre-requisites

    1) .net core 2.2
    2) .net EF core 2.2
    3) ASP.Net ore 2.2
    4) node js 8.9
    5) MSSSQL localdb

The application uses following tech

    1) .net core 2.2 including EF Core 2.2 and ASP.NetCore 2.2 for server side and local db
    2) .net core 2.1 is used only for database migrator as I use fluent migrator for database first approach which support only up to .net core 2.1
    3) angular 7 for the front end
    4) Uses Micro-services for API.
    5) XUnit for test


Please create 2 databases as PoC & PoC_tst as a sql local db and run the migrate.bat.  Feel free to change the connection string in accordance with your environment and setup.

    1) the PoC_tst database is used for integration tests.
    2) the PoC database is used for UI

The server side uses quite a few packages, so to ensure everthing runs smooth use restore nuget package if you have turned off during the build.

The server side is built keeping in mind of micro-services.  However for the purpose of this coding, I have made decision to use single database but with different APIs for service calls.

The server side has integration tests and unit tests.  I haven't run the code coverage, however I am confident that major of the functionalities have been unit tested and integration tested.  Each of the project has its own test project except the CommonLib and DBMigrator.  The CommonLib is tested through the application as a part of integration or unit tests.  In CommonLib only the functionalities that is essential for this coding test is tested.

In the integration test I load up the people data & favourites data for test cases, I did not cater to tear down and tear up the data for each test cases due to the time factor.  So please consider running the integration test as a whole rather than as an individual test case.

The migrate.bat has 2 data scripts file, so please ensure you have enought database rights to create table and insert records.  As it uses a migration style, it creates an additional table called versioninfo by itself
    
        1) Schema file
        2) Data file

The solution is set up to use multiple startup project, and it uses kestrel for the purpose of webserver, after you finish setting up everything just ctrl+f5 from the VS Studio should get the server running.  Dont worry about the webpages throwing error, has these are only for api calls.  

The client side,

       1) you should run npm install before you run the application.
       2) you should run npm run test to run the test cases
       3) you should run npm start to run the application

Change the url value to the server side url in angular project at environment.ts

        1) environment.favouritesBaseUrl
        2) environment.peopleBaseUrl

I have used bootstrap to give a decent look and feel for the application.

I have covered the people component and services and common component in unit tests, however due to the time factor, I haven't unit tested via code for the favourites, having said that the rest of tests how it is written should give you a fair idea about how I write my code.

Ensure to run the server first before running the client.

Ensure port number 4200, 5000, 5001 aren't used elsewhere if so, feel free to change those in this application.

URLs: 

    1) Favourites API: http://localhost:5000
    2) People API: http://localhost:5001
    3) Client: http://localhost:4200
    


I am hopeful this should give you the idea of how I structure the code, of course there is always things can be done better, I am open to ideas and suggestions.